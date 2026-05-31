import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOCALES } from "./LocaleWrapper";

export default function RootRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect preferred language
    let lang = "de"; // default fallback

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mirrou_lang");
      if (saved && (LOCALES as readonly string[]).includes(saved)) {
        lang = saved;
      } else {
        const navigatorLang = navigator.language.split("-")[0];
        if ((LOCALES as readonly string[]).includes(navigatorLang)) {
          lang = navigatorLang;
        }
      }
    }

    navigate(`/${lang}`, { replace: true });
  }, [navigate]);

  return null;
}
