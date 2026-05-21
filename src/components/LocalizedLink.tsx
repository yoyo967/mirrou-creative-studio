import { Link as RouterLink, NavLink as RouterNavLink, LinkProps, NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LOCALES } from "../routes/LocaleWrapper";

export function useLocalizedPath(path: string | object): string | object {
  const { i18n } = useTranslation();
  const locale = i18n.language || "de";

  if (typeof path === "string") {
    if (
      path.startsWith("http") ||
      path.startsWith("//") ||
      path.startsWith("#") ||
      path.startsWith("mailto:") ||
      path.startsWith("tel:")
    ) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const hasPrefix = LOCALES.some((l) => cleanPath.startsWith(`/${l}/`) || cleanPath === `/${l}`);
    if (hasPrefix) {
      return cleanPath;
    }
    return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
  }
  return path;
}

export function Link({ to, ...props }: LinkProps) {
  const localizedTo = useLocalizedPath(to);
  return <RouterLink to={localizedTo as any} {...props} />;
}

export function NavLink({ to, ...props }: NavLinkProps) {
  const localizedTo = useLocalizedPath(to);
  return <RouterNavLink to={localizedTo as any} {...props} />;
}
