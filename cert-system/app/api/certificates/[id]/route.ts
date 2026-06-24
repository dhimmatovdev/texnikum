import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isAdminSession } from "@/lib/auth";
import { getCertificateById, updateCertificate, updateCertificateStatus } from "@/lib/certificates";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getCertificateById(params.id);
    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await req.json();

  if (status !== "active" && status !== "inactive") {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const data = await updateCertificateStatus(params.id, status);
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
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
    const data = await updateCertificate(params.id, {
      familiya,
      ism,
      sharif: sharif ?? null,
      yonalish_uz,
      yonalish_eng: yonalish_eng ?? null,
      soat: soat ?? null,
      start_date: start_date ?? null,
      end_date: end_date ?? null,
      ...(status ? { status } : {}),
    });
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update certificate";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from("certificates").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
