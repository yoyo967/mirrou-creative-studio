import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Globe, ChevronDown, Check } from "lucide-react";
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

export default function LanguageSwitcher({
  className = "",
  dropUp = false,
  inline = false,
}: {
  className?: string;
  dropUp?: boolean;
  inline?: boolean;
}) {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = (i18n.language || "de") as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  const handleLanguageSwitch = (targetLocale: string) => {
    const parts = pathname.split("/");
    if (parts.length > 1 && LOCALES.includes(parts[1] as any)) {
      parts[1] = targetLocale;
      navigate(parts.join("/"));
    } else {
      navigate(`/${targetLocale}`);
    }
    setOpen(false);
  };

  // Close on click outside
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* ── Language option list (shared between inline & dropdown) ── */
  const languageOptions = (
    <>
      {LANGUAGES.map((lang) => {
        const isActive = current === lang.code;
        return (
          <button
            key={lang.code}
            id={`lang-${lang.code}`}
            role="option"
            aria-selected={isActive}
            onClick={() => handleLanguageSwitch(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-200 cursor-pointer ${
              isActive
                ? "bg-accent/8 text-accent"
                : "text-ink/75 hover:bg-white/4 hover:text-ink"
            }`}
          >
            <span className="w-4 flex justify-center">
              {isActive && <Check className="w-3.5 h-3.5 text-accent" />}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] w-6">
              {lang.label}
            </span>
            <span className="text-[12px] text-muted font-light">
              {lang.title}
            </span>
          </button>
        );
      })}
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </>
  );

  return (
    <div ref={ref} className={`${inline ? "" : "relative"} ${className}`}>
      {/* ── Trigger ──────────────────────────────────────── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-accent/40 transition-colors duration-300 cursor-pointer group"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Sprache: ${currentLang.title}`}
      >
        <Globe className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink">
          {currentLang.label}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── Options ──────────────────────────────────────── */}
      <AnimatePresence>
        {open &&
          (inline ? (
            /* Inline mode: expands in document flow (mobile nav) */
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-white/10 mt-2 bg-surface"
              role="listbox"
              aria-activedescendant={`lang-${current}`}
            >
              {languageOptions}
            </motion.div>
          ) : (
            /* Dropdown mode: absolutely positioned (desktop nav) */
            <motion.div
              initial={{ opacity: 0, y: dropUp ? 6 : -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: dropUp ? 6 : -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute min-w-[180px] bg-surface border border-white/10 shadow-2xl shadow-black/40 z-[60] overflow-hidden ${
                dropUp ? "left-0 bottom-full mb-2" : "right-0 top-full mt-2"
              }`}
              role="listbox"
              aria-activedescendant={`lang-${current}`}
            >
              {languageOptions}
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}
