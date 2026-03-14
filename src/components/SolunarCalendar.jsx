import React, { useState, useMemo } from 'react';
import SunCalc from 'suncalc';
import { Helmet } from 'react-helmet-async';
import { Moon, Sun, Sunrise, Sunset, Activity, CalendarDays, Clock } from 'lucide-react';

const LAT = -31.4201; // Córdoba, Argentina
const LNG = -64.1888;

const getMoonPhaseName = (phase) => {
  if (phase === 0 || phase === 1) return { name: 'Luna Nueva', icon: '🌑', fishing: 'Muy Bueno' };
  if (phase > 0 && phase < 0.25) return { name: 'Luna Creciente', icon: '🌒', fishing: 'Regular' };
  if (phase === 0.25) return { name: 'Cuarto Creciente', icon: '🌓', fishing: 'Bueno' };
  if (phase > 0.25 && phase < 0.5) return { name: 'Luna Gibosa Creciente', icon: '🌔', fishing: 'Muy Bueno' };
  if (phase === 0.5) return { name: 'Luna Llena', icon: '🌕', fishing: 'Excelente' };
  if (phase > 0.5 && phase < 0.75) return { name: 'Luna Gibosa Menguante', icon: '🌖', fishing: 'Bueno a Muy Bueno' };
  if (phase === 0.75) return { name: 'Cuarto Menguante', icon: '🌗', fishing: 'Regular' };
  return { name: 'Luna Menguante', icon: '🌘', fishing: 'Malo' };
};

const formatTime = (date) => {
  if (!date || isNaN(date)) return '--:--';
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
};

export default function SolunarCalendar() {
  const [date] = useState(new Date());

  const data = useMemo(() => {
    // Calcular datos lunares y solares
    const moonIllumination = SunCalc.getMoonIllumination(date);
    const moonTimes = SunCalc.getMoonTimes(date, LAT, LNG);
    const sunTimes = SunCalc.getTimes(date, LAT, LNG);

    const phaseInfo = getMoonPhaseName(moonIllumination.phase);

    // Periodos solunares calculados de forma simplificada
    const calculatePeriods = () => {
      let p1 = new Date(sunTimes.sunrise);
      p1.setMinutes(p1.getMinutes() - 30);
      let p1_end = new Date(sunTimes.sunrise);
      p1_end.setMinutes(p1_end.getMinutes() + 60);

      let p2 = new Date(sunTimes.sunset);
      p2.setMinutes(p2.getMinutes() - 60);
      let p2_end = new Date(sunTimes.sunset);
      p2_end.setMinutes(p2_end.getMinutes() + 30);
      
      return [
        { name: 'Mayor (Mañana)', start: p1, end: p1_end },
        { name: 'Mayor (Tarde)', start: p2, end: p2_end }
      ];
    };

    return {
      moon: {
        fraction: (moonIllumination.fraction * 100).toFixed(0),
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
      periods: calculatePeriods()
    };
  }, [date]);

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Calendario Solunar y Fases de la Luna - Pesca Córdoba</title>
        <meta name="description" content="Consultá el calendario solunar, fases de la luna y los mejores horarios de pique en Córdoba." />
      </Helmet>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <Moon className="h-8 w-8 text-indigo-600" />
          Calendario Solunar
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Actividad de pesca en base a fases lunares y horarios solares para Córdoba.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex flex-col items-center text-center">
        <span className="text-8xl mb-4">{data.moon.info.icon}</span>
        <h2 className="text-2xl font-bold text-slate-900">{data.moon.info.name}</h2>
        <div className="mt-2 text-slate-600">Iluminación: {data.moon.fraction}%</div>
        
        <div className="mt-6 inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">
          <Activity className="h-5 w-5" />
          Nivel de pique: {data.moon.info.fishing}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5 text-amber-500" />
            Datos Solares
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2 text-slate-600"><Sunrise className="h-4 w-4" /> Salida del sol</span>
              <span className="font-semibold">{formatTime(data.sun.rise)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2 text-slate-600"><Sun className="h-4 w-4" /> Mediodía solar</span>
              <span className="font-semibold">{formatTime(data.sun.noon)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-2 text-slate-600"><Sunset className="h-4 w-4" /> Puesta del sol</span>
              <span className="font-semibold">{formatTime(data.sun.set)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Moon className="h-5 w-5 text-slate-500" />
            Datos Lunares
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2 text-slate-600">Salida de la luna</span>
              <span className="font-semibold">{formatTime(data.moon.rise)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <span className="flex items-center gap-2 text-slate-600">Puesta de la luna</span>
              <span className="font-semibold">{formatTime(data.moon.set)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-sm text-white p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-200" />
          Mejores horas para pescar (Períodos Mayores)
        </h3>
        <p className="text-blue-100 text-sm mb-4">
          Estos horarios concentran la mayor actividad alimenticia de los peces según las tablas solunares.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.periods.map((period, i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 border border-white/20 backdrop-blur-sm">
              <div className="font-semibold text-blue-100 mb-1">{period.name}</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {formatTime(period.start)} - {formatTime(period.end)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
