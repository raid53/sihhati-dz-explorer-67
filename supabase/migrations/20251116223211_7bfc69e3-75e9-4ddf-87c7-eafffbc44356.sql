-- Create admin_settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create doctors table
CREATE TABLE IF NOT EXISTS public.doctors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  image TEXT NOT NULL,
  rating NUMERIC NOT NULL,
  experience TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  availability JSONB NOT NULL,
  languages TEXT[] NOT NULL,
  education TEXT NOT NULL,
  about TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create clinics table
CREATE TABLE IF NOT EXISTS public.clinics (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  specialty TEXT NOT NULL,
  image TEXT NOT NULL,
  rating NUMERIC NOT NULL,
  location TEXT NOT NULL,
  phone TEXT NOT NULL,
  schedule JSONB NOT NULL,
  services TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinics ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_settings (public access for demo)
CREATE POLICY "Allow public read access on admin_settings" 
  ON public.admin_settings FOR SELECT 
  USING (true);

CREATE POLICY "Allow public write access on admin_settings" 
  ON public.admin_settings FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access on admin_settings" 
  ON public.admin_settings FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access on admin_settings" 
  ON public.admin_settings FOR DELETE 
  USING (true);

-- Create policies for doctors (public access)
CREATE POLICY "Allow public read access on doctors" 
  ON public.doctors FOR SELECT 
  USING (true);

CREATE POLICY "Allow public write access on doctors" 
  ON public.doctors FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access on doctors" 
  ON public.doctors FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access on doctors" 
  ON public.doctors FOR DELETE 
  USING (true);

-- Create policies for clinics (public access)
CREATE POLICY "Allow public read access on clinics" 
  ON public.clinics FOR SELECT 
  USING (true);

CREATE POLICY "Allow public write access on clinics" 
  ON public.clinics FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public update access on clinics" 
  ON public.clinics FOR UPDATE 
  USING (true);

CREATE POLICY "Allow public delete access on clinics" 
  ON public.clinics FOR DELETE 
  USING (true);

-- Enable Realtime for all tables
ALTER TABLE public.admin_settings REPLICA IDENTITY FULL;
ALTER TABLE public.doctors REPLICA IDENTITY FULL;
ALTER TABLE public.clinics REPLICA IDENTITY FULL;

ALTER publication supabase_realtime ADD TABLE public.admin_settings;
ALTER publication supabase_realtime ADD TABLE public.doctors;
ALTER publication supabase_realtime ADD TABLE public.clinics;