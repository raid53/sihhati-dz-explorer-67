import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://rlmqxjbfmbqylsdjehfs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbXF4amJmbWJxeWxzZGplaGZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MDEyMDMsImV4cCI6MjA1MjI3NzIwM30.nHX6hPKlYV1dXYYh_zw_7tLyqfSxhC8y_nT18N-37jU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
