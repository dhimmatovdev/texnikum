"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Certificate } from "@/types";

export default function CertRowActions({ cert }: { cert: Certificate }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function toggleStatus() {
    setLoading(true);
    const newStatus = cert.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/certificates/${cert.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoading(false);
    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => router.push(`/admin/edit/${cert.id}`)}
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Tahrirlash
      </button>
      <button
        onClick={toggleStatus}
        disabled={loading}
        className={`text-sm font-medium disabled:opacity-50 ${
          cert.status === "active" ? "text-red-600 hover:text-red-800" : "text-green-700 hover:text-green-900"
        }`}
      >
        {cert.status === "active" ? "Bekor qilish" : "Tiklash"}
      </button>
    </div>
  );
}
