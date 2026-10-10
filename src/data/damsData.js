/**
 * Base de datos estructurada de Diques y Embalses de Córdoba
 * Fuentes oficiales: Secretaría de Ambiente de Córdoba, APRHI (Administración Provincial de Recursos Hídricos)
 */

import { UNVERIFIED_QUOTA_TEXT } from './officialRegulations.js';

export const DAMS_DATA = [
  {
    id: 'san-roque',
    slug: 'san-roque',
    name: 'Dique San Roque',
    department: 'Valle de Punilla / Villa Carlos Paz',
    status: 'published',
    updated: '2026-10-02',
    coordinates: [-31.385, -64.448],
    surfaceKm2: 16,
    maxDepthMeters: 35.3,
    shortDescription: 'El embalse más emblemático y accesible del Valle de Punilla. Ideal para la pesca de pejerrey en temporada fría y carpas gigantes en primavera y verano.',
    fullDescription: 'Ubicado a escasos 35 km de Córdoba Capital, el Dique San Roque es un lago artificial alimentado por los ríos San Antonio, Cosquín, Las Mojarras y Los Chorrillos. Su pesca deportiva cuenta con una enorme tradición provincial. Presenta zonas de aguas profundas cerca de la Garganta y el Vertedero (El Embudo), y bahías más bajas y con vegetación en el Club Náutico, Bialet Massé y Parque Síquiman.',
    fishingModalities: [
      {
        type: 'costa',
        name: 'Pesca de costa',
        available: true,
        notes: 'Muy concurrida en el Paredón, Garganta, Plaza Federal (Bialet Massé) y costas de Carlos Paz. Se practica principalmente de fondo para carpas o con líneas de flote / paternoster para pejerrey cuando el viento acerca el cardumen.'
      },
      {
        type: 'embarcado',
        name: 'Pesca embarcada (Bote / Tracker)',
        available: true,
        notes: 'Permite buscar cardúmenes de pejerrey en zonas profundas (El Embudo, centro del lago) con líneas paternoster o chirimbolo. Varias guarderías y clubes alquilan botes con y sin motor.'
      },
      {
        type: 'kayak',
        name: 'Pesca en kayak',
        available: true,
        notes: 'Excelente para recorrer bahías reparadas del viento (Bahía del Gitano, San Roque pueblo). Se deben cumplir las recomendaciones de seguridad náutica de Prefectura Naval Argentina (chaleco DAF colocado, silbato, cabo de amarre) articuladas con la Dirección de Seguridad Náutica de Córdoba, respetando la distancia preventiva al embudo y vertedero.'
      }
    ],
    species: [
      {
        name: 'Pejerrey (Odontesthes bonariensis)',
        status: 'Abundante',
        season: 'Mayo a Septiembre (temporada alta)',
        techniques: ['Línea de flote 3 boyas', 'Paternoster regulable', 'Línea de vuelo'],
        bait: 'Mojarra viva, mojarra salada, filete de pejerrey teñido de rojo',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Talla mínima legal: 25 cm.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 250/2024'
      },
      {
        name: 'Carpa común (Cyprinus carpio)',
        status: 'Muy abundante',
        season: 'Octubre a Abril',
        techniques: ['Línea de fondo con resorte feeder', 'Línea coreana', 'Peces a la vista con mosca'],
        bait: 'Maíz remojado/fermentado, masa casera con vainilla o anís, boilies',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sin restricción de talla.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Tararira (Hoplias argentinensis)',
        status: 'Moderada / En recuperación',
        season: 'Noviembre a Marzo (días calurosos)',
        techniques: ['Spinning con señuelos de superficie', 'Baitcasting', 'Flote con boya plop'],
        bait: 'Señuelos paseantes, ranas de goma con antienganche, carnada blanca',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sujeta a veda reproductiva primaveral.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Bagre sapo y moncholo (Rhamdia quelen)',
        status: 'Frecuente',
        season: 'Todo el año (comportamiento biológico crepuscular; pesca deportiva autorizada exclusivamente en horario diurno hasta la puesta del sol por veda nocturna provincial)',
        techniques: ['Línea de fondo pesada'],
        bait: 'Lombriz de tierra, tripa de pollo, corazón vacuno',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Pesca deportiva exclusivamente diurna (Res. N° 01/2024).`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 01/2024'
      }
    ],
    publicAccess: [
      {
        name: 'Paredón del Dique y Garganta',
        type: 'Costa pública',
        description: 'Acceso peatonal libre sobre la ruta provincial E-55. Muy rendidor para pejerrey a fondo o flote cuando sopla viento norte.',
        restrictions: 'Prohibido ingresar a zonas de compuertas y tomas de agua. Respetar barandas de seguridad.',
        verified: true
      },
      {
        name: 'Costanera de Villa Carlos Paz (Bahía del Gitano)',
        type: 'Paseo público',
        description: 'Ribera pública urbana con bancos, césped e iluminación nocturna.',
        restrictions: 'Zona de alta concurrencia turística; evitar lanzar cerca de embarcaciones a remo recreativas.',
        verified: true
      },
      {
        name: 'Plaza Federal (Bialet Massé / San Roque)',
        type: 'Costa pública',
        description: 'Acceso amplio con playa de baja profundidad en el ingreso del río Cosquín.',
        restrictions: 'Depende del nivel de cota del embalse; en bajante el suelo puede ser fangoso.',
        verified: true
      }
    ],
    shoreAndBoatOptions: {
      shore: 'Las mejores zonas de costa habilitadas son el paredón antiguo, la margen este por Ruta E-55 y las playitas de Villa Parque Síquiman.',
      boat: 'Existen clubes náuticos federados (Club Náutico Córdoba, Club de Pescadores) y guarderías privadas en Carlos Paz y Costa Azul con bajadas pavimentadas.',
      kayak: 'Bajada recomendada en Bahía del Gitano o camping del Automóvil Club Argentino.'
    },
    directions: 'Desde Córdoba Capital: tomar Autovía Córdoba-Carlos Paz (RN 20, 35 km) o Ruta Provincial E-55 por La Calera bordeando el río Suquía hasta el paredón del dique.',
    services: [
      'Alquiler de botes y lanchas con timonel',
      'Bajadas públicas y privadas de lanchas',
      'Venta de carnadas vivas en Carlos Paz y Ruta E-55',
      'Estacionamientos pagos y áreas de sombra',
      'Proveedurías y gastronomía ribereña'
    ],
    recommendedGear: [
      {
        title: 'Pejerrey de flote',
        gear: 'Caña telescópica 4.00 a 4.50 m, reel frontal cargado con monofilamento 0.23 o multi 0.12',
        rigId: 'flote-pejerrey-tres-boyas',
        rigName: 'Línea de flote de 3 boyas'
      },
      {
        title: 'Pejerrey de profundidad',
        gear: 'Caña de 3.60 a 4.00 m de puntera sensible, reel frontal pequeño',
        rigId: 'paternoster-pejerrey',
        rigName: 'Línea Paternoster regulable'
      },
      {
        title: 'Carpa de fondo',
        gear: 'Caña de lance de costa 3.00 a 3.60 m, reel mediano cargado con nylon 0.35 mm',
        rigId: 'fondo-carpa-feeder',
        rigName: 'Línea de fondo con resorte feeder'
      }
    ],
    regulations: {
      permitRequired: 'Carnet de pesca deportiva digital obligatorio expedido por la Provincia de Córdoba.',
      officialPortal: 'https://cazaypesca.cba.gov.ar',
      officialPortalName: 'Portal Oficial Caza y Pesca Córdoba',
      tourismPortal: 'https://cordobaturismo.gov.ar/lagos-y-lagunas-de-cordoba/',
      vedaNote: 'Veda nocturna permanente. Veda total de pejerrey del 1 de septiembre al 30 de noviembre, y veda de costas de septiembre a diciembre (Resolución N° 318/2026).',
      safetyNotice: 'Seguridad náutica bajo Ley Provincial N° 5040 / Dto. 4531. Lanchas a motor: matrícula, timonel, salvavidas reglamentarios, matafuego 1kg ABC, achique y sistema de fondeo. Kayaks: chaleco DAF colocado en todo momento, silbato adosado y navegación exclusivamente diurna. Recomendaciones prácticas de seguridad complementarias: cabo de fondeo con zafado rápido y leash para palas.'
    },
    verification: {
      source: 'Resolución N° 318/2026 (Secretaría de Ambiente) y Ley Provincial N° 5040 (Dirección de Seguridad Náutica)',
      sourceUrl: 'https://cazaypesca.cba.gov.ar',
      tourismUrl: 'https://cordobaturismo.gov.ar/lagos-y-lagunas-de-cordoba/',
      lastVerified: 'Resolución N° 318/2026',
      status: 'documental'
    },
    dynamicNotice: 'Los horarios de clubes, costos de bajadas particulares y niveles de agua varían según la temporada y lluvias en cuenca alta. Consultá la sección de Nivel de Diques antes de viajar.'
  },
  {
    id: 'los-molinos',
    slug: 'los-molinos',
    name: 'Dique Los Molinos',
    department: 'Valle de Calamuchita / Potrero de Garay',
    status: 'published',
    updated: '2026-10-02',
    coordinates: [-31.816, -64.551],
    surfaceKm2: 24.5,
    maxDepthMeters: 53.0,
    shortDescription: 'Famoso por sus pejerreyes vigorosos y de gran porte en aguas profundas y cristalinas. Excelente infraestructura en Potrero de Garay y Villa Ciudad de América.',
    fullDescription: 'Ubicado en el Valle de Calamuchita sobre la Ruta Provincial 5, el Dique Los Molinos es uno de los destinos predilectos para pescadores deportivos de toda la región central. Su cota profunda y aguas bien oxigenadas favorecen la presencia de pejerreyes robustos y combativos, además de carpas y tarariras en sus remansos costeros.',
    fishingModalities: [
      {
        type: 'costa',
        name: 'Pesca de costa',
        available: true,
        notes: 'Rendidores accesos sobre el paredón, Bahía de Los Espinillos y playas de Potrero de Garay. Se aconseja utilizar cañas largas para superar la rompiente costera.'
      },
      {
        type: 'embarcado',
        name: 'Pesca embarcada (Bote / Tracker)',
        available: true,
        notes: 'La modalidad reina en Los Molinos. Gran cantidad de clubes y paradores náuticos ofrecen alquiler de botes a motor, trackers con guía y amarras diarias.'
      },
      {
        type: 'kayak',
        name: 'Pesca en kayak',
        available: true,
        notes: 'Muy productiva en las bahías de Potrero de Garay y Río Los Espinillos. Se deben aplicar las recomendaciones de Prefectura Naval Argentina para kayakistas deportivos (chaleco DAF reglamentario 100% del tiempo, silbato, cabo de fondeo/remolque y cabo de vida) complementadas con la normativa de la Dirección de Seguridad Náutica de Córdoba; ante viento pampero o sur repentino, regresar inmediatamente a la orilla.'
      }
    ],
    species: [
      {
        name: 'Pejerrey (Odontesthes bonariensis)',
        status: 'Abundante y de excelente porte',
        season: 'Mayo a Octubre',
        techniques: ['Línea Paternoster de profundidad (8 a 15 metros)', 'Línea balancín', 'Flote con boyas cometa'],
        bait: 'Mojarra viva grande, filete salado plateado, camarón de río',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Talla mínima legal: 25 cm.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 250/2024'
      },
      {
        name: 'Carpa común (Cyprinus carpio)',
        status: 'Muy abundante',
        season: 'Noviembre a Marzo',
        techniques: ['Fondo con masa pesada', 'Línea de resorte'],
        bait: 'Masa dulce con esencia de chocolate o vainilla, maíz remojado',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sin restricción de talla.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Tararira (Hoplias argentinensis)',
        status: 'Moderada en colas de ríos y bahías bajas',
        season: 'Diciembre a Marzo',
        techniques: ['Cucharas giratorias', 'Señuelos blandos antienganche'],
        bait: 'Filete fresco, ranitas de goma',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sujeta a veda primaveral.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      }
    ],
    publicAccess: [
      {
        name: 'Costanera de Potrero de Garay',
        type: 'Costa pública',
        description: 'Kilómetros de costa abierta y accesible por caminos de ripio consolidados con sombra de sauces y álamos.',
        restrictions: 'Prohibido hacer fuego fuera de asadores autorizados.',
        verified: true
      },
      {
        name: 'Paredón Dique Los Molinos (Miradores RP 5)',
        type: 'Punto panorámico / Costa',
        description: 'Vistas panorámicas sobre la ruta con sendas de descenso pedregosas hacia las rocas del murallón.',
        restrictions: 'Descenso pronunciado con piedras sueltas; calzado adecuado obligatorio.',
        verified: true
      },
      {
        name: 'Desembocadura Río Los Espinillos',
        type: 'Acceso costero agreste',
        description: 'Zona de confluencia con aguas calmas y gran productividad en épocas de deshielo o lluvia templada.',
        restrictions: 'Cuidar el entorno natural; prohibido dejar residuos.',
        verified: true
      }
    ],
    shoreAndBoatOptions: {
      shore: 'Recomendado el sector de Potrero de Garay y la Bahía El Vergel para pesca familiar y deportiva.',
      boat: 'Club Náutico Los Molinos, Club Caza y Pesca Villa Ciudad de América y diversos paradores privados con bajada de lanchas pavimentada.',
      kayak: 'Bajada cómoda en playas de Potrero de Garay sin costo de amarra.'
    },
    directions: 'Desde Córdoba Capital: tomar Ruta Provincial 5 pasando por Alta Gracia y Villa Ciudad de América (aprox. 65 km, 1 hora de viaje).',
    services: [
      'Alquiler de botes sin y con timonel',
      'Múltiples clubes de pesca federados',
      'Proveedurías de carnada viva sobre RP 5',
      'Campings con sanitarios, parrillas y dormis',
      'Cabañas y hosterías con guardería náutica'
    ],
    recommendedGear: [
      {
        title: 'Paternoster de profundidad',
        gear: 'Caña de 3.90 m de carbono sensible, microesmerillones N° 12 y plomada 20-35 g',
        rigId: 'paternoster-pejerrey',
        rigName: 'Línea Paternoster regulable'
      },
      {
        title: 'Línea de flote clásica',
        gear: 'Caña 4.00 m, reel frontal micro, boyas medianas de color llamativo (fucsia/amarillo)',
        rigId: 'flote-pejerrey-tres-boyas',
        rigName: 'Línea de flote 3 boyas'
      }
    ],
    regulations: {
      permitRequired: 'Carnet de pesca digital obligatorio de la Provincia de Córdoba.',
      officialPortal: 'https://cazaypesca.cba.gov.ar',
      officialPortalName: 'Portal Oficial Caza y Pesca Córdoba',
      tourismPortal: 'https://cordobaturismo.gov.ar/experiencias/pesca-y-otras-actividades-en-el-dique-los-molinos/',
      vedaNote: 'Veda nocturna permanente. Veda reproductiva total de pejerrey del 1 de septiembre al 30 de noviembre en toda la cuenca (Resolución N° 318/2026).',
      safetyNotice: 'Seguridad náutica bajo Ley Provincial N° 5040: lanchas a motor requieren matriculación, timonel habilitado, salvavidas reglamentarios, matafuego 1kg ABC, achique y sistema de fondeo. En kayaks: uso ininterrumpido de chaleco DAF y silbato; navegación exclusivamente diurna.'
    },
    verification: {
      source: 'Resolución N° 318/2026 (Secretaría de Ambiente) y Ley Provincial N° 5040 (Dirección de Seguridad Náutica)',
      sourceUrl: 'https://cazaypesca.cba.gov.ar',
      tourismUrl: 'https://cordobaturismo.gov.ar/experiencias/pesca-y-otras-actividades-en-el-dique-los-molinos/',
      lastVerified: 'Resolución N° 318/2026',
      status: 'documental'
    },
    dynamicNotice: 'Precios de bajadas, combustible y alquiler de botes están sujetos a variación por cada prestador privado.'
  },
  {
    id: 'embalse',
    slug: 'embalse',
    name: 'Embalse de Río Tercero',
    department: 'Valle de Calamuchita / Embalse',
    status: 'published',
    updated: '2026-10-02',
    coordinates: [-32.227, -64.417],
    surfaceKm2: 56.0,
    maxDepthMeters: 46.5,
    shortDescription: 'El espejo de agua artificial más grande de la provincia de Córdoba. Variedad inagotable de bahías, islas y pesqueros rendidores de costa y embarcado.',
    fullDescription: 'Con sus 5.600 hectáreas de superficie, el Embalse del Río Tercero (o Ministro Pistarini) es el gigante del Valle de Calamuchita. Es nutrido por cinco ríos cordobeses: Santa Rosa, Grande, Amboy, Quillinzo y La Cruz. Ofrece condiciones excelentes para pesca de pejerrey, carpas monumentales y tarariras combativas.',
    fishingModalities: [
      {
        type: 'costa',
        name: 'Pesca de costa',
        available: true,
        notes: 'Costas accesibles en Playa Grande, Club Náutico Embalse, Villa Rumipal, Villa del Dique y El Torreón. Ideal para pesca de fondo o boya cometa.'
      },
      {
        type: 'embarcado',
        name: 'Pesca embarcada (Bote / Tracker)',
        available: true,
        notes: 'Permite acceder a pozos históricos, islas intermedias y desembocaduras de los ríos Quillinzo y Santa Rosa. Múltiples guías profesionales operan con lanchas tracking equipadas con ecosonda.'
      },
      {
        type: 'kayak',
        name: 'Pesca en kayak',
        available: true,
        notes: 'Muy disfrutable en las bahías protegidas de Villa Rumipal y Villa del Dique. Por el tamaño del lago, evitar alejarse a mar abierto en días ventosos.'
      }
    ],
    species: [
      {
        name: 'Pejerrey (Odontesthes bonariensis)',
        status: 'Muy abundante',
        season: 'Mayo a Noviembre',
        techniques: ['Paternoster', 'Flote con pilotín', 'Vuelo a media agua'],
        bait: 'Mojarra viva, filete teñido, pasta pejerreyera',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Talla mínima legal: 25 cm.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 250/2024'
      },
      {
        name: 'Carpa (Cyprinus carpio)',
        status: 'Abundante de gran porte (trofeos de +10 kg)',
        season: 'Octubre a Mayo',
        techniques: ['Línea de fondo carpera', 'Boilies y cebadores feeder'],
        bait: 'Maíz remojado aromatizado, pellets, masa de harinas combinadas',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sin restricción de talla.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Tararira (Hoplias argentinensis)',
        status: 'Frecuente en colas de ríos y juncales',
        season: 'Noviembre a Abril',
        techniques: ['Spinning y baitcasting con señuelos flotantes'],
        bait: 'Crankbaits antienganche, ranas de látex, señuelos de media agua',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sujeta a veda primaveral.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      }
    ],
    publicAccess: [
      {
        name: 'Playa Maldonado y Costanera de Embalse',
        type: 'Costa pública',
        description: 'Sector amplio con arboleda, bancos y fácil acceso desde la traza urbana.',
        restrictions: 'Prohibido arrojar basura y prender fuego en zonas no habilitadas.',
        verified: true
      },
      {
        name: 'Costanera de Villa Rumipal',
        type: 'Costa pública y balneario',
        description: 'Zona de aguas calmas frente al aeródromo, excelente para pesca familiar de costa.',
        restrictions: 'Respetar sectores boyados para bañistas durante la temporada estival.',
        verified: true
      },
      {
        name: 'Camping Municipal El Torreón',
        type: 'Área recreativa y bajada',
        description: 'Acceso a la orilla con servicios de camping, bajada natural y estacionamiento.',
        restrictions: 'Cobro de ingreso recreativo por vehículo en temporada estival.',
        verified: true
      }
    ],
    shoreAndBoatOptions: {
      shore: 'La costa es amplia a lo largo de las localidades de Embalse, Villa del Dique y Villa Rumipal.',
      boat: 'Guarderías y bajadas en Club Náutico Embalse, Parador Playa Grande y guarderías de Villa del Dique.',
      kayak: 'Bajada libre en balnearios municipales autorizados.'
    },
    directions: 'Desde Córdoba Capital: tomar RP 5 (o RN 36 hasta Almafuerte y desvío por RP E-63 a Embalse). Aproximadamente 110 km.',
    services: [
      'Guías de pesca habilitados con trackers modernos',
      'Venta de mojarras y carnadas frescas',
      'Alquiler de kayaks y tablas',
      'Talleres náuticos y guarderías de lanchas',
      'Complejos hoteleros, cabañas y campings equipados'
    ],
    recommendedGear: [
      {
        title: 'Pejerrey embarcado o de costa',
        gear: 'Caña 4.00 m telescópica, nylon 0.25 mm o multifilamento 0.14 mm',
        rigId: 'flote-pejerrey-tres-boyas',
        rigName: 'Línea de flote 3 boyas'
      },
      {
        title: 'Carpa pesada',
        gear: 'Caña de lance potente 3.30 a 3.90 m, reel frontal grande con freno micrométrico',
        rigId: 'fondo-carpa-feeder',
        rigName: 'Línea de fondo con resorte feeder'
      }
    ],
    regulations: {
      permitRequired: 'Carnet de pesca digital obligatorio de la Provincia de Córdoba.',
      officialPortal: 'https://cazaypesca.cba.gov.ar',
      officialPortalName: 'Portal Oficial Caza y Pesca Córdoba',
      tourismPortal: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      vedaNote: 'Veda nocturna permanente. Veda reproductiva total de pejerrey del 1 de septiembre al 30 de noviembre en toda la cuenca (Resolución N° 318/2026).',
      safetyNotice: 'Seguridad náutica según Ley Provincial N° 5040: lanchas a motor requieren matriculación, timonel habilitado, salvavidas reglamentarios, matafuego 1kg ABC, achique y sistema de fondeo. En kayaks: uso ininterrumpido de chaleco DAF y silbato; navegación exclusivamente diurna.'
    },
    verification: {
      source: 'Resolución N° 318/2026 (Secretaría de Ambiente) y Ley Provincial N° 5040 (Dirección de Seguridad Náutica)',
      sourceUrl: 'https://cazaypesca.cba.gov.ar',
      tourismUrl: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      lastVerified: 'Resolución N° 318/2026',
      status: 'documental'
    },
    dynamicNotice: 'Las tarifas de guías y bajadas náuticas se acuerdan directamente con cada prestador habilitado.'
  },
  {
    id: 'cruz-del-eje',
    slug: 'cruz-del-eje',
    name: 'Dique Cruz del Eje',
    department: 'Noroeste cordobés / Cruz del Eje',
    status: 'published',
    updated: '2026-10-02',
    coordinates: [-30.7687, -64.7346],
    surfaceKm2: 30.0,
    maxDepthMeters: 37.2,
    shortDescription: 'Famoso por sus míticos pejerreyes lomo negro de portes extraordinarios en el cálido norte de la provincia.',
    fullDescription: 'Ubicado a 7 km de la ciudad de Cruz del Eje y a 145 km de Córdoba Capital, el Dique Arturo Illia (Cruz del Eje) posee uno de los paredones más extensos de Sudamérica (más de 3 km sumando dique principal y derivador). Es renombrado en todo el país por albergar pejerreyes "lomo negro" de lomo grueso y gran peso, favorecidos por las temperaturas más templadas del norte cordobés.',
    fishingModalities: [
      {
        type: 'costa',
        name: 'Pesca de costa',
        available: true,
        notes: 'Muy rendidora en los accesos del Club Ictícola, La Playita y márgenes cercanas al dique derivador. Se suelen usar lances largos de fondo o boyas grandes.'
      },
      {
        type: 'embarcado',
        name: 'Pesca embarcada (Bote / Tracker)',
        available: true,
        notes: 'Imprescindible para ubicar los cardúmenes en las zonas de mayor profundidad o en las quebradas protegidas. Hay botes para alquiler en el Club de Pescadores.'
      },
      {
        type: 'kayak',
        name: 'Pesca en kayak',
        available: true,
        notes: 'Factible en mañanas calmas. Precaución con el viento norte que puede levantar marejada intensa.'
      }
    ],
    species: [
      {
        name: 'Pejerrey Lomo Negro (Odontesthes bonariensis)',
        status: 'Población destacada de gran tamaño',
        season: 'Marzo a Noviembre',
        techniques: ['Línea paternoster pesado', 'Flote con boyas rendidoras', 'Línea de dos anzuelos'],
        bait: 'Mojarra viva mediana o grande, tripa de ave tratada, filete de pejerrey',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Talla mínima legal: 25 cm.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 250/2024'
      },
      {
        name: 'Carpa común',
        status: 'Abundante',
        season: 'Primavera y verano',
        techniques: ['Fondo con masa casera'],
        bait: 'Maíz fermentado, harina de maíz y polenta cocida',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sin restricción de talla.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Tararira (Hoplias argentinensis)',
        status: 'Frecuente en sectores someros y calientes',
        season: 'Octubre a Abril',
        techniques: ['Spinning de superficie y media agua'],
        bait: 'Señuelos rígidos y blandos',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sujeta a veda primaveral.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      }
    ],
    publicAccess: [
      {
        name: 'Murallón Principal Dique Arturo Illia',
        type: 'Costa y coronamiento',
        description: 'Impresionante paredón con senda peatonal y sectores autorizados de pesca de costa sobre el murallón.',
        restrictions: 'Prohibido traspasar vallas hacia el vertedero de compuertas.',
        verified: true
      },
      {
        name: 'Club Ictícola Cruz del Eje',
        type: 'Club federado y bajada',
        description: 'Instalaciones con asadores, sombra, proveeduría y rampa para bajada de botes.',
        restrictions: 'Ingreso sujeto a arancel de invitado o cuota social.',
        verified: true
      }
    ],
    shoreAndBoatOptions: {
      shore: 'Las costas del murallón y alrededores de los clubes ofrecen pesca accesible y segura.',
      boat: 'Bajadas disponibles en el Club Náutico y Club Ictícola.',
      kayak: 'Bajada recomendada en el sector balneario La Playita.'
    },
    directions: 'Desde Córdoba Capital: tomar RN 38 pasando por Cosquín, La Falda y Capilla del Monte hasta la ciudad de Cruz del Eje (145 km aprox., 2 horas 30 min).',
    services: [
      'Alquiler de botes en clubes de pesca',
      'Venta de carnadas en el ingreso a la ciudad',
      'Campings con asadores y duchas de agua caliente',
      'Proveedurías en la zona costera'
    ],
    recommendedGear: [
      {
        title: 'Pejerrey lomo negro',
        gear: 'Caña telescópica 4.20 m, reel frontal liviano con nylon 0.26 mm',
        rigId: 'paternoster-pejerrey',
        rigName: 'Línea Paternoster'
      },
      {
        title: 'Flote 3 boyas',
        gear: 'Caña telescópica 4.00 m con boyas cometa medianas',
        rigId: 'flote-pejerrey-tres-boyas',
        rigName: 'Línea de flote 3 boyas'
      }
    ],
    regulations: {
      permitRequired: 'Carnet de pesca deportiva digital obligatorio de Córdoba.',
      officialPortal: 'https://cazaypesca.cba.gov.ar',
      officialPortalName: 'Portal Oficial Caza y Pesca Córdoba',
      tourismPortal: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      vedaNote: `Veda nocturna permanente (Res. N° 01/2024) y veda total de pejerrey del 1 de septiembre al 30 de noviembre. Cupo diario: ${UNVERIFIED_QUOTA_TEXT}.`,
      safetyNotice: 'Seguridad náutica regida por Ley Provincial N° 5040: embarcaciones a motor requieren matriculación, timonel, salvavidas, matafuego 1kg ABC, achique y sistema de fondeo. En kayaks: uso obligatorio ininterrumpido de chaleco DAF y silbato; navegación diurna.'
    },
    verification: {
      source: 'Resolución N° 318/2026 (Secretaría de Ambiente) y Ley Provincial N° 5040 (Dirección de Seguridad Náutica)',
      sourceUrl: 'https://cazaypesca.cba.gov.ar',
      tourismUrl: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      lastVerified: 'Resolución N° 318/2026',
      status: 'documental'
    },
    dynamicNotice: 'Verificar nivel de cota hídrica y presencia de vientos cálidos antes de programar salidas embarcadas.'
  },
  {
    id: 'pichanas',
    slug: 'pichanas',
    name: 'Dique Pichanas',
    department: 'Noroeste / Villa de Soto',
    status: 'published',
    updated: '2026-10-02',
    coordinates: [-30.9142, -65.1755],
    surfaceKm2: 4.8,
    maxDepthMeters: 44.0,
    shortDescription: 'Un espejo agreste y salvaje de aguas transparentes en el monte serrano. Gran experiencia de pesca tranquila y naturaleza.',
    fullDescription: 'Emplazado a 20 km al oeste de Villa de Soto, sobre el río Pichanas, este dique se distingue por su entorno natural desértico y casi virgen, encajonado entre cerros y quebradas. Sus aguas son notablemente cristalinas y profundas, con menor presión de pesca que los diques centrales, lo que brinda jornadas sumamente apacibles.',
    fishingModalities: [
      {
        type: 'costa',
        name: 'Pesca de costa',
        available: true,
        notes: 'Costa de pendiente pronunciada y fondo de roca limpia. Exige cuidado al caminar sobre piedras sueltas pero brinda profundidad a pocos metros del borde.'
      },
      {
        type: 'embarcado',
        name: 'Pesca embarcada (Bote / Tracker)',
        available: true,
        notes: 'Ideal para recorrer las quebradas y cañones donde el agua permanece planchada. No cuenta con flota masiva de alquiler comercial, por lo que muchos pescadores llevan su propia embarcación o contratan guías locales anticipadamente.'
      },
      {
        type: 'kayak',
        name: 'Pesca en kayak',
        available: true,
        notes: 'Espectacular para kayak fishing por el silencio del cañón y la cercanía de las orillas rocosas.'
      }
    ],
    species: [
      {
        name: 'Pejerrey (Odontesthes bonariensis)',
        status: 'Buena población con ejemplares muy combativos',
        season: 'Abril a Septiembre',
        techniques: ['Línea de vuelo fina', 'Flote sutil', 'Paternoster de profundidad'],
        bait: 'Mojarra viva chica/mediana, camarón de río',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Talla mínima legal: 25 cm.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar) y Res. N° 250/2024'
      },
      {
        name: 'Tararira',
        status: 'Presente en bahías protegidas',
        season: 'Noviembre a Marzo',
        techniques: ['Spinning liviano'],
        bait: 'Señuelos pequeños, carnada blanca',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sujeta a veda primaveral.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      },
      {
        name: 'Carpa común',
        status: 'Población moderada',
        season: 'Verano',
        techniques: ['Fondo con masa'],
        bait: 'Maíz y harinas simples',
        regulations: `${UNVERIFIED_QUOTA_TEXT}. Sin restricción de talla.`,
        source: 'Secretaría de Ambiente de Córdoba (cazaypesca.cba.gov.ar)'
      }
    ],
    publicAccess: [
      {
        name: 'Acceso al Murallón Pichanas',
        type: 'Costa agreste',
        description: 'Llegada vehicular por camino de ripio consolidado desde Villa de Soto.',
        restrictions: 'Sin proveeduría fija continua: llevar agua potable, combustible y provisiones suficientes.',
        verified: true
      }
    ],
    shoreAndBoatOptions: {
      shore: 'Costa rocosa con pendientes naturales que ofrecen profundidad inmediata.',
      boat: 'Bajada natural de tierra compacta apta para trailers y botes ligeros con 4x4 o tracción simple en días secos.',
      kayak: 'Bajada muy sencilla desde la orilla principal.'
    },
    directions: 'Desde Córdoba Capital: tomar RN 38 hasta Villa de Soto (165 km), luego tomar desvío señalizado por camino rural de ripio durante 20 km hasta el dique.',
    services: [
      'Entorno natural agreste (sin electricidad ni sanitarios públicos permanentes)',
      'Bajada natural de embarcaciones',
      'Llevar todo el equipamiento, alimentos y agua desde Villa de Soto'
    ],
    recommendedGear: [
      {
        title: 'Pejerrey sutil en aguas cristalinas',
        gear: 'Líder de fluorocarbon 0.18 mm por la alta transparencia del agua, boyas pequeñas',
        rigId: 'flote-pejerrey-tres-boyas',
        rigName: 'Línea de flote 3 boyas'
      },
      {
        title: 'Paternoster de cañón',
        gear: 'Caña sensible de punta fina y plomo fusible pequeño',
        rigId: 'paternoster-pejerrey',
        rigName: 'Línea Paternoster'
      }
    ],
    regulations: {
      permitRequired: 'Carnet de pesca deportiva digital de Córdoba.',
      officialPortal: 'https://cazaypesca.cba.gov.ar',
      officialPortalName: 'Portal Oficial Caza y Pesca Córdoba',
      tourismPortal: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      vedaNote: `Veda nocturna permanente (Res. N° 01/2024) y veda total de pejerrey del 1 de septiembre al 30 de noviembre. Cupo diario: ${UNVERIFIED_QUOTA_TEXT}.`,
      safetyNotice: 'Seguridad náutica bajo Ley Provincial N° 5040: lanchas a motor requieren matriculación, timonel, salvavidas, matafuego 1kg ABC, achique y sistema de fondeo. En kayaks: uso obligatorio de chaleco DAF y silbato; navegación exclusivamente diurna.'
    },
    verification: {
      source: 'Resolución N° 318/2026 (Secretaría de Ambiente) y Ley Provincial N° 5040 (Dirección de Seguridad Náutica)',
      sourceUrl: 'https://cazaypesca.cba.gov.ar',
      tourismUrl: 'https://cordobaturismo.gov.ar/pesca-deportiva/',
      lastVerified: 'Resolución N° 318/2026',
      status: 'documental'
    },
    dynamicNotice: 'El estado del camino de ripio puede modificarse tras tormentas intensas de verano. Consultar en Villa de Soto antes de ingresar.'
  },
  {
    id: 'cerro-pelado',
    slug: 'cerro-pelado',
    name: 'Embalse Cerro Pelado',
    department: 'Valle de Calamuchita / Complejo Río Grande',
    status: 'draft',
    coordinates: [-32.2250, -64.6394],
    surfaceKm2: 12.0,
    maxDepthMeters: 90.0,
    shortDescription: 'Embalse de gran profundidad entre montañas, con régimen especial de generación hidroeléctrica por bombeo.',
    fullDescription: 'Guía técnica en elaboración. Debido al régimen especial de fluctuación de cota por la central subterránea de bombeo y a las restricciones de navegación náutica específicas de EPEC y Seguridad Náutica, este dique se mantiene en borrador hasta validar los puntos de acceso público definitivos.',
    fishingModalities: [],
    species: [],
    publicAccess: [],
    shoreAndBoatOptions: { shore: '', boat: '', kayak: '' },
    directions: '',
    services: [],
    recommendedGear: [],
    regulations: {
      permitRequired: 'Carnet de pesca deportiva de Córdoba.',
      officialPortal: 'https://ambiente.cba.gov.ar/',
      vedaNote: 'Sujeto a normas de la central hidroeléctrica.',
      safetyNotice: 'Prohibida la navegación en áreas de tomas de aspiración y vertedero.'
    },
    verification: {
      source: 'Recopilación documental en curso',
      lastVerified: '2026-03-01',
      verifiedBy: 'Pendiente de homologación'
    },
    dynamicNotice: 'Ficha en estado borrador. No se publican coordenadas de acceso no verificadas.'
  },
  {
    id: 'el-cajon',
    slug: 'el-cajon',
    name: 'Dique El Cajón',
    department: 'Valle de Punilla / Capilla del Monte',
    status: 'draft',
    coordinates: [-30.8500, -64.5500],
    surfaceKm2: 1.8,
    maxDepthMeters: 38.0,
    shortDescription: 'Embalse cercano a Capilla del Monte al pie del Cerro Uritorco.',
    fullDescription: 'Ficha técnica en estado de borrador. Se recopilan datos sobre convenios de acceso con el municipio y clubes locales para pescadores deportivos.',
    fishingModalities: [],
    species: [],
    publicAccess: [],
    shoreAndBoatOptions: { shore: '', boat: '', kayak: '' },
    directions: '',
    services: [],
    recommendedGear: [],
    regulations: {
      permitRequired: 'Carnet de pesca de Córdoba.',
      officialPortal: 'https://ambiente.cba.gov.ar/',
      vedaNote: 'Reglamento general.',
      safetyNotice: 'Respetar cartelería preventiva.'
    },
    verification: {
      source: 'Relevamiento en curso',
      lastVerified: '2026-03-01',
      verifiedBy: 'Pendiente de homologación'
    },
    dynamicNotice: 'Ficha en estado borrador.'
  }
];

export function getDamById(id) {
  return DAMS_DATA.find(d => d.id === id || d.slug === id);
}

export function getPublishedDams() {
  return DAMS_DATA.filter(d => d.status === 'published');
}
