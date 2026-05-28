import type { RouteRecord } from "vite-react-ssg";
import RootLayout from "./RootLayout";
import HomePage from "./HomePage";
import PillarPage from "./PillarPage";
import ClusterPage from "./ClusterPage";
import BlogIndex from "./BlogIndex";
import StudioPage from "./StudioPage";
import PaketePage from "./PaketePage";
import CasesPage from "./CasesPage";
import CaseDetailPage from "./CaseDetailPage";
import KontaktPage from "./KontaktPage";
import ImpressumPage from "./ImpressumPage";
import DatenschutzPage from "./DatenschutzPage";
import TrustPage from "./TrustPage";
import PressPage from "./PressPage";
import TeamMemberPage from "./TeamMemberPage";
import NotFoundPage from "./NotFoundPage";
import BrandBookPage from "./BrandBookPage";
import LocaleWrapper, { LOCALES } from "./LocaleWrapper";
import RootRedirect from "./RootRedirect";
import { PILLAR_SLUGS, CLUSTERS, CASE_IDS, SITE } from "../content/site-data";

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
          { index: true, Component: HomePage, entry: "src/routes/HomePage.tsx" },
          { path: "blog", Component: BlogIndex, entry: "src/routes/BlogIndex.tsx" },
          {
            path: "blog/:slug",
            Component: ClusterPage,
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
          { path: "studio", Component: StudioPage, entry: "src/routes/StudioPage.tsx" },
          { path: "pakete", Component: PaketePage, entry: "src/routes/PaketePage.tsx" },
          { path: "cases", Component: CasesPage, entry: "src/routes/CasesPage.tsx" },
          {
            path: "cases/:id",
            Component: CaseDetailPage,
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
          { path: "kontakt", Component: KontaktPage, entry: "src/routes/KontaktPage.tsx" },
          { path: "impressum", Component: ImpressumPage, entry: "src/routes/ImpressumPage.tsx" },
          { path: "datenschutz", Component: DatenschutzPage, entry: "src/routes/DatenschutzPage.tsx" },
          { path: "trust", Component: TrustPage, entry: "src/routes/TrustPage.tsx" },
          { path: "brand-book", Component: BrandBookPage, entry: "src/routes/BrandBookPage.tsx" },
          { path: "press", Component: PressPage, entry: "src/routes/PressPage.tsx" },
          {
            path: "team/:slug",
            Component: TeamMemberPage,
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
            Component: PillarPage,
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
          { path: "*", Component: NotFoundPage },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
];
