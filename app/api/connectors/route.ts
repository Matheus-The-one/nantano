import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/server";
import { getConnector } from "@/lib/connectors/catalog";
import {
  listConnections,
  removeConnection,
  saveConnection,
} from "@/lib/db/connectors";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const connections = await listConnections(session.userId);
  return NextResponse.json({ connections });
}

type ConnectBody = {
  connectorId?: unknown;
  values?: unknown;
};

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: ConnectBody;
  try {
    body = (await request.json()) as ConnectBody;
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof body.connectorId !== "string") {
    return NextResponse.json({ error: "connectorId is required." }, { status: 400 });
  }

  const definition = getConnector(body.connectorId);
  if (!definition) {
    return NextResponse.json({ error: "Unknown connector." }, { status: 404 });
  }

  if (definition.availability === "coming-soon") {
    return NextResponse.json(
      { error: `${definition.name} is not available yet.` },
      { status: 409 }
    );
  }

  const submitted =
    body.values && typeof body.values === "object"
      ? (body.values as Record<string, unknown>)
      : {};

  const config: Record<string, string> = {};
  const secretKeys: string[] = [];
  const missing: string[] = [];

  for (const field of definition.fields ?? []) {
    const raw = submitted[field.key];
    const value = typeof raw === "string" ? raw.trim() : "";

    if (value.length === 0) {
      if (!field.optional) missing.push(field.label);
      continue;
    }

    if (field.secret) {
      // Secrets are not persisted yet. Ingestion is out of scope for this
      // build, so storing credentials would create risk with no benefit; we
      // record only which secrets were supplied.
      secretKeys.push(field.key);
      continue;
    }

    config[field.key] = value;
  }

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}.` },
      { status: 400 }
    );
  }

  const record = await saveConnection({
    userId: session.userId,
    connectorId: definition.id,
    config,
    secretKeys,
  });

  return NextResponse.json({ connection: record });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const connectorId = new URL(request.url).searchParams.get("connectorId");
  if (!connectorId) {
    return NextResponse.json({ error: "connectorId is required." }, { status: 400 });
  }

  await removeConnection(session.userId, connectorId);
  return NextResponse.json({ ok: true });
}
