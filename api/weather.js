export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Faltan parámetros de latitud o longitud' });
  }

  // Asegurarse de que sean números válidos para evitar inyecciones o errores de URL
  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Parámetros lat/lon inválidos' });
  }

  try {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=America%2FArgentina%2FCordoba`;
    
    console.log(`[WeatherAPI] Fetching: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'PescaApp-Vercel-Proxy/1.0',
        'Accept': 'application/json'
      },
      signal: AbortSignal.timeout(8000) // Timeout de 8 segundos
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[WeatherAPI] Error ${response.status}:`, errorText);
      return res.status(response.status).json({ 
        error: 'Error de la API externa (Open-Meteo)',
        status: response.status,
        details: errorText.substring(0, 200)
      });
    }

    const data = await response.json();

    if (!data || (!data.current && !data.daily)) {
      console.error('[WeatherAPI] Invalid data format:', JSON.stringify(data).substring(0, 100));
      return res.status(502).json({ error: 'Respuesta con formato inválido desde la API de clima' });
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json(data);
  } catch (error) {
    console.error('[WeatherAPI] catch error:', error.stack || error.message);
    
    // Devolvemos el error detallado para diagnosticar en producción
    return res.status(500).json({ 
      error: 'Error interno al procesar el clima',
      message: error.message,
      type: error.name,
      // Solo en desarrollo/debug temporalmente devolvemos el stack si es necesario, 
      // pero por ahora message y type son suficientes
    });
  }
}
