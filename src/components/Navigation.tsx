import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ScrambleText from "./ScrambleText";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const { t } = useTranslation("nav");

  const navItems = [
    { nameKey: "resources", to: "/blog" },
    { nameKey: "studio", to: "/studio" },
    { nameKey: "packages", to: "/pakete" },
    { nameKey: "cases", to: "/cases" },
    { nameKey: "press", to: "/press" },
    { nameKey: "trust", to: "/trust" },
    { nameKey: "contact", to: "/kontakt" },
  ];

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => setIsOpen(false), [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color] duration-500 ease-out border-b ${
        scrolled
          ? "bg-bg/85 backdrop-blur-xl border-white/6"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex justify-between items-center gap-6">
        <Link to="/" className="cursor-pointer group flex flex-col" id="nav-logo">
          <ScrambleText
            text={t("mirrou", { ns: "common", defaultValue: "MIRROU" })}
            className="text-[13px] uppercase tracking-[0.5em] font-bold text-ink group-hover:text-accent transition-colors"
          />
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted font-mono group-hover:text-accent/70 transition-colors mt-0.5">
            {t("logoSub")}
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[11px] uppercase tracking-[0.32em] font-mono relative group transition-colors ${
                  isActive ? "text-accent" : "text-ink/75 hover:text-accent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(item.nameKey)}
                  <span
                    className={`absolute -bottom-1.5 left-0 w-full h-px bg-accent transition-transform duration-500 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link to="/kontakt" className="btn-primary text-[11px]" data-magnetic>
            {t("cta")}
          </Link>
        </div>

        <button
          id="mobile-nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-ink p-2 -mr-2"
          aria-label={isOpen ? t("menuClose") : t("menuOpen")}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[68px] bg-bg/98 backdrop-blur-2xl z-40 md:hidden flex flex-col items-stretch px-6 pt-12 gap-2"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-3xl font-serif italic py-3 border-b border-white/6 ${
                    isActive ? "text-accent" : "text-ink"
                  }`
                }
              >
                {t(item.nameKey)}
              </NavLink>
            ))}
            <Link
              to="/kontakt"
              className="btn-primary mt-8 self-start"
              onClick={() => setIsOpen(false)}
            >
              {t("ctaFull")}
            </Link>
            <LanguageSwitcher className="mt-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
