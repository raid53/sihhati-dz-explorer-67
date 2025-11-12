import { supabase } from '@/integrations/supabase/client';
import { defaultDoctors } from '@/data/doctors';
import { defaultClinics } from '@/data/clinics';
import { WILAYAS } from '@/data/wilayas';
import carelinkLogo from '@/assets/carelink-logo.png';

export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');

    // Check if tables exist by trying to query them
    const { error: settingsError } = await supabase
      .from('admin_settings')
      .select('id')
      .limit(1);

    if (settingsError) {
      console.error('Tables may not exist. Please create them in Cloud → Database → SQL Editor');
      throw new Error('Database tables not created. Please run the SQL script in Cloud → Database → SQL Editor');
    }

    // Initialize admin settings if they don't exist
    const { data: siteStatus } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('setting_key', 'site_active')
      .maybeSingle();

    if (!siteStatus) {
      console.log('Initializing site status...');
      await supabase.from('admin_settings').insert({
        setting_key: 'site_active',
        setting_value: true
      });
    }

    const { data: wilayasStatus } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('setting_key', 'wilayas_status')
      .maybeSingle();

    if (!wilayasStatus) {
      console.log('Initializing wilayas...');
      await supabase.from('admin_settings').insert({
        setting_key: 'wilayas_status',
        setting_value: WILAYAS
      });
    }

    const { data: splashSettings } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('setting_key', 'splash_screen')
      .maybeSingle();

    if (!splashSettings) {
      console.log('Initializing splash screen...');
      await supabase.from('admin_settings').insert({
        setting_key: 'splash_screen',
        setting_value: { logoUrl: carelinkLogo }
      });
    }

    // Initialize doctors if they don't exist
    const { data: existingDoctors } = await supabase
      .from('doctors')
      .select('id')
      .limit(1);

    if (!existingDoctors || existingDoctors.length === 0) {
      console.log('Initializing doctors...');
      await supabase.from('doctors').insert(defaultDoctors);
    }

    // Initialize clinics if they don't exist
    const { data: existingClinics } = await supabase
      .from('clinics')
      .select('id')
      .limit(1);

    if (!existingClinics || existingClinics.length === 0) {
      console.log('Initializing clinics...');
      await supabase.from('clinics').insert(defaultClinics);
    }

    console.log('Database initialization completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
};
