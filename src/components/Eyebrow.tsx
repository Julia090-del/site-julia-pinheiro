import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "wine",
  className,
}: {
  children: React.ReactNode;
  tone?: "wine" | "green" | "cream";
  className?: string;
}) {
  const toneClass = {
    wine: "text-wine",
    green: "text-green",
    cream: "text-cream-soft",
  }[tone];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em]",
        toneClass,
        className
      )}
    >
      <span className="h-px w-6 bg-current" aria-hidden />
      {children}
    </span>
  );
}
