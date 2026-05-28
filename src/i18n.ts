import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const LOCALES = ["de", "en", "es", "it", "fr", "tr", "ru", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

const loaders: Record<Locale, () => Promise<{ default: Record<string, any> }>> = {
  de: () => import("./locales/de"),
  en: () => import("./locales/en"),
  es: () => import("./locales/es"),
  fr: () => import("./locales/fr"),
  it: () => import("./locales/it"),
  tr: () => import("./locales/tr"),
  ru: () => import("./locales/ru"),
  uk: () => import("./locales/uk"),
};

i18n.use(initReactI18next).init({
  lng: "de",
  fallbackLng: {
    de: ["de"],
    default: ["en"],
  },
  defaultNS: "common",
  ns: ["common", "nav", "footer", "home", "studio", "cases", "press", "contact", "packages", "blog", "legal", "seo", "pillars", "clusters"],
  interpolation: { escapeValue: false },
});

function addResources(lang: string, mod: { default: Record<string, any> }) {
  for (const [ns, data] of Object.entries(mod.default)) {
    i18n.addResourceBundle(lang, ns, data, true, true);
  }
}

export async function loadLocale(lang: Locale): Promise<void> {
  if (i18n.hasResourceBundle(lang, "common")) return;
  const mod = await loaders[lang]();
  addResources(lang, mod);
}

function detectLocale(): Locale {
  if (typeof window !== "undefined") {
    const match = window.location.pathname.match(/^\/([a-z]{2})\b/);
    if (match && (LOCALES as readonly string[]).includes(match[1])) return match[1] as Locale;
  }
  return "de";
}

async function init() {
  if (typeof window === "undefined") {
    // SSG: load all locales so every route variant can render
    await Promise.all(LOCALES.map((l) => loadLocale(l)));
  } else {
    // Client: load only the URL locale immediately; defer fallback
    const locale = detectLocale();
    await loadLocale(locale);
    await i18n.changeLanguage(locale);
    // Load English fallback after interactive (non-blocking)
    if (locale !== "en") {
      requestIdleCallback(() => { loadLocale("en"); }, { timeout: 3000 });
    }
  }
}

export const i18nReady = init();

export const changeLanguage = async (lang: Locale) => {
  await loadLocale(lang);
  await i18n.changeLanguage(lang);
  if (typeof window !== "undefined") localStorage.setItem("mirrou_lang", lang);
};

export default i18n;
