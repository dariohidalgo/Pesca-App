import { POSTS } from './posts';
import { DAMS_DATA } from './damsData';
import { RIG_TUTORIALS } from './rigTutorials';

const knots = [
  { id: 'medio-nudo-barril-asegurado', name: 'Medio nudo barril asegurado', description: 'Nudo simple y resistente para sujetar anzuelos y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-palomar', name: 'Nudo Palomar', description: 'Rápido de hacer y suficientemente sólido para la mayoría de las situaciones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-centauri', name: 'Nudo Centauri', description: 'Ideal para anzuelos pequeños y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-uni', name: 'Nudo Uni', description: 'Ampliamente utilizado para sujetar anzuelos, anillas y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'bucle-perfection', name: 'Bucle Perfection', description: 'Utilizado para sujetar señuelos a monofilamentos gruesos mediante un bucle.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-de-cirujano', name: 'Nudo de Cirujano', description: 'Muy simple y rápido para construir bajos de línea de mosca.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-albright', name: 'Nudo Albright', description: 'Método para unir una línea fina a un monofilamento más grueso.', category: 'Nudos', path: '/nudos' },
];

const damGuides = DAMS_DATA.map(d => ({
  id: d.id,
  name: d.name,
  description: d.shortDescription,
  category: 'Diques',
  path: `/diques/${d.id}`
}));

const rigItems = RIG_TUTORIALS.map(r => ({
  id: r.id,
  name: r.title,
  description: r.subtitle,
  category: 'Líneas',
  path: `/lineas/${r.id}`
}));

const species = [
  { id: 'pejerrey', name: 'Pejerrey', description: 'La especie estrella de los diques cordobeses. Talla mínima 25cm.', category: 'Especies', path: '/reglamento' },
  { id: 'tararira', name: 'Tararira (Tarucha)', description: 'Predador agresivo. Pesca y devolución obligatoria.', category: 'Especies', path: '/reglamento' },
  { id: 'carpa', name: 'Carpa', description: 'Especie exótica sin límite de captura. Gran fuerza.', category: 'Especies', path: '/reglamento' },
  { id: 'trucha', name: 'Trucha', description: 'Común, Arco Iris y Fontinalis. Temporada reducida.', category: 'Especies', path: '/reglamento' },
];

const pages = [
  { id: 'pronostico', name: 'Pronóstico de Pique', description: 'Condiciones climáticas para la pesca deportiva.', category: 'Secciones', path: '/' },
  { id: 'mapa', name: 'Mapa de Puntos Útiles', description: 'Accesos públicos, bajadas de lanchas, campings y servicios.', category: 'Secciones', path: '/mapa' },
  { id: 'calendario', name: 'Calendario Solunar', description: 'Fases de la luna y mejores horarios de pique.', category: 'Secciones', path: '/calendario' },
  { id: 'diques', name: 'Guías y Nivel de Diques', description: 'Guías completas por dique y estado actual de los embalses en Córdoba.', category: 'Secciones', path: '/diques' },
  { id: 'lineas', name: 'Tutoriales de Líneas', description: 'Esquemas visuales y paso a paso para armar líneas de pesca.', category: 'Secciones', path: '/lineas' },
  { id: 'planificador', name: 'Planificador de Salida', description: 'Organizá tu jornada: equipo necesario, montajes, accesos y checklist.', category: 'Secciones', path: '/planificador' },
  { id: 'partes', name: 'Partes de Pesca', description: 'Reportes de pesca reales y fechados por dique y modalidad.', category: 'Secciones', path: '/partes' },
  { id: 'botes', name: 'Guías y Botes', description: 'Directorio de servicios de alquiler de embarcaciones.', category: 'Secciones', path: '/botes' },
  { id: 'nudos', name: 'Catálogo de Nudos', description: 'Guía paso a paso para atar nudos de pesca.', category: 'Secciones', path: '/nudos' },
  { id: 'reglamento', name: 'Reglamento y Permisos', description: 'Leyes de pesca, cupos, vedas y carnet provincial.', category: 'Secciones', path: '/reglamento' },
];

const blogPosts = POSTS.map(p => ({
  id: p.slug,
  name: p.title,
  description: p.description,
  category: 'Blog',
  path: `/blog/${p.slug}`
}));

export const searchIndex = [
  ...damGuides,
  ...rigItems,
  ...knots,
  ...species,
  ...pages,
  ...blogPosts
];

export function search(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  return searchIndex.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  ).slice(0, 8);
}
