// Todos los datos editables de la página.

export interface Video {
  /** Link del reel o post de Instagram. */
  url: string;
  /** Día del reto que aparece en la tarjeta. */
  dia?: number;
  titulo?: string;
  /** Imagen de portada vertical en public/ (ej. "/videos/dia-290.jpg"). Opcional. */
  portada?: string;
}

export interface Lugar {
  /** Código de país: EC, US, CL (otros se muestran como texto). */
  pais: string;
  nombrePais: string;
  ciudad?: string;
  /** Foto en public/ (ej. "/fotos/nueva-york.jpg"). Si el archivo no existe, se usa un fondo con la bandera. */
  foto?: string;
  /** Día del reto en que entrenó ahí. Opcional. */
  dia?: number;
  /** Encuadre de la foto (CSS object-position), ej. '60% 40%'. Por defecto, centrada. */
  enfoque?: string;
}

export interface FotoHistoria {
  foto: string;
  pie: string;
  /** Encuadre de la foto (CSS object-position). Por defecto, '50% 30%'. */
  enfoque?: string;
}

/**
 * Las fotos se buscan en public/. Basta con copiar el archivo con el nombre indicado.
 * En `npm run dev` se ven recuadros punteados donde falta una foto o un texto;
 * en el sitio publicado esos recuadros no aparecen.
 */
export const config = {
  nombre: 'Henry Guayllas',
  marca: 'Team Henry',
  /** Día 1 del reto (AAAA-MM-DD, en la zona horaria de abajo). */
  fechaInicio: '2026-01-01',
  totalDias: 365,
  hito: 300,
  zonaHoraria: 'America/Guayaquil',
  frase: 'Siempre hay una solución para todo, nunca pierdas las esperanzas',
  lema: 'Vida en movimiento',
  instagram: 'https://www.instagram.com/guayllas_henry/',
  facebook: 'https://www.facebook.com/profile.php?id=61594812574357',
  autor: { nombre: 'Pedro', url: 'https://facec.ec', usuario: '@[mi_usuario]' },
  /**
   * URL pública donde se publica la página (ej. "https://teamhenry.com").
   * WhatsApp y Facebook necesitan una URL absoluta para mostrar og.png.
   */
  urlSitio: '',
  /**
   * Cuántas flexiones hace por día, para mostrar el total acumulado:
   *  - 'igual-al-dia': el día N hace N flexiones (día 290 = 290 flexiones)
   *  - un número fijo, ej. 100
   *  - null: no se muestra el total
   */
  flexionesPorDia: 'igual-al-dia' as 'igual-al-dia' | number | null,
  historia: {
    titulo: 'De Ecuador al mundo',
    /** Párrafos cortos: de dónde es, por qué empezó el reto, qué lo motiva. */
    parrafos: [
      'La superación empieza por el cuerpo. Cuando entrenas, descubres que puedes más de lo que creías, y esa fuerza se queda contigo para todo lo demás.',
      'Por eso empecé este reto: 365 días seguidos de flexiones, sumando una más cada día. No se trata de ser el más fuerte, sino de no rendirse y cumplir aunque haya cansancio, viajes o días difíciles.',
      'Quiero que mi esfuerzo motive a otros a tomar estos principios (disciplina, constancia y fe en uno mismo) y llevarlos a su propia vida. Si yo puedo, tú también.',
    ] as string[],
    fotos: [
      { foto: '/fotos/raices.jpg', pie: 'Mis raíces' },
      { foto: '/fotos/new-york.jpg', pie: 'Hoy', enfoque: '60% 30%' },
    ] as FotoHistoria[],
  },
  /** Segundo bloque de la historia: gustos y forma de vivir. */
  loQueMeMueve: {
    titulo: 'Lo que me mueve',
    gustos: ['⚽ Fútbol', '🔥 Retos', '💃 Danza', '🌎 Recorrer lugares', '🤝 Amigos'],
    parrafos: [
      'Me gusta el fútbol, los retos y la danza, pero sobre todo recorrer lugares nuevos y compartir con mis amigos.',
      'Vivo cada día como si fuera el último. Disfrutar la vida es bonito porque aprovechas cada momento, cada persona y cada oportunidad que se te presenta.',
    ] as string[],
    /** Hasta 4 fotos: con 3 o 4 se arma un collage de 2×2. */
    fotos: [
      { foto: '/fotos/futbol-recorte.jpg', pie: 'Fútbol', enfoque: '50% 40%' },
      { foto: '/fotos/danza.jpg', pie: 'Danza', enfoque: '50% 35%' },
      { foto: '/fotos/lugar.jpg', pie: 'Recorrer lugares' },
      { foto: '/fotos/Motivacion.jpg', pie: 'Compartir' },
    ] as FotoHistoria[],
  },
  /** "El reto viaja": lugares donde ha entrenado. */
  lugares: [
    { pais: 'EC', nombrePais: 'Ecuador', ciudad: '', foto: '/fotos/raices.jpg', enfoque: '45% 30%' },
    { pais: 'US', nombrePais: 'EE. UU.', ciudad: 'Nueva York', foto: '/fotos/new-york.jpg', enfoque: '62% 40%' },
    { pais: 'US', nombrePais: 'EE. UU.', ciudad: 'Chicago', foto: '/fotos/chicago.jpg', enfoque: '68% 55%' },
    { pais: 'CL', nombrePais: 'Chile', ciudad: '', foto: '/fotos/Chile.jpg', enfoque: '50% 30%' },
  ] as Lugar[],
  /**
   * Carrusel de videos (el más reciente primero). Si está vacío, la sección no se muestra.
   * Ejemplo:
   * { url: 'https://www.instagram.com/reel/ABC123/', dia: 290, titulo: '290 flexiones', portada: '/videos/dia-290.jpg' },
   */
  videos: [
    { url: 'https://www.instagram.com/p/Dep4sCMyYKG/', dia: 290, titulo: 'Día 290 de 365 💪', portada: '/videos/dia-290.jpg' },
    { url: 'https://www.instagram.com/p/DenauGxSamZ/', dia: 289, titulo: 'En el local Wikis Sport', portada: '/videos/dia-289.jpg' },
    { url: 'https://www.instagram.com/p/Deml2oIyrbq/', dia: 288, titulo: 'Rumbo al día 300', portada: '/videos/dia-288.jpg' },
  ] as Video[],
};
