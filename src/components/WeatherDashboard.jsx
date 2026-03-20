import { useState, useEffect } from 'react';
import axios from 'axios';
import { Wind, Gauge, Moon, MapPin, Loader2, AlertCircle, Calendar, Sun, Cloud, CloudRain, Award } from 'lucide-react';

const LOCATIONS = [
    { id: 'san-roque', name: 'Dique San Roque', lat: -31.3789, lon: -64.4647 },
    { id: 'los-molinos', name: 'Dique Los Molinos', lat: -31.8194, lon: -64.5361 },
    { id: 'rio-tercero', name: 'Embalse de Río Tercero', lat: -32.2033, lon: -64.4072 },
    { id: 'cruz-del-eje', name: 'Dique Cruz del Eje', lat: -30.7350, lon: -64.7933 },
    { id: 'el-cajon', name: 'Dique El Cajón', lat: -30.8500, lon: -64.5500 },
    { id: 'cerro-pelado', name: 'Embalse Cerro Pelado', lat: -32.2250, lon: -64.6394 },
];

const calculateFishingIndex = (wind, pressure) => {
    if (wind > 25) return { label: 'Malo', color: 'bg-red-500', text: 'Viento fuerte. Riesgoso e incómodo.' };
    if (pressure < 1005) return { label: 'Regular', color: 'bg-yellow-500', text: 'Baja presión. Los peces pueden estar poco activos.' };
    if (pressure > 1015 && wind < 15) return { label: 'Excelente', color: 'bg-green-500', text: 'Condiciones ideales. Alta actividad probable.' };
    return { label: 'Bueno', color: 'bg-blue-500', text: 'Condiciones aceptables para intentar.' };
};
const getMoonPhaseText = (phase) => {
    if (phase === null || phase === undefined) return 'Desconocida';
    if (phase === 0 || phase === 1) return 'Luna Nueva';
    if (phase > 0 && phase < 0.25) return 'Cuarto Creciente';
    if (phase === 0.25) return 'Cuarto Creciente';
    if (phase > 0.25 && phase < 0.5) return 'Luna Gibada Crec.';
    if (phase === 0.5) return 'Luna Llena';
    if (phase > 0.5 && phase < 0.75) return 'Luna Gibada Meng.';
    if (phase === 0.75) return 'Cuarto Menguante';
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

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const { lat, lon } = selectedLocation;
                // Fetch from our new internal API route to handle CORS and caching
                const url = `/api/weather?lat=${lat}&lon=${lon}`;
                const res = await axios.get(url);

                if (!res.data || typeof res.data !== 'object' || !res.data.current) {
                    throw new Error('La respuesta de la API es inválida o el servidor no está configurado para manejar rutas de API localmente.');
                }

                const current = res.data.current;
                const daily = res.data.daily;

                setWeatherData({
                    pressure: current.surface_pressure,
                    wind: current.wind_speed_10m,
                    moonPhase: 0.5 // Luna Llena por defecto para Demo
                });

                const forecastList = [];
                let bestIdx = -1;
                let minWind = Infinity;

                if (daily && daily.time) {
                    for (let i = 1; i < daily.time.length && i <= 6; i++) {
                        const dateStr = daily.time[i];
                        const dateObj = new Date(dateStr + 'T12:00:00');
                        const windMax = daily.wind_speed_10m_max[i];
                        const tempMax = daily.temperature_2m_max[i];
                        const tempMin = daily.temperature_2m_min[i];
                        const weatherCode = daily.weather_code[i];

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
                console.error("Error fetching weather data:", err);
                const errorMessage = err.response?.data?.error || err.message || 'Error al obtener los datos climáticos.';
                const errorDetails = err.response?.data?.details || '';
                setError(`${errorMessage} ${errorDetails}`);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [selectedLocation]);

    const handleLocationChange = (e) => {
        const loc = LOCATIONS.find(l => l.id === e.target.value);
        if (loc) setSelectedLocation(loc);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-xl mt-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Pronóstico de Pique</h2>
                    <p className="text-slate-500 mt-1">Condiciones climáticas para la pesca deportiva</p>
                </div>

                <div className="relative w-full md:w-64">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                        value={selectedLocation.id}
                        onChange={handleLocationChange}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm appearance-none font-medium cursor-pointer"
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
                    <p className="text-slate-500 font-medium">Buscando el mejor pique...</p>
                </div>
            )}

            {error && !loading && (
                <div className="bg-red-50 text-red-600 p-6 rounded-xl flex flex-col gap-3 border border-red-100">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold">Error al obtener datos</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                    {error.includes("localmente") && (
                        <div className="mt-2 p-3 bg-white/50 rounded-lg text-xs border border-red-200">
                            <p className="font-bold mb-1 uppercase">Solución para desarrollo local:</p>
                            <p className="mb-2">Las Serverless Functions requieren el entorno de Vercel para ejecutarse.</p>
                            <code className="block bg-slate-800 text-slate-100 p-2 rounded mb-2 font-mono">
                                npx vercel dev
                            </code>
                            <p>Usa este comando en lugar de <span className="font-mono bg-slate-200 px-1 rounded">npm run dev</span> para probar la API localmente.</p>
                        </div>
                    )}
                </div>
            )}

            {!loading && !error && weatherData && (() => {
                const indexResult = calculateFishingIndex(weatherData.wind, weatherData.pressure);

                return (
                    <div className="space-y-6">
                        <div className={`p-8 rounded-2xl text-white ${indexResult.color} shadow-lg transition-transform hover:scale-[1.01] duration-300 relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z"></path>
                                </svg>
                            </div>
                            <p className="text-sm uppercase tracking-wider font-semibold mb-1 opacity-90">Índice de Pique Actual</p>
                            <h3 className="text-5xl font-black mb-2">{indexResult.label}</h3>
                            <p className="text-lg opacity-90 font-medium">{indexResult.text}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <Gauge className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Presión Atmosférica</p>
                                    <p className="text-2xl font-bold text-slate-800">{weatherData.pressure} <span className="text-base font-normal text-slate-500">hPa</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-teal-100 p-3 rounded-xl text-teal-600">
                                    <Wind className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Viento</p>
                                    <p className="text-2xl font-bold text-slate-800">{weatherData.wind} <span className="text-base font-normal text-slate-500">km/h</span></p>
                                </div>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                                <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                                    <Moon className="h-8 w-8" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Fase Lunar</p>
                                    <p className="text-xl font-bold text-slate-800">{getMoonPhaseText(weatherData.moonPhase)}</p>
                                </div>
                            </div>
                        </div>

                        {dailyForecast.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                    <h3 className="text-xl font-bold text-slate-800">Pronóstico Próximos {dailyForecast.length} Días</h3>
                                </div>
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                                    {dailyForecast.map((day, idx) => {
                                        const isBest = idx === bestDayIndex;
                                        return (
                                            <div key={idx} className={`relative p-4 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${isBest ? 'bg-green-50 border-green-200 ring-2 ring-green-500 shadow-md transform -translate-y-1' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:-translate-y-0.5'}`}>
                                                {isBest && (
                                                    <div className="absolute -top-3 -right-3 bg-green-500 text-white p-1.5 rounded-full shadow-lg z-10" title="Mejor día para pescar">
                                                        <Award className="h-5 w-5" />
                                                    </div>
                                                )}
                                                <p className="font-bold text-slate-700 capitalize mb-1">{day.dayName}</p>
                                                <p className="text-[11px] text-slate-500 mb-2">{day.date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}</p>

                                                <div className="mb-2">
                                                    {getWeatherIcon(day.weatherCode)}
                                                </div>

                                                <div className="flex gap-2 text-sm font-semibold mb-2">
                                                    <span className="text-red-500">{Math.round(day.tempMax)}°</span>
                                                    <span className="text-blue-500">{Math.round(day.tempMin)}°</span>
                                                </div>

                                                <div className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1.5 rounded w-full justify-center ${isBest ? 'bg-green-100 text-green-700' : 'bg-slate-200/50 text-slate-600'}`}>
                                                    <Wind className="h-3.5 w-3.5" />
                                                    {Math.round(day.windMax)} km/h
                                                </div>

                                                {isBest && (
                                                    <span className="mt-3 text-[10px] font-bold text-green-700 uppercase bg-green-200 px-2 py-0.5 rounded-full w-full">Mejor Día</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Nueva sección educativa para mejorar el valor del contenido */}
                        <div className="mt-12 pt-10 border-t border-slate-100">
                             <h3 className="text-2xl font-bold text-slate-900 mb-6 font-sans">Ciencia de la Pesca: ¿Cómo influye el clima?</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        <Gauge className="h-5 w-5 text-blue-600" />
                                        La Presión Atmosférica
                                    </h4>
                                    <p>
                                        Los peces son extremadamente sensibles a los cambios de presión debido a su vejiga natatoria. Una **presión alta y estable** (generalmente por encima de 1013 hPa) suele traer cielos despejados y peces más activos. Por el contrario, una caída brusca de presión a menudo precede a tormentas, lo que puede disparar un frenesí alimenticio justo antes de que el mal tiempo llegue.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        <Wind className="h-5 w-5 text-teal-600" />
                                        Efecto del Viento
                                    </h4>
                                    <p>
                                        En los diques de Córdoba, el viento es fundamental. Un viento leve ayuda a oxigenar el agua y "rompe" la superficie, haciendo que los peces pierdan un poco de cautela. Sin embargo, vientos del sur suelen traer descensos de temperatura que aletargan a especies como la Tararira, mientras que el pejerrey prefiere aguas más frescas y movidas.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        <Moon className="h-5 w-5 text-indigo-600" />
                                        Influencia de la Luna
                                    </h4>
                                    <p>
                                        La gravedad lunar no solo afecta las mareas oceánicas, sino también el comportamiento de los peces de agua dulce. Las lunas llena y nueva suelen ser períodos de alta actividad (períodos mayores). Combinar una fase lunar favorable con un amanecer o atardecer aumenta drásticamente tus probabilidades de éxito.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                        <Sun className="h-5 w-5 text-yellow-500" />
                                        La Temperatura del Agua
                                    </h4>
                                    <p>
                                        Cada especie tiene su "zona de confort". El **Pejerrey** se activa con el frío (12°C a 18°C), buscando profundidad en verano. Las **Tarariras** y **Carpas** son amantes del calor, encontrando su máxima actividad por encima de los 22°C. Conocer estas preferencias te ayuda a elegir el lugar y la profundidad adecuada para tu línea.
                                    </p>
                                </div>
                             </div>
                             
                             <div className="mt-10 p-6 bg-blue-50 border border-blue-100 rounded-2xl">
                                <p className="text-blue-800 font-medium italic text-center">
                                    "La pesca no es solo suerte, es entender el entorno. Usa esta guía para planificar tu próxima salida y recuerda siempre practicar la pesca deportiva responsable."
                                </p>
                             </div>
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
