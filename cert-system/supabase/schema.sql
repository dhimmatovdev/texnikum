-- Run this in the Supabase SQL editor

-- Students / Certificates table
CREATE TABLE certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cert_no TEXT UNIQUE NOT NULL,
  familiya TEXT NOT NULL,
  ism TEXT NOT NULL,
  sharif TEXT,
  yonalish_uz TEXT NOT NULL,
  yonalish_eng TEXT,
  soat INTEGER,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Verification logs table
CREATE TABLE verification_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cert_no TEXT NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT now(),
  ip_address TEXT,
  found BOOLEAN NOT NULL
);

-- Auto-increment cert_no function
CREATE SEQUENCE cert_no_seq START 1800001;

CREATE OR REPLACE FUNCTION generate_cert_no()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.cert_no IS NULL OR NEW.cert_no = '' THEN
    NEW.cert_no := nextval('cert_no_seq')::TEXT;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_cert_no
BEFORE INSERT ON certificates
FOR EACH ROW EXECUTE FUNCTION generate_cert_no();

-- RLS policies
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_logs ENABLE ROW LEVEL SECURITY;

-- Public can only READ active certificates (for verification page)
CREATE POLICY "Public read active certs" ON certificates
  FOR SELECT USING (status = 'active');

-- Verification logs: public can insert
CREATE POLICY "Public insert logs" ON verification_logs
  FOR ALL USING (true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access" ON certificates
  FOR ALL USING (auth.role() = 'authenticated');
