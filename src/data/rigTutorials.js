/**
 * Tutoriales visuales y técnicos para armar líneas de pesca deportiva en Córdoba.
 * Complementa la sección de Nudos con esquemas de montajes completos.
 */

export const RIG_TUTORIALS = [
  {
    id: 'flote-pejerrey-tres-boyas',
    slug: 'flote-pejerrey-tres-boyas',
    title: 'Línea de flote clásica de 3 boyas',
    subtitle: 'El montaje tradicional por excelencia para el pejerrey cordobés',
    species: ['Pejerrey (Odontesthes bonariensis)'],
    dams: ['San Roque', 'Los Molinos', 'Embalse', 'Cruz del Eje', 'Pichanas'],
    badge: 'Imprescindible',
    difficulty: 'Intermedio',
    category: 'Flote',
    purposeAndConditions: {
      summary: 'Diseñada para pescar pejerreyes que se alimentan entre la superficie y 1 metro de profundidad, típicamente durante días soleados con brisa suave que oxigena el agua.',
      bestConditions: 'Viento suave a moderado (8 a 15 km/h) que produce un leve oleaje para dar movimiento natural a las carnadas. Días templados o mediodías soleados donde el pejerrey asciende a calentar su cuerpo.',
      avoidWhen: 'Vientos fuertes superiores a 25 km/h (arrastran la línea demasiado rápido hacia la orilla o la enredan) o en mañanas de frío polar donde el cardumen permanece aletargado en el fondo.'
    },
    materials: [
      { item: 'Madre de línea', spec: 'Nailon monofilamento 0.30 a 0.35 mm (longitud total: 2.20 a 2.80 m)' },
      { item: 'Brazoladas (bajadas)', spec: 'Monofilamento 0.22 a 0.25 mm o fluorocarbon 0.20 mm (3 tramos de 20 a 60 cm)' },
      { item: 'Boyas', spec: '3 boyas chupete o cometa de madera balsa o poliuretano (largo 8 a 12 cm), color visible (fucsia, naranja o amarillo flúo)' },
      { item: 'Pilotín / Puntero', spec: '1 pilotín giratorio pequeño en la punta de unión a la línea del reel' },
      { item: 'Rotores / Microesmerillones', spec: '3 rotores plásticos o microesmerillones N° 12 o 14 con perlitas de tope' },
      { item: 'Anzuelos', spec: '3 anzuelos pejerreyeros N° 3, 4 o 5 (tipo Mustad 277E o Sasame Chinu)' },
      { item: 'Lastre (opcional)', spec: 'Munición partida de plomo n° 3 o 4 (0.5 a 1.5 g) para clavar la brazolada si hay corriente' }
    ],
    measurements: {
      totalLength: '2.40 a 2.70 metros de largo total.',
      buoySpacing: 'Distancia entre boyas: 70 a 85 cm. Esta separación evita que las brazoladas se enreden entre sí al lanzar o derivar.',
      branchLengths: 'Brazoladas de 25 cm (primera boya), 40 cm (segunda) y 55 cm (tercera, más cercana al reel).',
      adaptationRules: [
        'Con agua planchada y pejerrey tímido: alargar las brazoladas hasta 70 cm y afinar el fluorocarbon a 0.18 mm.',
        'Con viento y oleaje picado: acortar las bajadas a 20-30 cm y colocar una munición partida pequeña a 10 cm del anzuelo para evitar que la carnada flamee sobre la superficie.',
        'Si el pique se da muy arriba: levantar las boyas y dejar bajadas de solo 15 a 20 cm.'
      ]
    },
    numberedSteps: [
      {
        step: 1,
        title: 'Preparación de la madre',
        description: 'Cortá un tramo de monofilamento 0.30 mm de 2.60 m. En un extremo, atá un microesmerillón con un nudo Palomar para conectar luego al mosquetón del reel.'
      },
      {
        step: 2,
        title: 'Armado del primer nudo corredizo y boya',
        description: 'Enhebrá el pilotín y pasá una perlita, la primera boya cometa, otra perlita y el primer rotor o microesmerillón giratorio. Fijá el rotor con nudos corredizos de hilo o nudo Uni en ambos lados para que no se desplace más de 5 cm.'
      },
      {
        step: 3,
        title: 'Distribución y simetría de las boyas intermedias',
        description: 'Medí 80 cm y colocá el segundo conjunto (perlita - boya - perlita - rotor). Medí otros 80 cm y armá el tercer conjunto final. Rematá la madre con un nudo barril asegurado o palomar a un esmerillón final.'
      },
      {
        step: 4,
        title: 'Atado de las brazoladas y anzuelos',
        description: 'Atá cada tramo de brazolada (0.22 mm) al ojal del rotor correspondiente mediante un Medio Nudo Barril Asegurado. En el otro extremo, atá el anzuelo pejerreyero usando un nudo Palomar o Uni.'
      },
      {
        step: 5,
        title: 'Calibrado y plomado de prueba',
        description: 'Colocá una munición partida diminuta a 10 cm del anzuelo si la carnada (mojarra viva) tiende a flotar o nadar desordenadamente.'
      }
    ],
    knots: [
      {
        name: 'Nudo Palomar',
        path: '/nudos',
        hash: 'nudo-palomar',
        image: '/img/Nudo1.gif',
        use: 'Ideal para atar anzuelos pejerreyeros y esmerillones a la madre con máxima resistencia.'
      },
      {
        name: 'Medio nudo barril asegurado (Clinch)',
        path: '/nudos',
        hash: 'medio-nudo-barril-asegurado',
        image: '/img/nudo2.gif',
        use: 'Excelente para fijar las brazoladas a los rotores giratorios de alambre o plástico.'
      },
      {
        name: 'Nudo Uni',
        path: '/nudos',
        hash: 'nudo-uni',
        image: '/img/Nudo3.gif',
        use: 'Permite hacer topes corredizos sobre la línea madre sin mellar el nailon.'
      },
      {
        name: 'Nudo Doble Uni (Unir tanza)',
        path: '/nudos',
        hash: 'nudo-doble-uni',
        image: '/img/unir tanza.gif',
        use: 'Para empalmar la tanza del reel con la madre del aparejo o empatillar tramos de monofilamento.'
      }
    ],
    commonErrors: [
      {
        error: 'Separación insuficiente entre boyas',
        consequence: 'Al lanzar, las brazoladas se cruzan y forman un nudo ciego entre sí.',
        solution: 'La distancia entre boyas siempre debe ser al menos 15 cm mayor que la longitud de la brazolada más larga.'
      },
      {
        error: 'Nailon de madre demasiado fino o con memoria',
        consequence: 'La línea hace rulitos en el agua y amortigua el tirón de la clavada, perdiendo piques.',
        solution: 'Usar nylon de buena calidad sin memoria 0.30 a 0.35 mm en la madre, reservando los diámetros finos solo para las brazoladas.'
      },
      {
        error: 'Boyas pesadas que ofrecen demasiada resistencia al pejerrey',
        consequence: 'El pejerrey siente la resistencia de la boya al hundirla y escupe la mojarra antes de la clavada.',
        solution: 'Elegir boyas esbeltas de balsa que se sumerjan al menor toque.'
      }
    ],
    alternatives: [
      {
        situation: 'Si el pejerrey no sube a comer arriba por bajas temperaturas o sol pleno',
        recommendation: 'Cambiar a línea Paternoster de profundidad para explorar de 3 a 12 metros de agua.'
      },
      {
        situation: 'Si hay viento fuerte de cola que saca la línea rápido',
        recommendation: 'Usar boyas más pesadas con quilla de plomo (boyas lastradas) o línea de vuelo con boya barrilito.'
      }
    ]
  },
  {
    id: 'paternoster-pejerrey',
    slug: 'paternoster-pejerrey',
    title: 'Línea Paternoster regulable',
    subtitle: 'El aparejo definitivo para buscar pejerrey en media agua y pozos profundos',
    species: ['Pejerrey (Odontesthes bonariensis)'],
    dams: ['Los Molinos', 'San Roque', 'Cruz del Eje', 'Embalse', 'Pichanas'],
    badge: 'Máxima efectividad invernal',
    difficulty: 'Avanzado',
    category: 'Profundidad',
    purposeAndConditions: {
      summary: 'El aparejo más rendidor para invierno en los diques cordobeses. Permite prospectar simultáneamente diferentes niveles de profundidad (por ejemplo a 3, 5 y 8 metros o más) mediante una boya boyarín pasante con nudo tope corredizo y una plomada final.',
      bestConditions: 'Agua fría de mayo a agosto, mañanas sin viento donde el pejerrey busca cardúmenes de plancton en aguas hondas (especialmente en diques profundos como Los Molinos o San Roque cerca del murallón).',
      avoidWhen: 'Zonas someras con menos de 2.5 metros de profundidad o bahías con ramas sumergidas donde la plomada se enganche con facilidad.'
    },
    materials: [
      { item: 'Madre de línea', spec: 'Nailon monofilamento transparente o flúor 0.28 a 0.32 mm (3 a 5 metros según cota)' },
      { item: 'Brazolas de anzuelo', spec: 'Fluorocarbon 0.20 a 0.23 mm (tramos cortos de 15 a 25 cm para evitar que se peguen a la madre)' },
      { item: 'Boya testigo / Paternoster', spec: '1 boya zanahoria o periforme con ojal de alambre o tubo pasante (10 a 16 cm)' },
      { item: 'Rotores', spec: '2 o 3 rotores de barrilito o microesmerillones triples N° 14' },
      { item: 'Plomada con fusible', spec: 'Plomo gota o perita de 15 a 35 g conectado a un tramo fino de nailon 0.20 mm (fusible)' },
      { item: 'Anzuelos', spec: '2 o 3 anzuelos pejerreyeros N° 4 o 5 (pata larga o curva suave)' }
    ],
    measurements: {
      totalLength: '2.80 a 4.50 metros de longitud madre (según la caña y si se usa boya corrediza libre).',
      buoySpacing: 'Distancia entre brazoladas: 70 a 90 cm a lo largo de la columna vertical.',
      branchLengths: 'Brazoladas cortas de 18 a 25 cm para que queden perpendiculares a la madre y no se enrosquen.',
      adaptationRules: [
        'En Los Molinos (pozos de 12 a 18 m): utilizar el sistema de boya corrediza con nudo de hilo tope sobre el nylon del reel para que la línea descienda a la profundidad deseada.',
        'En San Roque (Garganta y paredón, 8 a 12 m): lastrar con 20-25 g para mantener la línea vertical frente a corrientes de fondo.',
        'Si todos los piques se dan en el anzuelo inferior: bajar la posición del nudo tope para profundizar el aparejo 1 metro más.'
      ]
    },
    numberedSteps: [
      {
        step: 1,
        title: 'Armado del nudo tope corredizo',
        description: 'Sobre la línea del reel (o sobre la madre), atá un nudo corredizo de hilo de seda o lana con un nudo Uni. Dejá los cabos recortados a 1 cm para que pasen suavemente por los pasahílos de la caña.'
      },
      {
        step: 2,
        title: 'Enhebrado de perlita y boya pasante',
        description: 'Enhebrá una perlita diminuta (que frenará en el nudo tope pero no pasará por el ojal de la boya), luego la boya pasante tipo zanahoria, y otra perlita inferior.'
      },
      {
        step: 3,
        title: 'Montaje de los rotores verticales',
        description: 'A 60 cm por debajo de la boya, colocá el primer rotor protegido por perlitas y nudos de tope. Repetí a los 75 cm para el segundo rotor, y a los 75 cm para el tercero.'
      },
      {
        step: 4,
        title: 'Lazo y fusible de plomada inferior',
        description: 'En el extremo inferior atá un esmerillón. Desde allí conectá un tramo de 20 cm de nailon fino 0.20 mm hacia la plomada. Este fusible garantiza que si el plomo se traba en una roca, se corte solo el plomo salvando boya y anzuelos.'
      },
      {
        step: 5,
        title: 'Fijación de anzuelos en brazoladas cortas',
        description: 'Atá cada anzuelo con nudo Palomar al extremo de las brazoladas de 20 cm, y el otro extremo al rotor con Medio Barril asegurado.'
      }
    ],
    knots: [
      {
        name: 'Nudo Uni (para tope corredizo)',
        path: '/nudos',
        hash: 'nudo-uni',
        image: '/img/Nudo3.gif',
        use: 'Crea el tope que frena la boya exactamente a la profundidad graduada.'
      },
      {
        name: 'Nudo Palomar',
        path: '/nudos',
        hash: 'nudo-palomar',
        image: '/img/Nudo1.gif',
        use: 'Fija los anzuelos a las brazoladas y el esmerillón del plomo.'
      },
      {
        name: 'Medio nudo barril asegurado',
        path: '/nudos',
        hash: 'medio-nudo-barril-asegurado',
        image: '/img/nudo2.gif',
        use: 'Une la brazolada a los rotores giratorios de la columna vertical.'
      },
      {
        name: 'Nudo Doble Uni (Unir tanza)',
        path: '/nudos',
        hash: 'nudo-doble-uni',
        image: '/img/unir tanza.gif',
        use: 'Para unir la tanza del reel con el chicote o línea del aparejo paternoster.'
      }
    ],
    commonErrors: [
      {
        error: 'Brazoladas demasiado largas en la columna vertical',
        consequence: 'Al descender en el agua, las brazoladas giran y se enroscan apretadas a la madre.',
        solution: 'Mantener las bajadas en un máximo de 20 a 25 cm y usar fluorocarbon rígido.'
      },
      {
        error: 'Plomo insuficiente para la boya',
        consequence: 'La boya queda acostada en la superficie y no transmite la clavada de toques sutiles.',
        solution: 'Calibrar el peso del plomo para que la boya quede parada en un 70% de su cuerpo sumergido.'
      },
      {
        error: 'No usar fusible de plomada',
        consequence: 'Al enganchar en una piedra del fondo se pierde todo el aparejo con boya y rotores.',
        solution: 'El tramo final al plomo siempre debe ser 0.08 a 0.10 mm más fino que la madre.'
      }
    ],
    alternatives: [
      {
        situation: 'Si el pejerrey come en los primeros 50 cm del agua y el paternoster no rinde',
        recommendation: 'Reemplazar por línea de flote de 3 boyas o chirimbolo de flote.'
      },
      {
        situation: 'Pesca desde embarcación anclada con corriente nula',
        recommendation: 'Línea balancín de dos anzuelos con boyita esférica.'
      }
    ]
  },
  {
    id: 'fondo-carpa-feeder',
    slug: 'fondo-carpa-feeder',
    title: 'Línea de fondo con resorte cebador (Feeder)',
    subtitle: 'El aparejo más eficaz para la captura de grandes carpas serranas',
    species: ['Carpa común (Cyprinus carpio)', 'Bagre sapo'],
    dams: ['San Roque', 'Los Molinos', 'Embalse', 'Cruz del Eje', 'Pichanas'],
    badge: 'Poder y resistencia',
    difficulty: 'Fácil a Intermedio',
    category: 'Fondo',
    purposeAndConditions: {
      summary: 'Especialmente ideada para carpas de gran porte que pastan en el lecho fangoso o arenoso de los diques. El resorte retiene una pelota de masa aromática compactada que al disgregarse en el fondo genera una nube cebada atrayente justo al lado del anzuelo con carnada.',
      bestConditions: 'Primavera y verano, aguas cálidas de bahías, orillas con fondos de barro o pendientes suaves (Bialet Massé, Potrero de Garay, Rumipal). Tarde y horas previas a la puesta del sol (la actividad en aguas públicas provinciales está sujeta a veda nocturna).',
      avoidWhen: 'Zonas de fondo rocoso filoso con restingas donde el resorte se encalla irreversiblemente.'
    },
    materials: [
      { item: 'Línea madre del lance', spec: 'Nailon 0.35 a 0.40 mm resistente a la abrasión o multifilamento 0.20 mm con salida de monofilamento' },
      { item: 'Madre del aparejo', spec: 'Nailon 0.45 a 0.50 mm (largo 60 a 80 cm)' },
      { item: 'Cebador', spec: '1 resorte cebador espiralado con tubo pasante de plástico o plomada incorporada (30 a 60 g)' },
      { item: 'Brazola / Leader', spec: 'Monofilamento duro 0.35 mm o dacrón/braid trenzado 0.25 mm (largo corto: 10 a 18 cm)' },
      { item: 'Anzuelos', spec: '1 o 2 anzuelos curvos de carpa N° 1/0 o 2 (tipo curvado Wide Gape o Chinu reforzado)' },
      { item: 'Topes y perlitas', spec: 'Perlitas de goma protectora antichoque y esmerillón N° 6 reforzado' }
    ],
    measurements: {
      totalLength: '60 a 80 cm de aparejo terminal.',
      branchLengths: 'Brazola muy corta: de 10 a 15 cm. La carpa succiona el cebo del resorte y así emboca de inmediato el anzuelo vecino.',
      adaptationRules: [
        'En fondos con barro profundo: usar resortes plásticos livianos con poca plomada para evitar que la masa se entierre en el fango.',
        'Para lances de más de 60 metros de distancia: colocar salida cónica de lance o chicote de nailon 0.50 mm para evitar cortes en el tiro.',
        'Uso de hair rig: separar el grano de maíz en un lazo de pelo (hair) de 1 cm detrás de la curvatura del anzuelo para mayor eficacia de clavado.'
      ]
    },
    numberedSteps: [
      {
        step: 1,
        title: 'Armado de la madre del aparejo',
        description: 'Tomá 70 cm de nailon 0.45 mm. En el extremo superior atá un esmerillón con nudo Palomar para conectar al mosquetón principal del reel.'
      },
      {
        step: 2,
        title: 'Enhebrado del resorte cebador',
        description: 'Pasá por la línea madre una perlita de goma amortiguadora, el resorte cebador con plomo pasante, y otra perlita de goma protectora del nudo.'
      },
      {
        step: 3,
        title: 'Conexión del esmerillón inferior',
        description: 'Atá un esmerillón reforzado en el extremo inferior usando un nudo Palomar o Medio Barril asegurado.'
      },
      {
        step: 4,
        title: 'Montaje de la brazolada corta',
        description: 'Cortá 15 cm de dacrón trenzado o monofilamento 0.35 mm. Atá el anzuelo de carpa en un extremo y el otro extremo al esmerillón inferior. La cercanía entre el anzuelo y el resorte es la clave del pique.'
      },
      {
        step: 5,
        title: 'Carga de masa y carnada',
        description: 'Compactá una pelota firme de masa casera (harina de maíz, polenta, vainillín y miel) alrededor del resorte. En el anzuelo encarná 2 o 3 granos de maíz fermentado o una bolita de masa dura.'
      }
    ],
    knots: [
      {
        name: 'Nudo Palomar',
        path: '/nudos',
        hash: 'nudo-palomar',
        image: '/img/Nudo1.gif',
        use: 'Máxima resistencia al impacto para sujetar los esmerillones que soportan el peso del cebador y la tracción de carpas pesadas.'
      },
      {
        name: 'Nudo Uni',
        path: '/nudos',
        hash: 'nudo-uni',
        image: '/img/Nudo3.gif',
        use: 'Para sujetar anzuelos con ojal reforzado o confeccionar topes.'
      },
      {
        name: 'Nudo Doble Uni (Unir tanza)',
        path: '/nudos',
        hash: 'nudo-doble-uni',
        image: '/img/unir tanza.gif',
        use: 'Empalme de alta resistencia para unir la línea madre del reel con el chicote de lance que soporta el feeder pesado.'
      },
      {
        name: 'Bucle Perfection',
        path: '/nudos',
        hash: 'bucle-perfection',
        image: '/img/Bucle Perfection.jpg',
        use: 'Para lazos rápidos desmontables de la brazolada al esmerillón.'
      }
    ],
    commonErrors: [
      {
        error: 'Masa demasiado blanda o húmeda',
        consequence: 'Se desintegra en el aire durante el lance o al chocar contra la superficie del agua.',
        solution: 'Cocinar o amasar con poca agua hasta obtener una textura firme y elástica similar a la plastilina.'
      },
      {
        error: 'Brazolada excesivamente larga (más de 30 cm)',
        consequence: 'La carnada queda lejos de la nube del resorte y la carpa come la masa sin encontrar el anzuelo.',
        solution: 'Mantener la bajada en 12 a 15 cm como máximo.'
      },
      {
        error: 'Freno del reel cerrado al apoyar la caña en el posacaña',
        consequence: 'Una carpa de 5 a 10 kg puede arrastrar la caña entera al fondo del lago en una corrida explosiva.',
        solution: 'Siempre dejar la estrella del reel floja o activar el sistema baitrunner con la chicharra encendida.'
      }
    ],
    alternatives: [
      {
        situation: 'Si hay muchos bagres comiéndose la masa antes que llegue la carpa',
        recommendation: 'Utilizar maíz duro fermentado con almíbar o boilies secos en anzuelos tipo hair rig.'
      },
      {
        situation: 'Pesca en zonas con piedras',
        recommendation: 'Reemplazar por línea de fondo con plomo pasante perita y anzuelo levantado con perlita flotante.'
      }
    ]
  },
  {
    id: 'fondo-pesado-tararira-bagre',
    slug: 'fondo-pesado-tararira-bagre',
    title: 'Línea de fondo pesada con líder de acero',
    subtitle: 'Protección contra mandíbulas dentadas para tarariras y bagres grandes',
    species: ['Tararira (Hoplias argentinensis)', 'Bagre sapo (Rhamdia quelen)'],
    dams: ['San Roque', 'Los Molinos', 'Embalse', 'Cruz del Eje', 'Pichanas'],
    badge: 'Anti-corte',
    difficulty: 'Fácil',
    category: 'Fondo',
    purposeAndConditions: {
      summary: 'Diseñada para la pesca de predadores con dentadura filosa o mandíbulas abrasivas en el fondo de bahías y remansos. El líder de acero termosellable o multifilamento grueso impide que la tararira corte la línea durante los cabezazos.',
      bestConditions: 'Atardeceres templados de verano hasta la puesta del sol (actividad sujeta a veda nocturna provincial en embalses públicos), aguas calmas y sectores cercanos a vegetación acuática o troncos.',
      avoidWhen: 'Pesca de especies sensibles como el pejerrey, que desconfían del cable de acero.'
    },
    materials: [
      { item: 'Madre del aparejo', spec: 'Nailon 0.40 a 0.50 mm (largo 80 cm)' },
      { item: 'Plomada corrediza', spec: 'Plomo oliva pasante o perita de 30 a 50 g' },
      { item: 'Líder anti-diente', spec: 'Cable de acero flexible de 15 a 20 libras con tubitos de crimpado (largo 20 a 30 cm)' },
      { item: 'Anzuelo', spec: 'Anzuelo garra de águila o Mustad O’Shaughnessy N° 2/0 a 4/0' },
      { item: 'Esmerillones y perlitas', spec: '1 microesmerillón y 1 perlita de goma amortiguadora' }
    ],
    measurements: {
      totalLength: '70 a 90 cm en total.',
      branchLengths: 'Líder de acero de 20 a 25 cm.',
      adaptationRules: [
        'En zonas con mucha vegetación: reducir el plomo a 15-20 g para que el aparejo repose sobre las algas sin enterrarse.',
        'Si se busca tararira a media agua: se puede intercalar una boya plop o perita flotante antes del líder.'
      ]
    },
    numberedSteps: [
      {
        step: 1,
        title: 'Enhebrado del plomo pasante',
        description: 'Pasá por la madre el plomo oliva pasante y una perlita de goma protectora.'
      },
      {
        step: 2,
        title: 'Nudo al esmerillón de tope',
        description: 'Atá un esmerillón mediano al final de la madre con un nudo Palomar. La perlita evitará que el plomo golpee directamente sobre el nudo.'
      },
      {
        step: 3,
        title: 'Armado del líder de acero',
        description: 'Pasá el cable de acero por el ojal del esmerillón, doblá y fijá con tubo de crimpado aplastado con pinza plana. En el otro extremo, sujetá el anzuelo 2/0 o 3/0 de igual modo.'
      },
      {
        step: 4,
        title: 'Encarnado firme',
        description: 'Encarná un filete fresco de pejerrey, carpa o tripa de pollo, pasándolo dos veces por el anzuelo para asegurar que no se desprenda en el lance.'
      }
    ],
    knots: [
      {
        name: 'Nudo Palomar',
        path: '/nudos',
        hash: 'nudo-palomar',
        image: '/img/Nudo1.gif',
        use: 'Para la unión resistente de la madre de nailon con el esmerillón.'
      },
      {
        name: 'Nudo Doble Uni (Unir tanza)',
        path: '/nudos',
        hash: 'nudo-doble-uni',
        image: '/img/unir tanza.gif',
        use: 'Para empalmar la línea madre del reel con el tramo o chicote de salida.'
      },
      {
        name: 'Nudo Albright',
        path: '/nudos',
        hash: 'nudo-albright',
        image: '/img/Nudo Albright.webp',
        use: 'Si se opta por fluorocarbon grueso de 0.60 mm en lugar de acero, para unirlo directamente a la madre.'
      }
    ],
    commonErrors: [
      {
        error: 'No usar perlita entre el plomo y el nudo',
        consequence: 'El plomo pesado machaca el nudo en cada lance y se corta al clavar la pieza.',
        solution: 'Siempre interponer una perlita blanda de goma o silicona.'
      },
      {
        error: 'Cable de acero demasiado rígido o largo',
        consequence: 'La tararira siente el peso y rigidez del cable y suelta la carnada.',
        solution: 'Usar cable termosellable flexible de 7 hebras de 20 cm.'
      }
    ],
    alternatives: [
      {
        situation: 'Si la tararira está cazando activa en la superficie',
        recommendation: 'Pasar a pesca con señuelos de superficie o boya plop con carnada blanca suspendida.'
      }
    ]
  },
  {
    id: 'flote-boya-plop',
    slug: 'flote-boya-plop',
    title: 'Línea de flote con boya plop sonajera',
    subtitle: 'Aparejo sonoro de superficie para despertar la agresividad de las tarariras',
    species: ['Tararira (Hoplias argentinensis)'],
    dams: ['San Roque', 'Cruz del Eje', 'Embalse', 'Los Molinos'],
    badge: 'Acción de superficie',
    difficulty: 'Fácil',
    category: 'Superficie',
    purposeAndConditions: {
      summary: 'Una de las técnicas más excitantes de la pesca cordobesa en primavera y verano. La boya plop posee una concavidad delantera que, al recoger a tirones secos con la caña, produce un fuerte sonido de chapoteo ("plop") que imita a un animal herido en el agua, detonando el ataque voraz de la tararira.',
      bestConditions: 'Tardes calurosas de verano (aguas a más de 22°C), bahías someras con juncales, costas bajas y vegetación flotante.',
      avoidWhen: 'Días con vientos fuertes o temperaturas invernales inferiores a 16°C.'
    },
    materials: [
      { item: 'Madre', spec: 'Nailon 0.40 mm o multifilamento 0.22 mm directo desde el reel' },
      { item: 'Boya Plop', spec: '1 boya plop de poliuretano de 6 a 10 cm con sonajero interno y boca cóncava' },
      { item: 'Líder', spec: 'Cable de acero de 15 a 20 lb (largo 25 a 35 cm)' },
      { item: 'Anzuelo', spec: 'Anzuelo simple robusto N° 2/0 o 3/0 con traba para carnada' },
      { item: 'Esmerillón', spec: '1 esmerillón con mosquetón resistente' }
    ],
    measurements: {
      totalLength: 'Boya y bajada de 35 a 45 cm de profundidad total.',
      branchLengths: 'Brazola suspendida de 25 cm para que la carnada nade justo debajo de la boya.',
      adaptationRules: [
        'En bahías muy bajas (50 cm de agua): acortar el líder a 15-20 cm para no enganchar el barro del fondo.',
        'Si la tararira ataca la boya y no el anzuelo: acortar la bajada y utilizar carnada más llamativa o teñida.'
      ]
    },
    numberedSteps: [
      {
        step: 1,
        title: 'Conexión de la boya plop',
        description: 'Atá la línea del reel al ojal superior de la boya plop mediante un nudo Palomar o mosquetón rápido.'
      },
      {
        step: 2,
        title: 'Colocación del líder de acero',
        description: 'En el ojal inferior de la boya, conectá el tramo de cable de acero flexible de 25 cm con tubito de remache.'
      },
      {
        step: 3,
        title: 'Fijación del anzuelo',
        description: 'Conectá el anzuelo 2/0 en el otro extremo del acero.'
      },
      {
        step: 4,
        title: 'Encarnado y acción en el agua',
        description: 'Colocá una tira de carnada blanca (pejerrey o carpa) o una rana de látex. Lanzá hacia el borde de los juncales y recogé con golpes de puntera pausados haciendo sonar el plop.'
      }
    ],
    knots: [
      {
        name: 'Nudo Palomar',
        path: '/nudos',
        hash: 'nudo-palomar',
        image: '/img/Nudo1.gif',
        use: 'Fija la línea del reel al ojal de tracción de la boya.'
      },
      {
        name: 'Medio nudo barril asegurado',
        path: '/nudos',
        hash: 'medio-nudo-barril-asegurado',
        image: '/img/nudo2.gif',
        use: 'Para unir tramos auxiliares de monofilamento grueso.'
      },
      {
        name: 'Nudo Doble Uni (Unir tanza)',
        path: '/nudos',
        hash: 'nudo-doble-uni',
        image: '/img/unir tanza.gif',
        use: 'Ideal para unir el multifilamento del reel con el chicote de monofilamento previo a la boya.'
      }
    ],
    commonErrors: [
      {
        error: 'Tirones continuos sin pausas',
        consequence: 'La tararira necesita 3 a 5 segundos de pausa para apuntar y atacar la carnada; si se recoge sin parar, falla el ataque.',
        solution: 'Dar dos golpes de plop y esperar 5 segundos inmóvil antes de volver a mover.'
      },
      {
        error: 'Clavar instantáneamente al ver el ataque',
        consequence: 'Se le saca el señuelo de la boca antes de que lo trague bien.',
        solution: 'Esperar que hunda la boya y tensar con firmeza.'
      }
    ],
    alternatives: [
      {
        situation: 'Si la superficie está plagada de malezas densas',
        recommendation: 'Usar señuelos blandos tipo ranas huecas de goma (frogs) con anzuelo doble antienganche sin boya.'
      }
    ]
  }
];

export function getRigById(id) {
  return RIG_TUTORIALS.find(r => r.id === id || r.slug === id);
}
