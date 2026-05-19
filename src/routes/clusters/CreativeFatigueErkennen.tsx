import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CreativeFatigueErkennen() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p>{t("fatigue.p1")}</p>

      <h2>{t("fatigue.h2a")}</h2>
      <p>{t("fatigue.p2")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p3") }} />

      <h2>{t("fatigue.h2b")}</h2>
      <p>{t("fatigue.p4")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p5") }} />

      <h2>{t("fatigue.h2c")}</h2>
      <p>{t("fatigue.p6")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p7") }} />

      <h2>{t("fatigue.h2d")}</h2>
      <p>{t("fatigue.p8")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p9") }} />

      <h2>{t("fatigue.h2e")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p10") }} />
      <p>
        <span dangerouslySetInnerHTML={{ __html: t("fatigue.p11Pre") }} />{" "}
        <Link to="/creative-engine">{t("fatigue.p11Link")}</Link>{t("fatigue.p11After")}
      </p>

      <h2>{t("fatigue.h2f")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("fatigue.p12") }} />
      <p>{t("fatigue.p13")}</p>
    </>
  );
}
