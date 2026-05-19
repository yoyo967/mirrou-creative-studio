import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreativeHypothesenFormulieren() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p>{t("hypo.p1")}</p>

      <h2>{t("hypo.h2a")}</h2>

      <h3>{t("hypo.h3a")}</h3>
      <p dangerouslySetInnerHTML={{ __html: t("hypo.p2") }} />

      <h3>{t("hypo.h3b")}</h3>
      <p>{t("hypo.p3")}</p>

      <h3>{t("hypo.h3c")}</h3>
      <p>{t("hypo.p4")}</p>

      <h2>{t("hypo.h2b")}</h2>
      <p>{t("hypo.p5")}</p>
      <blockquote dangerouslySetInnerHTML={{ __html: t("hypo.bq1") }} />

      <h2>{t("hypo.h2c")}</h2>

      <h3>{t("hypo.h3d")}</h3>
      <blockquote>{t("hypo.bq2")}</blockquote>

      <h3>{t("hypo.h3e")}</h3>
      <blockquote>{t("hypo.bq3")}</blockquote>

      <h3>{t("hypo.h3f")}</h3>
      <blockquote>{t("hypo.bq4")}</blockquote>

      <h2>{t("hypo.h2d")}</h2>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("hypo.bad1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("hypo.bad2") }} />
        <li dangerouslySetInnerHTML={{ __html: t("hypo.bad3") }} />
        <li dangerouslySetInnerHTML={{ __html: t("hypo.bad4") }} />
      </ul>

      <h2>{t("hypo.h2e")}</h2>
      <p>{t("hypo.p6")}</p>
      <p>
        {t("hypo.p7Pre")}{" "}
        <Link to="/blog/learning-log-aufbauen">{t("hypo.p7Link")}</Link>{t("hypo.p7After")}
      </p>
    </>
  );
}
