import { useTranslation } from "react-i18next";

const row1 = Array.from({ length: 20 }, (_, i) => `/images/gallery/g-${String(i + 1).padStart(2, "0")}.png`);
const row2 = Array.from({ length: 20 }, (_, i) => `/images/gallery/g-${String(i + 21).padStart(2, "0")}.png`);

export default function VisualGalleryStrip() {
  const { t } = useTranslation("home");

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-8">
        <p className="eyebrow">{t("gallery.eyebrow")}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="overflow-hidden">
          <div className="marquee-track gap-2">
            {[...row1, ...row1].map((src, i) => (
              <div key={i} className="img-zoom shrink-0">
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="h-48 md:h-64 aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="marquee-track marquee-track-reverse gap-2">
            {[...row2, ...row2].map((src, i) => (
              <div key={i} className="img-zoom shrink-0">
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="h-48 md:h-64 aspect-square object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
