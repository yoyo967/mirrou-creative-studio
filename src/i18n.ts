import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de";
import en from "./locales/en";
import es from "./locales/es";
import it from "./locales/it";
import fr from "./locales/fr";
import tr from "./locales/tr";
import ru from "./locales/ru";
import uk from "./locales/uk";

const resources = { de, en, es, it, fr, tr, ru, uk };
const LOCALES = ["de", "en", "es", "it", "fr", "tr", "ru", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

i18n.use(initReactI18next).init({
  resources,
  lng: "de",           // SSG default — client restores preference below
  fallbackLng: {
    de: ["de"],
    default: ["en"],   // Non-German users fallback to en
  },
  defaultNS: "common",
  ns: ["common", "nav", "footer", "home", "studio", "cases", "press", "contact", "packages", "blog", "legal", "seo", "pillars", "clusters"],
  interpolation: { escapeValue: false },
});

// Restore user's saved language preference on the client
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("mirrou_lang");
  if (saved && LOCALES.includes(saved as any) && saved !== i18n.language) {
    i18n.changeLanguage(saved);
  }
}

export const changeLanguage = (lang: Locale) => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("mirrou_lang", lang);
};

export default i18n;

