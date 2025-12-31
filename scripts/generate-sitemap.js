const fs = require("fs");
const path = require("path");

const SITE_URL = "https://USERNAME.github.io/REPO"; // GANTI INI
const ROOT_DIR = path.join(__dirname, "..");

const ignore = ["node_modules", ".git", ".github", "scripts"];

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (ignore.includes(file)) return;

    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith(".html")) {
      results.push(filePath);
    }
  });

  return results;
}

const files = getHtmlFiles(ROOT_DIR);

const urls = files.map(file => {
  let loc = file
    .replace(ROOT_DIR, "")
    .replace(/\\/g, "/")
    .replace("index.html", "")
    .replace(".html", "");

  return `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sitemap);

console.log("✅ sitemap.xml berhasil dibuat");
