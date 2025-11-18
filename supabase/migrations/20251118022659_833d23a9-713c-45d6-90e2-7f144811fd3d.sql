-- Fix site_active format (change from {active: boolean} to boolean)
UPDATE admin_settings 
SET setting_value = (setting_value->>'active')::boolean::text::jsonb
WHERE setting_key = 'site_active' 
AND setting_value ? 'active';

-- Fix wilayas_status format (if needed, create proper object structure)
-- This will be handled by the app when admin makes changes