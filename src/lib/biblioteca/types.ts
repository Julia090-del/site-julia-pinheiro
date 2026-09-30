export type IconItem = { icon?: string; title: string; text: string };

export type MethodStep = { num?: string; title: string; text: string };

export type ObjectiveRow = { label: string; text: string };

export type ComparisonRow = { name: string; brand?: string; icon?: string; cells: string[] };

export type ComparisonTable = {
  title: string;
  icon?: string;
  rowIcon?: string;
  intro?: string;
  columns: string[];
  rows: ComparisonRow[];
  pickIndex?: number;
  sourceNote?: string;
  tip?: { label: string; text: string };
};

export type NoteSection = {
  title: string;
  icon?: string;
  deck?: string;
  layout?: 'method';
  items: IconItem[];
};

export type LabelBlock = { title: string; text: string };

export type GuideContent = {
  intro?: string;
  concepts?: IconItem[];
  methodTitle?: string;
  methodDeck?: string;
  method?: MethodStep[];
  labelBlocks?: LabelBlock[];
  objectivesTitle?: string;
  objectives?: ObjectiveRow[];
  comparisonTables?: ComparisonTable[];
  noteSections?: NoteSection[];
  disclaimer?: string;
};

export type GuideRow = {
  slug: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  category_slug: string;
  is_new: boolean;
  is_featured: boolean;
  read_minutes: number | null;
  updated_at: string | null;
  content: GuideContent;
};

export type CategoryRow = {
  slug: string;
  name: string;
  icon: string | null;
  description: string | null;
};
