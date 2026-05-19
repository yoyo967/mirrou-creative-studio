import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LearningLogAufbauen() {
  const { t } = useTranslation("clusters");
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: t("learning.p1") }} />

      <h2>{t("learning.h2a")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("learning.p2") }} />

      <h2>{t("learning.h2b")}</h2>
      <ol>
        <li dangerouslySetInnerHTML={{ __html: t("learning.field1") }} />
        <li>
          <span dangerouslySetInnerHTML={{ __html: t("learning.field2Pre") }} />{" "}
          <Link to="/blog/creative-hypothesen-formulieren">{t("learning.field2Link")}</Link>{t("learning.field2After")}
        </li>
        <li dangerouslySetInnerHTML={{ __html: t("learning.field3") }} />
        <li dangerouslySetInnerHTML={{ __html: t("learning.field4") }} />
        <li dangerouslySetInnerHTML={{ __html: t("learning.field5") }} />
        <li dangerouslySetInnerHTML={{ __html: t("learning.field6") }} />
        <li dangerouslySetInnerHTML={{ __html: t("learning.field7") }} />
      </ol>

      <h2>{t("learning.h2c")}</h2>
      <blockquote dangerouslySetInnerHTML={{ __html: t("learning.bq1") }} />

      <h2>{t("learning.h2d")}</h2>
      <p>{t("learning.p3")}</p>
      <p>{t("learning.p4")}</p>

      <h2>{t("learning.h2e")}</h2>
      <p>{t("learning.p5")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("learning.p6") }} />
      <p>{t("learning.p7")}</p>
    </>
  );
}
