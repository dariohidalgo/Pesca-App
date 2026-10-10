/**
 * Modelo de datos y utilidades para Partes de Pesca en Córdoba.
 * Requisito estricto: Datos reales y honestos. No se inventan testimonios ni garantías de pique.
 * Los datos de prueba se limitan al entorno de desarrollo (import.meta.env.DEV).
 */

// Reportes de prueba exclusivamente visibles en modo desarrollo para verificación de interfaz y tests
const DEV_TEST_REPORTS = [
  {
    id: 'reporte-dev-001',
    isDevMock: true,
    tripDate: '2026-03-14',
    publishDate: '2026-03-15',
    damId: 'san-roque',
    damName: 'Dique San Roque',
    zone: 'Sector Garganta / Paredón',
    modality: 'costa',
    targetSpecies: 'Pejerrey',
    baitAndRig: 'Línea de flote 3 boyas cometa medianas, brazoladas a 45 cm. Carnada: mojarra viva mediana con un toque de sal.',
    rigId: 'flote-pejerrey-tres-boyas',
    conditions: 'Viento suave del este (10 km/h), cielo despejado, agua ligeramente turbia con temperatura templada al mediodía (19°C).',
    result: {
      hasCatches: true,
      catchesCount: 8,
      notes: 'Pique espaciado entre las 10:30 y las 13:00 hs. Pejerreyes de medida justa (26 a 28 cm), combativos pero comiendo con sutileza.'
    },
    author: 'Pescador colaborador (relevamiento inicial)',
    photo: null,
    status: 'approved',
    disclaimer: 'Experiencia particular en fecha y horario específico. No constituye garantía de pique.'
  },
  {
    id: 'reporte-dev-002',
    isDevMock: true,
    tripDate: '2026-03-08',
    publishDate: '2026-03-09',
    damId: 'los-molinos',
    damName: 'Dique Los Molinos',
    zone: 'Bahía Los Espinillos',
    modality: 'kayak',
    targetSpecies: 'Tararira',
    baitAndRig: 'Spinning liviano con señuelos paseantes de superficie y rana de goma antienganche.',
    rigId: 'flote-boya-plop',
    conditions: 'Calor intenso (31°C), tarde sin viento y agua cristalina. Ráfagas del sur hacia las 18 hs obligaron a salir a la orilla.',
    result: {
      hasCatches: false,
      catchesCount: 0,
      notes: 'Jornada sin capturas efectivas. Se registraron dos ataques fallidos en superficie entre los juncos, pero los peces no alcanzaron a clavar. Registro documentado con fines de validación técnica.'
    },
    author: 'Registro técnico (modo pruebas)',
    photo: null,
    status: 'approved',
    disclaimer: 'Salida sin capturas documentada honestamente. La pesca deportiva implica jornadas con y sin pique.'
  }
];

/**
 * Retorna los reportes base.
 * En producción se inicia con arreglo vacío para garantizar que solo se publiquen partes reales verificados.
 */
export function getInitialReports() {
  if (import.meta.env.DEV) {
    return DEV_TEST_REPORTS;
  }
  return [];
}

export const MODALITIES = [
  { id: 'todas', label: 'Todas las modalidades' },
  { id: 'costa', label: 'De Costa' },
  { id: 'embarcado', label: 'Embarcado (Bote/Tracker)' },
  { id: 'kayak', label: 'En Kayak' }
];

export const SPECIES_FILTER_OPTIONS = [
  { id: 'todas', label: 'Todas las especies' },
  { id: 'Pejerrey', label: 'Pejerrey' },
  { id: 'Carpa', label: 'Carpa' },
  { id: 'Tararira', label: 'Tararira' },
  { id: 'Bagre', label: 'Bagre / Otros' }
];
