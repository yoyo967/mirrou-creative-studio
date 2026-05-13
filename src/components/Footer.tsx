import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PILLARS, SITE } from "../content/site-data";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation("footer");

  return (
    <footer id="main-footer" className="border-t border-white/6 mt-32">
      {/* ── Conversion CTA ─────────────────────────────────────────── */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-accent mb-5">
              {t("ctaEyebrow")}
            </p>
            <h2 className="font-serif italic text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight text-ink">
              {t("ctaHeadline")}
              <br />
              <span className="text-accent">{t("ctaHeadlineAccent")}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0"
          >
            <Link to="/kontakt" className="btn-primary">
              {t("ctaLink")}
              <ArrowRight size={14} aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif italic text-3xl text-ink">{SITE.name}</p>
          <p className="eyebrow mt-3">{SITE.tagline}</p>
          <p className="text-body mt-6 max-w-md">{SITE.description}</p>
          <p className="eyebrow mt-6 text-muted">
            {SITE.locations.map((l) => `${l.city} (${l.role})`).join(" · ")}
          </p>
          <p className="eyebrow mt-3 text-muted">
            {t("creativeDirection")}{" "}
            <a
              href={SITE.creativeDirection.instagram}
              rel="noopener"
              className="text-accent hover:underline"
            >
              {SITE.creativeDirection.name}
            </a>
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-muted mb-5">{t("pillarsHeading")}</h2>
          <ul className="space-y-3 text-[15px]">
            {PILLARS.map((p) => (
              <li key={p.slug}>
                <Link to={`/${p.slug}`} className="text-ink/85 hover:text-accent transition">
                  {p.shortLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-muted mb-5">{t("studioHeading")}</h2>
          <ul className="space-y-3 text-[15px]">
            <li><Link to="/studio" className="text-ink/85 hover:text-accent transition">{t("about")}</Link></li>
            <li><Link to="/pakete" className="text-ink/85 hover:text-accent transition">{t("packages")}</Link></li>
            <li><Link to="/cases" className="text-ink/85 hover:text-accent transition">{t("cases")}</Link></li>
            <li><Link to="/press" className="text-ink/85 hover:text-accent transition">{t("press")}</Link></li>
            <li><Link to="/blog" className="text-ink/85 hover:text-accent transition">{t("resources")}</Link></li>
            <li><Link to="/trust" className="text-ink/85 hover:text-accent transition">{t("trustCenter")}</Link></li>
            <li><Link to="/kontakt" className="text-ink/85 hover:text-accent transition">{t("contact")}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className="eyebrow text-muted mb-5">{t("connectHeading")}</h2>
          <ul className="space-y-3 text-[15px]">
            <li>
              <a href={SITE.social.instagram} rel="noopener" className="text-ink/85 hover:text-accent transition">
                Instagram
              </a>
            </li>
            <li>
              <a href={SITE.social.linkedin} rel="noopener" className="text-ink/85 hover:text-accent transition">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SITE.social.facebook} rel="noopener" className="text-ink/85 hover:text-accent transition">
                Facebook
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="text-ink/85 hover:text-accent transition">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[12px] uppercase tracking-[0.3em] text-muted font-mono">
          <p>© {year} {SITE.name}. {t("copyright")}</p>
          <div className="flex gap-6">
            <Link to="/impressum" className="hover:text-accent transition">{t("impressum")}</Link>
            <Link to="/datenschutz" className="hover:text-accent transition">{t("datenschutz")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
