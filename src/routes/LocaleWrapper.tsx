import { useParams, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import i18n, { loadLocale, type Locale } from "../i18n";

export const LOCALES = ["de", "en", "es", "it", "fr", "tr", "ru", "uk"] as const;
export type { Locale };

export default function LocaleWrapper() {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !LOCALES.includes(locale as any)) {
    return <Navigate to="/de" replace />;
  }

  // Synchronous switch when resources are already loaded (SSG + initial hydration)
  if (i18n.language !== locale && i18n.hasResourceBundle(locale, "common")) {
    i18n.changeLanguage(locale);
  }

  useEffect(() => {
    // Async load for client-side navigation to a new locale
    loadLocale(locale as Locale).then(() => {
      if (i18n.language !== locale) i18n.changeLanguage(locale);
    });
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
  }, [locale]);

  return <Outlet />;
}
