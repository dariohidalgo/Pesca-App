/**
 * Configuración y modelo de datos para niveles hidrológicos y cotas de diques de Córdoba.
 * Fuente de referencia oficial: Administración Provincial de Recursos Hídricos (APRHI).
 * 
 * Este módulo provee datos estáticos precargados y funciones de cálculo semántico,
 * preparado para consumirse directamente o actualizarse mediante un endpoint REST/JSON.
 */

import rawData from './damWaterLevels.json' with { type: 'json' };

/**
 * Normalización de alias de diques para compatibilidad entre selectores y bases de datos.
 */
export const DAM_ID_ALIASES = {
  'rio-tercero': 'embalse',
  'embalse-rio-tercero': 'embalse',
  'dique-san-roque': 'san-roque',
  'dique-los-molinos': 'los-molinos',
  'dique-cruz-del-eje': 'cruz-del-eje',
  'arturo-illia': 'cruz-del-eje',
  'dique-pichanas': 'pichanas',
  'dique-la-vina': 'la-vina',
  'medina-allende': 'la-vina',
  'dique-el-cajon': 'el-cajon',
  'dique-cerro-pelado': 'cerro-pelado'
};

/**
 * @typedef {'green' | 'yellow' | 'orange' | 'gray'} WaterLevelStatus
 * 
 * @typedef {Object} WaterLevelEvaluation
 * @property {number} currentLevel - Cota actual en metros.
 * @property {number} spillwayLevel - Cota de vertedero oficial en metros.
 * @property {number} diff - Diferencia en metros (actual - vertedero).
 * @property {string} diffFormatted - Diferencia formateada (ej. "-1.80m", "+0.20m").
 * @property {WaterLevelStatus} status - Estado semántico ('green' | 'yellow' | 'orange').
 * @property {string} label - Texto descriptivo para badge/chips (ej. "Cota: -1.80m del vertedero").
 * @property {number} percentage - Porcentaje de llenado respecto al vertedero (0 a 100).
 * @property {Object} styles - Clases de Tailwind para fondos, textos, bordes y barras de progreso.
 * @property {string} lastUpdated - Fecha de última medición.
 * @property {string} source - Entidad de procedencia de la medición.
 */

/**
 * Paleta de colores semánticos con Tailwind CSS (Dark mode compatible).
 * - Verde: bajante < 2m (diff >= -2.00m)
 * - Amarillo: bajante entre 2m y 4m (-4.00m <= diff < -2.00m)
 * - Naranja: bajante > 4m (diff < -4.00m)
 */
export const STATUS_STYLES = {
  green: {
    badge: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
    bar: 'bg-emerald-500 dark:bg-emerald-400',
    track: 'bg-emerald-100 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300'
  },
  yellow: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500 dark:bg-amber-400',
    bar: 'bg-amber-500 dark:bg-amber-400',
    track: 'bg-amber-100 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300'
  },
  orange: {
    badge: 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
    dot: 'bg-orange-500 dark:bg-orange-400',
    bar: 'bg-orange-500 dark:bg-orange-400',
    track: 'bg-orange-100 dark:bg-orange-950/40',
    text: 'text-orange-700 dark:text-orange-300'
  },
  gray: {
    badge: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
    dot: 'bg-slate-400 dark:bg-slate-500',
    bar: 'bg-slate-400 dark:bg-slate-500',
    track: 'bg-slate-100 dark:bg-slate-800',
    text: 'text-slate-500 dark:text-slate-400'
  }
};

/**
 * Resuelve y normaliza el ID del dique para consultas.
 * @param {string} id 
 * @returns {string}
 */
export function normalizeDamId(id) {
  if (!id) return '';
  const cleanId = String(id).toLowerCase().trim();
  return DAM_ID_ALIASES[cleanId] || cleanId;
}

/**
 * Evalúa semánticamente la cota actual vs nivel del vertedero.
 * 
 * Reglas de negocio solicitadas:
 * - Verde: menos de 2m de bajante (diff >= -2.00m o sobre vertedero)
 * - Amarillo: entre 2m y 4m de bajante (-4.00m <= diff < -2.00m)
 * - Naranja: supera los 4m de bajante (diff < -4.00m)
 * 
 * @param {number} currentLevel Cota actual medida (m)
 * @param {number} spillwayLevel Cota de vertedero oficial (m)
 * @param {Object} [meta={}] Metadatos opcionales (lastUpdated, source)
 * @returns {WaterLevelEvaluation}
 */
