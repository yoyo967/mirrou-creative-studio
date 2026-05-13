import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "../content/site-data";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation("contact");
  const f = (key: string) => t(`form.${key}`);

  const adSpendOptions = [
    { value: "",          label: f("spendPlaceholder") },
    { value: "under-10k", label: f("spend1") },
    { value: "10-30k",    label: f("spend2") },
    { value: "30-80k",    label: f("spend3") },
    { value: "80-150k",   label: f("spend4") },
    { value: "over-150k", label: f("spend5") },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5">{f("eyebrow")}</p>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-balance">
            {f("headline")} <br />
            <span className="italic opacity-50">{f("headlineSub")}</span>
          </h2>

          <p className="text-body mt-8 max-w-md">{f("body")}</p>

          <div className="mt-10 space-y-3">
            <a
              href={`mailto:${SITE.email}`}
              className="font-serif italic text-2xl text-ink hover:text-accent transition-colors block"
            >
              {SITE.email}
            </a>
            <div className="flex flex-wrap gap-5 font-mono text-[11px] uppercase tracking-[0.3em]">
              <a href={SITE.social.instagram} rel="noopener" className="text-muted hover:text-accent transition">Instagram</a>
              <a href={SITE.social.linkedin}  rel="noopener" className="text-muted hover:text-accent transition">LinkedIn</a>
              <a href={SITE.social.facebook}  rel="noopener" className="text-muted hover:text-accent transition">Facebook</a>
            </div>
          </div>

          <div className="mt-12 p-6 border-l border-accent/30 bg-accent/3">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted leading-loose">
              Mirrou Creative Studio
              <br />
              Creative Direction · Olha Yevtushenko
              <br />
              {f("locationLine")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            name="lead"
            method="POST"
            data-netlify="true"
            netlify-honeypot="company-website"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <input type="hidden" name="form-name" value="lead" />
            <p className="hidden">
              <label>
                {f("honeypot")} <input name="company-website" autoComplete="off" />
              </label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field id="cf-name" label={f("fieldName")}>
                <input id="cf-name" type="text" name="name" required autoComplete="name" className="input-line" />
              </Field>
              <Field id="cf-email" label={f("fieldEmail")}>
                <input id="cf-email" type="email" name="email" required autoComplete="email" className="input-line" />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field id="cf-brand" label={f("fieldBrand")}>
                <input id="cf-brand" type="text" name="brand" required autoComplete="organization" className="input-line" />
              </Field>
              <Field id="cf-website" label={f("fieldWebsite")}>
                <input id="cf-website" type="url" name="website" placeholder="https://" autoComplete="url" className="input-line" />
              </Field>
            </div>

            <Field id="cf-spend" label={f("fieldSpend")}>
              <select id="cf-spend" name="ad_spend" required className="input-line bg-bg">
                {adSpendOptions.map((o) => (
                  <option key={o.value} value={o.value} disabled={o.value === ""}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="cf-message" label={f("fieldMessage")}>
              <textarea
                id="cf-message"
                name="message"
                required
                rows={5}
                placeholder={f("messagePlaceholder")}
                className="input-line resize-y"
              />
            </Field>

            <label className="flex items-start gap-3 text-[14px] text-body">
              <input type="checkbox" name="dsgvo" required className="mt-1 accent-accent w-4 h-4" />
              <span>
                {f("dsgvoLabel")}{" "}
                <Link to="/datenschutz" className="underline hover:text-accent">
                  {f("dsgvoLink")}
                </Link>{" "}
                {f("dsgvoSuffix")}
              </span>
            </label>

            <motion.button type="submit" whileHover={{ x: 4 }} className="btn-primary">
              {sent ? f("submitSent") : f("submit")}
              <ArrowRight size={14} aria-hidden />
            </motion.button>
          </form>
        </div>
      </div>

      <style>{`
        .input-line {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(244, 242, 239, 0.12);
          padding: 12px 0;
          color: var(--color-ink);
          font-size: 17px;
          font-family: var(--font-sans);
          transition: border-color 200ms ease;
        }
        .input-line:focus {
          outline: none;
          border-bottom-color: var(--color-accent);
        }
        select.input-line {
          appearance: none;
          padding-right: 24px;
        }
      `}</style>
    </section>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted block">
        {label}
      </label>
      {children}
    </div>
  );
}
