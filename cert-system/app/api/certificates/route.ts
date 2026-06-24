import { NextRequest, NextResponse } from "next/server";
import { getRouteHandlerSupabase } from "@/lib/supabase-server";
import { getAdminSupabase } from "@/lib/supabase-admin";

export async function GET() {
  const supabase = getRouteHandlerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = getAdminSupabase();
  const { data, error } = await admin
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

  if (!familiya || !ism || !yonalish_uz) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = getAdminSupabase();
  const { data, error } = await admin
    .from("certificates")
    .insert({
      ...(cert_no ? { cert_no } : {}),
      familiya,
      ism,
      sharif: sharif ?? null,
      yonalish_uz,
      yonalish_eng: yonalish_eng ?? null,
      soat: soat ?? null,
      start_date: start_date ?? null,
      end_date: end_date ?? null,
      status: status ?? "active",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
