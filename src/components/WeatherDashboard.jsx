import { useState, useEffect } from 'react';
import axios from 'axios';
import SunCalc from 'suncalc';
import { Helmet } from 'react-helmet-async';
import { Wind, Gauge, Moon, MapPin, Loader2, AlertCircle, Calendar, Sun, Cloud, CloudRain, Award, Info, ShieldCheck, ExternalLink } from 'lucide-react';
import AdBanner from './AdBanner';
import SchemaOrg from './SchemaOrg';

const LOCATIONS = [
    { id: 'san-roque', name: 'Dique San Roque', lat: -31.3789, lon: -64.4647 },
    { id: 'los-molinos', name: 'Dique Los Molinos', lat: -31.8194, lon: -64.5361 },
    { id: 'rio-tercero', name: 'Embalse de Río Tercero', lat: -32.2033, lon: -64.4072 },
    { id: 'cruz-del-eje', name: 'Dique Cruz del Eje', lat: -30.7687, lon: -64.7346 },
    { id: 'el-cajon', name: 'Dique El Cajón', lat: -30.8500, lon: -64.5500 },
    { id: 'pichanas', name: 'Dique Pichanas', lat: -30.9142, lon: -65.1755 },
    { id: 'cerro-pelado', name: 'Embalse Cerro Pelado', lat: -32.2250, lon: -64.6394 },
];

const calculateFishingIndex = (wind, pressure, moonPhase) => {
    // Viento excesivo: factor limitante primario por seguridad y maniobrabilidad
    if (wind > 28) {
        return { label: 'Bajo', color: 'bg-rose-600 dark:bg-rose-900', text: 'Viento fuerte (>28 km/h). Oleaje peligroso para navegación e incomodidad en líneas de flote.' };
    }
    if (wind > 20) {
        return { label: 'Regular', color: 'bg-amber-600 dark:bg-amber-900', text: 'Viento moderado a regular. Se recomienda buscar bahías con orillas de reparo.' };
    }

    // Presión barométrica estándar a nivel del mar vs cotas serranas (~600 a 800 msnm, ~920 a 960 hPa presión real en superficie)
    // Open-Meteo entrega surface_pressure en hPa
    // Condición ideal: vientos calmos a leves (menos de 15 km/h) y fase lunar favorable
    const isMajorMoon = (moonPhase < 0.05 || moonPhase > 0.95 || (moonPhase > 0.45 && moonPhase < 0.55));

    if (wind <= 14 && isMajorMoon) {
        return { label: 'Excelente', color: 'bg-emerald-600 dark:bg-emerald-900', text: 'Viento leve y ventana lunar de alta actividad. Condiciones hidrometeorológicas favorables.' };
    }
    if (wind <= 18) {
        return { label: 'Bueno', color: 'bg-blue-600 dark:bg-blue-900', text: 'Condiciones meteorológicas estables y aptas para pesca embarcada o de costa.' };
    }
    return { label: 'Aceptable', color: 'bg-slate-600 dark:bg-slate-800', text: 'Condiciones dentro de parámetros promedio para intentar la jornada.' };
};

const getMoonPhaseText = (phase) => {
    if (phase === null || phase === undefined) return 'Desconocida';
    if (phase < 0.03 || phase > 0.97) return 'Luna Nueva (Novilunio)';
    if (phase >= 0.03 && phase < 0.22) return 'Luna Creciente';
    if (phase >= 0.22 && phase < 0.28) return 'Cuarto Creciente';
    if (phase >= 0.28 && phase < 0.47) return 'Gibosa Creciente';
    if (phase >= 0.47 && phase < 0.53) return 'Luna Llena (Plenilunio)';
    if (phase >= 0.53 && phase < 0.72) return 'Gibosa Menguante';
    if (phase >= 0.72 && phase < 0.78) return 'Cuarto Menguante';
    return 'Luna Menguante';
};

const getWeatherIcon = (code) => {
    if (code === 0 || code === 1) return <Sun className="h-6 w-6 text-yellow-500" />;
    if (code === 2 || code === 3) return <Cloud className="h-6 w-6 text-slate-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (code >= 80 && code <= 82) return <CloudRain className="h-6 w-6 text-blue-500" />;
    if (code >= 95) return <AlertCircle className="h-6 w-6 text-purple-500" />;
    return <Cloud className="h-6 w-6 text-slate-400" />;
};

