/**
 * Utilidades para cálculo meteorológico y fechas de pesca en Córdoba.
 */

/**
 * Retorna la fecha actual en formato YYYY-MM-DD según la zona horaria America/Argentina/Cordoba.
 * @param {Date} [date=new Date()]
 * @returns {string} Fecha en formato ISO 'YYYY-MM-DD'
 */
export function getCordobaTodayString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Argentina/Cordoba',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/**
 * Convierte grados (0° a 360°) a los 8 rumbos cardinales en español (N, NE, E, SE, S, SO, O, NO).
 * @param {number|null|undefined} degrees - Grados de dirección del viento
 * @returns {string} Punto cardinal correspondiente
 */
export function getCardinalDirection(degrees) {
  if (degrees === null || degrees === undefined || isNaN(degrees)) return '';
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return directions[index];
}

/**
 * Traduce el código meteorológico WMO a una descripción clara en español.
 * @param {number} code - Código WMO
 * @returns {string}
 */
export function getWeatherDescription(code) {
  if (code === 0) return 'Cielo despejado';
  if (code === 1) return 'Mayormente despejado';
  if (code === 2) return 'Parcialmente nublado';
  if (code === 3) return 'Nublado';
  if (code === 45 || code === 48) return 'Neblina';
  if (code >= 51 && code <= 55) return 'Llovizna';
  if (code >= 56 && code <= 57) return 'Llovizna helada';
  if (code >= 61 && code <= 65) return 'Lluvia';
  if (code >= 66 && code <= 67) return 'Lluvia helada';
  if (code >= 71 && code <= 77) return 'Nevada';
  if (code >= 80 && code <= 82) return 'Chubascos de lluvia';
  if (code >= 85 && code <= 86) return 'Chubascos de nieve';
  if (code >= 95 && code <= 99) return 'Tormenta eléctrica';
  return 'Condiciones variables';
}

/**
 * Calcula la rotación en grados para la flecha de viento (ArrowUp) según la convención
 * meteorológica, donde la flecha apunta hacia donde sopla el viento (ej. viento del Oeste 270° sopla hacia el Este 90° →).
 * @param {number|null|undefined} degrees - Dirección de origen del viento en grados (0° a 360°)
 * @returns {number} Ángulo de rotación de la flecha en grados
 */
export function getWindArrowRotation(degrees) {
  if (degrees === null || degrees === undefined || isNaN(degrees)) return 0;
  return ((Number(degrees) + 180) % 360 + 360) % 360;
}

/**
 * Calcula el índice del mejor día para pescar entre los días del pronóstico extendido,
 * priorizando menor viento, ausencia de ráfagas violentas, estabilidad meteorológica y ventana lunar.
 * @param {Array} days - Lista de días del pronóstico extendido
 * @param {number} [basePressure=950] - Presión de referencia en hPa
 * @returns {number} Índice del mejor día en el array (-1 si está vacío)
 */
export function findBestFishingDayIndex(days, basePressure = 950) {
  if (!Array.isArray(days) || days.length === 0) return -1;

  let bestIndex = 0;
  let bestScore = -Infinity;

  days.forEach((day, idx) => {
    const wind = Number(day.windMax) || 0;
    const gusts = Number(day.windGustsMax) || wind;

    // Viento suave / moderado es ideal para pesca en diques cordobeses
    let windScore = 0;
    if (wind <= 12) windScore = 50 - wind * 1.5;
    else if (wind <= 18) windScore = 35 - (wind - 12) * 2.5;
    else if (wind <= 25) windScore = 15 - (wind - 18) * 3;
    else windScore = -20 - (wind - 25) * 5;

    // Penalidad por ráfagas violentas
    const gustPenalty = Math.max(0, gusts - wind) * 0.7;

    // Estabilidad meteorológica y ausencia de tormentas
    const code = Number(day.weatherCode) || 0;
    let weatherScore = 10;
    if (code >= 95) weatherScore = -40; // tormenta eléctrica
    else if (code >= 80) weatherScore = -20; // chubascos
    else if (code >= 51) weatherScore = -10; // lluvia
    else if (code === 0 || code === 1) weatherScore = 15; // despejado / óptimo

    // Penalidad por probabilidad de lluvia
    const rainPenalty = (Number(day.precipitationProbability) || 0) * 0.2;

    // Ventana lunar (nueva, llena o cuartos)
    const moonPhase = Number(day.moonPhase) || 0;
    const isMajorMoon = (moonPhase < 0.05 || moonPhase > 0.95 || (moonPhase > 0.45 && moonPhase < 0.55));
    const moonScore = isMajorMoon ? 8 : 0;

    const totalScore = windScore - gustPenalty + weatherScore - rainPenalty + moonScore;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestIndex = idx;
    }
  });

  return bestIndex;
}


