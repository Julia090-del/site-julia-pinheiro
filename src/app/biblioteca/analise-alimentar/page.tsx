'use client';

import { useEffect, useRef, useState } from 'react';
import { analyzeMealAction, recalculateItemAction, getUsageStatusAction } from './actions';
import type { UsageStatus } from './actions';
import type { AnalysisResult, AnalyzedItem, ManualItemInput, ConfidenceLevel } from '@/lib/analise/types';
import { Icon } from '@/lib/biblioteca/icons';

function ConfidenceBadge({ level, label }: { level: ConfidenceLevel; label: string }) {
  const colors: Record<ConfidenceLevel, string> = {
    alta: 'bg-green/10 text-green-deep',
    media: 'bg-taupe-soft text-ink-soft',
    baixa: 'bg-wine/10 text-wine',
  };
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${colors[level]}`}>
      {label}: {level === 'alta' ? 'alta' : level === 'media' ? 'média' : 'baixa'}
    </span>
  );
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export default function AnaliseAlimentarPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [showManual, setShowManual] = useState(false);
  const [manualItems, setManualItems] = useState<ManualItemInput[]>([]);
  const [manualName, setManualName] = useState('');
  const [manualGrams, setManualGrams] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editGrams, setEditGrams] = useState('');
  const [editSaving, setEditSaving] = useState(false);

  const [addingItem, setAddingItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemGrams, setNewItemGrams] = useState('');

  const [usage, setUsage] = useState<UsageStatus | null>(null);

  async function refreshUsage() {
    try {
      setUsage(await getUsageStatusAction());
    } catch {
      // não crítico — a página funciona normalmente sem o contador
    }
  }

  useEffect(() => {
    refreshUsage();
  }, []);

  function handlePickPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function addManualItem() {
    const grams = parseFloat(manualGrams.replace(',', '.'));
    if (!manualName.trim() || !grams || grams <= 0) return;
    setManualItems((list) => [...list, { name: manualName.trim(), grams }]);
    setManualName('');
    setManualGrams('');
  }

  function removeManualItem(i: number) {
    setManualItems((list) => list.filter((_, idx) => idx !== i));
  }

  async function handleAnalyze() {
    setError(null);
    setResult(null);
    if (!photoFile && manualItems.length === 0) {
      setError('Envie uma foto da refeição ou informe pelo menos um alimento manualmente.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    if (photoFile) formData.set('photo', photoFile);
    formData.set('manualItems', JSON.stringify(manualItems));

    const res = await analyzeMealAction(formData);
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setResult(res.data);
    refreshUsage();
  }

  function recomputeTotals(items: AnalyzedItem[]) {
    return items.reduce(
      (acc, item) => ({
        kcal: acc.kcal + (item.kcal || 0),
        proteinG: acc.proteinG + (item.proteinG || 0),
        carbsG: acc.carbsG + (item.carbsG || 0),
        fatG: acc.fatG + (item.fatG || 0),
      }),
      { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 }
    );
  }

  function startEdit(item: AnalyzedItem) {
    setEditingId(item.id);
    setEditName(item.name);
    setEditGrams(String(item.estimatedGrams));
  }

  async function saveEdit() {
    if (!result || !editingId) return;
    const grams = parseFloat(editGrams.replace(',', '.'));
    if (!editName.trim() || !grams || grams <= 0) return;

    setEditSaving(true);
    const res = await recalculateItemAction({ name: editName.trim(), grams });
    setEditSaving(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    const newItems = result.items.map((it) => (it.id === editingId ? res.item : it));
    setResult({ ...result, items: newItems, totals: recomputeTotals(newItems) });
    setEditingId(null);
    refreshUsage();
  }

  function removeItem(id: string) {
    if (!result) return;
    const newItems = result.items.filter((it) => it.id !== id);
    setResult({ ...result, items: newItems, totals: recomputeTotals(newItems) });
  }

  async function addNewItem() {
    if (!result) return;
    const grams = parseFloat(newItemGrams.replace(',', '.'));
    if (!newItemName.trim() || !grams || grams <= 0) return;

    setEditSaving(true);
    const res = await recalculateItemAction({ name: newItemName.trim(), grams });
    setEditSaving(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    const newItems = [...result.items, res.item];
    setResult({ ...result, items: newItems, totals: recomputeTotals(newItems) });
    setNewItemName('');
    setNewItemGrams('');
    setAddingItem(false);
    refreshUsage();
  }

  function startOver() {
    setResult(null);
    setError(null);
    removePhoto();
    setManualItems([]);
    setShowManual(false);
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <p className="mb-1 font-serif text-sm italic text-wine">Área eStrat+</p>
      <h1 className="mb-2 font-serif text-3xl text-green">Análise de Refeição</h1>
      <p className="mb-4 max-w-[60ch] text-ink-soft">
        Envie uma foto da sua refeição e tenha uma estimativa de calorias e macronutrientes. Uma ferramenta
        educativa para te ajudar a visualizar porções — não substitui a avaliação da Júlia.
      </p>

      {usage && !usage.isAdmin && (
        <div className="mb-6 flex flex-wrap gap-2 text-xs text-ink-soft">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5">
            <Icon name="camera" size={13} className="text-green-soft" />
            {Math.max(0, usage.analysisPhoto.limit - usage.analysisPhoto.used)} de {usage.analysisPhoto.limit}{' '}
            análises por foto restantes essa semana
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5">
            <Icon name="scale" size={13} className="text-green-soft" />
            {Math.max(0, usage.analysisManual.limit - usage.analysisManual.used)} de{' '}
            {usage.analysisManual.limit} por gramas informadas restantes essa semana
          </span>
        </div>
      )}

      {!result && (
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="mb-3 flex items-center gap-2 font-serif text-lg text-green">
              <Icon name="camera" size={19} className="text-wine" />
              Analisar uma foto
            </h2>

            {!photoPreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="focus-ring flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-green/30 bg-cream/60 py-10 text-sm font-semibold text-green-deep transition hover:bg-cream"
              >
                <Icon name="camera" size={26} />
                Enviar ou tirar uma foto
              </button>
            ) : (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoPreview}
                  alt="Prévia da refeição"
                  className="aspect-video w-full rounded-xl object-cover"
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className="focus-ring absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white"
                >
                  Remover
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handlePickPhoto}
              className="hidden"
            />
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5">
            <button
              type="button"
              onClick={() => setShowManual((v) => !v)}
              className="focus-ring flex w-full items-center justify-between font-serif text-lg text-green"
            >
              <span className="inline-flex items-center gap-2">
                <Icon name="scale" size={19} className="text-wine" />
                Você sabe a quantidade em gramas?
              </span>
              <span className="text-sm text-ink-soft">{showManual ? '−' : '+'}</span>
            </button>

            {showManual && (
              <div className="mt-4 flex flex-col gap-3">
                <p className="text-sm text-ink-soft">
                  Se você já sabe o peso de algum alimento, informe aqui — a análise vai usar esse valor em vez
                  de estimar pela foto.
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="Alimento (ex: Arroz)"
                    className="focus-ring flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={manualGrams}
                    onChange={(e) => setManualGrams(e.target.value)}
                    placeholder="Gramas"
                    className="focus-ring w-24 rounded-lg border border-black/15 px-3 py-2 text-sm"
                  />
                  <button
                    type="button"
                    onClick={addManualItem}
                    className="focus-ring rounded-lg bg-green px-4 py-2 text-sm font-semibold text-cream"
                  >
                    +
                  </button>
                </div>
                {manualItems.length > 0 && (
                  <ul className="flex flex-col gap-1.5">
                    {manualItems.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between rounded-lg bg-cream/60 px-3 py-2 text-sm"
                      >
                        <span>
                          {item.name} — {item.grams} g
                        </span>
                        <button
                          type="button"
                          onClick={() => removeManualItem(i)}
                          className="focus-ring text-xs font-semibold text-wine"
                        >
                          remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {error && <p className="text-sm text-wine">{error}</p>}

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="focus-ring rounded-full bg-green px-6 py-3.5 text-sm font-bold text-cream transition hover:bg-green-deep disabled:opacity-60"
          >
            {loading ? 'Analisando...' : 'Analisar refeição'}
          </button>
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            {result.items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-black/10 bg-white p-5">
                {editingId === item.id ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="focus-ring flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        inputMode="decimal"
                        value={editGrams}
                        onChange={(e) => setEditGrams(e.target.value)}
                        className="focus-ring w-24 rounded-lg border border-black/15 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={saveEdit}
                        disabled={editSaving}
                        className="focus-ring rounded-lg bg-green px-4 py-2 text-xs font-bold text-cream disabled:opacity-60"
                      >
                        {editSaving ? 'Calculando...' : 'Salvar'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="focus-ring rounded-lg border border-black/15 px-4 py-2 text-xs font-semibold text-ink-soft"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-2 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg text-ink">
                          {item.name}
                          {item.state && <span className="text-ink-soft"> ({item.state})</span>}
                        </h3>
                        <p className="text-xs text-ink-soft/70">
                          {item.estimatedGrams} g · {item.gramsSource === 'foto' ? 'estimado pela foto' : 'informado por você'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="focus-ring text-xs font-semibold text-green-deep"
                        >
                          corrigir
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="focus-ring text-xs font-semibold text-wine"
                        >
                          remover
                        </button>
                      </div>
                    </div>

                    <div className="mb-3 grid grid-cols-4 gap-2 rounded-xl border border-black/10 bg-cream/60 py-2.5 text-center">
                      <div>
                        <div className="font-serif text-base text-green">{Math.round(item.kcal)}</div>
                        <div className="text-[9.5px] uppercase tracking-wide text-ink-soft/70">kcal</div>
                      </div>
                      <div>
                        <div className="font-serif text-base text-green">{round1(item.proteinG)}g</div>
                        <div className="text-[9.5px] uppercase tracking-wide text-ink-soft/70">proteína</div>
                      </div>
                      <div>
                        <div className="font-serif text-base text-green">{round1(item.carbsG)}g</div>
                        <div className="text-[9.5px] uppercase tracking-wide text-ink-soft/70">carbo</div>
                      </div>
                      <div>
                        <div className="font-serif text-base text-green">{round1(item.fatG)}g</div>
                        <div className="text-[9.5px] uppercase tracking-wide text-ink-soft/70">gordura</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <ConfidenceBadge level={item.confidenceIdentification} label="identificação" />
                      <ConfidenceBadge level={item.confidenceWeight} label="peso" />
                    </div>
                    {item.notes && <p className="mt-2 text-xs text-ink-soft">{item.notes}</p>}
                  </>
                )}
              </div>
            ))}

            {addingItem ? (
              <div className="rounded-2xl border border-dashed border-black/15 bg-white p-5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="Alimento"
                    className="focus-ring flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    value={newItemGrams}
                    onChange={(e) => setNewItemGrams(e.target.value)}
                    placeholder="Gramas"
                    className="focus-ring w-24 rounded-lg border border-black/15 px-3 py-2 text-sm"
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={addNewItem}
                    disabled={editSaving}
                    className="focus-ring rounded-lg bg-green px-4 py-2 text-xs font-bold text-cream disabled:opacity-60"
                  >
                    {editSaving ? 'Calculando...' : 'Adicionar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddingItem(false)}
                    className="focus-ring rounded-lg border border-black/15 px-4 py-2 text-xs font-semibold text-ink-soft"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setAddingItem(true)}
                className="focus-ring rounded-2xl border border-dashed border-black/15 py-3 text-sm font-semibold text-ink-soft hover:border-green/40 hover:text-green"
              >
                + Adicionar alimento que não foi identificado
              </button>
            )}
          </div>

          {error && <p className="text-sm text-wine">{error}</p>}

          <div className="rounded-2xl bg-green px-5 py-5 text-cream">
            <h3 className="mb-3 font-serif text-lg">Total da refeição</h3>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="font-serif text-xl">{Math.round(result.totals.kcal)}</div>
                <div className="text-[10px] uppercase tracking-wide opacity-75">kcal</div>
              </div>
              <div>
                <div className="font-serif text-xl">{round1(result.totals.proteinG)}g</div>
                <div className="text-[10px] uppercase tracking-wide opacity-75">proteína</div>
              </div>
              <div>
                <div className="font-serif text-xl">{round1(result.totals.carbsG)}g</div>
                <div className="text-[10px] uppercase tracking-wide opacity-75">carbo</div>
              </div>
              <div>
                <div className="font-serif text-xl">{round1(result.totals.fatG)}g</div>
                <div className="text-[10px] uppercase tracking-wide opacity-75">gordura</div>
              </div>
            </div>
          </div>

          {result.uncertainNotes.length > 0 && (
            <div className="flex gap-3 rounded-xl border border-wine/15 bg-wine/5 px-5 py-4 text-sm text-wine-deep">
              <Icon name="alertCircle" size={18} className="mt-0.5 flex-shrink-0 text-wine" />
              <div>
                <strong>Pontos de atenção:</strong>
                <ul className="mt-1 list-disc pl-4">
                  {result.uncertainNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-3 rounded-xl border border-green/15 bg-green/5 px-5 py-4 text-sm text-green-deep">
            <Icon name="info" size={18} className="mt-0.5 flex-shrink-0 text-green-soft" />
            <div>{result.disclaimer}</div>
          </div>

          <button
            type="button"
            onClick={startOver}
            className="focus-ring self-start rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold text-ink-soft hover:border-green/40 hover:text-green"
          >
            Analisar outra refeição
          </button>
        </div>
      )}
    </main>
  );
}
