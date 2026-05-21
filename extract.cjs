const fs = require('fs');
const ts = fs.readFileSync('src/content/site-data.ts', 'utf8');

const clusterMatch = ts.match(/export const CLUSTERS: Article\[\] = \[([\s\S]*?)\];/);
if (!clusterMatch) {
  console.error("No CLUSTERS found");
  process.exit(1);
}

const items = [...clusterMatch[1].matchAll(/\{[\s\S]*?slug:\s*"([^"]+)",[\s\S]*?title:\s*"([^"]+)",[\s\S]*?description:\s*"([^"]+)"/g)];
const meta = items.reduce((acc, match) => {
  const key = match[1].replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  acc[key] = { title: match[2], description: match[3] };
  return acc;
}, {});

console.log(JSON.stringify(meta, null, 2));
