import { useState, useEffect } from 'react';
import axios from 'axios';
import SunCalc from 'suncalc';
import SEO from './SEO';
import { Wind, Gauge, Moon, MapPin, Loader2, AlertCircle, Calendar, Sun, Cloud, CloudRain, Award, Info, ShieldCheck, ExternalLink, ArrowUp, ChevronRight, Compass, X } from 'lucide-react';
import AdBanner from './AdBanner';
import SchemaOrg from './SchemaOrg';
import { canonicalUrl, DEFAULT_IMAGE } from '../lib/domain';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCordobaTodayString, getCardinalDirection, getWindArrowRotation, findBestFishingDayIndex } from '../lib/weatherUtils';
import DamWaterLevelIndicator from './DamWaterLevelIndicator';
import DayForecastModal from './DayForecastModal';
import { startTour, TOUR_STORAGE_KEY } from '../lib/tour';

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
    const [selectedDayModal, setSelectedDayModal] = useState(null);
    const [_loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showTourBanner, setShowTourBanner] = useState(false);

    useEffect(() => {
        try {
            if (typeof window !== 'undefined' && !localStorage.getItem(TOUR_STORAGE_KEY)) {
                setShowTourBanner(true);
            }
        } catch {
            // Entorno restringido sin acceso a localStorage
        }
    }, []);

    const handleStartTourFromBanner = () => {
        try {
            localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        } catch {
            // Ignorar en entornos sin acceso a localStorage
        }
        setShowTourBanner(false);
        startTour();
    };

    const handleDismissTourBanner = () => {
        try {
            localStorage.setItem(TOUR_STORAGE_KEY, 'true');
        } catch {
            // Ignorar en entornos sin acceso a localStorage
        }
        setShowTourBanner(false);
    };

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
                    const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m,wind_gusts_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,precipitation_sum,precipitation_probability_max,sunrise,sunset,uv_index_max&timezone=America%2FArgentina%2FCordoba`;
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
                        const windGustsMax = daily.wind_gusts_10m_max ? Math.round(daily.wind_gusts_10m_max[i]) : null;
                        const windDirectionDominant = daily.wind_direction_10m_dominant !== undefined && daily.wind_direction_10m_dominant !== null
                            ? Math.round(daily.wind_direction_10m_dominant[i])
                            : null;
                        const precipitationSum = daily.precipitation_sum ? daily.precipitation_sum[i] : 0;
                        const precipitationProbability = daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : null;
                        const sunrise = daily.sunrise ? daily.sunrise[i] : null;
                        const sunset = daily.sunset ? daily.sunset[i] : null;
                        const uvIndexMax = daily.uv_index_max ? daily.uv_index_max[i] : null;
                        const dayMoonPhase = SunCalc.getMoonIllumination(dateObj).phase;
                        const dayMoonPhaseText = getMoonPhaseText(dayMoonPhase);
                        const dayFishingIndex = calculateFishingIndex(windMax, 950, dayMoonPhase);

                        forecastList.push({
                            originalIndex: i,
                            date: dateObj,
                            dayName: format(dateObj, 'EEE', { locale: es }),
                            windMax,
                            tempMax,
                            tempMin,
                            weatherCode,
                            windGustsMax,
                            windDirectionDominant,
                            precipitationSum,
                            precipitationProbability,
                            sunrise,
                            sunset,
                            uvIndexMax,
                            moonPhase: dayMoonPhase,
                            moonPhaseText: dayMoonPhaseText,
                            fishingIndex: dayFishingIndex
                        });
                    }
                }

                const bestIdx = findBestFishingDayIndex(forecastList, current.surface_pressure || 950);
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

            {/* Banner de Onboarding no intrusivo */}
            {showTourBanner && (
                <div
                    data-testid="tour-banner"
                    className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50 to-indigo-50/70 dark:from-slate-800 dark:via-slate-800 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all"
                >
                    <div className="flex items-start sm:items-center gap-3">
                        <div className="p-2 bg-blue-600/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
                            <Compass className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
                            ¿Nuevo en Pesca Córdoba? Hacé un recorrido rápido por las herramientas de la web
                        </p>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                            type="button"
                            onClick={handleStartTourFromBanner}
                            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                            Ver guía (30 seg)
                        </button>
                        <button
                            type="button"
                            onClick={handleDismissTourBanner}
                            aria-label="Cerrar aviso de guía"
                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Pronóstico de Pique</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Variables climáticas aplicadas a la pesca deportiva en Córdoba</p>
                </div>
                <div id="tour-dique-cota" className="flex flex-col items-start md:items-end gap-2 w-full md:w-auto">
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
                                                    style={{ transform: `rotate(${getWindArrowRotation(weatherData.windDirection)}deg)` }}
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
                            <button
                                key={day.date.toISOString()}
                                type="button"
                                onClick={() => setSelectedDayModal(day)}
                                className={`w-full text-left bg-white dark:bg-slate-900 rounded-2xl shadow-sm border p-5 transition-all cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-slate-700 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    index === bestDayIndex
                                        ? 'border-emerald-500/50 dark:border-emerald-500/50'
                                        : 'border-slate-100 dark:border-slate-800'
                                }`}
                            >
                                {index === bestDayIndex && (
                                    <div className="mb-2.5">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30">
                                            ✓ Mejor día de la semana
                                        </span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-bold text-slate-900 dark:text-white text-lg capitalize">
                                        {format(day.date, 'EEEE d MMMM', { locale: es })}
                                    </h3>
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
                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                                    <span>Ver más datos</span>
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                            </button>
                        ))}
                    </div>

                    <DayForecastModal
                        isOpen={Boolean(selectedDayModal)}
                        onClose={() => setSelectedDayModal(null)}
                        day={selectedDayModal}
                        locationName={selectedLocation?.name}
                        isBestDay={Boolean(selectedDayModal && dailyForecast.indexOf(selectedDayModal) === bestDayIndex)}
                        fishingIndex={selectedDayModal?.fishingIndex}
                    />
                </>
            )}

            <div className="mt-12">
                <AdBanner slot="3228900466" />
            </div>
        </div>
    );
}
