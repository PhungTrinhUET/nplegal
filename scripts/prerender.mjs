// Sau `vite build`: dựng sẵn HTML của trang vào dist/index.html (Google và Zalo/Facebook đọc được nội dung),
// điền tiêu đề/mô tả từ src/site.ts, tạo sitemap.xml, robots.txt, 404.html. Không cần máy chủ.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { render, site } = await import(pathToFileURL(join(root, 'dist-ssr/entry-server.js')).href);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const title = `${site.name} – ${site.tagline.replace(/\.$/, '')}`;
const jsonld = {
  '@context': 'https://schema.org', '@type': 'LegalService', name: site.name, description: site.description, url: site.url,
  telephone: site.phone, email: site.email, address: { '@type': 'PostalAddress', streetAddress: site.address, addressCountry: 'VN' },
};
const file = join(root, 'dist/index.html');
const html = readFileSync(file, 'utf8')
  .replaceAll('%TITLE%', esc(title)).replaceAll('%DESC%', esc(site.description)).replaceAll('%URL%', esc(site.url))
  .replace('<!--jsonld-->', `<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`)
  .replace('<!--app-->', render());
writeFileSync(file, html);
writeFileSync(join(root, 'dist/404.html'), html);
writeFileSync(join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}sitemap.xml\n`);
writeFileSync(join(root, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${site.url}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url></urlset>\n`);
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`Đã dựng sẵn HTML: ${title}`);
