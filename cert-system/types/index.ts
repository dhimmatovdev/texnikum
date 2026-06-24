export interface Certificate {
  id: string;
  cert_no: string;
  familiya: string;
  ism: string;
  sharif: string;
  yonalish_uz: string;
  yonalish_eng: string;
  soat: number;
  start_date: string;
  end_date: string;
  status: "active" | "inactive";
  created_at: string;
}

export interface VerificationLog {
  id: string;
  cert_no: string;
  verified_at: string;
  found: boolean;
}
