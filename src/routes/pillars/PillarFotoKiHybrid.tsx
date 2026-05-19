import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PillarFotoKiHybrid() {
  const { t } = useTranslation("pillars");

  return (
    <>
      <h2>{t("fkh.h1")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("fkh.p1") }} />
      <p dangerouslySetInnerHTML={{ __html: t("fkh.p2") }} />
      <p>{t("fkh.p3")}</p>

      <h2>{t("fkh.h2")}</h2>

      <h3>{t("fkh.h3a")}</h3>
      <p>{t("fkh.p4")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fkh.p5") }} />

      <h3>{t("fkh.h3b")}</h3>
      <p>
        {t("fkh.p6Before")}{" "}
        <Link to="/beauty-ecommerce-marketing">{t("fkh.p6Link")}</Link>
        {t("fkh.p6After")}
      </p>
      <p dangerouslySetInnerHTML={{ __html: t("fkh.p7") }} />

      <h3>{t("fkh.h3c")}</h3>
      <p>{t("fkh.p8")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("fkh.p9") }} />

      <h2>{t("fkh.h4")}</h2>
      <p>{t("fkh.p10")}</p>

      <h3>{t("fkh.h5a")}</h3>
      <ul>
        {(["comp1", "comp2", "comp3", "comp4"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`fkh.${k}`) }} />
        ))}
      </ul>
      <p>{t("fkh.p11")}</p>

      <h3>{t("fkh.h5b")}</h3>
      <p>{t("fkh.p12")}</p>

      <h2>{t("fkh.h6")}</h2>
      <p><strong>{t("fkh.toolsYes")}</strong></p>
      <ul>
        {(["tool1", "tool2", "tool3", "tool4"] as const).map((k) => (
          <li key={k}>{t(`fkh.${k}`)}</li>
        ))}
      </ul>
      <p><strong>{t("fkh.toolsNo")}</strong></p>
      <ul>
        {(["noTool1", "noTool2", "noTool3"] as const).map((k) => (
          <li key={k}>{t(`fkh.${k}`)}</li>
        ))}
      </ul>
      <p>{t("fkh.p13")}</p>

      <h2>{t("fkh.h7")}</h2>
      <p>{t("fkh.p14")}</p>
      <ol>
        {(["when1", "when2"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`fkh.${k}`) }} />
        ))}
      </ol>
      <p>{t("fkh.p15")}</p>

      <h2>{t("fkh.h8")}</h2>
      <p>{t("fkh.p16")}</p>
      <ol>
        <li>{t("fkh.next1")}</li>
        <li dangerouslySetInnerHTML={{ __html: t("fkh.next2") }} />
        <li>{t("fkh.next3")}</li>
      </ol>
      <p>
        {t("fkh.p17Before")}{" "}
        <Link to="/kontakt">{t("fkh.p17Link")}</Link>
      </p>
    </>
  );
}
