import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PillarBeautyEcommerce() {
  const { t } = useTranslation("pillars");

  return (
    <>
      <h2>{t("be.h1")}</h2>
      <p>{t("be.p1")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("be.p2") }} />
      <p>{t("be.p3")}</p>

      <h2>{t("be.h2")}</h2>

      <h3>{t("be.h3a")}</h3>
      <p>{t("be.p4")}</p>

      <h3>{t("be.h3b")}</h3>
      <p>{t("be.p5")}</p>
      <ul>
        {(["comp1", "comp2", "comp3", "comp4"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`be.${k}`) }} />
        ))}
      </ul>
      <p>{t("be.p6")}</p>

      <h3>{t("be.h3c")}</h3>
      <p>{t("be.p7")}</p>
      <p>{t("be.p8")}</p>

      <h3>{t("be.h3d")}</h3>
      <p>
        {t("be.p9Before")}
        <Link to="/foto-ki-hybrid">{t("be.p9Link")}</Link>
        {t("be.p9After")}
      </p>

      <h2>{t("be.h4")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("be.p10") }} />

      <h2>{t("be.h5")}</h2>
      <p>{t("be.p11")}</p>
      <ol>
        {(["bottle1", "bottle2", "bottle3", "bottle4"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`be.${k}`) }} />
        ))}
      </ol>

      <h2>{t("be.h6")}</h2>
      <p>{t("be.p12")}</p>
      <ul>
        {(["team1", "team2", "team3", "team4"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`be.${k}`) }} />
        ))}
      </ul>
      <p>{t("be.p13")}</p>

      <h2>{t("be.h7")}</h2>
      <p>{t("be.p14")}</p>
      <ol>
        <li>{t("be.q1")}</li>
        <li dangerouslySetInnerHTML={{ __html: t("be.q2") }} />
        <li>{t("be.q3")}</li>
      </ol>
      <p>
        {t("be.p15Before")}{" "}
        <Link to="/kontakt">{t("be.p15Link")}</Link>{" "}
        {t("be.p15After")}
      </p>
    </>
  );
}
