/**
 * Puntos de interés y pesqueros útiles categorizados y geolocalizados en Córdoba.
 * Categorías requeridas:
 * - acceso_publico: Accesos públicos para pesca
 * - bajada_embarcacion: Bajadas de embarcaciones
 * - estacionamiento: Estacionamientos
 * - camping: Campings y áreas recreativas
 * - servicio: Servicios relacionados con la pesca (alquiler, carnadas, proveeduría)
 */

export const POINT_CATEGORIES = {
  acceso_publico: {
    id: 'acceso_publico',
    label: 'Accesos públicos',
    icon: 'MapPin',
    color: 'emerald',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
  },
  bajada_embarcacion: {
    id: 'bajada_embarcacion',
    label: 'Bajadas de botes',
    icon: 'Anchor',
    color: 'blue',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
  },
  estacionamiento: {
    id: 'estacionamiento',
    label: 'Estacionamientos',
    icon: 'Car',
    color: 'purple',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800'
  },
  camping: {
    id: 'camping',
    label: 'Campings y ribera',
    icon: 'Tent',
    color: 'amber',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
  },
  servicio: {
    id: 'servicio',
    label: 'Servicios y carnadas',
    icon: 'Fish',
    color: 'teal',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950 dark:text-teal-300 dark:border-teal-800'
  }
};

