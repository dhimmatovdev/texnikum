export type Certificate = {
  id: string;
  cert_no: string;
  familiya: string;
  ism: string;
  sharif: string | null;
  yonalish_uz: string;
  yonalish_eng: string | null;
  soat: number | null;
  start_date: string | null;
  end_date: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type CertificateInput = Omit<Certificate, "id" | "created_at" | "updated_at" | "cert_no"> & {
  cert_no?: string;
};

export type VerificationLog = {
  id: string;
  cert_no: string;
  verified_at: string;
  ip_address: string | null;
  found: boolean;
};
