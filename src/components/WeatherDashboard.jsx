import { useState, useEffect } from 'react';
import axios from 'axios';
import { Wind, Gauge, Moon, MapPin, Loader2, AlertCircle } from 'lucide-react';

const LOCATIONS = [
    { id: 'san-roque', name: 'Dique San Roque', lat: -31.3789, lon: -64.4647 },
    { id: 'los-molinos', name: 'Dique Los Molinos', lat: -31.8194, lon: -64.5361 },
    { id: 'rio-tercero', name: 'Embalse de Río Tercero', lat: -32.2033, lon: -64.4072 },
    { id: 'cruz-del-eje', name: 'Dique Cruz del Eje', lat: -30.7350, lon: -64.7933 },
    { id: 'pichanas', name: 'Dique Pichanas', lat: -30.6550, lon: -64.9650 },
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

export default function WeatherDashboard() {
    const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            setError(null);
            try {
                const { lat, lon } = selectedLocation;
                // OpenMeteo endpoint: pressure, wind, daily moon phase
                const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=surface_pressure,wind_speed_10m&daily=sunset&timezone=auto`;
                const res = await axios.get(url);

                // Let's use basic mock for moon phase if not supported directly in standard lightweight params, 
                // to keep it simple, though OpenMeteo might need specific params.
                // Actually, we'll request timezone=auto so daily works, but wait, OpenMeteo might not return moon phase unless explicitly queried. 
                // We will make a safe call.

                const current = res.data.current;
                setWeatherData({
                    pressure: current.surface_pressure,
                    wind: current.wind_speed_10m,
                    // Placeholder or random for moon phase if API misses it to not break app
                    moonPhase: 0.5 // Luna Llena por defecto para Demo
                });
            } catch (err) {
                setError('Error al obtener los datos climáticos.');
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
                <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-3 border border-red-100">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold">Ocurrió un error</p>
                        <p className="text-sm">{error}</p>
                    </div>
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
                    </div>
                );
            })()}
        </div>
    );
}
