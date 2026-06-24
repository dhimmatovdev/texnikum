import { getStats, getAllCertificates } from "@/lib/certificates";

export const revalidate = 0;

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-gray-100 p-5">
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

export default async function AdminPage() {
  const [stats, certificates] = await Promise.all([getStats(), getAllCertificates()]);
  const recent = certificates.slice(0, 10);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Boshqaruv paneli</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Jami talabalar" value={stats.total} />
        <StatCard label="Faol sertifikatlar" value={stats.active} />
        <StatCard label="Bekor qilingan" value={stats.inactive} />
        <StatCard label="Tasdiqlashlar soni" value={stats.verifications} />
      </div>

      <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">So&apos;nggi qo&apos;shilganlar</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-4">Ism Familiya</th>
                <th className="py-2 pr-4">Yo&apos;nalish</th>
                <th className="py-2 pr-4">Sertifikat №</th>
                <th className="py-2 pr-4">Sana</th>
                <th className="py-2 pr-4">Holati</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((cert) => (
                <tr key={cert.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    {[cert.ism, cert.familiya].filter(Boolean).join(" ")}
                  </td>
                  <td className="py-3 pr-4">{cert.yonalish_uz}</td>
                  <td className="py-3 pr-4 font-medium text-gray-900">{cert.cert_no}</td>
                  <td className="py-3 pr-4">
                    {new Date(cert.created_at).toLocaleDateString("uz-UZ")}
                  </td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        cert.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cert.status === "active" ? "Faol" : "Bekor qilingan"}
                    </span>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-gray-400">
                    Hali sertifikatlar yo&apos;q
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
