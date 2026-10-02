// Generates a one-time login link for a patient or admin account.
//
// Supabase's default "Reset Password" / "Invite" emails link to the old
// implicit-grant format (#access_token=...), which @supabase/ssr's browser
// client rejects (it's hardcoded to flowType: 'pkce'). Editing the email
// templates to point at /auth/confirm instead requires custom SMTP to be
// configured in Supabase. Until that's set up, generate the link here and
// send it to the person directly instead of relying on the automatic email.
//
// Usage: node scripts/generate-access-link.mjs someone@example.com

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const envPath = path.join(repoRoot, '.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const SITE_URL = 'https://site-julia-pinheiro-nu.vercel.app';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/generate-access-link.mjs someone@example.com');
  process.exit(1);
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data, error } = await supabase.auth.admin.generateLink({ type: 'recovery', email });
  if (error) throw error;

  const tokenHash = data.properties.hashed_token;
  const confirmUrl = `${SITE_URL}/auth/confirm?token_hash=${tokenHash}&type=recovery&next=/biblioteca/definir-senha`;
  console.log(confirmUrl);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
