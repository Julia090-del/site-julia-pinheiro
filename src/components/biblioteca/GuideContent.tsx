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

function InfoBlock({ icon, title, text }: IconItem) {
  return (
    <div className="flex gap-4 rounded-2xl border border-black/10 bg-white p-5">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green/5 text-green">
        <Icon name={icon || 'checkCircle'} size={21} />
      </div>
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
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-green/5 text-green">
                <Icon name={c.icon || 'checkCircle'} size={18} />
              </div>
              <h4 className="mb-1.5 font-serif text-lg text-green">{c.title}</h4>
              <p className="text-sm text-ink-soft">{c.text}</p>
            </div>
          ))}
        </div>
      )}

      {content.labelBlocks && content.labelBlocks.length > 0 && (
        <div>
          <SectionTitle icon="eye">O que observar no rótulo?</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {content.labelBlocks.map((b, i) => (
              <InfoBlock key={i} icon="checkCircle" title={b.title} text={b.text} />
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
                  {table.rowIcon && <th className="w-11" />}
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
                    {table.rowIcon && (
                      <td className="border-b border-black/10 px-2 py-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green/5 text-green">
                          <Icon name={row.icon || table.rowIcon} size={16} />
                        </span>
                      </td>
                    )}
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {group.items.map((b, i) => (
                <InfoBlock key={i} icon={b.icon || 'checkCircle'} title={b.title} text={b.text} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
