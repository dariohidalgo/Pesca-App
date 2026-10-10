import React, { useState, useMemo } from 'react';
import SunCalc from 'suncalc';
import SEO from './SEO';
import { Moon, Sun, Sunrise, Sunset, Activity, CalendarDays, Clock, Info } from 'lucide-react';
import SchemaOrg from './SchemaOrg';
import AdBanner from './AdBanner';

const LAT = -31.4201; // Córdoba Capital, Argentina
const LNG = -64.1888;

const getMoonPhaseDetails = (phase) => {
  if (phase < 0.03 || phase > 0.97) return { name: 'Luna Nueva', icon: '🌑', fishing: 'Muy Bueno', desc: 'Máxima atracción gravitacional combinada con el Sol.' };
  if (phase >= 0.03 && phase < 0.22) return { name: 'Luna Creciente', icon: '🌒', fishing: 'Regular a Bueno', desc: 'Franja iluminada visible en aumento paulatino.' };
  if (phase >= 0.22 && phase < 0.28) return { name: 'Cuarto Creciente', icon: '🌓', fishing: 'Bueno', desc: 'Mitad del disco lunar visible.' };
  if (phase >= 0.28 && phase < 0.47) return { name: 'Luna Gibosa Creciente', icon: '🌔', fishing: 'Bueno a Muy Bueno', desc: 'Aumento de luminosidad nocturna.' };
  if (phase >= 0.47 && phase < 0.53) return { name: 'Luna Llena', icon: '🌕', fishing: 'Excelente', desc: 'Alineación de mareas biológicas y máxima luminosidad nocturna.' };
  if (phase >= 0.53 && phase < 0.72) return { name: 'Luna Gibosa Menguante', icon: '🌖', fishing: 'Bueno', desc: 'Disminución gradual de luminosidad.' };
  if (phase >= 0.72 && phase < 0.78) return { name: 'Cuarto Menguante', icon: '🌗', fishing: 'Regular', desc: 'Fase de transición hacia luna nueva.' };
  return { name: 'Luna Menguante', icon: '🌘', fishing: 'Regular a Bajo', desc: 'Mínima iluminación antes del novilunio.' };
};

