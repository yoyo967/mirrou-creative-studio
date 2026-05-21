const fs = require('fs');
const path = require('path');

const esPath = path.join(__dirname, 'src', 'locales', 'es.ts');
const addPath = path.join(__dirname, 'es_additions.ts');
const clustersPath = path.join(__dirname, 'es_clusters.ts');

let esContent = fs.readFileSync(esPath, 'utf8');
const addContent = fs.readFileSync(addPath, 'utf8');
const clustersContent = fs.readFileSync(clustersPath, 'utf8');

// The replacement logic:
const target = `      fkh: {
        title: "Foto + IA: Producción Híbrida",
        tagline: "Por Qué la Mezcla Gana — No la Pureza",
        description: "Los visuales puramente IA se sienten intercambiables. La fotografía pura es lenta. Trabajamos en híbrido: productos y personas reales ante el objetivo, IA para fondos, atmósferas y variaciones — cumpliendo con la Ley de IA de la UE.",
      },
    },
  },

  legal: {`;

const replacement = `      fkh: {
        title: "Foto + IA: Producción Híbrida",
        tagline: "Por Qué la Mezcla Gana — No la Pureza",
        description: "Los visuales puramente IA se sienten intercambiables. La fotografía pura es lenta. Trabajamos en híbrido: productos y personas reales ante el objetivo, IA para fondos, atmósferas y variaciones — cumpliendo con la Ley de IA de la UE.",
      },
    },
${addContent}
  },

  clusters: {
${clustersContent}
  },

  legal: {`;

if (esContent.includes(target)) {
  esContent = esContent.replace(target, replacement);
  fs.writeFileSync(esPath, esContent, 'utf8');
  console.log("Successfully replaced and added pillars body and clusters!");
} else {
  console.log("Target not found!");
}
