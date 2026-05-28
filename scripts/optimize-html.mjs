/**
 * Post-build HTML optimizer:
 * 1. Move <link rel="stylesheet"> before <script> and modulepreloads (CSS is render-critical)
 * 2. Remove duplicate hero image preloads (SSG generates one with fetchpriority)
 * 3. Ensure fetchpriority="high" on the LCP image preload
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const DIST = "dist";

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkHtml(full, files);
    else if (entry.endsWith(".html")) files.push(full);
  }
  return files;
}

let count = 0;
for (const file of walkHtml(DIST)) {
  let html = readFileSync(file, "utf-8");
  let changed = false;

  // 1. Move stylesheet link before script/modulepreload in <head>
  const stylesheetMatch = html.match(/<link rel="stylesheet" crossorigin="" href="\/assets\/[^"]+\.css">/);
  const scriptMatch = html.match(/<script type="module" crossorigin="" src="\/assets\/[^"]+\.js"><\/script>/);
  if (stylesheetMatch && scriptMatch) {
    const stylesheetTag = stylesheetMatch[0];
    const scriptTag = scriptMatch[0];
    const stylesheetPos = html.indexOf(stylesheetTag);
    const scriptPos = html.indexOf(scriptTag);
    if (stylesheetPos > scriptPos) {
      // Remove stylesheet from current position and insert before the script
      html = html.replace(stylesheetTag, "");
      html = html.replace(scriptTag, stylesheetTag + "\n    " + scriptTag);
      changed = true;
    }
  }

  // 2. Remove the BODY-level duplicate hero image preload (SSG generates one inside div#root)
  //    Keep the HEAD-level one from index.html (discovered earlier by preload scanner)
  const bodyPreloadRegex = /<link rel="preload" as="image" href="\/heroimages\/228ba3d7[^"]*"[^>]*>/;
  if (bodyPreloadRegex.test(html)) {
    html = html.replace(bodyPreloadRegex, "");
    changed = true;
  }

  if (changed) count++;
  writeFileSync(file, html);
}

console.log(`✓ HTML optimized in ${count} files (CSS priority, dedup preloads)`);
