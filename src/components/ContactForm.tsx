import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useState, type FormEvent } from "react";
import { Link } from "@/src/components/LocalizedLink";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SITE } from "../content/site-data";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    setStatus("submitting");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = {
      name: (formData.get("name") as string) || "",
      email: (formData.get("email") as string) || "",
      brand: (formData.get("brand") as string) || "",
      website: (formData.get("website") as string) || undefined,
      ad_spend: (formData.get("ad_spend") as string) || undefined,
      message: (formData.get("message") as string) || "",
      consent: formData.get("dsgvo") === "on",
      company_website: (formData.get("company-website") as string) || undefined,
    };

    try {
      const response = await fetch(`${SITE.api}/api/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setStatus("success");
      formEl.reset();
    } catch (err) {
      console.error("Error submitting lead form:", err);
      setStatus("error");
    }
  };

  const isSubmitting = status === "submitting";
  const isSuccess = status === "success";

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-white/6 bg-bg"
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
              {SITE.name}
              <br />
              {f("directorLine")}
              <br />
              {f("locationLine")}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            name="lead"
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <p className="hidden">
              <label>
                {f("honeypot")} <input name="company-website" autoComplete="off" disabled={isSubmitting || isSuccess} />
              </label>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field id="cf-name" label={f("fieldName")}>
                <input id="cf-name" type="text" name="name" required autoComplete="name" className="input-line" disabled={isSubmitting || isSuccess} />
              </Field>
              <Field id="cf-email" label={f("fieldEmail")}>
                <input id="cf-email" type="email" name="email" required autoComplete="email" className="input-line" disabled={isSubmitting || isSuccess} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Field id="cf-brand" label={f("fieldBrand")}>
                <input id="cf-brand" type="text" name="brand" required autoComplete="organization" className="input-line" disabled={isSubmitting || isSuccess} />
              </Field>
              <Field id="cf-website" label={f("fieldWebsite")}>
                <input id="cf-website" type="url" name="website" placeholder="https://" autoComplete="url" className="input-line" disabled={isSubmitting || isSuccess} />
              </Field>
            </div>

            <Field id="cf-spend" label={f("fieldSpend")}>
              <select id="cf-spend" name="ad_spend" required className="input-line bg-bg" disabled={isSubmitting || isSuccess}>
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
                disabled={isSubmitting || isSuccess}
              />
            </Field>

            <label className="flex items-start gap-3 text-[14px] text-body">
              <input type="checkbox" name="dsgvo" required className="mt-1 accent-accent w-4 h-4" disabled={isSubmitting || isSuccess} />
              <span>
                {f("dsgvoLabel")}{" "}
                <Link to="/datenschutz" className="underline hover:text-accent">
                  {f("dsgvoLink")}
                </Link>{" "}
                {f("dsgvoSuffix")}
              </span>
            </label>

            <div className="flex flex-col items-start gap-3">
              <motion.button
                type="submit"
                whileHover={isSubmitting || isSuccess ? undefined : { x: 4 }}
                className="btn-primary"
                disabled={isSubmitting || isSuccess}
                style={{
                  opacity: isSubmitting || isSuccess ? 0.7 : 1,
                  cursor: isSubmitting || isSuccess ? "not-allowed" : "pointer"
                }}
              >
                {isSuccess ? f("submitSent") : isSubmitting ? f("submitting") : f("submit")}
                <ArrowRight size={14} aria-hidden />
              </motion.button>

              {status === "error" && (
                <p className="text-[#EF4444] font-sans text-[14px] mt-2 font-light">
                  {f("submitError")}
                </p>
              )}
            </div>
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
