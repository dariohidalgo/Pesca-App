import { POSTS } from './posts';

const knots = [
  { id: 'medio-nudo-barril-asegurado', name: 'Medio nudo barril asegurado', description: 'Nudo simple y resistente para sujetar anzuelos y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-palomar', name: 'Nudo Palomar', description: 'Rápido de hacer y suficientemente sólido para la mayoría de las situaciones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-centauri', name: 'Nudo Centauri', description: 'Ideal para anzuelos pequeños y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-uni', name: 'Nudo Uni', description: 'Ampliamente utilizado para sujetar anzuelos, anillas y emerillones.', category: 'Nudos', path: '/nudos' },
  { id: 'bucle-perfection', name: 'Bucle Perfection', description: 'Utilizado para sujetar señuelos a monofilamentos gruesos mediante un bucle.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-de-cirujano', name: 'Nudo de Cirujano', description: 'Muy simple y rápido para construir bajos de línea de mosca.', category: 'Nudos', path: '/nudos' },
  { id: 'nudo-albright', name: 'Nudo Albright', description: 'Método para unir una línea fina a un monofilamento más grueso.', category: 'Nudos', path: '/nudos' },
];

const locations = [
  { id: 'san-roque', name: 'Dique San Roque', description: 'El dique más cercano a Córdoba capital. Ideal para pejerrey y carpas.', category: 'Pesqueros', path: '/mapa' },
  { id: 'los-molinos', name: 'Dique Los Molinos', description: 'Excelente pesquero en el Valle de Calamuchita.', category: 'Pesqueros', path: '/mapa' },
  { id: 'embalse', name: 'Embalse de Río Tercero', description: 'El embalse más grande de Córdoba.', category: 'Pesqueros', path: '/mapa' },
  { id: 'cruz-del-eje', name: 'Dique Cruz del Eje', description: 'Famoso por pejerreyes lomo negro de gran tamaño.', category: 'Pesqueros', path: '/mapa' },
  { id: 'pichanas', name: 'Dique Pichanas', description: 'Entorno salvaje y aguas cristalinas.', category: 'Pesqueros', path: '/mapa' },
];

const species = [
  { id: 'pejerrey', name: 'Pejerrey', description: 'La especie estrella de los diques cordobeses. Talla mínima 25cm.', category: 'Especies', path: '/reglamento' },
  { id: 'tararira', name: 'Tararira (Tarucha)', description: 'Predador agresivo. Pesca y devolución obligatoria.', category: 'Especies', path: '/reglamento' },
  { id: 'carpa', name: 'Carpa', description: 'Especie exótica sin límite de captura. Gran fuerza.', category: 'Especies', path: '/reglamento' },
  { id: 'trucha', name: 'Trucha', description: 'Común, Arco Iris y Fontinalis. Temporada reducida.', category: 'Especies', path: '/reglamento' },
];

const pages = [
  { id: 'pronostico', name: 'Pronóstico de Pique', description: 'Condiciones climáticas para la pesca deportiva.', category: 'Secciones', path: '/' },
  { id: 'calendario', name: 'Calendario Solunar', description: 'Fases de la luna y mejores horarios de pique.', category: 'Secciones', path: '/calendario' },
  { id: 'diques', name: 'Nivel de Diques', description: 'Estado actual de los embalses en Córdoba.', category: 'Secciones', path: '/diques' },
  { id: 'botes', name: 'Guías y Botes', description: 'Directorio de servicios de alquiler de embarcaciones.', category: 'Secciones', path: '/botes' },
  { id: 'reglamento', name: 'Reglamento y Permisos', description: 'Leyes de pesca, cupos, vedas y carnet provincial.', category: 'Secciones', path: '/reglamento' },
];

const blogPosts = POSTS.map(p => ({
  id: p.slug,
  name: p.title,
  description: p.description,
  category: 'Blog',
  path: `/blog/${p.slug}`
}));

export const searchIndex = [...knots, ...locations, ...species, ...pages, ...blogPosts];

export function search(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  return searchIndex.filter(item =>
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.category.toLowerCase().includes(q)
  ).slice(0, 8);
}
