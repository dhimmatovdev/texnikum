"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyForm() {
  const [certNo, setCertNo] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (certNo.trim()) {
      router.push(`/verify/${encodeURIComponent(certNo.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={certNo}
        onChange={(e) => setCertNo(e.target.value)}
        placeholder="Sertifikat raqamini kiriting"
        className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
        required
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Tekshirish
      </button>
    </form>
  );
}
