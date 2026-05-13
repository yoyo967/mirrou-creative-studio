import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const pillarSlugs = ["foto-ki-hybrid", "performance-creative", "creative-engine"];

export default function ServicesSection() {
  const { t } = useTranslation("home");
  const s = (key: string) => t(`services.${key}`);

  const packages = [
    { id: "pkg-1", number: "01", titleKey: "pkg01title", focusKey: "pkg01focus", benefitKey: "pkg01benefit", priceKey: "pkg01price", unitKey: "pkg01unit", pillarIdx: 0 },
    { id: "pkg-2", number: "02", titleKey: "pkg02title", focusKey: "pkg02focus", benefitKey: "pkg02benefit", priceKey: "pkg02price", unitKey: "pkg02unit", pillarIdx: 1 },
    { id: "pkg-3", number: "03", titleKey: "pkg03title", focusKey: "pkg03focus", benefitKey: "pkg03benefit", priceKey: "pkg03price", unitKey: "pkg03unit", pillarIdx: 2 },
  ];

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/6"
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
        <div>
          <p className="eyebrow mb-5">{s("eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            {s("headline")} <br />
            <span className="italic opacity-50">{s("headlineItalic")}</span>
          </h2>
        </div>
        <p className="text-body max-w-md">{s("body")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/6 border border-white/6">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="bg-bg p-10 lg:p-12 group hover:bg-surface/40 transition-colors flex flex-col"
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-accent text-[11px] tracking-[0.4em]">{pkg.number}</span>
              <span className="font-mono text-muted text-[10px] uppercase tracking-[0.32em]">{s("paketLabel")}</span>
            </div>
            <h3 className="font-serif text-2xl md:text-[28px] leading-[1.15] mb-4 text-ink group-hover:text-accent transition-colors">
              {s(pkg.titleKey)}
            </h3>
            <p className="text-[14px] text-muted mb-7 font-mono uppercase tracking-[0.18em]">{s(pkg.focusKey)}</p>
            <p className="text-body mb-10 flex-1">{s(pkg.benefitKey)}</p>

            <div className="border-t border-white/6 pt-6 mt-auto">
              <p className="font-serif italic text-[32px] md:text-[40px] leading-none text-accent">{s(pkg.priceKey)}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted mt-3">{s(pkg.unitKey)}</p>
              <Link
                to={`/${pillarSlugs[pkg.pillarIdx]}`}
                className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-ink/80 hover:text-accent transition"
              >
                {s("methodLink")}
                <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-body max-w-md">{s("ctaBody")}</p>
        <Link to="/kontakt" className="btn-primary self-start sm:self-auto">
          {s("ctaLink")}
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
