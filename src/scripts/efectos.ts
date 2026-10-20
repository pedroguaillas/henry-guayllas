// Animaciones al hacer scroll e inclinación 3D de las fotos.
// Los estilos están en src/styles/global.css (sección "Efectos").

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const punteroFino = matchMedia('(hover: hover) and (pointer: fine)').matches;

if (!reducido) {
  document.documentElement.classList.add('js-efectos');
  revelarAlHacerScroll();
  if (punteroFino) inclinarConMouse();
}

function revelarAlHacerScroll() {
  const elementos = document.querySelectorAll<HTMLElement>('[data-revelar]');
  if (!('IntersectionObserver' in window)) {
    elementos.forEach((el) => el.setAttribute('data-visible', ''));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const { isIntersecting, target } of entradas) {
        if (!isIntersecting) continue;
        const el = target as HTMLElement;
        el.setAttribute('data-visible', '');
        observador.unobserve(el);
        // Quita el retraso escalonado para que el hover posterior responda al instante.
        setTimeout(() => el.style.removeProperty('--retraso'), 1600);
      }
    },
    { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
  );
  elementos.forEach((el) => observador.observe(el));
}

function inclinarConMouse() {
  const maximo = 14; // grados
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    let objetivo = { rx: 0, ry: 0, brillo: 0 };
    let actual = { rx: 0, ry: 0, brillo: 0 };
    let cuadro = 0;

    // Interpolación suave hacia el objetivo, en vez de una transición CSS.
    const animar = () => {
      actual.rx += (objetivo.rx - actual.rx) * 0.15;
      actual.ry += (objetivo.ry - actual.ry) * 0.15;
      actual.brillo += (objetivo.brillo - actual.brillo) * 0.15;
      el.style.setProperty('--rx', `${actual.rx.toFixed(2)}deg`);
      el.style.setProperty('--ry', `${actual.ry.toFixed(2)}deg`);
      el.style.setProperty('--brillo', actual.brillo.toFixed(3));
      const quieto =
        Math.abs(objetivo.rx - actual.rx) < 0.05 &&
        Math.abs(objetivo.ry - actual.ry) < 0.05 &&
        Math.abs(objetivo.brillo - actual.brillo) < 0.005;
      cuadro = quieto ? 0 : requestAnimationFrame(animar);
    };
    const pedir = () => {
      if (!cuadro) cuadro = requestAnimationFrame(animar);
    };

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      objetivo = { rx: (0.5 - y) * maximo, ry: (x - 0.5) * maximo, brillo: 1 };
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      pedir();
    });
    el.addEventListener('pointerleave', () => {
      objetivo = { rx: 0, ry: 0, brillo: 0 };
      pedir();
    });
  });
}
