import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/server";
import { deleteConversation, getConversation } from "@/lib/db/conversations";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;
  const conversation = await getConversation(session.userId, id);

  if (!conversation) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ conversation });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const { id } = await params;

  // Keyed by userId, so a user can only ever delete their own conversation.
  await deleteConversation(session.userId, id);

  return NextResponse.json({ ok: true });
}
