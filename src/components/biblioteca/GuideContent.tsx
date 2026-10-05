import { Icon } from '@/lib/biblioteca/icons';
import type { GuideContent as GuideContentType, IconItem, MethodStep } from '@/lib/biblioteca/types';

function SectionTitle({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <Icon name={icon || 'sparkles'} size={22} className="text-wine" />
      <h2 className="font-serif text-xl text-green">{children}</h2>
    </div>
  );
}

function InfoRow({ icon, title, text }: IconItem) {
  return (
    <div className="flex gap-4 py-4">
      <Icon name={icon || 'checkCircle'} size={19} className="mt-0.5 flex-shrink-0 text-wine" />
      <div>
        <h4 className="mb-1 font-sans font-semibold text-ink">{title}</h4>
        <p className="text-sm text-ink-soft">{text}</p>
      </div>
    </div>
  );
}

function MethodSteps({ steps }: { steps: MethodStep[] }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-black/10 bg-white p-5">
      {steps.map((s, i) => (
        <div key={i} className="flex items-start gap-4">
          <span className="w-9 flex-shrink-0 font-serif text-xl leading-tight text-wine">
            {s.num || String(i + 1)}
          </span>
          <div>
            <h4 className="mb-1 font-sans font-semibold text-ink">{s.title}</h4>
            <p className="text-sm text-ink-soft">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GuideContent({ content }: { content: GuideContentType }) {
  return (
    <div className="flex flex-col gap-10">
      {content.method && content.method.length > 0 && (
        <div>
          <SectionTitle icon="sparkles">{content.methodTitle || 'Como usar'}</SectionTitle>
          {content.methodDeck && (
            <p className="mb-4 max-w-[60ch] text-ink-soft">{content.methodDeck}</p>
          )}
          <MethodSteps steps={content.method} />
        </div>
      )}

      {content.concepts && content.concepts.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {content.concepts.map((c, i) => (
            <div key={i} className="rounded-2xl border border-black/10 bg-white p-5">
              <Icon name={c.icon || 'checkCircle'} size={19} className="mb-2.5 text-wine" />
              <h4 className="mb-1.5 font-serif text-lg text-green">{c.title}</h4>
              <p className="text-sm text-ink-soft">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {content.labelBlocks && content.labelBlocks.length > 0 && (
        <div>
          <SectionTitle icon="eye">O que observar no rótulo?</SectionTitle>
          <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white px-5">
            {content.labelBlocks.map((b, i) => (
              <InfoRow key={i} icon="checkCircle" title={b.title} text={b.text} />
            ))}
          </div>
        </div>
      )}

      {content.objectives && content.objectives.length > 0 && (
        <div>
          <SectionTitle icon="compass">{content.objectivesTitle || 'Ajustando ao seu momento'}</SectionTitle>
          <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white px-5">
            {content.objectives.map((o, i) => (
              <div key={i} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-4">
                <span className="flex-shrink-0 font-serif text-base text-wine sm:w-[190px]">{o.label}</span>
                <p className="text-sm text-ink-soft">{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {content.comparisonTables?.map((table, ti) => (
        <div key={ti}>
          <SectionTitle icon={table.icon || 'layers'}>{table.title}</SectionTitle>
          {table.intro && <p className="mb-4 max-w-[65ch] text-ink-soft">{table.intro}</p>}
          <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-cream-soft">
                  <th />
                  {table.columns.map((c, i) => (
                    <th
                      key={i}
                      className="border-b border-black/10 px-4 py-3 text-left text-[10.5px] font-bold uppercase tracking-wide text-ink-soft/70"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, i) => (
                  <tr key={i} className={i === table.pickIndex ? 'bg-wine/5' : ''}>
                    <td className="border-b border-black/10 px-4 py-3 font-serif text-ink">
                      {row.name}
                      {row.brand && <div className="text-xs text-ink-soft/70">{row.brand}</div>}
                    </td>
                    {row.cells.map((c, ci) => (
                      <td key={ci} className="border-b border-black/10 px-4 py-3 align-top text-ink-soft">
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {table.sourceNote && (
              <div className="border-t border-dashed border-black/10 px-4 py-2.5 text-xs text-ink-soft/70">
                {table.sourceNote}
              </div>
            )}
          </div>
          {table.tip && (
            <div className="mt-4 rounded-xl bg-wine/10 px-4 py-3 text-sm text-ink">
              <strong className="text-wine">{table.tip.label} —</strong> {table.tip.text}
            </div>
          )}
        </div>
      ))}

      {content.noteSections?.map((group, gi) => (
        <div key={gi}>
          <SectionTitle icon={group.icon || 'sparkles'}>{group.title}</SectionTitle>
          {group.deck && <p className="mb-4 max-w-[60ch] text-ink-soft">{group.deck}</p>}
          {group.layout === 'method' ? (
            <MethodSteps steps={group.items} />
          ) : (
            <div className="flex flex-col divide-y divide-black/10 rounded-2xl border border-black/10 bg-white px-5">
              {group.items.map((b, i) => (
                <InfoRow key={i} icon={b.icon || 'checkCircle'} title={b.title} text={b.text} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
