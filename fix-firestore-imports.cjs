const fs = require("fs");
const path = require("path");

const TYPE = new Set([
  "EmergencyContact",
  "HouseRuleCategory",
  "HostProfile",
  "Property",
  "CheckInInfo",
  "WiFiInfo",
  "ParkingInfo",
  "Restaurant",
  "Supermarket",
  "Bar",
  "PointOfInterest",
  "MedicalContact",
  "ContentBlock",
]);

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else if (p.endsWith(".ts") || p.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const files = walk("src");
let touched = 0;

for (const file of files) {
  let src = fs.readFileSync(file, "utf8");

  const regex =
    /import\s+(type\s+)?\{\s*([^}]+)\s*\}\s*from\s*["']([^"']*lib\/firestore[^"']*)["'];?/g;

  let changed = false;

  src = src.replace(regex, (_, _type, inside, mod) => {
    const parts = inside.split(",").map(s => s.trim()).filter(Boolean);
    const typeParts = [];
    const valueParts = [];

    for (const p of parts) {
      const base = p.split(/\s+as\s+/i)[0].trim();
      (TYPE.has(base) ? typeParts : valueParts).push(p);
    }

    if (valueParts.length === 0) {
      changed = true;
      return `import type { ${typeParts.join(", ")} } from "${mod}";`;
    }

    if (typeParts.length === 0) {
      return `import { ${valueParts.join(", ")} } from "${mod}";`;
    }

    changed = true;
    return (
      `import { ${valueParts.join(", ")} } from "${mod}";\n` +
      `import type { ${typeParts.join(", ")} } from "${mod}";`
    );
  });

  if (changed) {
    fs.writeFileSync(file, src, "utf8");
    touched++;
  }
}

console.log("Files updated:", touched);
