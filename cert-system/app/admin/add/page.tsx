import CertificateForm from "@/components/CertificateForm";

export default function AddCertificatePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-xl font-bold text-gray-900">Yangi talaba qo&apos;shish</h1>
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <CertificateForm />
      </div>
    </div>
  );
}