const formatTime = (date) => {
  if (!date || isNaN(date.getTime())) return '--:--';
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export default function SolunarCalendar() {
  const [date] = useState(new Date());
  const canonicalUrl = 'https://www.pescacordoba.com.ar/calendario';

  const data = useMemo(() => {
    const moonIllumination = SunCalc.getMoonIllumination(date);
    const moonTimes = SunCalc.getMoonTimes(date, LAT, LNG);
    const sunTimes = SunCalc.getTimes(date, LAT, LNG);

    const phaseInfo = getMoonPhaseDetails(moonIllumination.phase);

    // Cálculo riguroso de Períodos Solunares (Teoría de John Alden Knight)
    // Períodos Mayores: Cénit Lunar (tránsito superior) y Nadir Lunar (tránsito opuesto), aprox. 2 horas de duración.
    // Períodos Menores: Salida de la luna (moonrise) y Puesta de la luna (moonset), aprox. 1 hora de duración.

    const majorPeriods = [];
    const minorPeriods = [];

    // Períodos Menores
    if (moonTimes.rise) {
      const start = new Date(moonTimes.rise.getTime() - 30 * 60 * 1000);
      const end = new Date(moonTimes.rise.getTime() + 45 * 60 * 1000);
      minorPeriods.push({ name: 'Menor 1 (Salida lunar)', start, end, peak: moonTimes.rise });
    }
    if (moonTimes.set) {
      const start = new Date(moonTimes.set.getTime() - 30 * 60 * 1000);
      const end = new Date(moonTimes.set.getTime() + 45 * 60 * 1000);
      minorPeriods.push({ name: 'Menor 2 (Puesta lunar)', start, end, peak: moonTimes.set });
    }

    // Tránsito superior aproximado (a medio camino entre salida y puesta)
    let transitTime = null;
    if (moonTimes.rise && moonTimes.set) {
      if (moonTimes.set > moonTimes.rise) {
        transitTime = new Date((moonTimes.rise.getTime() + moonTimes.set.getTime()) / 2);
      } else {
        transitTime = new Date((moonTimes.rise.getTime() + moonTimes.set.getTime() + 24 * 3600 * 1000) / 2);
      }
    } else {
      // Si no hay salida/puesta en el mismo día solar, estimamos con el mediodía solar ajustado a la fase
      transitTime = new Date(sunTimes.solarNoon.getTime() + (moonIllumination.phase * 24 * 3600 * 1000) % (24 * 3600 * 1000));
    }

    if (transitTime) {
      const p1Start = new Date(transitTime.getTime() - 60 * 60 * 1000);
      const p1End = new Date(transitTime.getTime() + 60 * 60 * 1000);
      majorPeriods.push({ name: 'Mayor 1 (Tránsito Lunar / Cénit)', start: p1Start, end: p1End });

      // Tránsito inferior (Nadir): ~12h 25m después o antes
      const nadirTime = new Date(transitTime.getTime() + 12.4 * 3600 * 1000);
      const p2Start = new Date(nadirTime.getTime() - 60 * 60 * 1000);
      const p2End = new Date(nadirTime.getTime() + 60 * 60 * 1000);
      majorPeriods.push({ name: 'Mayor 2 (Nadir Lunar / Opuesto)', start: p2Start, end: p2End });
    }

    return {
      moon: {
        fraction: Math.round(moonIllumination.fraction * 100),
        phase: moonIllumination.phase,
        info: phaseInfo,
        rise: moonTimes.rise,
        set: moonTimes.set
      },
      sun: {
        rise: sunTimes.sunrise,
        set: sunTimes.sunset,
        noon: sunTimes.solarNoon
      },
      majorPeriods,
      minorPeriods
    };
  }, [date]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Calendario Solunar y Fases de la Luna - Pesca Córdoba"
        description="Calendario solunar para pescadores en Córdoba. Horarios de mayor actividad de pique y cálculo astronómico de fases lunares para optimizar tu jornada."
        canonical="https://www.pescacordoba.com.ar/calendario"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Calendario Solunar y Fases de la Luna en Córdoba",
        "description": "Cálculos astronómicos de fases lunares y períodos solunares para pesca deportiva en Córdoba, Argentina.",
        "url": canonicalUrl
      }} />

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <Moon className="h-8 w-8 text-indigo-600" />
          Calendario Solunar
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          Cálculo astronómico de posiciones del Sol y la Luna para la pesca deportiva en Córdoba.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-8 mb-6 flex flex-col items-center text-center">
        <span className="text-7xl mb-3" role="img" aria-label={data.moon.info.name}>{data.moon.info.icon}</span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.moon.info.name}</h2>
        <div className="mt-1 text-slate-600 dark:text-slate-400 text-sm">Disco iluminado: <strong className="text-slate-800 dark:text-slate-200">{data.moon.fraction}%</strong></div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-2">{data.moon.info.desc}</p>
        
        <div className="mt-6 inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900 text-indigo-800 dark:text-indigo-300 px-5 py-2 rounded-full font-medium text-sm">
          <Activity className="h-4 w-4" />
          Actividad Teórica: <strong>{data.moon.info.fishing}</strong>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-500" />
            Horarios Solares (Córdoba UTC-3)
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Sunrise className="h-4 w-4" /> Salida del sol (Amanecer)</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{formatTime(data.sun.rise)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Sun className="h-4 w-4" /> Mediodía solar</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{formatTime(data.sun.noon)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400"><Sunset className="h-4 w-4" /> Puesta del sol (Atardecer)</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{formatTime(data.sun.set)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Moon className="h-5 w-5 text-indigo-500" />
            Efemérides Lunares
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">Salida de la luna</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{formatTime(data.moon.rise)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">Puesta de la luna</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{formatTime(data.moon.set)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-400">Fase astronómica</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{(data.moon.phase).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ventanas Solunares Calculadas */}
      <div className="space-y-4 mb-8">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-sm text-white p-6">
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-blue-200" />
            Períodos Mayores (Mayor Actividad Estimada)
          </h3>
          <p className="text-blue-100 text-xs mb-4">
            Coinciden con el paso de la luna sobre el meridiano local (Cénit) y su posición opuesta (Nadir). Duración: aprox. 2 horas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.majorPeriods.map((period, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
                <div className="font-medium text-blue-200 text-xs mb-1">{period.name}</div>
                <div className="text-xl font-bold flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-300" />
                  {formatTime(period.start)} - {formatTime(period.end)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {data.minorPeriods.length > 0 && (
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-indigo-500" />
              Períodos Menores (Ventanas Secundarias)
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mb-4">
              Ocurren durante la salida y puesta de la luna en el horizonte. Duración: aprox. 1 hora.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.minorPeriods.map((period, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                  <div className="font-medium text-slate-600 dark:text-slate-300 text-xs mb-1">{period.name}</div>
                  <div className="text-base font-bold text-slate-800 dark:text-slate-100">
                    {formatTime(period.start)} - {formatTime(period.end)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN EXPLICATIVA: Fundamentos y Limitaciones */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Fundamentos y Limitaciones de las Tablas Solunares
        </h2>
        
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            <strong>Origen de la Teoría:</strong> Propuesta por John Alden Knight en 1926, la teoría solunar postula que la atracción gravitacional combinada del Sol y la Luna estimula ventanas de mayor actividad biológica y alimentación en la fauna acuática.
          </p>
          <p>
            <strong>Diferenciación de Períodos:</strong> Los <em>Períodos Mayores</em> ocurren con la luna en su punto más alto (tránsito superior / cénit) o más bajo (tránsito inferior / nadir), mientras que los <em>Períodos Menores</em> coinciden con su orto y ocaso (salida y puesta en el horizonte).
          </p>
          <p>
            <strong>Primacía del Clima Local:</strong> Las tablas solunares son una guía estadística orientativa, no una garantía de capturas. En los diques y ríos de Córdoba, las condiciones atmosféricas locales (frentes fríos repentinos, ráfagas de viento sur o descensos bruscos en la presión barométrica) siempre tienen prioridad sobre los ciclos lunares.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <AdBanner slot="3228900466" />
      </div>
    </div>
  );
}
