export type ConfidenceLevel = 'alta' | 'media' | 'baixa';

export type ManualItemInput = { name: string; grams: number };

export type AnalyzedItem = {
  id: string;
  name: string;
  state?: string;
  estimatedGrams: number;
  gramsSource: 'foto' | 'informado';
  confidenceIdentification: ConfidenceLevel;
  confidenceWeight: ConfidenceLevel;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  notes?: string;
};

export type AnalysisTotals = {
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type AnalysisResult = {
  items: AnalyzedItem[];
  totals: AnalysisTotals;
  uncertainNotes: string[];
  disclaimer: string;
};
