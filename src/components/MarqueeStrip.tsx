import { useTranslation } from "react-i18next";

export default function MarqueeStrip({ className = "" }: { className?: string }) {
  const { t } = useTranslation("home");
  const items = t("marquee.items", { returnObjects: true }) as unknown as string[];
  const allItems = [...items, ...items];

  return (
    <div className={`overflow-hidden border-t border-white/6 py-3 ${className}`}>
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40 whitespace-nowrap">
              {item}
            </span>
            <span className="text-accent/40 text-[8px]">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
