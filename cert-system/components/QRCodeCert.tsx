"use client";

import { QRCode } from "react-qrcode-logo";

export default function QRCodeCert({ certNo }: { certNo: string }) {
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const url = `${baseUrl}/verify/${encodeURIComponent(certNo)}`;

  return <QRCode value={url} size={96} quietZone={4} />;
}
