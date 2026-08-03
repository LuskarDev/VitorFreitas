// Gera public/sitemap.xml a partir dos dados reais do site (src/data/content.js).
// Roda automaticamente antes de cada build ("prebuild" no package.json), então
// novos projetos adicionados a `portfolioItems` entram no sitemap sem precisar
// editar o XML na mão.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { portfolioItems } from "../src/data/content.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = "https://vitorfreitas.com";
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/politica-de-privacidade", changefreq: "yearly", priority: "0.3" },
  { loc: "/termos-de-uso", changefreq: "yearly", priority: "0.3" },
  { loc: "/termos-de-agendamento", changefreq: "yearly", priority: "0.3" },
];

const projectPages = portfolioItems.map((p) => ({
  loc: `/projeto/${p.slug}`,
  changefreq: "monthly",
  priority: "0.7",
}));

const urls = [...staticPages, ...projectPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`sitemap.xml gerado com ${urls.length} URLs -> ${outPath}`);
