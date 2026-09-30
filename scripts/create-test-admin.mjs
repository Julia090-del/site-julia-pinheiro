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

const email = 'teste.verificacao@local.test';
const password = 'TesteLocal_2026!';

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Conta de Teste' },
  });
  if (error && !error.message.includes('already been registered')) {
    throw error;
  }

  const userId = data?.user?.id ?? (await supabase.auth.admin.listUsers()).data.users.find((u) => u.email === email)?.id;
  if (!userId) throw new Error('could not resolve test user id');

  const { error: updErr } = await supabase.from('profiles').update({ role: 'admin' }).eq('id', userId);
  if (updErr) throw updErr;

  console.log('Test admin ready.');
  console.log('email:', email);
  console.log('password:', password);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
