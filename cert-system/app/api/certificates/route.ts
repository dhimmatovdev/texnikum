import { NextRequest, NextResponse } from "next/server";
import { getRouteHandlerSupabase } from "@/lib/supabase-server";

export async function GET() {
  const supabase = getRouteHandlerSupabase();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = getRouteHandlerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { cert_no, full_name, specialty, graduation_year, gpa, issue_date, status } = body;

  if (!cert_no || !full_name || !specialty || !graduation_year || !issue_date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      cert_no,
      full_name,
      specialty,
      graduation_year,
      gpa: gpa ?? null,
      issue_date,
      status: status ?? "valid",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
