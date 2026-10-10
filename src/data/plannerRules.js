/**
 * Motor de reglas transparente y mantenible para el Planificador de Salidas de Pesca en Córdoba.
 * Proporciona listas de equipo, montajes recomendados, accesos y recordatorios de seguridad.
 */

import { getDamById } from './damsData';
import { getPointsByDam } from './usefulPoints';

export function generateTripPlan({ damId, tripDate, species, modality, experienceLevel }) {
  const dam = getDamById(damId) || getDamById('san-roque');
  const allDamPoints = getPointsByDam(dam.id);

  // 1. Validación de fecha respecto al pronóstico
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = tripDate ? new Date(tripDate + 'T12:00:00') : new Date();
  const diffDays = Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24));

  let forecastStatus = 'within_range';
  let forecastMessage = 'La fecha está dentro del rango meteorológico extendido (7 días). Podés consultar el viento y presión previstos en el Pronóstico.';

  if (diffDays < 0) {
    forecastStatus = 'past';
    forecastMessage = 'La fecha seleccionada ya pasó. La planificación se genera en modo histórico o de consulta técnica.';
  } else if (diffDays > 7) {
    forecastStatus = 'beyond_range';
    forecastMessage = 'La fecha está a más de 7 días. Los modelos meteorológicos detallados (viento hora a hora y presión) pierden precisión a largo plazo. Te sugerimos revisar el Pronóstico 48 a 72 hs antes de salir.';
  }

  // 2. Recomendación de líneas y montajes según especie y dique
  const recommendedRigs = [];
  if (species === 'Pejerrey') {
    recommendedRigs.push({
      id: 'flote-pejerrey-tres-boyas',
      title: 'Línea de flote clásica de 3 boyas',
      reason: 'Ideal para mediodías templados o cuando el viento riza la superficie y el pejerrey caza cerca del sol.',
      path: '/lineas/flote-pejerrey-tres-boyas'
    });
    recommendedRigs.push({
      id: 'paternoster-pejerrey',
      title: 'Línea Paternoster regulable',
      reason: 'Fundamental en diques profundos (Los Molinos, San Roque) en mañanas frías donde el pejerrey come entre 4 y 10 metros de profundidad.',
      path: '/lineas/paternoster-pejerrey'
    });
  } else if (species === 'Carpa') {
    recommendedRigs.push({
      id: 'fondo-carpa-feeder',
      title: 'Línea de fondo con resorte cebador (Feeder)',
      reason: 'La técnica más eficaz para concentrar aroma en el lecho y tentar a carpas de gran porte.',
      path: '/lineas/fondo-carpa-feeder'
    });
  } else if (species === 'Tararira') {
    recommendedRigs.push({
      id: 'flote-boya-plop',
      title: 'Línea de flote con boya plop sonajera',
      reason: 'Genera sonido de chapoteo en superficie para despertar el ataque territorial en bahías bajas.',
      path: '/lineas/flote-boya-plop'
    });
    recommendedRigs.push({
      id: 'fondo-pesado-tararira-bagre',
      title: 'Línea de fondo pesada con líder de acero',
      reason: 'Resiste la dentadura filosa en sectores con palos sumergidos y horas de atardecer.',
      path: '/lineas/fondo-pesado-tararira-bagre'
    });
  } else {
    // Bagre u otras especies
    recommendedRigs.push({
      id: 'fondo-pesado-tararira-bagre',
      title: 'Línea de fondo pesada con plomada pasante',
      reason: 'Mantiene la carnada anclada en el fondo donde forrajean los silúridos serranos.',
      path: '/lineas/fondo-pesado-tararira-bagre'
    });
  }

  // 3. Puntos sugeridos según modalidad
  let relevantPoints = [];
  if (modality === 'costa') {
    relevantPoints = allDamPoints.filter(p => p.category === 'acceso_publico' || p.category === 'estacionamiento');
  } else if (modality === 'embarcado') {
    relevantPoints = allDamPoints.filter(p => p.category === 'bajada_embarcacion' || p.category === 'servicio');
  } else if (modality === 'kayak') {
    relevantPoints = allDamPoints.filter(p => p.category === 'acceso_publico' || p.category === 'camping');
  }
  if (relevantPoints.length === 0) {
    relevantPoints = allDamPoints.slice(0, 3);
  }

  // 4. Checklist estructurado con categorías
  const checklist = [
    {
      category: 'Documentación y Normativa',
      items: [
        { id: 'doc-carnet', text: 'Carnet de pesca deportiva digital de Córdoba (vigente en el celular o impreso)', required: true },
        { id: 'doc-dni', text: 'Documento Nacional de Identidad (DNI)', required: true },
        { id: 'doc-reglamento', text: 'Verificar en cazaypesca.cba.gov.ar el cupo oficial vigente para este dique y estado de vedas', required: true }
      ]
    },
    {
      category: 'Equipo Principal de Pesca',
      items: [
        {
          id: 'eq-cana',
          text: species === 'Pejerrey'
            ? 'Caña telescópica o enchufable de 3.90 a 4.50 m (acción de punta sensible)'
            : species === 'Carpa'
              ? 'Caña de lance de fondo de 3.00 a 3.60 m (potente para plomos de 50-80 g)'
              : 'Caña de spinning/baitcasting de 1.80 a 2.10 m (acción media-pesada)',
          required: true
        },
        {
          id: 'eq-reel',
          text: species === 'Pejerrey'
            ? 'Reel frontal chico/mediano cargado con nylon 0.23-0.25 mm o multi fino 0.12 mm'
            : 'Reel mediano cargado con nylon resistente 0.35 mm o multifilamento 0.20 mm',
          required: true
        },
        { id: 'eq-lineas', text: 'Al menos 2 o 3 líneas completas armadas de repuesto en tablita', required: true },
        { id: 'eq-anzuelos', text: 'Caja con anzuelos de repuesto, esmerillones, rotores y plomadas variadas', required: true }
      ]
    },
    {
      category: 'Carnadas y Cebos',
      items: [
        {
          id: 'carnada-ppal',
          text: species === 'Pejerrey'
            ? 'Mojarra viva (en balde o bolsa con oxígeno) y un frasco de mojarra salada de respaldo'
            : species === 'Carpa'
              ? 'Masa casera compacta (harina de maíz, vainilla, miel) y lata de maíz dulce/fermentado'
              : 'Carnada blanca (filete fresco), lombrices o señuelos de superficie con antienganche',
          required: true
        },
        { id: 'carnada-oxigenador', text: species === 'Pejerrey' ? 'Oxigenador a pila portátil para mantener mojarras vivas' : 'Bolsa hermética para conservar la masa fresca', required: false }
      ]
    },
    {
      category: 'Seguridad y Confort según Modalidad',
      items: [
        ...(modality === 'kayak' ? [
          { id: 'seg-chaleco-kayak', text: 'Chaleco salvavidas DAF homologado colocado con silbato adosado (Obligatorio Ley N° 5040)', required: true },
          { id: 'seg-cabo-fondeo', text: 'Cabo de fondeo con destrabe rápido (Recomendación práctica de seguridad)', required: false },
          { id: 'seg-pala-piton', text: 'Pala doble con pita elástica de sujeción (Recomendación práctica de seguridad)', required: false },
          { id: 'seg-bolsa-estanca', text: 'Bolsa estanca impermeable para celular, llaves y abrigo (Recomendación práctica de seguridad)', required: false }
        ] : []),
        ...(modality === 'embarcado' ? [
          { id: 'seg-chaleco-bote', text: 'Chalecos salvavidas reglamentarios por tripulante (Obligatorio Ley N° 5040)', required: true },
          { id: 'seg-matafuego', text: 'Matafuego triclase ABC 1 kg y kit exigido por Seguridad Náutica Córdoba (Ley N° 5040)', required: true },
          { id: 'seg-ancla-bote', text: 'Sistema de fondeo y anclaje con cabo proporcional (Obligatorio Ley N° 5040)', required: true }
        ] : []),
        ...(modality === 'costa' ? [
          { id: 'seg-posacana', text: 'Posacañas metálicos clavables para apoyar el equipo de forma segura', required: true },
          { id: 'seg-calzado', text: 'Calzado adherente para piedras serranas mojadas o resbaladizas', required: true }
        ] : []),
        { id: 'confort-solar', text: 'Protección solar: gorra con visera, protector FPS 50+ y anteojos de sol polarizados', required: true },
        { id: 'confort-hidratacion', text: 'Agua potable fresca suficiente (mínimo 2 litros por persona)', required: true },
        { id: 'confort-basura', text: 'Bolsa para traer de regreso el 100% de los residuos generados', required: true }
      ]
    }
  ];

  // 5. Fundamentación técnica transparente
  const rationale = `Planificación adaptada para ${species} en ${dam.name} bajo la modalidad ${modality}. Las sugerencias responden al comportamiento estacional en los lagos cordobeses, priorizando la seguridad y el cumplimiento de las normativas de la Secretaría de Ambiente.`;

  return {
    dam,
    tripDate: tripDate || 'Fecha flexible',
    species,
    modality,
    experienceLevel,
    forecastStatus,
    forecastMessage,
    recommendedRigs,
    relevantPoints,
    checklist,
    rationale,
    regulationsUrl: '/reglamento',
    weatherUrl: `/?dique=${dam.id}`,
    damGuideUrl: `/diques/${dam.id}`
  };
}
