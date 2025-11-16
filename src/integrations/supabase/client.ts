import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://xfrocholakwvxsuxbiga.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhmcm9jaG9sYWt3dnhzdXhiaWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMjAyMTMsImV4cCI6MjA3ODg5NjIxM30.Xe_2jrKn2FkAHz99PuzRi-E0YuqeQ3MehvO_k_w1pI0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
