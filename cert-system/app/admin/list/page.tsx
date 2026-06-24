import Link from "next/link";
import { getAllCertificates, searchCertificates } from "@/lib/certificates";
import QRModal from "@/components/QRModal";
import CertRowActions from "@/components/CertRowActions";

const PAGE_SIZE = 20;

function buildHref(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) search.set(key, value);
  }
  const qs = search.toString();
  return qs ? `/admin/list?${qs}` : "/admin/list";
}

export default async function AdminListPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string };
}) {
  const q = searchParams.q ?? "";
  const status = searchParams.status ?? "all";
  const page = Math.max(1, Number(searchParams.page ?? "1") || 1);

  const all = q ? await searchCertificates(q) : await getAllCertificates();
  const filtered = status === "all" ? all : all.filter((c) => c.status === status);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const filters: { label: string; value: string }[] = [
    { label: "Barchasi", value: "all" },
    { label: "Faol", value: "active" },
    { label: "Bekor qilingan", value: "inactive" },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">Sertifikatlar ro&apos;yxati</h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form action="/admin/list" className="flex gap-2">
          <input type="hidden" name="status" value={status} />
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Ism, familiya yoki raqam bo'yicha qidirish"
            className="w-72 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="rounded-md bg-[#16215C] px-4 py-2 text-sm font-medium text-white hover:bg-[#101a47]"
          >
            Qidirish
          </button>
        </form>

        <div className="flex gap-2">
          {filters.map((f) => (
            <Link
              key={f.value}
              href={buildHref({ q, status: f.value === "all" ? undefined : f.value })}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                status === f.value
                  ? "bg-[#16215C] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl bg-white p-6 shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 pr-4">QR</th>
              <th className="py-2 pr-4">Raqam</th>
              <th className="py-2 pr-4">F.I.Sh.</th>
              <th className="py-2 pr-4">Yo&apos;nalish</th>
              <th className="py-2 pr-4">Soat</th>
              <th className="py-2 pr-4">Holati</th>
              <th className="py-2 pr-4">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((cert) => (
              <tr key={cert.id} className="border-b last:border-0">
                <td className="py-3 pr-4">
                  <QRModal certNo={cert.cert_no} />
                </td>
                <td className="py-3 pr-4 font-medium text-gray-900">{cert.cert_no}</td>
                <td className="py-3 pr-4">
                  {[cert.familiya, cert.ism, cert.sharif].filter(Boolean).join(" ")}
                </td>
                <td className="py-3 pr-4">{cert.yonalish_uz}</td>
                <td className="py-3 pr-4">{cert.soat ?? "—"}</td>
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
                <td className="py-3 pr-4">
                  <CertRowActions cert={cert} />
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-400">
                  Hali sertifikatlar yo&apos;q
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            {filtered.length} ta natija, {currentPage}/{totalPages} sahifa
          </p>
          <div className="flex gap-2">
            <Link
              href={buildHref({ q, status: status === "all" ? undefined : status, page: String(Math.max(1, currentPage - 1)) })}
              aria-disabled={currentPage <= 1}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                currentPage <= 1
                  ? "pointer-events-none bg-gray-100 text-gray-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Oldingi
            </Link>
            <Link
              href={buildHref({ q, status: status === "all" ? undefined : status, page: String(Math.min(totalPages, currentPage + 1)) })}
              aria-disabled={currentPage >= totalPages}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                currentPage >= totalPages
                  ? "pointer-events-none bg-gray-100 text-gray-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Keyingi
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
