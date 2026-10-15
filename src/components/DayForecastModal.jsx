import { useEffect } from 'react';
import {
  X,
  Wind,
  Moon,
  Sun,
  Cloud,
  CloudRain,
  AlertCircle,
  Award,
  ArrowUp,
  Droplets,
  Sunrise,
  Sunset,
  Thermometer,
  Compass
} from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getCardinalDirection, getWeatherDescription, getWindArrowRotation } from '../lib/weatherUtils';

const getWeatherIcon = (code) => {
  if (code === 0 || code === 1) return <Sun className="h-8 w-8 text-yellow-500" />;
  if (code === 2 || code === 3) return <Cloud className="h-8 w-8 text-slate-400" />;
  if (code >= 51 && code <= 67) return <CloudRain className="h-8 w-8 text-blue-500" />;
  if (code >= 80 && code <= 82) return <CloudRain className="h-8 w-8 text-blue-500" />;
  if (code >= 95) return <AlertCircle className="h-8 w-8 text-purple-500" />;
  return <Cloud className="h-8 w-8 text-slate-400" />;
};

const formatTime = (isoString) => {
  if (!isoString) return '-';
  const parts = isoString.split('T');
  return parts[1] ? parts[1].substring(0, 5) : isoString;
};

export default function DayForecastModal({ isOpen, onClose, day, locationName, isBestDay, fishingIndex }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !day) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forecast-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Cerrar detalle del pronóstico"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Encabezado */}
        <div className="pr-8 mb-4">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {locationName || 'Pesquero'} • Pronóstico detallado
          </span>
          <h2
            id="forecast-modal-title"
            className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1 capitalize"
          >
            {format(day.date, "EEEE d 'de' MMMM", { locale: es })}
          </h2>
        </div>

        {/* Badge Mejor día */}
        {isBestDay && (
          <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">
            <Award className="h-5 w-5 text-amber-500 shrink-0" />
            <span>✓ Mejor día de la semana para pescar por estabilidad meteorológica.</span>
          </div>
        )}

        {/* Resumen meteorológico & Índice de pesca */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {getWeatherIcon(day.weatherCode)}
            <div>
              <p className="font-bold text-slate-900 dark:text-white capitalize text-base">
                {getWeatherDescription(day.weatherCode)}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Máx {day.tempMax}° • Mín {day.tempMin}°
              </p>
            </div>
          </div>
          {fishingIndex && (
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-xl text-xs font-bold text-white ${fishingIndex.color}`}>
                Pique {fishingIndex.label}
              </span>
            </div>
          )}
        </div>

        {fishingIndex?.text && (
          <p className="text-xs text-slate-600 dark:text-slate-300 bg-blue-50/60 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-100 dark:border-blue-900 mb-5 leading-relaxed">
            {fishingIndex.text}
          </p>
        )}

        {/* Grilla de Métricas Detalladas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {/* Temperatura */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Thermometer className="h-4 w-4 text-rose-500" />
              <span>Temperatura</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {day.tempMax}° / {day.tempMin}°
            </p>
            <p className="text-[11px] text-slate-400">Máx / Mín del día</p>
          </div>

          {/* Viento y Ráfagas */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Wind className="h-4 w-4 text-emerald-500" />
              <span>Viento Máx</span>
            </div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {day.windMax} km/h
            </p>
            <p className="text-[11px] text-slate-400">
              {day.windGustsMax !== null && day.windGustsMax !== undefined
                ? `Ráfagas: ${day.windGustsMax} km/h`
                : 'Velocidad sostenida'}
            </p>
          </div>

          {/* Dirección dominante */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Compass className="h-4 w-4 text-blue-500" />
              <span>Dirección</span>
            </div>
            <div className="flex items-center gap-1.5">
              {day.windDirectionDominant !== null && day.windDirectionDominant !== undefined ? (
                <>
                  <ArrowUp
                    className="h-4 w-4 text-emerald-600 dark:text-emerald-400 transition-transform inline-block"
                    style={{ transform: `rotate(${getWindArrowRotation(day.windDirectionDominant)}deg)` }}
                    aria-hidden="true"
                  />
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {getCardinalDirection(day.windDirectionDominant)}
                  </p>
                  <span className="text-[11px] text-slate-400">({day.windDirectionDominant}°)</span>
                </>
              ) : (
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Variable</p>
              )}
            </div>
            <p className="text-[11px] text-slate-400">Rumbo predominante</p>
          </div>

          {/* Fase Lunar */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Moon className="h-4 w-4 text-amber-500" />
              <span>Fase Lunar</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {day.moonPhaseText || 'Desconocida'}
            </p>
            <p className="text-[11px] text-slate-400">Ventana solunar</p>
          </div>

          {/* Sol (Amanecer / Atardecer) */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Sunrise className="h-4 w-4 text-amber-500" />
              <span>Sol</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {formatTime(day.sunrise)} / {formatTime(day.sunset)}
            </p>
            <p className="text-[11px] text-slate-400">Salida / Puesta (hs)</p>
          </div>

          {/* Lluvia / Precipitaciones */}
          <div className="p-3.5 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Droplets className="h-4 w-4 text-cyan-500" />
              <span>Precipitación</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
              {day.precipitationProbability !== null && day.precipitationProbability !== undefined
                ? `${day.precipitationProbability}%`
                : `${day.precipitationSum || 0} mm`}
            </p>
            <p className="text-[11px] text-slate-400">
              {day.precipitationSum !== null && day.precipitationSum !== undefined
                ? `Acum: ${day.precipitationSum} mm`
                : 'Sin lluvias previstas'}
            </p>
          </div>
        </div>

        {/* Pie del modal */}
        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
