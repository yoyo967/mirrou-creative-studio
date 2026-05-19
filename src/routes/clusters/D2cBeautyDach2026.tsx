import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function D2cBeautyDach2026() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p>{t("d2c.p1")}</p>

      <h2>{t("d2c.h2a")}</h2>
      <p>{t("d2c.p2")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("d2c.p3") }} />

      <h2>{t("d2c.h2b")}</h2>
      <p>{t("d2c.p4")}</p>
      <ul>
        <li dangerouslySetInnerHTML={{ __html: t("d2c.comp1") }} />
        <li dangerouslySetInnerHTML={{ __html: t("d2c.comp2") }} />
        <li>
          <span dangerouslySetInnerHTML={{ __html: t("d2c.comp3Pre") }} />{" "}
          <Link to="/blog/eu-ai-act-fuer-marketers">{t("d2c.comp3Link")}</Link>{t("d2c.comp3After")}
        </li>
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t("d2c.p5") }} />

      <h2>{t("d2c.h2c")}</h2>
      <p>{t("d2c.p6")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("d2c.p7") }} />

      <h2>{t("d2c.h2d")}</h2>
      <p>{t("d2c.p8")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("d2c.p9") }} />

      <h2>{t("d2c.h2e")}</h2>
      <p>{t("d2c.p10")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("d2c.p11") }} />

      <h2>{t("d2c.h2f")}</h2>
      <p>
        <span dangerouslySetInnerHTML={{ __html: t("d2c.p12Pre") }} />{" "}
        <Link to="/beauty-ecommerce-marketing">{t("d2c.p12Link")}</Link>{t("d2c.p12After")}
      </p>
    </>
  );
}
