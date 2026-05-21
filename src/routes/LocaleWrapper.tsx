import { useParams, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import i18n from "../i18n";

export const LOCALES = ["de", "en", "es", "it", "fr", "tr", "ru", "uk"] as const;
export type Locale = (typeof LOCALES)[number];

export default function LocaleWrapper() {
  const { locale } = useParams<{ locale: string }>();

  // If locale is invalid or missing, redirect to 'de'
  if (!locale || !LOCALES.includes(locale as any)) {
    return <Navigate to="/de" replace />;
  }

  // Update i18n language synchronously during rendering for SSG accuracy
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
    if (typeof window !== "undefined") {
      localStorage.setItem("mirrou_lang", locale);
    }
  }

  useEffect(() => {
    // Dynamic html tags updates
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr"; // All 8 locales are LTR
  }, [locale]);

  return <Outlet />;
}
