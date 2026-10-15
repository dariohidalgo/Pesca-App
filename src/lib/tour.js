import { driver } from 'driver.js';

export const TOUR_STORAGE_KEY = 'pescaapp_tour_seen';

/**
 * Retorna los 4 pasos del tour interactivo de onboarding en español.
 */
export function getTourSteps() {
  return [
    {
      element: () => document.querySelector('#tour-dique-cota'),
      popover: {
        title: 'Selector de Dique y Cota',
        description:
          'Desde acá podés cambiar el espejo de agua para consultar el pronóstico específico, el nivel actual respecto al vertedero y el índice de pique estimado.',
        side: 'bottom',
        align: 'end',
      },
    },
    {
      element: () => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (isDesktop) {
          return document.querySelector('#tour-nav-clima-pique');
        }
        return document.querySelector('#tour-mobile-menu-btn');
      },
      popover: {
        title: 'Menú Clima y Pique / Partes',
        description:
          'Accedé al pronóstico meteorológico, calendario solunar y reportes reales de otros pescadores, o subí tu propio parte de pesca.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: () => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (isDesktop) {
          return document.querySelector('#tour-nav-lugares-tecnica');
        }
        return document.querySelector('#tour-mobile-menu-btn');
      },
      popover: {
        title: 'Menú Lugares y Técnica',
        description:
          'Descubrí el mapa interactivo (con puestos de carnada, bajadas y botes) y los catálogos de nudos y líneas disponibles para consultar incluso offline.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: () => {
        const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
        if (isDesktop) {
          return document.querySelector('#tour-search-button');
        }
        return (
          document.querySelector('#tour-search-button-mobile') ||
          document.querySelector('#tour-search-button')
        );
      },
      popover: {
        title: 'Buscador Rápido (Ctrl+K)',
        description:
          'Presioná Ctrl+K en cualquier momento para encontrar diques, líneas, nudos o normativas oficiales de pesca al instante.',
        side: 'bottom',
        align: 'end',
      },
    },
  ];
}

/**
 * Ejecuta el tour interactivo con driver.js.
 */
export function runDriverTour() {
  if (typeof window === 'undefined') return null;

  try {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  } catch {
    // Entorno restringido sin acceso a localStorage
  }

  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayColor: 'rgba(15, 23, 42, 0.75)',
    stagePadding: 8,
    stageRadius: 12,
    nextBtnText: 'Siguiente',
    prevBtnText: 'Anterior',
    doneBtnText: 'Finalizar',
    progressText: '{{current}} de {{total}}',
    popoverClass: 'pescaapp-tour-popover',
    steps: getTourSteps(),
    onDestroyed: () => {
      try {
        localStorage.setItem(TOUR_STORAGE_KEY, 'true');
      } catch {
        // Ignorar en entornos sin acceso a localStorage
      }
    },
  });

  driverObj.drive();
  return driverObj;
}

/**
 * Inicia el tour asegurando que el usuario esté en la página de inicio.
 * @param {Function} [navigate] - Función de navegación de react-router-dom
 */
export function startTour(navigate) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  } catch {
    // Ignorar en entornos sin acceso a localStorage
  }

  const launch = () => {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    runDriverTour();
  };

  if (window.location.pathname !== '/') {
    if (typeof navigate === 'function') {
      navigate('/');
      setTimeout(launch, 250);
    } else {
      window.location.href = '/';
    }
  } else {
    launch();
  }
}
