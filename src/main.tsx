import { i18nReady } from "./i18n";
import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "./routes";
import "./index.css";

await i18nReady;

export const createRoot = ViteReactSSG({ routes });
