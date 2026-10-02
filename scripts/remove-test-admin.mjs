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

async function main() {
  const { data } = await supabase.auth.admin.listUsers();
  const user = data.users.find((u) => u.email === email);
  if (!user) {
    console.log('test admin already gone');
    return;
  }
  const { error } = await supabase.auth.admin.deleteUser(user.id);
  if (error) throw error;
  console.log('removed test admin', email);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
