import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function HooksDieFunktionieren() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p1") }} />
      <p>{t("hooks.p2")}</p>

      <h2>{t("hooks.h2a")}</h2>

      <h3>{t("hooks.h3a")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p3") }} />

      <h3>{t("hooks.h3b")}</h3>
      <p>{t("hooks.p4")}</p>

      <h3>{t("hooks.h3c")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p5") }} />

      <h3>{t("hooks.h3d")}</h3>
      <p>{t("hooks.p6")}</p>

      <h3>{t("hooks.h3e")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p7") }} />

      <h3>{t("hooks.h3f")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p8") }} />

      <h3>{t("hooks.h3g")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hooks.p9") }} />

      <h2>{t("hooks.h2b")}</h2>

      <h3>{t("hooks.h3h")}</h3>
      <p>{t("hooks.p10")}</p>

      <h3>{t("hooks.h3i")}</h3>
      <p>{t("hooks.p11")}</p>

      <h3>{t("hooks.h3j")}</h3>
      <p>{t("hooks.p12")}</p>

      <h2>{t("hooks.h2c")}</h2>
      <p>
        <span dangerouslySetInnerHTML={{ __html: t("hooks.p13Pre") }} />{" "}
        <Link to="/creative-engine">{t("hooks.p13Link")}</Link>{t("hooks.p13After")}
      </p>
    </>
  );
}
