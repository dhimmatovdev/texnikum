import { supabase } from "@/lib/supabase";
import CertificateResult from "@/components/CertificateResult";
import type { Certificate } from "@/types/certificate";

export const revalidate = 0;

export default async function VerifyPage({ params }: { params: { certNo: string } }) {
  const { data } = await supabase
    .from("certificates")
    .select("*")
    .eq("cert_no", params.certNo)
    .maybeSingle();

  const certificate = (data as Certificate | null) ?? null;

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 py-12">
      <div className="w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Nukus Tibbiyot va IT Texnikumi
          </h1>
          <p className="mt-1 text-sm text-gray-500">Sertifikatni tekshirish natijasi</p>
        </div>
        <CertificateResult certificate={certificate} />
      </div>
    </main>
  );
}
