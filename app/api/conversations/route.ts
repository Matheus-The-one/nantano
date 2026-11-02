import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "@/lib/auth/server";
import { listConversations } from "@/lib/db/conversations";

/**
 * Paginated chat history, newest first. Backs the "Show all" dialog, which
 * fetches a page at a time instead of loading every conversation up front.
 *
 * Query params:
 *   limit  - page size (clamped server-side)
 *   cursor - opaque cursor from the previous response
 */
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const rawLimit = Number.parseInt(params.get("limit") ?? "", 10);

  try {
    // Scoped to the session user, so the cursor cannot be used to read
    // another account's history.
    const page = await listConversations(session.userId, {
      limit: Number.isFinite(rawLimit) ? rawLimit : 20,
      cursor: params.get("cursor"),
    });

    return NextResponse.json(page);
  } catch (error) {
    console.error("[api/conversations] Could not list conversations", error);
    return NextResponse.json(
      { error: "Could not load chat history." },
      { status: 500 }
    );
  }
}
