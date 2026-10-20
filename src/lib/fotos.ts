import { existsSync } from 'node:fs';
import { join } from 'node:path';

/** Solo en build/dev (Node): indica si una ruta de public/ existe. */
export const hayFoto = (ruta?: string): ruta is string =>
  !!ruta && existsSync(join(process.cwd(), 'public', ruta));

/** Los recuadros de "falta foto/texto" solo se muestran en `npm run dev`. */
export const mostrarPendientes = import.meta.env.DEV;
