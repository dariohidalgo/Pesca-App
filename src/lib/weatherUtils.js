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

