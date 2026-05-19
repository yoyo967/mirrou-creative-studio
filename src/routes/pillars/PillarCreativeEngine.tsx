import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PillarCreativeEngine() {
  const { t } = useTranslation("pillars");

  return (
    <>
      <h2>{t("ce.h1")}</h2>
      <p>{t("ce.p1")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("ce.p2") }} />

      <h2>{t("ce.h2")}</h2>

      <h3>{t("ce.h3a")}</h3>
      <p>{t("ce.p3")}</p>
      <ul>
        {(["anal1", "anal2", "anal3"] as const).map((k) => (
          <li key={k}>{t(`ce.${k}`)}</li>
        ))}
      </ul>
      <p>{t("ce.p4")}</p>

      <h3>{t("ce.h3b")}</h3>
      <p>{t("ce.p5")}</p>
      <blockquote dangerouslySetInnerHTML={{ __html: t("ce.bq1") }} />
      <p>{t("ce.p6")}</p>
      <blockquote>{t("ce.bq2")}</blockquote>
      <p>{t("ce.p7")}</p>

      <h3>{t("ce.h3c")}</h3>
      <p>
        {t("ce.p8Before")}
        <Link to="/foto-ki-hybrid">{t("ce.p8Link")}</Link>
        {t("ce.p8After")}
      </p>
      <p>{t("ce.p9")}</p>

      <h3>{t("ce.h3d")}</h3>
      <p>{t("ce.p10")}</p>
      <ul>
        {(["test1", "test2", "test3", "test4"] as const).map((k) => (
          <li key={k}>{t(`ce.${k}`)}</li>
        ))}
      </ul>
      <p>{t("ce.p11")}</p>

      <h3>{t("ce.h3e")}</h3>
      <p>{t("ce.p12")}</p>
      <ul>
        {(["learn1", "learn2", "learn3", "learn4", "learn5"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`ce.${k}`) }} />
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t("ce.p13") }} />

      <h2>{t("ce.h4")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("ce.p14") }} />

      <h2>{t("ce.h5")}</h2>
      <p>{t("ce.p15")}</p>
      <ul>
        {(["loop1", "loop2", "loop3", "loop4", "loop5"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`ce.${k}`) }} />
        ))}
      </ul>
      <p>{t("ce.p16")}</p>

      <h2>{t("ce.h6")}</h2>
      <p>{t("ce.p17")}</p>
      <p>
        {t("ce.p18Before")}{" "}
        <Link to="/cases">{t("ce.p18Link")}</Link>
        {t("ce.p18After")}
      </p>
    </>
  );
}
