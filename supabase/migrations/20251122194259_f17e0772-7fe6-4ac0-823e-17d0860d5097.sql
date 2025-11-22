-- Allow public (including anonymous visitors) to read admin_settings like site_active
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'admin_settings' 
      AND policyname = 'Public can read admin_settings'
  ) THEN
    CREATE POLICY "Public can read admin_settings"
    ON public.admin_settings
    FOR SELECT
    USING (true);
  END IF;
END $$;
