import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { LOCALES, Locale } from "../routes/LocaleWrapper";

const LANGUAGES = [
  { code: "de", label: "DE", title: "Deutsch" },
  { code: "en", label: "EN", title: "English" },
  { code: "es", label: "ES", title: "Español" },
  { code: "it", label: "IT", title: "Italiano" },
  { code: "fr", label: "FR", title: "Français" },
  { code: "tr", label: "TR", title: "Türkçe" },
  { code: "ru", label: "RU", title: "Русский" },
  { code: "uk", label: "UK", title: "Українська" },
] as const;

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = (i18n.language || "de") as Locale;

  const handleLanguageSwitch = (targetLocale: string) => {
    const parts = pathname.split("/");
    // parts[0] is empty (string starts with /)
    // parts[1] is the current locale
    if (parts.length > 1 && LOCALES.includes(parts[1] as any)) {
      parts[1] = targetLocale;
      navigate(parts.join("/"));
    } else {
      navigate(`/${targetLocale}`);
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 font-mono text-[9px] uppercase tracking-[0.25em] ${className}`}>
      {LANGUAGES.map((lang, index) => (
        <span key={lang.code} className="flex items-center gap-1.5">
          <button
            onClick={() => handleLanguageSwitch(lang.code)}
            className={`px-1.5 py-0.5 transition-colors duration-300 relative group cursor-pointer ${
              current === lang.code ? "text-accent font-semibold" : "text-muted hover:text-ink"
            }`}
            title={lang.title}
            aria-label={lang.title}
            aria-pressed={current === lang.code}
          >
            {lang.label}
            {current === lang.code && (
              <span className="absolute bottom-0 left-1.5 right-1.5 h-[1px] bg-accent" />
            )}
          </button>
          {index < LANGUAGES.length - 1 && (
            <span className="text-muted/20 select-none">|</span>
          )}
        </span>
      ))}
    </div>
  );
}

