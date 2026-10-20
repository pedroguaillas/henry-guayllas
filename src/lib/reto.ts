import { config } from '../config';

const DIA_MS = 86_400_000;

export interface Estado {
  /** Día actual del reto (0 si aún no empieza, tope en totalDias). */
  dia: number;
  totalDias: number;
  completado: boolean;
  porcentaje: number;
  /** Flexiones acumuladas hasta hoy (null si no está configurado). */
  flexiones: number | null;
  /** Flexiones que le tocan hoy (null si no está configurado). */
  flexionesHoy: number | null;
  hito: {
    etiqueta: string;
    titulo: string;
    detalle: string;
    meta: number;
    porcentaje: number;
    celebrando: boolean;
    superado: boolean;
  };
  cuenta: { dias: number; horas: number; minutos: number; segundos: number };
}

const formato = new Map<string, Intl.DateTimeFormat>();

/** Fecha y hora de un instante vistos en una zona horaria. */
function partesEnZona(fecha: Date, zona: string) {
  let f = formato.get(zona);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: zona,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hourCycle: 'h23',
    });
    formato.set(zona, f);
  }
  const p: Record<string, number> = {};
  for (const { type, value } of f.formatToParts(fecha)) p[type] = Number(value);
  return { y: p.year, m: p.month, d: p.day, h: p.hour, mi: p.minute, s: p.second };
}

/** Instante (ms UTC) que corresponde a una hora local de la zona. */
function instanteEnZona(y: number, m: number, d: number, h: number, mi: number, s: number, zona: string) {
  const supuesto = Date.UTC(y, m - 1, d, h, mi, s);
  const p = partesEnZona(new Date(supuesto), zona);
  const desfase = Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - supuesto;
  return supuesto - desfase;
}

const faltan = (n: number) => (n === 1 ? 'Falta 1 día' : `Faltan ${n} días`);

export function calcularEstado(ahora: Date = new Date()): Estado {
  const { fechaInicio, totalDias, hito, zonaHoraria } = config;
  const hoy = partesEnZona(ahora, zonaHoraria);
  const [iy, im, id] = fechaInicio.split('-').map(Number);

  const transcurridos = Math.round((Date.UTC(hoy.y, hoy.m - 1, hoy.d) - Date.UTC(iy, im - 1, id)) / DIA_MS);
  const diaBruto = transcurridos + 1;
  const completado = diaBruto > totalDias;
  const dia = Math.min(Math.max(diaBruto, 0), totalDias);

  let estadoHito: Estado['hito'];
  if (dia < hito) {
    estadoHito = {
      etiqueta: 'Próximo hito',
      titulo: faltan(hito - dia),
      detalle: `para llegar al día ${hito}`,
      meta: hito,
      porcentaje: (dia / hito) * 100,
      celebrando: false,
      superado: false,
    };
  } else if (dia === hito) {
    estadoHito = {
      etiqueta: '¡Hito alcanzado!',
      titulo: `¡${hito} días! 🔥`,
      detalle: `Siguiente meta: día ${totalDias} · ${faltan(totalDias - dia).toLowerCase()}`,
      meta: totalDias,
      porcentaje: (dia / totalDias) * 100,
      celebrando: true,
      superado: true,
    };
  } else if (dia < totalDias) {
    estadoHito = {
      etiqueta: 'Próximo hito',
      titulo: faltan(totalDias - dia),
      detalle: `para llegar al día ${totalDias}`,
      meta: totalDias,
      porcentaje: (dia / totalDias) * 100,
      celebrando: false,
      superado: true,
    };
  } else {
    estadoHito = {
      etiqueta: 'Recta final',
      titulo: '¡Último día! 💪',
      detalle: `Hoy se completa el día ${totalDias}`,
      meta: totalDias,
      porcentaje: 100,
      celebrando: true,
      superado: true,
    };
  }

  const finAno = instanteEnZona(hoy.y, 12, 31, 23, 59, 59, zonaHoraria);
  const restante = Math.max(0, Math.floor((finAno - ahora.getTime()) / 1000));

  const regla = config.flexionesPorDia;
  // Incluye las de hoy: el total cuenta desde el día 1 hasta el día actual.
  const flexiones =
    regla === 'igual-al-dia' ? (dia * (dia + 1)) / 2 : typeof regla === 'number' ? dia * regla : null;
  const flexionesHoy = regla === 'igual-al-dia' ? dia : typeof regla === 'number' ? regla : null;

  return {
    dia,
    totalDias,
    completado,
    flexiones,
    flexionesHoy,
    porcentaje: completado ? 100 : (dia / totalDias) * 100,
    hito: estadoHito,
    cuenta: {
      dias: Math.floor(restante / 86_400),
      horas: Math.floor((restante % 86_400) / 3_600),
      minutos: Math.floor((restante % 3_600) / 60),
      segundos: restante % 60,
    },
  };
}

const formatoPct = new Intl.NumberFormat('es-EC', { maximumFractionDigits: 1 });
const formatoMiles = new Intl.NumberFormat('es-EC');
export const miles = (n: number) => formatoMiles.format(n);
export const pct = (n: number) => `${formatoPct.format(n)}%`;
export const dosDigitos = (n: number) => String(n).padStart(2, '0');
