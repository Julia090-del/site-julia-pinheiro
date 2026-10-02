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

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const baseUrl = process.argv[2] || 'http://localhost:3000';

async function main() {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'recovery',
    email: 'juliacunhapinheiro@gmail.com',
  });
  if (error) throw error;

  const tokenHash = data.properties.hashed_token;
  const confirmUrl = `${baseUrl}/auth/confirm?token_hash=${tokenHash}&type=recovery&next=/biblioteca/definir-senha`;
  console.log('confirm_url:', confirmUrl);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
