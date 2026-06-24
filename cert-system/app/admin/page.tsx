import { getServerComponentSupabase } from "@/lib/supabase-server";
import AdminCertList from "@/components/AdminCertList";
import LogoutButton from "@/components/LogoutButton";
import type { Certificate } from "@/types/certificate";

export const revalidate = 0;

export default async function AdminPage() {
  const supabase = getServerComponentSupabase();
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin panel</h1>
            <p className="text-sm text-gray-500">Nukus Tibbiyot va IT Texnikumi</p>
          </div>
          <LogoutButton />
        </div>

        <AdminCertList initialCertificates={(data as Certificate[]) ?? []} />
      </div>
    </main>
  );
}
