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

  const isActive = certificate.status === "active";
  const fullName = [certificate.familiya, certificate.ism, certificate.sharif]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`rounded-lg border p-6 ${
        isActive ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className={`text-lg font-semibold ${isActive ? "text-green-700" : "text-amber-700"}`}>
          {isActive ? "Sertifikat haqiqiy" : "Sertifikat bekor qilingan"}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isActive ? "bg-green-600 text-white" : "bg-amber-600 text-white"
          }`}
        >
          {certificate.cert_no}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">F.I.Sh.</dt>
          <dd className="text-base font-medium text-gray-900">{fullName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-gray-500">Yo&apos;nalish</dt>
          <dd className="text-base font-medium text-gray-900">{certificate.yonalish_uz}</dd>
        </div>
        {certificate.yonalish_eng && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">Direction</dt>
            <dd className="text-base font-medium text-gray-900">{certificate.yonalish_eng}</dd>
          </div>
        )}
        {certificate.soat != null && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">Soat</dt>
            <dd className="text-base font-medium text-gray-900">{certificate.soat}</dd>
          </div>
        )}
        {certificate.start_date && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">Boshlanish sanasi</dt>
            <dd className="text-base font-medium text-gray-900">{certificate.start_date}</dd>
          </div>
        )}
        {certificate.end_date && (
          <div>
            <dt className="text-xs uppercase tracking-wide text-gray-500">Tugash sanasi</dt>
            <dd className="text-base font-medium text-gray-900">{certificate.end_date}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
