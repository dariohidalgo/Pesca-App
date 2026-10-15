import { useState, useEffect } from 'react';
import axios from 'axios';
import SunCalc from 'suncalc';
import SEO from './SEO';
import { Wind, Gauge, Moon, MapPin, Loader2, AlertCircle, Calendar, Sun, Cloud, CloudRain, Award, Info, ShieldCheck, ExternalLink, ArrowUp } from 'lucide-react';
import AdBanner from './AdBanner';
import SchemaOrg from './SchemaOrg';
import { canonicalUrl, DEFAULT_IMAGE } from '../lib/domain';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCordobaTodayString, getCardinalDirection } from '../lib/weatherUtils';
import DamWaterLevelIndicator from './DamWaterLevelIndicator';

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
    if (wind > 28) {
        return { label: 'Bajo', color: 'bg-rose-600 dark:bg-rose-900', text: 'Viento fuerte (>28 km/h). Oleaje peligroso para navegación e incomodidad en líneas de flote.' };
    }
    if (wind > 20) {
        return { label: 'Regular', color: 'bg-amber-600 dark:bg-amber-900', text: 'Viento moderado a regular. Se recomienda buscar bahías con orillas de reparo.' };
    }

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
    const [_loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            const { lat, lon } = selectedLocation;

            const today = new Date();
            const moonIllum = SunCalc.getMoonIllumination(today);
            const currentMoonPhase = moonIllum.phase;

            try {
                let data = null;

                try {
                    const res = await axios.get(`/api/weather?lat=${lat}&lon=${lon}`, { timeout: 6000 });
                    if (res.data && (res.data.current || res.data.daily)) {
                        data = res.data;
                    }
                } catch {
                    const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m,wind_gusts_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=America%2FArgentina%2FCordoba`;
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
                    windGusts: current.wind_gusts_10m !== undefined && current.wind_gusts_10m !== null ? Math.round(current.wind_gusts_10m) : null,
                    windDirection: current.wind_direction_10m !== undefined && current.wind_direction_10m !== null ? Math.round(current.wind_direction_10m) : null,
                    moonPhase: currentMoonPhase
                });

                const forecastList = [];
                let bestIdx = -1;
                let minWind = Infinity;

                if (daily && daily.time) {
                    const todayCordoba = getCordobaTodayString();

                    for (let i = 0; i < daily.time.length; i++) {
                        const dateStr = daily.time[i];
                        if (!dateStr || dateStr < todayCordoba) {
                            continue;
                        }

                        const dateObj = new Date(dateStr + 'T12:00:00');
                        const windMax = daily.wind_speed_10m_max ? daily.wind_speed_10m_max[i] : 0;
                        const tempMax = daily.temperature_2m_max ? daily.temperature_2m_max[i] : 0;
                        const tempMin = daily.temperature_2m_min ? daily.temperature_2m_min[i] : 0;
                        const weatherCode = daily.weather_code ? daily.weather_code[i] : 0;

                        forecastList.push({
                            originalIndex: i,
                            date: dateObj,
                            dayName: format(dateObj, 'EEE', { locale: es }),
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
        <div suppressHydrationWarning className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mt-6">
            <SEO
                title="Pesca Córdoba - Guías por Dique, Partes, Mapa y Pronóstico"
                description="Plataforma de pesca deportiva en Córdoba. Pronóstico de viento y presión, fichas de diques, partes de pesca fechados, tutoriales de líneas y mapa de pesqueros."
                canonical="/"
            />

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Pesca Córdoba",
                "url": "https://www.pescacordoba.com.ar/",
                "description": "Guías por dique, partes de pesca reales, mapa de accesos públicos, tutoriales de líneas y planificador de salida para la pesca deportiva en Córdoba."
            }} />
            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": "Pronóstico de Pique y Clima para Pesca en Córdoba",
                "description": "Herramienta meteorológica con presión barométrica, viento y fase lunar para diques cordobeses.",
                "url": canonicalUrl("/")
            }} />

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Pronóstico de Pique</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Variables climáticas aplicadas a la pesca deportiva en Córdoba</p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
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
                    <DamWaterLevelIndicator damId={selectedLocation.id} size="sm" />
                </div>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-700 dark:text-rose-300 text-sm" role="alert">
                    {error}
                </div>
            )}

            {weatherData && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                    <Gauge className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Presión Barométrica</p>
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{weatherData.pressure} hPa</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                                    <Wind className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Viento (10m)</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-2xl font-bold text-slate-900 dark:text-white">{weatherData.wind} km/h</p>
                                        {weatherData.windDirection !== null && weatherData.windDirection !== undefined && (
                                            <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md" title={`Dirección: ${weatherData.windDirection}°`}>
                                                <ArrowUp
                                                    className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 transition-transform duration-300 inline-block"
                                                    style={{ transform: `rotate(${weatherData.windDirection}deg)` }}
                                                    aria-hidden="true"
                                                />
                                                <span>{getCardinalDirection(weatherData.windDirection)}</span>
                                            </div>
                                        )}
                                    </div>
                                    {weatherData.windGusts !== null && weatherData.windGusts !== undefined && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                            Ráfagas: {weatherData.windGusts} km/h
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                                    <Moon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Fase Lunar</p>
                                    <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">{getMoonPhaseText(weatherData.moonPhase)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Índice de Pique Estimado</h2>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
                            {(() => {
                                const idx = calculateFishingIndex(weatherData.wind, weatherData.pressure, weatherData.moonPhase);
                                return (
                                    <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`px-4 py-2 rounded-xl text-white font-bold ${idx.color}`}>
                                                {idx.label}
                                            </div>
                                            <div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Condición para hoy</p>
                                                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                                                    Viento: {weatherData.wind} km/h • Presión: {weatherData.pressure} hPa
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">{idx.text}</p>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dailyForecast.map((day, index) => (
                            <div
                                key={day.date.toISOString()}
                                className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 transition-all ${
                                    index === bestDayIndex
                                        ? 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-lg shadow-emerald-500/20'
                                        : ''
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                                        {format(day.date, 'EEEE d MMMM', { locale: es })}
                                    </h3>
                                    {index === bestDayIndex && (
                                        <Award className="h-5 w-5 text-amber-500" />
                                    )}
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    {getWeatherIcon(day.weatherCode)}
                                    <span className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                                        {['soleado', 'parcialmente nublado', 'nublado', 'lluvia ligera', 'lluvia moderada', 'lluvia fuerte', 'tormenta'][day.weatherCode] || 'Variable'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                        <Sun className="h-4 w-4" />
                                        <span>{day.tempMax}°</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                        <Moon className="h-4 w-4" />
                                        <span>{day.tempMin}°</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                        <Wind className="h-4 w-4" />
                                        <span>{day.windMax} km/h</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                                        <Moon className="h-4 w-4" />
                                        <span>{getMoonPhaseText(SunCalc.getMoonIllumination(day.date).phase)}</span>
                                    </div>
                                </div>
                                {index === bestDayIndex && (
                                    <div className="mt-3 p-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                                        ✓ Mejor día para pescar esta semana
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-12">
                <AdBanner slot="3228900466" />
            </div>
        </div>
    );
}
