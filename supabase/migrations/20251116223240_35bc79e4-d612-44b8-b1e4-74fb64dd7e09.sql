-- Update doctors table structure to match actual data
ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS reviews INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS next_available TEXT,
  DROP COLUMN IF EXISTS availability,
  DROP COLUMN IF EXISTS languages,
  DROP COLUMN IF EXISTS education,
  DROP COLUMN IF EXISTS about;

-- Update clinics table structure to match actual data  
ALTER TABLE public.clinics
  ADD COLUMN IF NOT EXISTS reviews INT DEFAULT 0,
  ADD COLUMN IF NOT EXISTS distance TEXT,
  ADD COLUMN IF NOT EXISTS next_available TEXT,
  ADD COLUMN IF NOT EXISTS price TEXT,
  ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS doctors TEXT[],
  ADD COLUMN IF NOT EXISTS address TEXT,
  ADD COLUMN IF NOT EXISTS hours TEXT,
  ADD COLUMN IF NOT EXISTS description TEXT,
  DROP COLUMN IF EXISTS schedule;