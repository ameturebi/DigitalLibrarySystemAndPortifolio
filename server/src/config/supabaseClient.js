const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// We use the SERVICE_ROLE_KEY here so our secure backend API can bypass RLS 
// (Row Level Security) and safely insert data while managing permissions itself.
// We disable session persistence so that auth middleware checks don't contaminate this client.
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

module.exports = supabase;
