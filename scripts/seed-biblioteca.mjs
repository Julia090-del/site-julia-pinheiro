import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

// --- load .env.local manually (no dotenv dependency) ---
const envPath = path.join(repoRoot, '.env.local');
const envText = fs.readFileSync(envPath, 'utf8');
for (const line of envText.split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m) process.env[m[1]] = m[2].trim();
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SECRET_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local');
}

// --- load the prototype's data files as plain JS via vm ---
const protoDataDir =
  'C:\\Users\\julia\\AppData\\Roaming\\Claude\\scratch-workspaces\\af3bc7e5-c449-4279-982e-596b28257040\\58dbddee-4f50-43e9-83ff-88fbac100e51\\scratch-2026-09-02-c0eb8e\\biblioteca-nutricao\\data';

const categoriesSrc = fs.readFileSync(path.join(protoDataDir, 'categories.js'), 'utf8');
const guidesSrc = fs.readFileSync(path.join(protoDataDir, 'guides.js'), 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(categoriesSrc, sandbox, { filename: 'categories.js' });
vm.runInContext(guidesSrc, sandbox, { filename: 'guides.js' });

const CATEGORIES = sandbox.window.CATEGORIES;
const GUIDES = sandbox.window.GUIDES;

if (!Array.isArray(CATEGORIES) || !Array.isArray(GUIDES)) {
  throw new Error('Failed to extract CATEGORIES/GUIDES from prototype data files');
}

console.log(`Loaded ${CATEGORIES.length} categories and ${GUIDES.length} guides from the prototype.`);

function parseReadMinutes(readTime) {
  if (!readTime) return null;
  const m = String(readTime).match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  // 1. Categories
  const categoryRows = CATEGORIES.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    icon: c.icon || null,
    variant: c.variant ? String(c.variant) : null,
    sort_order: i,
  }));

  const { error: catErr } = await supabase.from('categories').upsert(categoryRows, { onConflict: 'slug' });
  if (catErr) throw new Error('categories upsert failed: ' + catErr.message);
  console.log(`Upserted ${categoryRows.length} categories.`);

  // 2. Guides
  const guideRows = GUIDES.map((g, i) => {
    const content = {
      intro: g.intro,
      concepts: g.concepts,
      methodTitle: g.methodTitle,
      methodDeck: g.methodDeck,
      method: g.method,
      labelBlocks: g.labelBlocks,
      objectivesTitle: g.objectivesTitle,
      objectives: g.objectives,
      comparisonTables: g.comparisonTables,
      noteSections: g.noteSections,
      disclaimer: g.disclaimer,
    };
    // strip undefined keys so the JSONB stays clean
    Object.keys(content).forEach((k) => content[k] === undefined && delete content[k]);

    return {
      slug: g.slug,
      category_slug: g.categorySlug,
      title: g.title,
      subtitle: g.subtitle || null,
      image: g.image || null,
      is_new: !!g.isNew,
      is_featured: !!g.isFeatured,
      read_minutes: parseReadMinutes(g.readTime),
      updated_at: g.updatedAt || null,
      content,
      sort_order: i,
    };
  });

  // Upsert in batches to keep payload sizes reasonable (images are base64).
  const BATCH = 5;
  for (let i = 0; i < guideRows.length; i += BATCH) {
    const batch = guideRows.slice(i, i + BATCH);
    const { error } = await supabase.from('guides').upsert(batch, { onConflict: 'slug' });
    if (error) throw new Error(`guides upsert failed at batch ${i}: ${error.message}`);
    console.log(`Upserted guides ${i + 1}-${i + batch.length} of ${guideRows.length}`);
  }

  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
