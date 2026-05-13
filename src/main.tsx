import "./i18n"; // must be first — initialises i18next before any component renders
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

export const createRoot = ViteReactSSG({ routes });
