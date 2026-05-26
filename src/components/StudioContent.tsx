import { motion } from "motion/react";
import { Instagram, ExternalLink, Linkedin, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";
import { Link } from "@/src/components/LocalizedLink";
import { SITE } from "../content/site-data";

export default function StudioContent() {
  const { t } = useTranslation("studio");
  const c = (key: string) => t(`content.${key}`);

  const founder = SITE.teamMembers.find((m) => m.isFounder)!;
  const others  = SITE.teamMembers.filter((m) => !m.isFounder);

  const stats = [
    { labelKey: "statFounded",  valueKey: "statFoundedVal" },
    { labelKey: "statMarket",   valueKey: "statMarketVal" },
    { labelKey: "statDirection", value: SITE.creativeDirection.name },
  ];

  return (
    <section id="studio" className="section-cream py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-24">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-5">{c("eyebrow")}</p>
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-balance"
              dangerouslySetInnerHTML={{ __html: `${c("headline")}<br>${c("headlineSub")}` }}
            />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[18px] leading-[1.65] text-[color:var(--color-body-on-cream)] max-w-xl">
              {c("body")}
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] mt-8 text-[color:var(--color-muted-on-cream)]">
              {c("locations")}
            </p>
          </div>
        </div>

        {/* ── Founder Card ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="border border-[color:var(--color-ink-on-cream)]/15 bg-[color:var(--color-cream-2)] p-10 lg:p-16 mb-px relative overflow-hidden"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent block mb-6">
            {c("founderLabel")}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <h3 className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-[color:var(--color-ink-on-cream)]">
                {founder.name}
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-muted-on-cream)] mt-4">
                {founder.location} · {c(founder.roleKey)}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-6">
              <p className="text-[17px] leading-[1.65] text-[color:var(--color-body-on-cream)]">
                {c(founder.focusKey)}
              </p>
              <div className="flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.3em] font-mono pt-4 border-t border-[color:var(--color-ink-on-cream)]/10">
                {/* Interne Profilseite */}
                <Link
                  to={`/team/${founder.slug}`}
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <User size={12} /> {c("portfolio")}
                </Link>
                {/* Instagram */}
                {"instagram" in founder && (founder as { instagram?: string }).instagram && (
                  <a
                    href={(founder as { instagram?: string }).instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[color:var(--color-muted-on-cream)] hover:text-[color:var(--color-ink-on-cream)]"
                  >
                    <Instagram size={12} /> {c("personalBrand")}
                  </a>
                )}
                {/* LinkedIn */}
                <a
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[color:var(--color-muted-on-cream)] hover:text-[color:var(--color-ink-on-cream)]"
                >
                  <Linkedin size={12} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Team Grid ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-ink-on-cream)]/10 border border-[color:var(--color-ink-on-cream)]/15 border-t-0">
          {others.map((member, i) => {
            const hasExternalPortfolio = "externalPortfolio" in member;
            const isYahya = member.id === "yahya";
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[color:var(--color-cream-2)] p-8 lg:p-10 flex flex-col gap-4 group"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-muted-on-cream)]">
                  {c("teamLabel")}
                </span>
                <h3 className="font-serif text-2xl text-[color:var(--color-ink-on-cream)] leading-tight">
                  {member.name}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-muted-on-cream)]">
                  {member.location} · {c(member.roleKey)}
                </p>
                <span className="block w-10 h-px bg-accent transition-all duration-300 group-hover:w-16" />
                <p className="text-[15px] leading-[1.6] text-[color:var(--color-body-on-cream)] flex-1">
                  {c(member.focusKey)}
                </p>

                {/* Links-Zeile */}
                <div className="flex flex-wrap gap-3 pt-3 border-t border-[color:var(--color-ink-on-cream)]/10 mt-auto text-[10px] uppercase tracking-[0.3em] font-mono">
                  {/* Yahya: externes Portfolio unverändert */}
                  {isYahya && hasExternalPortfolio ? (
                    <a
                      href={(member as { externalPortfolio?: string }).externalPortfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-accent hover:text-[color:var(--color-ink-on-cream)] transition-colors duration-200"
                    >
                      <ExternalLink size={11} />
                      {c("portfolio")}
                    </a>
                  ) : !isYahya ? (
                    /* Alle anderen: interne Profilseite */
                    <Link
                      to={`/team/${member.slug}`}
                      className="flex items-center gap-1.5 text-accent hover:text-[color:var(--color-ink-on-cream)] transition-colors duration-200"
                    >
                      <User size={11} />
                      {c("portfolio")}
                    </Link>
                  ) : null}

                  {/* LinkedIn immer anzeigen */}
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[color:var(--color-muted-on-cream)] hover:text-[color:var(--color-ink-on-cream)] transition-colors duration-200"
                  >
                    <Linkedin size={11} />
                    LinkedIn
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mission ──────────────────────────────────────────────────── */}
        <div className="mt-24 md:mt-32 max-w-4xl mx-auto text-center">
          <p className="font-serif italic text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-[color:var(--color-ink-on-cream)] text-balance">
            {c("missionQuote")}
          </p>
        </div>

        {/* ── Stats ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mt-20 md:mt-24 pt-16 md:pt-20 border-t border-[color:var(--color-ink-on-cream)]/15">
          {stats.map((item) => (
            <div key={item.labelKey}>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[color:var(--color-muted-on-cream)] block mb-3">
                {c(item.labelKey)}
              </span>
              <p className="font-serif italic text-2xl text-[color:var(--color-ink-on-cream)]">
                {item.value ?? c(item.valueKey!)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Visual Gallery ───────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-[color:var(--color-ink-on-cream)]/10 border border-[color:var(--color-ink-on-cream)]/10 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => i + 41).map((n) => (
            <div key={n} className="img-zoom overflow-hidden">
              <OptimizedImage
                src={`/images/gallery/g-${String(n).padStart(2, "0")}.webp`}
                alt=""
                className="aspect-square w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
