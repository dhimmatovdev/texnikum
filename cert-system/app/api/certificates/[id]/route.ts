import { NextRequest, NextResponse } from "next/server";
import { getRouteHandlerSupabase } from "@/lib/supabase-server";
import { getAdminSupabase } from "@/lib/supabase-admin";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getRouteHandlerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("certificates")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ data });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getRouteHandlerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    cert_no,
    familiya,
    ism,
    sharif,
    yonalish_uz,
    yonalish_eng,
    soat,
    start_date,
    end_date,
    status,
  } = body;

  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("certificates")
    .update({
      cert_no,
      familiya,
      ism,
      sharif,
      yonalish_uz,
      yonalish_eng,
      soat,
      start_date,
      end_date,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = getRouteHandlerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminSupabase();
  const { error } = await admin.from("certificates").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
