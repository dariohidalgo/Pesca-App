/**
 * Vercel Serverless Function: /api/dam-levels
 * Provee los niveles de cota actual y vertedero de los principales diques de Córdoba.
 * Fuente: Administración Provincial de Recursos Hídricos (APRHI).
 */

import damWaterLevelsData from '../src/data/damWaterLevels.json';

export default async function handler(req, res) {
  try {
    // Permitir CORS básico para consumo frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Método no permitido. Use GET.' });
    }

    // Cache headers: 1 hora en CDN, revalidación en segundo plano por 24 horas
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).json(damWaterLevelsData);
  } catch (error) {
    console.error('[DamLevelsAPI] Error al servir cotas de diques:', error);
    return res.status(500).json({
      error: 'Error interno al consultar niveles de diques',
      message: error.message
    });
  }
}
