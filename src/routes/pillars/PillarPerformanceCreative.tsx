import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PillarPerformanceCreative() {
  const { t } = useTranslation("pillars");
  const rows = t("pc.tableRows", { returnObjects: true }) as unknown as { spend: string; halflife: string }[];

  return (
    <>
      <h2>{t("pc.h1")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("pc.p1") }} />
      <p dangerouslySetInnerHTML={{ __html: t("pc.p2") }} />
      <p>{t("pc.p3")}</p>

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v1-creative-workflow-production.png"
          alt={t("pc.imgAlt1")}
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          {t("pc.imgCaption1")}
        </p>
      </div>

      <h2>{t("pc.h2")}</h2>
      <p>{t("pc.p4")}</p>
      <p dangerouslySetInnerHTML={{ __html: t("pc.mis1") }} />
      <p dangerouslySetInnerHTML={{ __html: t("pc.mis2") }} />
      <p dangerouslySetInnerHTML={{ __html: t("pc.mis3") }} />

      <h2>{t("pc.h3")}</h2>
      <p>{t("pc.p5")}</p>
      <div className="not-prose my-10 overflow-x-auto">
        <table className="w-full text-sm border border-white/5">
          <thead>
            <tr className="bg-surface/50">
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-accent font-mono">
                {t("pc.tableH1")}
              </th>
              <th className="text-left p-3 text-[10px] uppercase tracking-widest text-accent font-mono">
                {t("pc.tableH2")}
              </th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {rows.map((row) => (
              <tr key={row.spend} className="border-t border-white/5">
                <td className="p-3">{row.spend}</td>
                <td className="p-3">{row.halflife}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p dangerouslySetInnerHTML={{ __html: t("pc.p6") }} />

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v2-data-dashboard-metrics.png"
          alt={t("pc.imgAlt2")}
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          {t("pc.imgCaption2")}
        </p>
      </div>

      <h2>{t("pc.h4")}</h2>
      <p>{t("pc.p7")}</p>
      <ul>
        {(["kpi1", "kpi2", "kpi3", "kpi4"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`pc.${k}`) }} />
        ))}
      </ul>
      <p dangerouslySetInnerHTML={{ __html: t("pc.p8") }} />

      <h2>{t("pc.h5")}</h2>
      <p>{t("pc.p9")}</p>
      <ol>
        {(["spec1", "spec2", "spec3"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`pc.${k}`) }} />
        ))}
      </ol>

      <h2>{t("pc.h6")}</h2>
      <p>
        {t("pc.p10Before")}{" "}
        <Link to="/creative-engine">{t("pc.p10Link")}</Link>{" "}
        {t("pc.p10After")}
      </p>
      <p>
        {t("pc.p11Before")}
        <Link to="/foto-ki-hybrid">{t("pc.p11Link")}</Link>
        {t("pc.p11After")}
      </p>

      <div className="my-16 rounded-sm overflow-hidden border border-white/5">
        <img
          src="/images/apex-v3-team-strategy-session.png"
          alt={t("pc.imgAlt3")}
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="p-4 text-[10px] uppercase tracking-widest text-muted bg-surface/30 m-0">
          {t("pc.imgCaption3")}
        </p>
      </div>

      <h2>{t("pc.h7")}</h2>
      <p>{t("pc.p12")}</p>
      <ol>
        {(["act1", "act2", "act3"] as const).map((k) => (
          <li key={k} dangerouslySetInnerHTML={{ __html: t(`pc.${k}`) }} />
        ))}
      </ol>
      <p>
        {t("pc.p13Before")}{" "}
        <Link to="/kontakt">{t("pc.p13Link")}</Link>{" "}
        {t("pc.p13After")}
      </p>
    </>
  );
}
