export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon parameters' });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto`;
    
    console.log(`Fetching weather for: ${lat}, ${lon}`);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Open-Meteo API Error (${response.status}):`, errorText);
      return res.status(response.status).json({ 
        error: 'Error de la API externa',
        details: errorText.substring(0, 100)
      });
    }

    const data = await response.json();

    if (!data || (!data.current && !data.daily)) {
      return res.status(502).json({ error: 'Respuesta inválida de la API externa' });
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Weather API Proxy Error:', error.message);
    return res.status(500).json({ 
      error: 'Error interno al procesar los datos climáticos',
      message: error.message 
    });
  }
}
