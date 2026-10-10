/**
 * Marco Normativo Oficial Unificado de Pesca Deportiva y Seguridad Náutica
 * Provincia de Córdoba, República Argentina.
 * 
 * Este archivo centraliza la normativa oficial verificada para garantizar coherencia
 * estricta en todo el sitio, citando organismos emisores, resoluciones publicadas
 * en el Boletín Oficial de la Provincia de Córdoba, vigencias y enlaces directos.
 */

export const FISHING_REGULATIONS = {
  authority: 'Ministerio de Ambiente y Economía Circular — Secretaría de Ambiente de la Provincia de Córdoba',
  generalFramework: 'Resolución N° 250/2024 (Reglamento General de Pesca Deportiva, B.O. 17/09/2024, vigencia 5 años)',
  seasonFramework: 'Resolución N° 318/2026 (Temporada de Pesca Deportiva, B.O. 02/10/2026, vigencia hasta 31/08/2027), complementaria de la Resolución N° 272/2024',
  nightBanFramework: 'Resolución N° 01/2024 (Veda de Pesca Nocturna en aguas públicas provinciales, vigencia prorrogada hasta 31/12/2027)',
  officialPortal: 'https://cazaypesca.cba.gov.ar',
  officialPortalName: 'Portal Oficial Caza y Pesca Córdoba (CiDi)',
  officialGazette: 'https://boletinoficial.cba.gov.ar/',
  officialGazetteName: 'Boletín Oficial de la Provincia de Córdoba',

  // Reglas generales provinciales corroboradas
  generalRules: [
    {
      id: 'carnet-digital',
      title: 'Carnet de Pesca Deportivo Digital Obligatorio',
      status: 'vigente',
      verification: 'corroborada',
      description: 'Personal e intransferible. Obligatorio portarlo digitalmente o impreso durante toda la actividad tanto de costa como embarcado. Se gestiona a través de Ciudadano Digital (CiDi) en el portal de Caza y Pesca.',
      basis: 'Ley Provincial N° 4412 y Resolución N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: 'Anual (1 año desde su emisión o renovación)',
      excepciones: 'Jubilados, menores de 18 años y personas con discapacidad deben tramitar la credencial sin costo arancelario.'
    },
    {
      id: 'veda-pejerrey',
      title: 'Veda Total de Pejerrey',
      status: 'vigente',
      verification: 'corroborada',
      description: 'Rige desde el 1 de septiembre hasta el 30 de noviembre de cada año en todos los embalses y lagunas públicas de la provincia. Prohíbe la captura bajo cualquier modalidad, incluyendo la pesca con devolución.',
      basis: 'Resolución N° 272/2024 y Resolución N° 318/2026 (B.O. 02/10/2026)',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: '1 de septiembre al 30 de noviembre',
      excepciones: 'No admite excepciones; veda reproductiva biológica absoluta.'
    },
    {
      id: 'veda-costa',
      title: 'Veda Complementaria de Costa',
      status: 'vigente',
      verification: 'corroborada',
      description: 'Prohíbe la pesca desde la orilla y embarcado a menos de 200 metros de la costa en cuerpos lénticos provinciales durante el período reproductivo en aguas someras.',
      basis: 'Resolución N° 272/2024 y Resolución N° 318/2026',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: 'Desde el tercer fin de semana de septiembre hasta el tercer fin de semana de diciembre inclusive.',
      excepciones: 'Se autoriza la pesca embarcada a más de 200 metros de la ribera.'
    },
    {
      id: 'veda-nocturna',
      title: 'Veda Nocturna Permanente',
      status: 'vigente',
      verification: 'corroborada',
      description: 'La pesca deportiva está permitida exclusivamente en horas de luz diurna (entre la salida y la puesta del sol). Prohibida la pesca nocturna en todos los embalses y ríos públicos de la provincia.',
      basis: 'Resolución N° 01/2024 (prorrogada hasta el 31 de diciembre de 2027) y Resolución N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: 'Permanente hasta el 31/12/2027',
      excepciones: 'Ninguna en aguas de dominio público.'
    },
    {
      id: 'talla-pejerrey',
      title: 'Talla Mínima Legal de Pejerrey',
      status: 'vigente',
      verification: 'corroborada',
      description: 'Longitud total mínima obligatoria de 25 cm (medida desde el extremo del hocico hasta el extremo de la aleta caudal). Ejemplares de menor porte deben devolverse inmediatamente al agua con el menor daño posible.',
      basis: 'Resolución N° 250/2024 y Resolución N° 318/2026',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: 'Permanente en todos los cuerpos de agua provinciales',
      excepciones: 'Ninguna.'
    },
    {
      id: 'especies-protegidas',
      title: 'Salmónidos, Dorados y Especies con Veda Especial',
      status: 'vigente',
      verification: 'corroborada',
      description: 'En todas las cuencas salmonícolas de la provincia rige la modalidad de captura y devolución obligatoria, con uso exclusivo de señuelos artificiales y anzuelo simple sin rebaba. Veda total de trucha marrón y perca (trucha criolla) hasta el 31 de diciembre de 2027.',
      basis: 'Resolución N° 318/2026 (B.O. 02/10/2026)',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      vigencia: 'Temporada habilitada de truchas del 1 de octubre al 31 de mayo',
      excepciones: 'Prohibido el sacrificio de ejemplares en todas las cuencas.'
    }
  ],

  // Estado unificado de cupos por dique:
  // Al no disponer de enlace directo al documento oficial con anexo desglosado para cada embalse,
  // las cifras numéricas fueron retiradas conforme al estándar de verificación editorial.
  // Se indica explícitamente el estado pendiente de confirmación con enlace al organismo oficial.
  damQuotas: {
    'san-roque': {
      damName: 'Dique San Roque',
      cuenca: 'Cuenca del Río Suquía',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        },
        {
          species: 'Tararira (Hoplias argentinensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Consultar disposición estacional y vedas en cazaypesca.cba.gov.ar'
        },
        {
          species: 'Bagres (Moncholo / Sapo)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Pesca deportiva exclusivamente diurna (veda nocturna permanente Res. 01/2024)'
        },
        {
          species: 'Carpa común (Cyprinus carpio)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Sin restricción de talla'
        }
      ]
    },
    'los-molinos': {
      damName: 'Dique Los Molinos',
      cuenca: 'Cuenca del Río Los Molinos',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        },
        {
          species: 'Carpa común (Cyprinus carpio)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Sin restricción de talla'
        },
        {
          species: 'Tararira (Hoplias argentinensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Consultar disposición en cazaypesca.cba.gov.ar'
        }
      ]
    },
    'embalse': {
      damName: 'Embalse de Río Tercero',
      cuenca: 'Cuenca del Río Ctalamochita',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        },
        {
          species: 'Carpa común (Cyprinus carpio)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Sin restricción de talla'
        },
        {
          species: 'Tararira (Hoplias argentinensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Consultar disposición en cazaypesca.cba.gov.ar'
        }
      ]
    },
    'cruz-del-eje': {
      damName: 'Dique Cruz del Eje',
      cuenca: 'Cuenca Noroeste',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        },
        {
          species: 'Carpa común (Cyprinus carpio)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Sin restricción de talla'
        },
        {
          species: 'Tararira (Hoplias argentinensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Consultar disposición en cazaypesca.cba.gov.ar'
        }
      ]
    },
    'pichanas': {
      damName: 'Dique Pichanas',
      cuenca: 'Dpto. Cruz del Eje',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        },
        {
          species: 'Tararira (Hoplias argentinensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Consultar disposición en cazaypesca.cba.gov.ar'
        },
        {
          species: 'Carpa común (Cyprinus carpio)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: 'Sin restricción de talla'
        }
      ]
    },
    'la-vina': {
      damName: 'Dique La Viña',
      cuenca: 'Traslasierra',
      resolution: 'Resolución N° 318/2026 / Res. N° 250/2024',
      gazetteLink: 'https://boletinoficial.cba.gov.ar/',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      quotas: [
        {
          species: 'Pejerrey (Odontesthes bonariensis)',
          status: 'retirado',
          limitNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
          minSize: '25 cm de longitud total (Resolución N° 250/2024)'
        }
      ]
    }
  },

  // Especies secundarias provinciales
  secondarySpecies: [
    {
      id: 'tararira',
      name: 'Tararira (Hoplias argentinensis)',
      category: 'Regulada',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      notes: 'La cifra de cupo diario no cuenta con confirmación en documento oficial de acceso directo. Sujeta a veda reproductiva primaveral y eventual veda total según resolución de temporada de la Secretaría de Ambiente.'
    },
    {
      id: 'carpa',
      name: 'Carpa común (Cyprinus carpio)',
      category: 'Exótica asilvestrada',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      notes: 'Sin restricción de talla mínima ni veda temporal. La cifra numérica de captura diaria no cuenta con confirmación en documento oficial con anexo público directo.'
    },
    {
      id: 'bagres',
      name: 'Bagres (Moncholo / Sapo)',
      category: 'Autóctona',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      notes: 'Pesca autorizada exclusivamente en horario diurno (veda nocturna permanente Resolución N° 01/2024, art. 1). Cifra de cupo no confirmada en documento oficial accesible.'
    },
    {
      id: 'mojarras',
      name: 'Mojarras y Dientudos',
      category: 'Carnada viva',
      statusNotice: 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir',
      officialPortalLink: 'https://cazaypesca.cba.gov.ar',
      notes: 'Para uso exclusivo como carnada en el cuerpo de agua de extracción. Cifras de cupo diario pendientes de verificación en documento oficial.'
    }
  ]
};

