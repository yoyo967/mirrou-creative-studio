import { useTranslation } from "react-i18next";
import { changeLanguage } from "../i18n";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation("nav");
  const current = i18n.language === "en" ? "en" : "de";

  return (
    <div className={`flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] ${className}`}>
      <button
        onClick={() => changeLanguage("de")}
        className={`px-1.5 py-0.5 transition-colors ${
          current === "de" ? "text-accent" : "text-muted hover:text-ink"
        }`}
        aria-label="Deutsch"
        aria-pressed={current === "de"}
      >
        {t("langDe")}
      </button>
      <span className="text-muted/40">|</span>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-1.5 py-0.5 transition-colors ${
          current === "en" ? "text-accent" : "text-muted hover:text-ink"
        }`}
        aria-label="English"
        aria-pressed={current === "en"}
      >
        {t("langEn")}
      </button>
    </div>
  );
}
