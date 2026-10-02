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

// Use the publishable (anon) client here — resetPasswordForEmail is a public auth method.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const email = 'juliacunhapinheiro@gmail.com';
const redirectTo = 'https://site-julia-pinheiro-nu.vercel.app/biblioteca/definir-senha';

async function main() {
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) throw error;
  console.log('Password-set email sent to', email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
