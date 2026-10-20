import type { APIRoute } from 'astro';
import { config } from '../config';

// Sitemap de una sola página (sin @astrojs/sitemap para no sumar dependencias).
export const GET: APIRoute = ({ site }) => {
  const base = config.urlSitio || site;
  if (!base) return new Response('Falta la URL del sitio (astro.config.mjs o config.urlSitio).', { status: 404 });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${new URL('/', base).href}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>daily</changefreq></url>
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
