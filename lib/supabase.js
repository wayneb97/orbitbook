import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mfnygtlmqnxnagfswbip.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbnlndGxtcW54bmFnZnN3YmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODA2MTIsImV4cCI6MjA2ODg1NjYxMn0.SdLDveglV8NhtrwplsVZHN6FNCwl678I-2z3DeRjLKU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
