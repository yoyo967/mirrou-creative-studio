import { useParams, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import i18n, { loadLocale, type Locale } from "../i18n";

export const LOCALES = ["de", "en", "es", "it", "fr", "tr", "ru", "uk"] as const;
export type { Locale };

export default function LocaleWrapper() {
  const { locale } = useParams<{ locale: string }>();
  const isValid = !!locale && LOCALES.includes(locale as Locale);

  // Synchronous switch when resources are already loaded (SSG + initial hydration)
  if (isValid && i18n.language !== locale && i18n.hasResourceBundle(locale!, "common")) {
    i18n.changeLanguage(locale!);
  }

  // Hooks must run in the same order on every render — keep this above any early
  // return and guard inside, otherwise the hook order changes between renders.
  useEffect(() => {
    if (!locale || !LOCALES.includes(locale as Locale)) return;
    // Async load for client-side navigation to a new locale
    loadLocale(locale as Locale).then(() => {
      if (i18n.language !== locale) i18n.changeLanguage(locale);
    });
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
  }, [locale]);

  if (!isValid) {
    return <Navigate to="/de" replace />;
  }

  return <Outlet />;
}
