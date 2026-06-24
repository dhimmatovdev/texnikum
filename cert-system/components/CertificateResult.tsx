import type { Certificate } from "@/types/certificate";

export default function CertificateResult({ certificate }: { certificate: Certificate | null }) {
  if (!certificate) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-lg font-semibold text-red-700">Sertifikat topilmadi</p>
        <p className="mt-1 text-sm text-red-600">
          Kiritilgan raqam bo&apos;yicha hech qanday sertifikat ro&apos;yxatdan o&apos;tmagan.
        </p>
      </div>
    );
  }

  const isValid = certificate.status === "valid";

  return (
    <div
      className={`rounded-lg border p-6 ${
        isValid ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-lg font-semibold ${isValid ? "text-green-700" : "text-amber-700"}`}>
          {isValid ? "Sertifikat haqiqiy" : "Sertifikat bekor qilingan"}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isValid ? "bg-green-600 text-white" : "bg-amber-600 text-white"
          }`}
        >
          {certificate.cert_no}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">F.I.Sh.</dt>
          <dd className="text-base font-medium text-gray-900">{certificate.full_name}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Mutaxassislik</dt>
          <dd className="text-base font-medium text-gray-900">{certificate.specialty}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Bitirgan yili</dt>
          <dd className="text-base font-medium text-gray-900">{certificate.graduation_year}</dd>
        </div>
        {certificate.gpa != null && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">GPA</dt>
            <dd className="text-base font-medium text-gray-900">{certificate.gpa}</dd>
          </div>
        )}
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Berilgan sana</dt>
          <dd className="text-base font-medium text-gray-900">{certificate.issue_date}</dd>
        </div>
      </dl>
    </div>
  );
}
