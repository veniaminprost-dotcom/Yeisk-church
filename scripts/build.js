const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const dist = path.join(root, "dist");
const entries = [
  "index.html",
  "contacts.html",
  "robots.txt",
  "sitemap.xml",
  "assets"
];

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const entry of entries) {
  const from = path.join(root, entry);
  const to = path.join(dist, entry);
  if (fs.existsSync(from)) {
    fs.cpSync(from, to, { recursive: true });
  }
}

console.log("Static site built to dist/");
