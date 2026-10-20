import type { APIRoute } from 'astro';
import { config } from '../config';

export const GET: APIRoute = ({ site }) => {
  const base = config.urlSitio || site;
  const lineas = ['User-agent: *', 'Allow: /'];
  if (base) lineas.push('', `Sitemap: ${new URL('/sitemap.xml', base).href}`);
  return new Response(lineas.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
