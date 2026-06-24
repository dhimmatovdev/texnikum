import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { getAllCertificates, createCertificate, searchCertificates } from "@/lib/certificates";

export async function GET(req: NextRequest) {
  const supabase = createServerClient(cookies());
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = req.nextUrl.searchParams.get("q");
  const data = query ? await searchCertificates(query) : await getAllCertificates();

  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const supabase = createServerClient(cookies());
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

  try {
    const data = await createCertificate({
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
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
