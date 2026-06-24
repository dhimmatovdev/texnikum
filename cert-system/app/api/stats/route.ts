import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { getStats } from "@/lib/certificates";

export async function GET() {
  const supabase = createServerClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getStats();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch stats";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
