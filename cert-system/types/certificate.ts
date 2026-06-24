export type Certificate = {
  id: string;
  cert_no: string;
  full_name: string;
  specialty: string;
  graduation_year: number;
  gpa: number | null;
  issue_date: string;
  status: "valid" | "revoked";
  created_at: string;
};

export type CertificateInput = Omit<Certificate, "id" | "created_at">;
