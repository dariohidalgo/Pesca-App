import axios from 'axios';

export default async function handler(req, res) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon parameters' });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=auto`;
    
    const response = await axios.get(url);

    if (!response.data || (!response.data.current && !response.data.daily)) {
      return res.status(502).json({ error: 'Respuesta inválida de la API externa' });
    }

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || 'Error al obtener datos climáticos';
    return res.status(status).json({ error: message });
  }
}
