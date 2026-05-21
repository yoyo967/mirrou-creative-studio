import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../i18n";
import { LOCALES } from "./LocaleWrapper";

export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect preferred language
    let lang = "de"; // default fallback

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mirrou_lang");
      if (saved && LOCALES.includes(saved as any)) {
        lang = saved;
      } else {
        const navigatorLang = navigator.language.split("-")[0];
        if (LOCALES.includes(navigatorLang as any)) {
          lang = navigatorLang;
        }
      }
    }

    navigate(`/${lang}`, { replace: true });
  }, [navigate]);

  return null;
}