export function evaluateWaterLevel(currentLevel, spillwayLevel, meta = {}) {
  const current = parseFloat(currentLevel);
  const spillway = parseFloat(spillwayLevel);

  if (isNaN(current) || isNaN(spillway) || spillway <= 0) {
    return {
      currentLevel: null,
      spillwayLevel: isNaN(spillway) ? null : spillway,
      diff: null,
      diffFormatted: 'S/D',
      status: 'gray',
      label: 'Cota: Sin dato oficial',
      percentage: 0,
      styles: STATUS_STYLES.gray,
      lastUpdated: meta.lastUpdated || null,
      source: meta.source || rawData.source
    };
  }

  // Diferencia respecto al labio del vertedero: actual - vertedero
  const diff = Number((current - spillway).toFixed(2));
  const absDiff = Math.abs(diff);

  // Determinar status semántico según la bajante
  let status = 'green';
  if (diff < -4.00) {
    status = 'orange'; // Supera 4m de bajante
  } else if (diff < -2.00) {
    status = 'yellow'; // Entre 2m y 4m de bajante
  } else {
    status = 'green';  // Menos de 2m de bajante (o a cota/sobre vertedero)
  }

  // Formato del diff y etiqueta legible
  let diffFormatted = '';
  let label = '';

  if (diff < 0) {
    diffFormatted = `-${absDiff.toFixed(2)}m`;
    label = `Cota: -${absDiff.toFixed(2)}m del vertedero`;
  } else if (diff === 0) {
    diffFormatted = '0.00m';
    label = 'Cota: A nivel de vertedero (0.00m)';
  } else {
    diffFormatted = `+${diff.toFixed(2)}m`;
    label = `Cota: +${diff.toFixed(2)}m sobre vertedero`;
  }

  const percentage = Math.min(100, Math.max(0, Number(((current / spillway) * 100).toFixed(1))));

  return {
    currentLevel: current,
    spillwayLevel: spillway,
    diff,
    diffFormatted,
    status,
    label,
    percentage,
    styles: STATUS_STYLES[status],
    lastUpdated: meta.lastUpdated || rawData.updatedAt?.split('T')[0] || '2026-10-15',
    source: meta.source || rawData.source
  };
}

/**
 * Obtiene los datos evaluados de cota y vertedero para un dique específico.
 * @param {string} damId 
 * @param {Object} [dataSource] Origen de datos opcional (por defecto usa la config local damWaterLevels.json)
 * @returns {WaterLevelEvaluation | null}
 */
export function getDamWaterLevel(damId, dataSource = rawData) {
  const normalized = normalizeDamId(damId);
  const damConfig = dataSource?.dams?.[normalized];

  if (!damConfig) {
    return null;
  }

  return evaluateWaterLevel(damConfig.currentLevel, damConfig.spillwayLevel, {
    lastUpdated: damConfig.lastUpdated || dataSource.updatedAt,
    source: dataSource.source
  });
}

/**
 * Devuelve todas las cotas calculadas mapeadas por ID de dique.
 * @param {Object} [dataSource]
 * @returns {Record<string, WaterLevelEvaluation>}
 */
export function getAllDamWaterLevels(dataSource = rawData) {
  const result = {};
  const dams = dataSource?.dams || {};

  for (const [id, config] of Object.entries(dams)) {
    result[id] = evaluateWaterLevel(config.currentLevel, config.spillwayLevel, {
      lastUpdated: config.lastUpdated || dataSource.updatedAt,
      source: dataSource.source
    });
  }

  return result;
}

/**
 * Cliente para consumir datos hidrológicos desde un endpoint HTTP o fallback a configuración estática.
 * Permite actualización transparente cuando esté disponible un worker o API backend.
 * 
 * @param {string} [endpointUrl='/api/dam-levels']
 * @param {number} [timeoutMs=5000]
 * @returns {Promise<{ source: string, updatedAt: string, dams: Record<string, WaterLevelEvaluation> }>}
 */
export async function fetchDamWaterLevels(endpointUrl = '/api/dam-levels', timeoutMs = 5000) {
  try {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

    const response = await fetch(endpointUrl, {
      signal: controller?.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (timeoutId) clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Endpoint returned status ${response.status}`);
    }

    const payload = await response.json();
    return {
      source: payload.source || rawData.source,
      sourceUrl: payload.sourceUrl || rawData.sourceUrl,
      updatedAt: payload.updatedAt || rawData.updatedAt,
      dams: getAllDamWaterLevels(payload)
    };
  } catch {
    // Fallback silencioso a los datos precargados locales
    return {
      source: rawData.source,
      sourceUrl: rawData.sourceUrl,
      updatedAt: rawData.updatedAt,
      dams: getAllDamWaterLevels(rawData)
    };
  }
}

export default rawData;
