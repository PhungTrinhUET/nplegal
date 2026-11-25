// Sau `vite build`: dựng sẵn HTML cho từng trang (vi + en, trang chủ + trang lĩnh vực) để Google, Zalo, Facebook đọc được,
// điền tiêu đề/mô tả/hreflang, tạo sitemap.xml, robots.txt, 404.html. Không cần máy chủ.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { render, site, allRoutes, pathOf } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const tpl = readFileSync(join(root, 'dist/index.html'), 'utf8');
const routes = allRoutes();
const twin = (r, lang) => pathOf(r.page === 'home' ? { lang, page: 'home' } : { ...r, lang });

for (const r of routes) {
  const L = r.lang;
  const path = pathOf(r);
  const depth = path.split('/').filter(Boolean).length;
  const up = '../'.repeat(depth);
  const area = r.page === 'area' ? site.areas.find((a) => a.id === r.id) : null;
  const title = area ? `${area.title[L]} | ${site.name}` : site.seo.title[L];
  const desc = area ? area.short[L] : site.seo.description[L];
  const url = site.url + path;
  const alternates = [
    `<link rel="alternate" hreflang="vi" href="${site.url + twin(r, 'vi')}" />`,
    `<link rel="alternate" hreflang="en" href="${site.url + twin(r, 'en')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${site.url + twin(r, 'vi')}" />`,
  ].join('\n    ');
  const jsonld = r.page === 'home' ? {
    '@context': 'https://schema.org', '@type': 'LegalService', name: site.name, url: site.url, image: site.url + 'img/og.jpg',
    description: site.seo.description[L], telephone: site.phone, email: site.email,
    address: { '@type': 'PostalAddress', streetAddress: site.address[L], addressLocality: 'Hanoi', addressCountry: 'VN' },
    areaServed: 'VN', knowsLanguage: ['vi', 'en'],
  } : {
    '@context': 'https://schema.org', '@type': 'Service', name: area.title[L], description: area.short[L],
    provider: { '@type': 'LegalService', name: site.name, url: site.url },
  };
  let html = tpl
    .replace('%LANG%', L).replaceAll('%TITLE%', esc(title)).replaceAll('%DESC%', esc(desc)).replaceAll('%URL%', esc(url))
    .replace('%LOCALE%', L === 'vi' ? 'vi_VN' : 'en_US').replace('%OGIMG%', site.url + 'img/og.jpg')
    .replace('<!--alternates-->', alternates)
    .replace('%ROUTE%', ` data-route="${esc(JSON.stringify(r))}"`)
    .replace('<!--jsonld-->', `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`)
    .replace('<!--app-->', render(r));
  // Vite (base './') ghi link tài nguyên tương đối với gốc; trang nằm sâu hơn thì thêm ../
  if (depth) html = html.replace(/(href|src)="\.\/(assets\/|favicon\.svg)/g, `$1="${up}$2`);
  mkdirSync(join(root, 'dist', path), { recursive: true });
  writeFileSync(join(root, 'dist', path, 'index.html'), html);
}

// 404: trang tĩnh nhỏ, không phụ thuộc đường dẫn (GitHub Pages trả nó cho mọi địa chỉ sai).
writeFileSync(join(root, 'dist/404.html'), `<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Không tìm thấy trang | ${site.name}</title><meta name="robots" content="noindex"><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f3d2a;color:#e8efe9;font:16px/1.6 system-ui,sans-serif;text-align:center;padding:24px}a{color:#fff;font-weight:600}h1{font-size:28px;margin:0 0 8px}</style></head>
<body><div><h1>Không tìm thấy trang · Page not found</h1><p><a href="${site.url}">Về trang chủ NP Legal</a> · <a href="${site.url}en/">Go to homepage</a></p></div></body></html>\n`);
writeFileSync(join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
const day = new Date().toISOString().slice(0, 10);
writeFileSync(join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `<url><loc>${site.url + pathOf(r)}</loc><lastmod>${day}</lastmod></url>`).join('\n')}\n</urlset>\n`);
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Đã dựng sẵn ${routes.length} trang HTML.`);
