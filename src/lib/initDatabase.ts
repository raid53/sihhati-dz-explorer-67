import { supabase } from '@/integrations/supabase/client';
import { defaultDoctors } from '@/data/doctors';
import { defaultClinics } from '@/data/clinics';
import { WILAYAS } from '@/data/wilayas';
import carelinkLogo from '@/assets/carelink-logo.png';

export const initializeDatabase = async () => {
  try {
    console.log('Starting database initialization...');

    // Create admin account if it doesn't exist
    try {
      const adminEmail = 'soad@admin.com';
      const adminPassword = 'soadgh010203';
      
      // Check if admin exists
      const { data: existingAdmin } = await supabase
        .from('user_roles')
        .select('id')
        .eq('role', 'admin')
        .limit(1);

      if (!existingAdmin || existingAdmin.length === 0) {
        console.log('Creating admin account...');
        const { error: signUpError } = await supabase.auth.signUp({
          email: adminEmail,
          password: adminPassword,
          options: {
            emailRedirectTo: `${window.location.origin}/admin/dashboard`
          }
        });

        if (signUpError && !signUpError.message.includes('already registered')) {
          console.error('Admin account creation error:', signUpError);
        } else {
          console.log('Admin account created successfully!');
        }
      }
    } catch (adminError) {
      console.log('Admin account check/creation skipped:', adminError);
    }

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
        setting_value: { active: true }
      });
    }

    const { data: wilayasStatus } = await supabase
      .from('admin_settings')
      .select('*')
      .eq('setting_key', 'wilayas_status')
      .maybeSingle();

    if (!wilayasStatus) {
      console.log('Initializing wilayas...');
      const wilayasObject = WILAYAS.reduce((acc, wilaya) => {
        acc[wilaya.nameAr] = wilaya.enabled;
        return acc;
      }, {} as Record<string, boolean>);
      
      await supabase.from('admin_settings').insert({
        setting_key: 'wilayas_status',
        setting_value: { wilayas: wilayasObject }
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
        setting_value: { 
          enabled: true,
          duration: 3000,
          logoUrl: carelinkLogo 
        }
      });
    }

    // Initialize doctors if they don't exist
    const { data: existingDoctors } = await supabase
      .from('doctors')
      .select('id')
      .limit(1);

    if (!existingDoctors || existingDoctors.length === 0) {
      console.log('Initializing doctors...');
      const doctorsToInsert = defaultDoctors.map(doctor => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        image: doctor.image,
        rating: doctor.rating,
        reviews: doctor.reviews,
        experience: doctor.experience,
        location: doctor.location,
        price: doctor.price,
        next_available: doctor.nextAvailable
      }));
      
      await supabase.from('doctors').insert(doctorsToInsert);
    }

    // Initialize clinics if they don't exist
    const { data: existingClinics } = await supabase
      .from('clinics')
      .select('id')
      .limit(1);

    if (!existingClinics || existingClinics.length === 0) {
      console.log('Initializing clinics...');
      const clinicsToInsert = defaultClinics.map(clinic => ({
        id: clinic.id,
        name: clinic.name,
        type: clinic.type,
        specialty: clinic.specialty,
        image: clinic.image,
        rating: clinic.rating,
        reviews: clinic.reviews,
        location: clinic.location,
        phone: clinic.phone || '',
        services: clinic.services || [],
        distance: clinic.distance,
        next_available: clinic.nextAvailable,
        price: clinic.price,
        verified: clinic.verified,
        doctors: clinic.doctors || [],
        address: clinic.address || '',
        hours: clinic.hours || '',
        description: clinic.description || ''
      }));
      
      await supabase.from('clinics').insert(clinicsToInsert);
    }

    console.log('Database initialization completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
};
