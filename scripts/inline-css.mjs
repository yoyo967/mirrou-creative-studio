import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const DIST = "dist";

function findCssFile() {
  const assets = join(DIST, "assets");
  return readdirSync(assets).find((f) => f.endsWith(".css"));
}

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkHtml(full, files);
    } else if (entry.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

const cssFile = findCssFile();
if (!cssFile) {
  console.log("No CSS file found in dist/assets/");
  process.exit(0);
}

const cssContent = readFileSync(join(DIST, "assets", cssFile), "utf-8");
const htmlFiles = walkHtml(DIST);
let count = 0;

for (const file of htmlFiles) {
  let html = readFileSync(file, "utf-8");
  const linkRegex = new RegExp(
    `<link[^>]*href="/assets/${cssFile.replace(".", "\\.")}"[^>]*>`,
    "g"
  );
  if (linkRegex.test(html)) {
    html = html.replace(linkRegex, `<style>${cssContent}</style>`);
    writeFileSync(file, html);
    count++;
  }
}

console.log(`✓ CSS inlined in ${count} HTML files (${cssFile} → <style>)`);
