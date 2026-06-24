import { createAdminClient } from "@/lib/supabase";
import type { Certificate } from "@/types";

export async function getAllCertificates(): Promise<Certificate[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getCertificateByNo(certNo: string): Promise<Certificate | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_no", certNo)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function getCertificateById(id: string): Promise<Certificate | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createCertificate(
  data: Partial<Omit<Certificate, "id" | "created_at">>
): Promise<Certificate> {
  const supabase = createAdminClient();
  const { data: created, error } = await supabase
    .from("certificates")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return created;
}

export async function updateCertificateStatus(
  id: string,
  status: "active" | "inactive"
): Promise<Certificate> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("certificates")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCertificate(
  id: string,
  data: Partial<Omit<Certificate, "id" | "cert_no" | "created_at">>
): Promise<Certificate> {
  const supabase = createAdminClient();
  const { data: updated, error } = await supabase
    .from("certificates")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated;
}

export async function searchCertificates(query: string): Promise<Certificate[]> {
  const supabase = createAdminClient();
  const escaped = query.replace(/[%,]/g, "");
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .or(
      `familiya.ilike.%${escaped}%,ism.ilike.%${escaped}%,sharif.ilike.%${escaped}%,cert_no.ilike.%${escaped}%`
    )
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function logVerification(certNo: string, found: boolean): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("verification_logs")
    .insert({ cert_no: certNo, found });

  if (error) throw error;
}

export async function getStats(): Promise<{
  total: number;
  active: number;
  inactive: number;
  verifications: number;
}> {
  const supabase = createAdminClient();

  const [totalRes, activeRes, inactiveRes, verificationsRes] = await Promise.all([
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("certificates").select("*", { count: "exact", head: true }).eq("status", "inactive"),
    supabase.from("verification_logs").select("*", { count: "exact", head: true }),
  ]);

  if (totalRes.error) throw totalRes.error;
  if (activeRes.error) throw activeRes.error;
  if (inactiveRes.error) throw inactiveRes.error;
  if (verificationsRes.error) throw verificationsRes.error;

  return {
    total: totalRes.count ?? 0,
    active: activeRes.count ?? 0,
    inactive: inactiveRes.count ?? 0,
    verifications: verificationsRes.count ?? 0,
  };
}
