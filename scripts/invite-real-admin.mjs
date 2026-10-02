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

const email = 'juliacunhapinheiro@gmail.com';

async function main() {
  const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
    data: { full_name: 'Júlia Pinheiro' },
  });
  if (error) throw error;

  const userId = data.user.id;
  const { error: updErr } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId);
  if (updErr) throw updErr;

  console.log('Invite sent to', email);
  console.log('user id:', userId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