export const UNVERIFIED_QUOTA_TEXT = 'Dato pendiente de verificación. Consultá la normativa oficial antes de salir';

export const NAUTICAL_SAFETY = {
  authority: 'Ministerio de Seguridad — Dirección de Seguridad Náutica de la Provincia de Córdoba',
  framework: 'Ley Provincial de Seguridad Náutica N° 5040 y Decreto Reglamentario N° 4531',
  officialPortal: 'https://www.cba.gov.ar/seguridad-nautica/',
  officialPortalName: 'Dirección de Seguridad Náutica de Córdoba',
  
  kayak: {
    vesselType: 'Kayak, canoa y embarcaciones menores a remo (sin propulsión mecánica)',
    legalRequirements: [
      {
        item: 'Chaleco salvavidas (DAF - Dispositivo de Ayuda a la Flotación)',
        rule: 'Obligatorio colocado permanentemente y ajustado al cuerpo de cada tripulante durante toda la navegación. Prohibido transportarlo guardado o suelto dentro del casco.',
        basis: 'Ley N° 5040 y reglamentación de Seguridad Náutica de Córdoba',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Silbato náutico adosado al chaleco',
        rule: 'Obligatorio como dispositivo de señalización acústica para emitir avisos de auxilio o maniobra en emergencias.',
        basis: 'Disposiciones operativas de Seguridad Náutica de Córdoba',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Navegación estrictamente diurna',
        rule: 'Prohibida la navegación nocturna de embarcaciones a remo en aguas provinciales. Actividad permitida únicamente entre la salida y la puesta del sol.',
        basis: 'Reglamentación de Seguridad Náutica de Córdoba',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Zonas de exclusión náutica',
        rule: 'Prohibido navegar en áreas balnearias boyadas, tomas de agua, aliviaderos o en proximidad del murallón de los diques.',
        basis: 'Ley N° 5040',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      }
    ],
    practicalRecommendations: [
      {
        item: 'Cabo de fondeo con zafado rápido',
        note: 'Recomendación práctica de seguridad si se decide pescar anclado: emplear boya testigo y mosquetón de destrabe rápido para evitar vuelcos si arrecia el viento.'
      },
      {
        item: 'Pitas o correas elásticas (leash)',
        note: 'Recomendación práctica para sujetar la pala de remo y las cañas al casco ante caídas accidentales.'
      },
      {
        item: 'Indumentaria técnica contra hipotermia',
        note: 'Recomendación de vestimenta térmica sintética o neopreno según la temperatura del agua serrana.'
      },
      {
        item: 'Bolsa estanca impermeable',
        note: 'Recomendación práctica para resguardar teléfono móvil de emergencias y elementos personales.'
      },
      {
        item: 'Plan de navegación informado',
        note: 'Recomendación de comunicar en tierra o en la guardería de bajada el sector previsto y la hora estimada de regreso.'
      }
    ]
  },

  motorboat: {
    vesselType: 'Embarcaciones a motor (lanchas, trackers, botes con motor fuera de borda)',
    legalRequirements: [
      {
        item: 'Matrícula y habilitación náutica provincial',
        rule: 'Embarcación debidamente matriculada ante la Dirección de Seguridad Náutica de Córdoba con inspección técnica vigente.',
        basis: 'Ley N° 5040',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Carnet de conductor náutico / timonel habilitante',
        rule: 'El patrón o timonel debe contar con carnet habilitante expedido por Seguridad Náutica de Córdoba o Prefectura Naval Argentina.',
        basis: 'Ley N° 5040',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Chalecos salvavidas reglamentarios para toda la tripulación',
        rule: 'Un chaleco salvavidas aprobado por persona a bordo, con silbato incorporado.',
        basis: 'Ley N° 5040 y Dto. 4531',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Matafuego triclase ABC de 1 kg con carga vigente',
        rule: 'Obligatorio en toda embarcación a motor, ubicado en lugar accesible y con manómetro en zona verde.',
        basis: 'Reglamentación de Seguridad Náutica',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      },
      {
        item: 'Kit reglamentario de auxilio y achique',
        rule: 'Pala fija o remo pala-bichero, balde o bomba de achique, y sistema de fondeo con cabo proporcional a la profundidad.',
        basis: 'Decreto Reglamentario N° 4531',
        link: 'https://www.cba.gov.ar/seguridad-nautica/'
      }
    ],
    practicalRecommendations: [
      {
        item: 'Radio VHF marina o equipo de comunicación con batería completa',
        note: 'Recomendación para mantener contacto ante fallas de motor en espejos de agua extensos como Embalse o Los Molinos.'
      },
      {
        item: 'Linterna estanca de mano',
        note: 'Recomendación de seguridad para señalización de emergencia antes de la puesta del sol.'
      }
    ]
  }
};
