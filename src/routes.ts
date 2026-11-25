import { site, type Lang } from './site';

/** Mỗi trang là một file HTML riêng (dựng sẵn khi build), không cần router. */
export type Route = { lang: Lang; page: 'home' } | { lang: Lang; page: 'area'; id: string };

/** Đường dẫn tương đối từ gốc web, không có / đầu: '' | 'linh-vuc/x/' | 'en/' | 'en/practice/x/' */
export function pathOf(r: Route): string {
  if (r.page === 'home') return r.lang === 'vi' ? '' : 'en/';
  const a = site.areas.find((x) => x.id === r.id)!;
  return r.lang === 'vi' ? `linh-vuc/${a.slug.vi}/` : `en/practice/${a.slug.en}/`;
}

export const allRoutes = (): Route[] =>
  (['vi', 'en'] as Lang[]).flatMap((lang) => [
    { lang, page: 'home' } as Route,
    ...site.areas.filter((a) => a.detail).map((a) => ({ lang, page: 'area', id: a.id }) as Route),
  ]);

/** Từ địa chỉ trang hiện tại (lúc chạy `npm run dev`) suy ra Route. */
export function parseRoute(pathname: string): Route {
  const p = pathname.replace(/^\/+/, '');
  const hit = allRoutes().find((r) => r.page === 'area' && p.endsWith(pathOf(r)));
  if (hit) return hit;
  return { lang: /(^|\/)en\/?$/.test(p) ? 'en' : 'vi', page: 'home' };
}

/** Link tương đối từ trang `from` tới trang `to` (chạy đúng cả ở github.io/<repo>/ lẫn tên miền riêng). */
export function linkTo(from: Route, to: Route, hash?: string): string {
  const up = '../'.repeat(pathOf(from).split('/').filter(Boolean).length);
  const href = up + pathOf(to) + (hash ? `#${hash}` : '');
  return href || './';
}

/** Đường dẫn tới file trong public/ (ảnh…) từ trang hiện tại. */
export const asset = (from: Route, file: string) => '../'.repeat(pathOf(from).split('/').filter(Boolean).length) + file;
