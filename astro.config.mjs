// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// URL pública del sitio, necesaria para que WhatsApp/Facebook encuentren la imagen de vista previa.
// En Vercel se toma sola del dominio de producción (o del dominio propio si lo conectas).
// Para fijarla a mano, usa `urlSitio` en src/config.ts.
const dominioVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// https://astro.build/config
export default defineConfig({
  site: dominioVercel ? `https://${dominioVercel}` : undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});
