import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = resolve(__dirname, "../src");

function walk(dir, callback) {
  const files = readdirSync(dir);
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      walk(fullPath, callback);
    } else if (stat.isFile() && (file.endsWith(".ts") || file.endsWith(".tsx"))) {
      callback(fullPath);
    }
  }
}

const IMPORT_REGEX = /import\s+([^;]+?)\s+from\s+["']react-router-dom["'];/g;

walk(srcDir, (filePath) => {
  if (filePath.endsWith("LocalizedLink.tsx") || filePath.endsWith("LocaleWrapper.tsx") || filePath.endsWith("RootRedirect.tsx")) {
    return;
  }

  const content = readFileSync(filePath, "utf8");
  let modified = false;

  const newContent = content.replace(IMPORT_REGEX, (match, importsStr) => {
    // e.g. "{ useParams, Link, Navigate }" or "customThing"
    const cleanedImports = importsStr.trim();
    if (!cleanedImports.startsWith("{") || !cleanedImports.endsWith("}")) {
      return match; // Default or namespace import, skip
    }

    const specifiers = cleanedImports
      .slice(1, -1)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const localizedSpecs = specifiers.filter((s) => s === "Link" || s === "NavLink");
    const otherSpecs = specifiers.filter((s) => s !== "Link" && s !== "NavLink");

    if (localizedSpecs.length === 0) {
      return match; // No Link or NavLink imported here
    }

    modified = true;
    const statements = [];

    // Localized link import
    statements.push(`import { ${localizedSpecs.join(", ")} } from "@/src/components/LocalizedLink";`);

    // Remaining react-router-dom import if any
    if (otherSpecs.length > 0) {
      statements.push(`import { ${otherSpecs.join(", ")} } from "react-router-dom";`);
    }

    return statements.join("\n");
  });

  if (modified) {
    writeFileSync(filePath, newContent, "utf8");
    console.log(`Updated: ${filePath}`);
  }
});
console.log("Done updating links imports.");
