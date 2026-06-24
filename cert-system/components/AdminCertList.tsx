"use client";

import { useState } from "react";
import type { Certificate } from "@/types/certificate";
import QRCodeCert from "@/components/QRCodeCert";
import CertificateForm from "@/components/CertificateForm";

export default function AdminCertList({ initialCertificates }: { initialCertificates: Certificate[] }) {
  const [certificates, setCertificates] = useState(initialCertificates);

  async function handleDelete(id: string) {
    if (!confirm("Sertifikatni o'chirishni tasdiqlaysizmi?")) return;

    const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCertificates((prev) => prev.filter((c) => c.id !== id));
    }
  }

  async function handleToggleStatus(cert: Certificate) {
    const newStatus = cert.status === "valid" ? "revoked" : "valid";
    const res = await fetch(`/api/certificates/${cert.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cert, status: newStatus }),
    });
    if (res.ok) {
      const { data } = await res.json();
      setCertificates((prev) => prev.map((c) => (c.id === data.id ? data : c)));
    }
  }

  function addCertificate(cert: Certificate) {
    setCertificates((prev) => [cert, ...prev]);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Yangi sertifikat qo&apos;shish</h2>
        <div className="mt-4">
          <CertificateForm onCreated={addCertificate} />
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">
          Sertifikatlar ({certificates.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-4">QR</th>
                <th className="py-2 pr-4">Raqam</th>
                <th className="py-2 pr-4">F.I.Sh.</th>
                <th className="py-2 pr-4">Mutaxassislik</th>
                <th className="py-2 pr-4">Yil</th>
                <th className="py-2 pr-4">Holati</th>
                <th className="py-2 pr-4"></th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-b last:border-0">
                  <td className="py-3 pr-4">
                    <QRCodeCert certNo={cert.cert_no} />
                  </td>
                  <td className="py-3 pr-4 font-medium text-gray-900">{cert.cert_no}</td>
                  <td className="py-3 pr-4">{cert.full_name}</td>
                  <td className="py-3 pr-4">{cert.specialty}</td>
                  <td className="py-3 pr-4">{cert.graduation_year}</td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => handleToggleStatus(cert)}
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        cert.status === "valid"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {cert.status}
                    </button>
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => handleDelete(cert.id)}
                      className="text-sm font-medium text-red-600 hover:text-red-800"
                    >
                      O&apos;chirish
                    </button>
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-400">
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
