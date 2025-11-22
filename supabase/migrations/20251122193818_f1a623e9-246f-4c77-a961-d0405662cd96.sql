DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename = 'admin_settings' 
      AND policyname = 'Admins can manage admin settings'
  ) THEN
    CREATE POLICY "Admins can manage admin settings"
    ON public.admin_settings
    FOR ALL
    USING (
      auth.uid() IS NOT NULL
      AND public.has_role(auth.uid(), 'admin'::public.app_role)
    )
    WITH CHECK (
      auth.uid() IS NOT NULL
      AND public.has_role(auth.uid(), 'admin'::public.app_role)
    );
  END IF;
END $$;
