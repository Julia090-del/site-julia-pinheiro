import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Server-only client with the secret key: bypasses Row Level Security.
// Never import this from a Client Component or expose SUPABASE_SECRET_KEY to the browser.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
