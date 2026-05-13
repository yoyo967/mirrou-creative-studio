import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { PressDownload } from "../content/site-data";

interface Props {
  asset: PressDownload;
  pressEmail: string;
}

export default function PressDownloadCard({ asset, pressEmail }: Props) {
  const { t } = useTranslation("press");

  return (
    <article className="group relative bg-surface/40 p-8 lg:p-10 flex flex-col gap-5 hover:bg-surface transition-colors duration-500 border-b border-r border-white/4 last:border-r-0">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent border border-accent/30 px-2 py-[5px]">
          {asset.fileType}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {asset.fileSize}
        </span>
      </div>

      <h3 className="font-serif text-2xl md:text-[26px] leading-[1.15] text-ink group-hover:text-accent transition-colors">
        {asset.title}
      </h3>

      <p className="text-body text-[15px] leading-relaxed flex-1">
        {asset.description}
      </p>

      <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted border-t border-white/6 pt-4">
        {asset.rightsLabel}
      </p>

      {asset.available ? (
        <a
          href={`/press/downloads/${asset.id}`}
          aria-label={`${t("downloadBtn")} ${asset.title} (${asset.fileType} · ${asset.fileSize})`}
          className="btn-ghost self-start flex items-center gap-2 text-[11px]"
          download
        >
          <Download size={13} aria-hidden />
          {t("downloadBtn")}
        </a>
      ) : (
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          {t("availableOnRequest")}{" "}
          <a
            href={`mailto:${pressEmail}`}
            className="text-accent hover:underline"
          >
            {pressEmail}
          </a>
        </p>
      )}
    </article>
  );
}
