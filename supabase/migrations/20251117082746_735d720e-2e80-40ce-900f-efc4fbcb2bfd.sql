-- Update the trigger to automatically assign admin role to specific email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert profile for all users
  INSERT INTO public.profiles (id, user_id, display_name)
  VALUES (gen_random_uuid(), new.id, new.raw_user_meta_data->>'display_name');
  
  -- Automatically assign admin role to the designated admin email
  IF new.email = 'soad@admin.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'admin');
  END IF;
  
  RETURN new;
END;
$$;