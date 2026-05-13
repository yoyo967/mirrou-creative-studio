import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de";
import en from "./locales/en";

i18n.use(initReactI18next).init({
  resources: { de, en },
  lng: "de",           // SSG default — client restores preference below
  fallbackLng: "de",
  defaultNS: "common",
  ns: ["common", "nav", "footer", "home", "studio", "cases", "press", "contact", "packages", "blog", "legal", "seo"],
  interpolation: { escapeValue: false },
});

// Restore user's saved language preference on the client
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("mirrou_lang");
  if (saved && (saved === "de" || saved === "en") && saved !== i18n.language) {
    i18n.changeLanguage(saved);
  }
}

export const changeLanguage = (lang: "de" | "en") => {
  i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("mirrou_lang", lang);
};

export default i18n;
