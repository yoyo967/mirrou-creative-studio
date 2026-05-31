import type { ComponentType } from "react";
import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./RootLayout";
import LocaleWrapper, { LOCALES } from "./LocaleWrapper";
import RootRedirect from "./RootRedirect";
import { PILLAR_SLUGS, CLUSTERS, CASE_IDS, SITE } from "../content/site-data";

// Lazy-load leaf page components so each route ships only its own JS instead of
// bundling every page into the main app chunk. Uses the react-router `lazy`
// convention (resolve the dynamic import to a `{ Component }` route module).
// The structural shells (RootRedirect / LocaleWrapper / RootLayout) stay eager
// because they are needed on the very first render of every route.
const page =
  (loader: () => Promise<{ default: ComponentType }>) => () =>
    loader().then((m) => ({ Component: m.default }));

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootRedirect,
  },
  {
    path: "/:locale",
    Component: LocaleWrapper,
    getStaticPaths: () => LOCALES as unknown as string[],
    children: [
      {
        path: "",
        Component: RootLayout,
        children: [
          { index: true, lazy: page(() => import("./HomePage")), entry: "src/routes/HomePage.tsx" },
          { path: "blog", lazy: page(() => import("./BlogIndex")), entry: "src/routes/BlogIndex.tsx" },
          {
            path: "blog/:slug",
            lazy: page(() => import("./ClusterPage")),
            entry: "src/routes/ClusterPage.tsx",
            getStaticPaths: () => {
              const paths: string[] = [];
              LOCALES.forEach((l) => {
                CLUSTERS.forEach((c) => {
                  paths.push(`/${l}/blog/${c.slug}`);
                });
              });
              return paths;
            },
          },
          { path: "studio", lazy: page(() => import("./StudioPage")), entry: "src/routes/StudioPage.tsx" },
          { path: "pakete", lazy: page(() => import("./PaketePage")), entry: "src/routes/PaketePage.tsx" },
          { path: "cases", lazy: page(() => import("./CasesPage")), entry: "src/routes/CasesPage.tsx" },
          {
            path: "cases/:id",
            lazy: page(() => import("./CaseDetailPage")),
            entry: "src/routes/CaseDetailPage.tsx",
            getStaticPaths: () => {
              const paths: string[] = [];
              LOCALES.forEach((l) => {
                CASE_IDS.forEach((id) => {
                  paths.push(`/${l}/cases/${id}`);
                });
              });
              return paths;
            },
          },
          { path: "kontakt", lazy: page(() => import("./KontaktPage")), entry: "src/routes/KontaktPage.tsx" },
          { path: "impressum", lazy: page(() => import("./ImpressumPage")), entry: "src/routes/ImpressumPage.tsx" },
          { path: "datenschutz", lazy: page(() => import("./DatenschutzPage")), entry: "src/routes/DatenschutzPage.tsx" },
          { path: "trust", lazy: page(() => import("./TrustPage")), entry: "src/routes/TrustPage.tsx" },
          { path: "brand-book", lazy: page(() => import("./BrandBookPage")), entry: "src/routes/BrandBookPage.tsx" },
          { path: "press", lazy: page(() => import("./PressPage")), entry: "src/routes/PressPage.tsx" },
          {
            path: "team/:slug",
            lazy: page(() => import("./TeamMemberPage")),
            entry: "src/routes/TeamMemberPage.tsx",
            getStaticPaths: () => {
              const paths: string[] = [];
              LOCALES.forEach((l) => {
                SITE.teamMembers.forEach((m) => {
                  paths.push(`/${l}/team/${m.slug}`);
                });
              });
              return paths;
            },
          },
          {
            path: ":slug",
            lazy: page(() => import("./PillarPage")),
            entry: "src/routes/PillarPage.tsx",
            getStaticPaths: () => {
              const paths: string[] = [];
              LOCALES.forEach((l) => {
                PILLAR_SLUGS.forEach((slug) => {
                  paths.push(`/${l}/${slug}`);
                });
              });
              return paths;
            },
          },
          { path: "*", lazy: page(() => import("./NotFoundPage")) },
        ],
      },
    ],
  },
  {
    path: "*",
    lazy: page(() => import("./NotFoundPage")),
  },
];