export const USEFUL_POINTS = [
  // --- DIQUE SAN ROQUE ---
  {
    id: 'sr-acceso-paredon',
    name: 'Costa del Paredón y Mirador Garganta',
    damId: 'san-roque',
    category: 'acceso_publico',
    coordinates: [-31.3785, -64.4447],
    description: 'Acceso peatonal libre desde la ruta E-55. Orilla con piedras de fondo limpio y profundidad inmediata. Tradicional para pejerrey a fondo o flote cuando hay viento norte.',
    isVerified: true,
    source: 'Cartografía vial oficial ruta E-55 y accesos públicos',
    verificationDate: '2026-03-15',
    fee: 'Gratuito',
    facilities: ['Barandas de seguridad', 'Iluminación pública', 'Acceso peatonal']
  },
  {
    id: 'sr-bajada-club-nautico',
    name: 'Bajada Rampa Club Náutico Córdoba',
    damId: 'san-roque',
    category: 'bajada_embarcacion',
    coordinates: [-31.4022, -64.4789],
    description: 'Rampa de hormigón consolidada para botadura de lanchas, trackers y veleros. Servicio de tractor y pluma para embarcaciones.',
    isVerified: true,
    source: 'Secretaría Náutica de Córdoba / Club Náutico',
    verificationDate: '2026-03-12',
    fee: 'Arancelado para no socios',
    facilities: ['Rampa de hormigón', 'Servicio de tractor', 'Amarre de cortesía', 'Sanitarios']
  },
  {
    id: 'sr-estacionamiento-costanera-norte',
    name: 'Estacionamiento Costanera Carlos Paz (Plaza de los Palos)',
    damId: 'san-roque',
    category: 'estacionamiento',
    coordinates: [-31.4110, -64.4850],
    description: 'Playón pavimentado frente al lago, apto para estacionar vehículos con trailers ligeros durante el día.',
    isVerified: true,
    source: 'Municipalidad de Villa Carlos Paz',
    verificationDate: '2026-02-28',
    fee: 'Tarifado municipal en temporada / Libre fuera de temporada',
    facilities: ['Asfalto', 'Iluminación LED', 'Cámaras de seguridad urbanas']
  },
  {
    id: 'sr-camping-aca',
    name: 'Camping Automóvil Club Argentino Carlos Paz',
    damId: 'san-roque',
    category: 'camping',
    coordinates: [-31.4085, -64.4720],
    description: 'Camping arbolado con salida directa al lago, asadores, sanitarios con agua caliente, tomacorrientes y bajada suave de kayaks.',
    isVerified: true,
    source: 'Guía oficial ACA / Verificado en campo',
    verificationDate: '2026-03-01',
    fee: 'Tarifa diaria de acampe',
    facilities: ['Asadores', 'Agua caliente', 'Tomas eléctricas', 'Vigilancia 24hs', 'Bajada de kayaks']
  },
  {
    id: 'sr-servicio-carnadas-e55',
    name: 'Puesto de Mojarras y Carnadas Vivas La Calera / E-55',
    damId: 'san-roque',
    category: 'servicio',
    coordinates: [-31.3550, -64.3510],
    description: 'Venta de mojarra viva embolsada con oxígeno, mojarra salada, masa carpera, plomadas y líneas armadas sobre la ruta hacia el dique.',
    isVerified: true,
    source: 'Comercio local relevado',
    verificationDate: '2026-03-18',
    fee: 'Comercial',
    facilities: ['Atención desde 05:30 hs', 'Oxigenador de transporte', 'Accesorios básicos']
  },
  {
    id: 'sr-playa-bialet-masse',
    name: 'Desembocadura Río Cosquín (Plaza Federal)',
    damId: 'san-roque',
    category: 'acceso_publico',
    coordinates: [-31.3280, -64.4570],
    description: 'Extensa playa de baja pendiente donde ingresa el río Cosquín. Muy buena para pesca de carpas en primavera.',
    isVerified: false,
    source: 'Aporte de pescadores de la zona - En proceso de corroboración de límites ribereños',
    verificationDate: '2026-03-05',
    fee: 'Gratuito',
    facilities: ['Playa de arena y tosca', 'Espacio para sombrilla']
  },

  // --- DIQUE LOS MOLINOS ---
  {
    id: 'lm-acceso-potrero',
    name: 'Costanera Pública Potrero de Garay (Punta del Agua)',
    damId: 'los-molinos',
    category: 'acceso_publico',
    coordinates: [-31.7960, -64.5580],
    description: 'Extensa franja costera de libre tránsito sobre camino ribereño. Costa con declive gradual y arboledas de sauce para sombra.',
    isVerified: true,
    source: 'Comuna de Potrero de Garay / Verificado en campo',
    verificationDate: '2026-03-20',
    fee: 'Gratuito',
    facilities: ['Sombra natural', 'Acceso para vehículos', 'Zona espaciosa']
  },
  {
    id: 'lm-bajada-club-pescadores',
    name: 'Rampa y Bajada Club Caza y Pesca Ciudad de América',
    damId: 'los-molinos',
    category: 'bajada_embarcacion',
    coordinates: [-31.8150, -64.5120],
    description: 'Bajada pavimentada con malacate y servicio de botadura para lanchas y botes. Alquiler de embarcaciones y guardería.',
    isVerified: true,
    source: 'Club Caza y Pesca Villa Ciudad de América',
    verificationDate: '2026-03-10',
    fee: 'Arancel de bajada',
    facilities: ['Rampa pavimentada', 'Malacate mecánico', 'Muelle de embarque', 'Cantina']
  },
  {
    id: 'lm-camping-bahia-espinillos',
    name: 'Camping Bahía Los Espinillos',
    damId: 'los-molinos',
    category: 'camping',
    coordinates: [-31.7720, -64.5830],
    description: 'Sector protegido de los vientos predominantes del sur. Cuenta con áreas de carpa, quinchos y bajada para kayaks.',
    isVerified: true,
    source: 'Administración del predio / Guía Córdoba Turismo',
    verificationDate: '2026-02-25',
    fee: 'Arancel diario de camping',
    facilities: ['Quinchos', 'Asadores', 'Sanitarios', 'Proveeduría', 'Bajada de kayak']
  },
  {
    id: 'lm-servicio-botes-potrero',
    name: 'Alquiler de Botes y Guía El Pescador (Potrero de Garay)',
    damId: 'los-molinos',
    category: 'servicio',
    coordinates: [-31.7910, -64.5490],
    description: 'Embarcaciones tipo trucker con motores 4 tiempos, matriculadas en Seguridad Náutica. Incluyen chalecos reglamentarios y ancla.',
    isVerified: true,
    source: 'Prestador registrado en Pesca Córdoba',
    verificationDate: '2026-03-15',
    fee: 'Alquiler por jornada / media jornada',
    facilities: ['Botes con motor', 'Chalecos homologados', 'Guía con ecosonda opcional']
  },
  {
    id: 'lm-estacionamiento-puente-espinillos',
    name: 'Sector de Estacionamiento Puente Río Los Espinillos',
    damId: 'los-molinos',
    category: 'estacionamiento',
    coordinates: [-31.7650, -64.5870],
    description: 'Banquina ensanchada y explanada junto al puente sobre el río para descenso a pie de pescadores de trucha y pejerrey.',
    isVerified: false,
    source: 'Aporte de usuarios - Precaución: respetar línea de banquina de vialidad',
    verificationDate: '2026-02-20',
    fee: 'Gratuito',
    facilities: ['Acceso peatonal a la costa']
  },

  // --- EMBALSE DE RÍO TERCERO ---
  {
    id: 'emb-acceso-playa-grande',
    name: 'Playa Grande y Costanera de Embalse',
    damId: 'embalse',
    category: 'acceso_publico',
    coordinates: [-32.1950, -64.4080],
    description: 'Acceso público municipal con buena extensión de costa para pescar tanto de fondo como de flote. Cerca del centro comercial de Embalse.',
    isVerified: true,
    source: 'Secretaría de Turismo de Embalse',
    verificationDate: '2026-03-18',
    fee: 'Gratuito',
    facilities: ['Estacionamiento contiguo', 'Bancos públicos', 'Comercios a 200m']
  },
  {
    id: 'emb-bajada-club-nautico',
    name: 'Rampa Club Náutico Embalse',
    damId: 'embalse',
    category: 'bajada_embarcacion',
    coordinates: [-32.1880, -64.4230],
    description: 'Excelente rampa de hormigón de suave pendiente, apta para botar embarcaciones con cualquier nivel del lago.',
    isVerified: true,
    source: 'Federación Cordobesa de Caza y Pesca (FECAPES)',
    verificationDate: '2026-03-14',
    fee: 'Arancel de bajada para visitantes',
    facilities: ['Rampa ancha de hormigón', 'Estacionamiento de trailers', 'Guardería náutica', 'Buffet']
  },
  {
    id: 'emb-camping-rumipal',
    name: 'Balneario Municipal y Camping Villa Rumipal',
    damId: 'embalse',
    category: 'camping',
    coordinates: [-32.1820, -64.4850],
    description: 'Enorme predio frente a una bahía mansa, muy elegido por pescadores que van en familia o en kayak.',
    isVerified: true,
    source: 'Municipalidad de Villa Rumipal',
    verificationDate: '2026-03-08',
    fee: 'Entrada por persona/vehículo en temporada',
    facilities: ['Sanitarios completos', 'Asadores', 'Arboleda añeja', 'Bajada suave de arena']
  },
  {
    id: 'emb-servicio-guias-calamuchita',
    name: 'Servicio de Guías de Pesca Deportiva Calamuchita',
    damId: 'embalse',
    category: 'servicio',
    coordinates: [-32.2020, -64.4410],
    description: 'Salidas guiadas de pesca de pejerrey y tararira en tracker equipado. Incluye equipos, carnada fresca y limpieza de capturas.',
    isVerified: true,
    source: 'Asociación de Guías de Pesca del Valle de Calamuchita',
    verificationDate: '2026-03-12',
    fee: 'Contratación privada',
    facilities: ['Embarcación con ecosonda/GPS', 'Seguro de navegación', 'Equipos de pesca incluidos']
  },

  // --- DIQUE CRUZ DEL EJE ---
  {
    id: 'cde-acceso-murallon',
    name: 'Coronamiento y Perímetro Murallón Dique Arturo Illia',
    damId: 'cruz-del-eje',
    category: 'acceso_publico',
    coordinates: [-30.7687, -64.7346],
    description: 'Acceso peatonal habilitado sobre el extenso murallón del dique para pesca con caña de costa. Gran vista panorámica y profundidad inmediata.',
    isVerified: true,
    source: 'Geolocalización satelital verificada y cartografía de Dique Cruz del Eje',
    verificationDate: '2026-04-10',
    fee: 'Gratuito',
    facilities: ['Sendero peatonal', 'Iluminación nocturna', 'Barandas de contención']
  },
  {
    id: 'cde-bajada-club-icticola',
    name: 'Bajada Náutica Club Ictícola Cruz del Eje',
    damId: 'cruz-del-eje',
    category: 'bajada_embarcacion',
    coordinates: [-30.7645, -64.7395],
    description: 'Rampa de descenso para embarcaciones a motor, botes a remo y canoas sobre el embalse. Predio cerrado con asadores y sombra.',
    isVerified: true,
    source: 'Club Ictícola Cruz del Eje y geolocalización satelital',
    verificationDate: '2026-04-10',
    fee: 'Entrada y derecho de bajada',
    facilities: ['Rampa de hormigón', 'Asadores', 'Proveeduría', 'Sanitarios']
  },
  {
    id: 'cde-camping-playita',
    name: 'Camping y Balneario La Playita',
    damId: 'cruz-del-eje',
    category: 'camping',
    coordinates: [-30.7620, -64.7450],
    description: 'Zona con costa arenosa, mesas, asadores y sombra de algarrobos sobre la margen del lago. Muy propicia para pesca familiar y kayak.',
    isVerified: true,
    source: 'Turismo Cruz del Eje y geolocalización satelital',
    verificationDate: '2026-04-10',
    fee: 'Arancel módico municipal',
    facilities: ['Asadores', 'Mesas y bancos', 'Baños públicos']
  },

  // --- DIQUE PICHANAS ---
  {
    id: 'pich-acceso-paredon',
    name: 'Acceso Costero Murallón Pichanas',
    damId: 'pichanas',
    category: 'acceso_publico',
    coordinates: [-30.9142, -65.1755],
    description: 'Acceso al murallón del dique por camino rural consolidado. Costa agreste y rocosa con bajada peatonal directa a las aguas profundas del cañón.',
    isVerified: true,
    source: 'Geolocalización satelital verificada y cartografía de Dique Pichanas',
    verificationDate: '2026-04-10',
    fee: 'Gratuito',
    facilities: ['Entorno 100% agreste', 'Sin servicios fijos (llevar provisiones y agua)']
  },
  {
    id: 'pich-bajada-natural',
    name: 'Bajada Natural de Embarcaciones Pichanas',
    damId: 'pichanas',
    category: 'bajada_embarcacion',
    coordinates: [-30.9125, -65.1785],
    description: 'Bajada de tierra y ripio compactado para trailers livianos o kayaks sobre la margen del embalse. Se recomienda vehículo con buena tracción.',
    isVerified: true,
    source: 'Relevamiento territorial Asociación de Pescadores del Noroeste Cordobés',
    verificationDate: '2026-04-10',
    fee: 'Gratuito',
    facilities: ['Playa de ripio firme', 'Ideal para kayak y botes inflables']
  }
];

export function getPointsByDam(damId) {
  if (!damId || damId === 'todos') return USEFUL_POINTS;
  return USEFUL_POINTS.filter(p => p.damId === damId);
}

export function getPointsByCategory(categoryId) {
  if (!categoryId || categoryId === 'todas') return USEFUL_POINTS;
  return USEFUL_POINTS.filter(p => p.category === categoryId);
}
