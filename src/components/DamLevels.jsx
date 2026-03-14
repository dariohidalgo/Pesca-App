import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Waves, TrendingUp, TrendingDown, Minus, Info, AlertTriangle } from 'lucide-react';

// Datos estáticos/simulados para la estructura inicial
const damData = [
  {
    id: 'san-roque',
    name: 'Dique San Roque',
    level: 34.12,
    maxLevel: 35.30,
    trend: 'up',
    status: 'good',
    lastUpdate: 'Hace 2 horas'
  },
  {
    id: 'los-molinos',
    name: 'Dique Los Molinos',
    level: 52.40,
    maxLevel: 53.00,
    trend: 'stable',
    status: 'excellent',
    lastUpdate: 'Hace 4 horas'
  },
  {
    id: 'embalse',
    name: 'Embalse Río Tercero',
    level: 46.10,
    maxLevel: 46.50,
    trend: 'up',
    status: 'excellent',
    lastUpdate: 'Ayer'
  },
  {
    id: 'cruz-del-eje',
    name: 'Dique Cruz del Eje',
    level: 34.20,
    maxLevel: 37.20,
    trend: 'down',
    status: 'warning',
    lastUpdate: 'Hace 5 horas'
  },
  {
    id: 'pichanas',
    name: 'Dique Pichanas',
    level: 39.50,
    maxLevel: 44.00,
    trend: 'down',
    status: 'critical',
    lastUpdate: 'Hace 1 día'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'excellent': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'critical': return 'bg-rose-100 text-rose-800 border-rose-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'excellent': return 'Óptimo';
    case 'good': return 'Buen Nivel';
    case 'warning': return 'Nivel Bajo';
    case 'critical': return 'Muy Bajo';
    default: return 'Desconocido';
  }
};

const getTrendIcon = (trend) => {
  switch (trend) {
    case 'up': return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    case 'down': return <TrendingDown className="h-4 w-4 text-rose-500" />;
    case 'stable': return <Minus className="h-4 w-4 text-slate-500" />;
    default: return null;
  }
};

export default function DamLevels() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Estado y Nivel de Diques - Pesca Córdoba</title>
        <meta name="description" content="Nivel de agua actualizado de los principales diques y embalses de Córdoba para tu salida de pesca." />
      </Helmet>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <Waves className="h-8 w-8 text-cyan-600" />
          Nivel de Diques
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Estado actual de los embalses en Córdoba. Datos de referencia para planificar tu pesca.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {damData.map((dam) => {
          const distanceToMax = (dam.maxLevel - dam.level).toFixed(2);
          const percentage = ((dam.level / dam.maxLevel) * 100).toFixed(1);

          return (
            <div key={dam.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight pr-2">{dam.name}</h3>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dam.status)} whitespace-nowrap`}>
                  {getStatusText(dam.status)}
                </span>
              </div>

              <div className="mt-auto">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-4xl font-black text-slate-800 tracking-tighter">{dam.level}</span>
                  <span className="text-slate-500 font-medium mb-1">mts</span>
                </div>
                
                <div className="text-sm text-slate-600 mb-4 flex items-center gap-1">
                  A {distanceToMax} mts del vertedero ({dam.maxLevel}m)
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4 overflow-hidden">
                  <div 
                    className="bg-cyan-500 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-sm border-t border-slate-100 pt-4 mt-2">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    Tendencia: {getTrendIcon(dam.trend)}
                    {dam.trend === 'up' && 'Subiendo'}
                    {dam.trend === 'down' && 'Bajando'}
                    {dam.trend === 'stable' && 'Estable'}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {dam.lastUpdate}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4">
        <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-amber-900">Nota sobre los datos</h4>
          <p className="text-sm text-amber-800 mt-1">
            Los valores mostrados son de carácter referencial y demostrativo. Para información oficial exacta para navegación, consultar siempre los reportes de la Administración Provincial de Recursos Hídricos (APRHI).
          </p>
        </div>
      </div>
    </div>
  );
}
