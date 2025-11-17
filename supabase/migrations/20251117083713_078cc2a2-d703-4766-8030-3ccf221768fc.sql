-- Confirm admin email automatically
UPDATE auth.users 
SET email_confirmed_at = now()
WHERE email = 'soad@admin.com' 
  AND email_confirmed_at IS NULL;