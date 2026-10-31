import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/server";
import {
  deleteMemory,
  listMemories,
  memoryKindLabel,
  saveMemory,
  type MemoryKind,
} from "@/lib/db/memory";

const KINDS: MemoryKind[] = [
  "icp",
  "constraint",
  "metric",
  "competitor",
  "preference",
  "process",
];

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const memories = await listMemories(session.userId);
  return NextResponse.json({ memories });
}

type CreateBody = {
  kind?: unknown;
  content?: unknown;
};

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: CreateBody;
  try {
    body = (await request.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof body.content !== "string" || body.content.trim().length === 0) {
    return NextResponse.json({ error: "content is required." }, { status: 400 });
  }

  if (body.content.length > 500) {
    return NextResponse.json(
      { error: "Keep it under 500 characters." },
      { status: 400 }
    );
  }

  if (
    typeof body.kind !== "string" ||
    !KINDS.includes(body.kind as MemoryKind)
  ) {
    return NextResponse.json(
      {
        error: `kind must be one of: ${KINDS.map(memoryKindLabel).join(", ")}.`,
      },
      { status: 400 }
    );
  }

  const memory = await saveMemory({
    userId: session.userId,
    kind: body.kind as MemoryKind,
    content: body.content.trim(),
    origin: "stated",
  });

  return NextResponse.json({ memory });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const memoryId = new URL(request.url).searchParams.get("memoryId");
  if (!memoryId) {
    return NextResponse.json({ error: "memoryId is required." }, { status: 400 });
  }

  await deleteMemory(session.userId, memoryId);
  return NextResponse.json({ ok: true });
}
