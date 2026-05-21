import fs from 'fs';
const lines = fs.readFileSync('src/content/site-data.ts', 'utf8').split('\n');
let inClusters = false;
const clusters = {};
let currentSlug = null;
let currentTitle = null;
let currentDesc = null;

for(let i=0; i<lines.length; i++) {
  const l = lines[i];
  if(l.includes('export const CLUSTERS')) inClusters = true;
  if(!inClusters) continue;
  
  const slugMatch = l.match(/slug:\s*"(.*?)"/);
  if(slugMatch) {
    currentSlug = slugMatch[1].replace(/-([a-z0-9])/g, g => g[1].toUpperCase());
  }
  
  const titleMatch = l.match(/title:\s*"(.*?)"/);
  if(titleMatch) {
    currentTitle = titleMatch[1];
  }
  
  const descMatch = l.match(/description:\s*"(.*?)"/);
  if(descMatch) {
    currentDesc = descMatch[1];
  }
  
  if(currentSlug && currentTitle && currentDesc) {
    clusters[currentSlug] = { title: currentTitle, description: currentDesc };
    currentSlug = null;
    currentTitle = null;
    currentDesc = null;
  }
}

fs.writeFileSync('clusters_meta.json', JSON.stringify(clusters, null, 2));
console.log('done', Object.keys(clusters).length);
