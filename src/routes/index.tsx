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
import NotFoundPage from "./NotFoundPage";
import { PILLAR_SLUGS, CLUSTERS, CASE_IDS } from "../content/site-data";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage, entry: "src/routes/HomePage.tsx" },
      { path: "blog", Component: BlogIndex, entry: "src/routes/BlogIndex.tsx" },
      {
        path: "blog/:slug",
        Component: ClusterPage,
        entry: "src/routes/ClusterPage.tsx",
        getStaticPaths: () => CLUSTERS.map((c) => `/blog/${c.slug}`),
      },
      { path: "studio", Component: StudioPage, entry: "src/routes/StudioPage.tsx" },
      { path: "pakete", Component: PaketePage, entry: "src/routes/PaketePage.tsx" },
      { path: "cases", Component: CasesPage, entry: "src/routes/CasesPage.tsx" },
      {
        path: "cases/:id",
        Component: CaseDetailPage,
        entry: "src/routes/CaseDetailPage.tsx",
        getStaticPaths: () => CASE_IDS.map((id) => `/cases/${id}`),
      },
      { path: "kontakt", Component: KontaktPage, entry: "src/routes/KontaktPage.tsx" },
      { path: "impressum", Component: ImpressumPage, entry: "src/routes/ImpressumPage.tsx" },
      { path: "datenschutz", Component: DatenschutzPage, entry: "src/routes/DatenschutzPage.tsx" },
      { path: "trust", Component: TrustPage, entry: "src/routes/TrustPage.tsx" },
      { path: "press", Component: PressPage, entry: "src/routes/PressPage.tsx" },
      {
        path: ":slug",
        Component: PillarPage,
        entry: "src/routes/PillarPage.tsx",
        getStaticPaths: () => PILLAR_SLUGS.map((slug) => `/${slug}`),
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
];