export default function WeatherDashboard() {
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
    const [weatherData, setWeatherData] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [bestDayIndex, setBestDayIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const canonicalUrl = 'https://www.pescacordoba.com.ar/';

    useEffect(() => {
        let isMounted = true;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            const { lat, lon } = selectedLocation;

            // Cálculo real astronómico de fase lunar para la fecha actual
            const today = new Date();
            const moonIllum = SunCalc.getMoonIllumination(today);
            const currentMoonPhase = moonIllum.phase;

            try {
                let data = null;

                // Intentamos primero la ruta de proxy interna
                try {
                    const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`, { timeout: 6000 });
                    if (res.data && (res.data.current || res.data.daily)) {
                        data = res.data;
                    }
                } catch {
                    // Fallback directo a Open-Meteo con CORS público si el proxy no responde o estamos en preview
                    const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=America%2FArgentina%2FCordoba`;
                    const fallbackRes = await axios.get(fallbackUrl, { timeout: 8000 });
                    if (fallbackRes.data && (fallbackRes.data.current || fallbackRes.data.daily)) {
                        data = fallbackRes.data;
                    }
                }

                if (!data || !isMounted) return;

                const current = data.current || {};
                const daily = data.daily || {};

                setWeatherData({
                    pressure: current.surface_pressure !== undefined ? Math.round(current.surface_pressure) : 950,
                    wind: current.wind_speed_10m !== undefined ? Math.round(current.wind_speed_10m) : 0,
                    moonPhase: currentMoonPhase
                });

                const forecastList = [];
                let bestIdx = -1;
                let minWind = Infinity;

                if (daily && daily.time) {
                    for (let i = 1; i < daily.time.length && i <= 6; i++) {
                        const dateStr = daily.time[i];
                        const dateObj = new Date(dateStr + 'T12:00:00');
                        const windMax = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[i] : 0;
                        const tempMax = daily.temperature_2m_max ? daily.temperature_2m_max[i] : 0;
                        const tempMin = daily.temperature_2m_min ? daily.temperature_2m_min[i] : 0;
                        const weatherCode = daily.weather_code ? daily.weather_code[i] : 0;

                        forecastList.push({
                            originalIndex: i,
                            date: dateObj,
                            dayName: dateObj.toLocaleDateString('es-AR', { weekday: 'short' }),
                            windMax,
                            tempMax,
                            tempMin,
                            weatherCode
                        });

                        if (windMax < minWind) {
                            minWind = windMax;
                            bestIdx = forecastList.length - 1;
                        }
                    }
                }

                setDailyForecast(forecastList);
                setBestDayIndex(bestIdx);
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching weather data:", err);
                    setError('No se pudo sincronizar el pronóstico en este momento. Verificá tu conexión a internet o reintentá en unos instantes.');
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchWeather();

        return () => {
            isMounted = false;
        };
    }, [selectedLocation]);

    const handleLocationChange = (e) => {
        const loc = LOCATIONS.find(l => l.id === e.target.value);
        if (loc) setSelectedLocation(loc);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mt-6">
            <Helmet>
                <title>Pronóstico de Pique y Clima para Pesca en Córdoba</title>
                <meta name="description" content="Pronóstico del tiempo, viento, presión barométrica y fase lunar para la pesca deportiva en los principales diques de Córdoba." />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content="Pronóstico de Pique y Clima para Pesca en Córdoba" />
                <meta property="og:description" content="Pronóstico del tiempo, viento, presión barométrica y fase lunar para la pesca deportiva en los diques de Córdoba." />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="website" />
            </Helmet>

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Pronóstico de Pique y Clima para Pesca en Córdoba",
                "description": "Herramienta meteorológica con presión barométrica, viento y fase lunar para diques cordobeses.",
                "url": canonicalUrl
            }} />

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Pronóstico de Pique</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Variables climáticas aplicadas a la pesca deportiva en Córdoba</p>
                </div>

                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                        value={selectedLocation.id}
                        onChange={handleLocationChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none font-medium cursor-pointer"
                        aria-label="Seleccionar pesquero"
                    >
                        {LOCATIONS.map(loc => (
                            <option key={loc.id} value={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Consultando estación meteorológica...</p>
                </div>
            )}

            {error && !loading && (
                <div className="bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 p-6 rounded-xl flex items-start gap-3 border border-amber-200 dark:border-amber-900 mb-6">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-amber-600" />
                    <div>
                        <p className="font-semibold text-sm">Aviso de sincronización</p>
                        <p className="text-xs mt-1 leading-relaxed">{error}</p>
                    </div>
                </div>
            )}

            {!loading && weatherData && (() => {
                const indexResult = calculateFishingIndex(weatherData.wind, weatherData.pressure, weatherData.moonPhase);

                return (
                    <div className="space-y-6">
                        <div className={`p-8 rounded-2xl text-white ${indexResult.color} shadow-lg transition-transform duration-300 relative overflow-hidden`}>
                            <p className="text-xs uppercase tracking-wider font-semibold mb-1 opacity-90">Índice Orientativo de Condiciones</p>
                            <h2 className="text-4xl sm:text-5xl font-black mb-2 tracking-tight">{indexResult.label}</h2>
                            <p className="text-base sm:text-lg opacity-90 font-medium leading-relaxed max-w-2xl">{indexResult.text}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-xl text-blue-600 dark:text-blue-400">
                                    <Gauge className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Presión Superficie</p>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{weatherData.pressure} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">hPa</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-teal-100 dark:bg-teal-900/50 p-3 rounded-xl text-teal-600 dark:text-teal-400">
                                    <Wind className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Viento Actual</p>
                                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{weatherData.wind} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">km/h</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl text-indigo-600 dark:text-indigo-400">
                                    <Moon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Fase Lunar</p>
                                    <p className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight">{getMoonPhaseText(weatherData.moonPhase)}</p>
                                </div>
                            </div>
                        </div>

                        {dailyForecast.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-6">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Pronóstico de los Próximos {dailyForecast.length} Días</h3>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                                    {dailyForecast.map((day, idx) => {
                                        const isBest = idx === bestDayIndex;
                                        return (
                                            <div key={idx} className={`relative p-4 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${isBest ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 ring-2 ring-green-500 dark:ring-green-600 shadow-md transform -translate-y-1' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 hover:-translate-y-0.5'}`}>
                                                {isBest && (
                                                    <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg z-10" title="Día con menor viento">
                                                        <Award className="h-5 w-5" />
                                                    </div>
                                                )}
                                                <p className="font-bold text-slate-700 dark:text-slate-200 capitalize mb-1">{day.dayName}</p>
                                                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{day.date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</p>

                                                <div className="mb-2">
                                                    {getWeatherIcon(day.weatherCode)}
                                                </div>

                                                <div className="flex gap-2 text-sm font-semibold mb-2">
                                                    <span className="text-red-500">{Math.round(day.tempMax)}°</span>
                                                    <span className="text-blue-500">{Math.round(day.tempMin)}°</span>
                                                </div>

                                                <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1.5 rounded w-full justify-center ${isBest ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' : 'bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400'}`}>
                                                    <Wind className="h-3.5 w-3.5" />
                                                    {Math.round(day.windMax)} km/h
                                                </div>

                                                {isBest && (
                                                    <span className="mt-3 text-[10px] font-bold text-green-700 dark:text-green-300 uppercase bg-green-200 dark:bg-green-900 px-2 py-0.5 rounded-full w-full">Viento Leve</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Alerta meteorológica oficial SMN */}
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                                <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                                    <strong className="block text-sm font-bold text-amber-950 dark:text-amber-100 mb-0.5">Alertas Meteorológicas Oficiales (SMN)</strong>
                                    Por seguridad náutica, nunca asumas ausencia de tormentas por falta de sincronización o valores promedio. Ante contingencias de viento pampero o tormentas eléctricas, consultá el canal oficial del Servicio Meteorológico Nacional.
                                </div>
                            </div>
                            <a
                                href="https://www.smn.gob.ar/alertas"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shrink-0 transition-colors shadow-sm self-start sm:self-auto"
                            >
                                <span>Ver Alertas SMN Córdoba</span>
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>

                        {/* Metodología y limitaciones del índice de pique */}
                        <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                                <Info className="h-5 w-5 text-blue-600" />
                                Metodología Técnica y Transparencia de Datos
                            </h3>
                            <div className="space-y-2 text-xs leading-relaxed">
                                <p>
                                    <strong>Variables Meteorológicas:</strong> Los pronósticos se obtienen de los modelos numéricos de alta resolución de <strong>Open-Meteo</strong> para las coordenadas del dique. 
                                    Se reporta la <strong>presión real en superficie (surface_pressure)</strong> adaptada a la cota serrana (~920-960 hPa según la altitud de 600 a 850 msnm), y no la presión reducida a nivel del mar. La temperatura indicada corresponde al <strong>aire a 2 metros del suelo</strong> (no a la temperatura del agua de las capas profundas).
                                </p>
                                <p>
                                    <strong>Pronóstico vs Medición:</strong> Los datos horarios son simulaciones predictivas provistas por Open-Meteo y no mediciones registradas por estaciones de campo. La fase lunar se calcula matemáticamente mediante efemérides astronómicas con SunCalc.
                                </p>
                                <p>
                                    <strong>Alcance y Limitaciones:</strong> El índice de pique es un estimador biofísico de apoyo y no una garantía de capturas. La actividad de los peces depende de la turbidez, fluctuaciones térmicas estacionales, desoves, presión barométrica sostenida y elección del aparejo adecuado.
                                </p>
                            </div>
                        </div>

                        {/* Banner publicitario contextualizado */}
                        <div className="mt-8">
                            <AdBanner slot="3228900466" />
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
