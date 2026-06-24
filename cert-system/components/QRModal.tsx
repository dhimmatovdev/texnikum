"use client";

import { useState } from "react";
import QRCodeCert from "@/components/QRCodeCert";

export default function QRModal({ certNo }: { certNo: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
      >
        QR
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-gray-900">{certNo}</p>
            <QRCodeCert certNo={certNo} />
            <button
              onClick={() => setOpen(false)}
              className="rounded-md bg-[#16215C] px-4 py-2 text-sm font-medium text-white hover:bg-[#101a47]"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </>
  );
}
