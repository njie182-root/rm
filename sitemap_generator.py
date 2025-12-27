import os
from datetime import datetime

BASE_URL = "https://sunshinecaferesto.com"  # GANTI

IGNORE_FILES = ["404.html"]
OUTPUT_FILE = "sitemap.xml"

today = datetime.today().strftime("%Y-%m-%d")

urls = []

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html") and file not in IGNORE_FILES:
            path = os.path.join(root, file).replace("\\", "/")
            url = path.replace("./", "").replace("index.html", "").replace(".html", "")
            urls.append(f"{BASE_URL}/{url}".rstrip("/"))

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')

    for url in urls:
        f.write("  <url>\n")
        f.write(f"    <loc>{url}</loc>\n")
        f.write(f"    <lastmod>{today}</lastmod>\n")
        f.write("    <changefreq>weekly</changefreq>\n")
        f.write("    <priority>0.8</priority>\n")
        f.write("  </url>\n")

    f.write("</urlset>")

print("✅ sitemap.xml berhasil dibuat!")


