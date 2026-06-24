import { notFound } from "next/navigation";
import { getCertificateById } from "@/lib/certificates";
import EditCertificateForm from "@/components/EditCertificateForm";

export default async function EditCertificatePage({ params }: { params: { id: string } }) {
  const certificate = await getCertificateById(params.id);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900">Sertifikatni tahrirlash</h1>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <EditCertificateForm certificate={certificate} />
      </div>
    </div>
  );
}
