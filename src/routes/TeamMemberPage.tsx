import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Linkedin, ExternalLink, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "@/src/components/LocalizedLink";
import SEO from "../components/SEO";
import { SITE } from "../content/site-data";

const reveal = (delay: number) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
});

export default function TeamMemberPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("studio");
  const c = (key: string) => t(`content.${key}`);

  const member = SITE.teamMembers.find((m) => m.slug === slug);

  // 404 fallback
  if (!member) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="eyebrow mb-4">Team · Mirrou</p>
          <h1 className="display-lg font-serif italic">Profil nicht gefunden</h1>
          <Link to="/studio" className="btn-ghost mt-8 inline-flex">
            <ArrowLeft size={14} /> Zurück zum Studio
          </Link>
        </div>
      </main>
    );
  }

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: member.name,
    jobTitle: c(member.roleKey),
    worksFor: { "@type": "Organization", name: SITE.name, url: SITE.url },
    sameAs: [
      member.linkedin,
      ...("externalPortfolio" in member ? [member.externalPortfolio] : []),
      ...("instagram" in member ? [(member as { instagram?: string }).instagram ?? ""] : []).filter(Boolean),
    ].filter(Boolean),
    workLocation: { "@type": "City", name: member.location },
  };

  return (
    <main className="min-h-screen bg-bg pt-36 pb-24 relative z-10">
      <SEO
        title={`${member.name} · Team`}
        description={`${member.name} — ${c(member.roleKey)} bei Mirrou Creative Studio. ${member.location}.`}
        pathname={`/team/${member.slug}`}
        jsonLd={personLd}
      />

      {/* Back Navigation */}
      <motion.div
        {...reveal(0)}
        className="max-w-5xl mx-auto px-6 md:px-10 mb-16"
      >
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.4em] text-muted hover:text-accent transition-colors duration-200"
        >
          <ArrowLeft size={12} />
          {c("teamLabel")} · Mirrou Creative Studio
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20 md:mb-28">
        <motion.div {...reveal(0.08)} className="flex items-center gap-4 mb-8">
          <span className="w-8 h-px bg-accent/60" />
          <p className="eyebrow tracking-[0.4em]">
            {member.isFounder ? c("founderLabel") : c("teamLabel")} · Mirrou Creative Studio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Name block */}
          <div className="lg:col-span-7">
            <div className={`clip-reveal in-view`}>
              <h1 className="display-xl font-serif italic leading-[0.9] tracking-[-0.03em] text-ink mb-6">
                {member.name}
              </h1>
            </div>
            <motion.p
              {...reveal(0.25)}
              className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted mb-2"
            >
              {member.location} · {c(member.roleKey)}
            </motion.p>

            {/* Gold rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-8"
            >
              <div className="gold-rule" />
            </motion.div>
          </div>

          {/* Focus / description */}
          <div className="lg:col-span-5">
            <motion.p
              {...reveal(0.35)}
              className="text-body-lg text-pretty mb-8"
            >
              {c(member.focusKey)}
            </motion.p>

            {/* Social Links */}
            <motion.div
              {...reveal(0.45)}
              className="flex flex-wrap gap-4"
            >
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Linkedin size={13} aria-hidden />
                LinkedIn
              </a>

              {"externalPortfolio" in member && (
                <a
                  href={(member as { externalPortfolio?: string }).externalPortfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <ExternalLink size={13} aria-hidden />
                  {c("portfolio")}
                </a>
              )}

              {"instagram" in member && (member as { instagram?: string }).instagram && (
                <a
                  href={(member as { instagram?: string }).instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Instagram size={13} aria-hidden />
                  {c("personalBrand")}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Tags */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-white/8 bg-surface p-10 md:p-14"
        >
          <p className="eyebrow mb-8 text-muted">Expertise · Spezialisierung</p>
          <div className="flex flex-wrap gap-3">
            {member.expertise.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.35em] px-4 py-2.5 border border-accent/25 text-accent/80 hover:border-accent hover:text-accent transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Role at Mirrou */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/8"
        >
          <div className="bg-surface p-10 md:p-12">
            <p className="eyebrow text-muted mb-4">Funktion bei Mirrou</p>
            <p className="font-serif italic text-2xl md:text-3xl text-ink leading-tight">
              {c(member.roleKey)}
            </p>
          </div>
          <div className="bg-surface p-10 md:p-12">
            <p className="eyebrow text-muted mb-4">Standort</p>
            <p className="font-serif italic text-2xl md:text-3xl text-ink leading-tight">
              {member.location} · DACH
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA — Back to Studio */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-8 border-t border-white/8"
      >
        <Link to="/studio" className="btn-ghost">
          <ArrowLeft size={14} />
          Zurück zum Studio
        </Link>
        <Link to="/kontakt" className="btn-primary">
          Strategiegespräch buchen
        </Link>
      </motion.div>
    </main>
  );
}
