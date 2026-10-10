import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from './SEO';
import {
  Calendar,
  Compass,
  Fish,
  Layers,
  MapPin,
  CheckSquare,
  Square,
  RotateCcw,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Info,
  Navigation2,
  FileText,
  CloudSun,
  Share2,
  CheckCircle2,
  BookmarkCheck,
  ExternalLink
} from 'lucide-react';
import { generateTripPlan } from '../data/plannerRules';
import { DAMS_DATA } from '../data/damsData';
import SchemaOrg from './SchemaOrg';

const STORAGE_KEY = 'pescacordoba_trip_plan_state';

export default function TripPlanner() {
  const [searchParams] = useSearchParams();

  // Estado del formulario
  const [damId, setDamId] = useState(() => searchParams.get('dique') || 'san-roque');
  const [tripDate, setTripDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [species, setSpecies] = useState(() => searchParams.get('especie') || 'Pejerrey');
  const [modality, setModality] = useState(() => searchParams.get('modalidad') || 'costa');
  const [experienceLevel, setExperienceLevel] = useState('intermedio');

  // Estado de checklist (items marcados)
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Guardar en localStorage cuando cambian los checkboxes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }
  }, [checkedItems]);

  // Generar propuesta mediante motor de reglas transparente
  const plan = generateTripPlan({
    damId,
    tripDate,
    species,
    modality,
    experienceLevel
  });

  // Alternar checkbox
  const toggleItem = (itemId) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Reiniciar lista
  const handleReset = () => {
    if (window.confirm('¿Reiniciar la lista de preparación y desmarcar todos los elementos?')) {
      setCheckedItems({});
    }
  };

  // Imprimir vista
  const handlePrint = () => {
    window.print();
  };

  // Contar progreso
  const allItems = plan.checklist.flatMap(c => c.items);
  const totalItemsCount = allItems.length;
  const completedCount = allItems.filter(i => checkedItems[i.id]).length;
  const progressPercent = totalItemsCount > 0 ? Math.round((completedCount / totalItemsCount) * 100) : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0 print:max-w-none">
      <SEO
        title="Planificador de Salida de Pesca en Córdoba - Pesca Córdoba"
        description="Planificá tu jornada de pesca en Córdoba: checklists interactivos de equipo, montajes según especie, accesos verificados y recordatorios de seguridad."
        canonical="https://www.pescacordoba.com.ar/planificador"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Planificador de Salida de Pesca Córdoba",
        "applicationCategory": "SportsApplication",
        "description": "Asistente de planificación técnica para jornadas de pesca deportiva en diques cordobeses.",
        "url": "https://www.pescacordoba.com.ar/planificador"
      }} />

      {/* Cabecera (Oculta en impresión compacta) */}
      <div className="mb-8 print:mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 print:hidden">
          <Calendar className="h-3.5 w-3.5" />
          <span>Asistente Práctico Sin Registro</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
          <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Planificador de Salida de Pesca
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl print:text-xs">
          Respondé <strong>“¿Dónde puedo ir y qué necesito llevar?”</strong> con una propuesta técnica transparente y lista interactiva para guardar o imprimir.
        </p>
      </div>

      {/* Formulario de selección (Oculto en vista de impresión) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 mb-8 shadow-sm print:hidden">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Compass className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>Configurá los Datos de tu Jornada</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dique */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Dique de destino
            </label>
            <select
              value={damId}
              onChange={(e) => setDamId(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="san-roque">Dique San Roque</option>
              <option value="los-molinos">Dique Los Molinos</option>
              <option value="embalse">Embalse Río Tercero</option>
              <option value="cruz-del-eje">Dique Cruz del Eje</option>
              <option value="pichanas">Dique Pichanas</option>
            </select>
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Fecha programada
            </label>
            <input
              type="date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Especie */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Especie buscada
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Pejerrey">Pejerrey</option>
              <option value="Carpa">Carpa común</option>
              <option value="Tararira">Tararira</option>
              <option value="Bagre">Bagre sapo / Variada</option>
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              Modalidad
            </label>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="w-full min-h-[44px] px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="costa">De Costa</option>
              <option value="embarcado">Embarcado (Bote / Tracker)</option>
              <option value="kayak">En Kayak</option>
            </select>
          </div>
        </div>

        {/* Nivel de experiencia */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
          <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0">Nivel de experiencia:</span>
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:flex-wrap">
            {['principiante', 'intermedio', 'experimentado'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setExperienceLevel(lvl)}
                className={`min-h-[44px] px-3.5 py-2.5 rounded-xl font-bold capitalize text-xs sm:text-sm text-center flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  experienceLevel === lvl
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 ring-2 ring-blue-500/30 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                aria-pressed={experienceLevel === lvl}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rationale y Aviso de Pronóstico */}
      <div className="space-y-4 mb-8">
        {/* Aviso de fecha y pronóstico */}
        <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
          plan.forecastStatus === 'beyond_range'
            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
            : plan.forecastStatus === 'past'
              ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
        }`}>
          {plan.forecastStatus === 'beyond_range' ? (
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <CloudSun className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs sm:text-sm leading-relaxed">
            <strong>Condición Meteorológica:</strong> {plan.forecastMessage}
            <div className="mt-2 flex flex-wrap gap-4 items-center">
              <Link
                to={plan.weatherUrl}
                className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Ver pronóstico de viento y presión del dique</span>
              </Link>
              <a
                href="https://www.smn.gob.ar/alertas"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Alertas Oficiales SMN Córdoba</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Resumen de la propuesta técnica */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              Fundamentación de la Propuesta
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {plan.rationale}
          </p>
          <div className="mt-3 text-[11px] text-slate-400 flex items-center gap-1">
            <Info className="h-3.5 w-3.5" />
            <span>Esta propuesta no garantiza capturas ni condiciones seguras para navegar en caso de alertas climáticas.</span>
          </div>
        </div>
      </div>

      {/* Montajes recomendados con enlaces directos */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>Montajes y Líneas Recomendadas</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.recommendedRigs.map((rig) => (
            <div
              key={rig.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="font-bold text-base text-slate-900 dark:text-slate-100 block mb-1">
                  {rig.title}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {rig.reason}
                </p>
              </div>
              <Link
                to={rig.path}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <span>Ver tutorial de armado y medidas exactas</span>
                <Navigation2 className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Puntos y accesos recomendados */}
      {plan.relevantPoints.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <span>Accesos y Puntos Sugeridos en {plan.dam.name}</span>
            </h2>
            <Link
              to={`/mapa?dique=${plan.dam.id}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline print:hidden"
            >
              Ver todos en el mapa
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.relevantPoints.map((pt) => (
              <div
                key={pt.id}
                className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {pt.name}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    {pt.isVerified ? '✓ Verificado' : 'En revisión'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                  {pt.description}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${pt.coordinates[0]},${pt.coordinates[1]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <Navigation2 className="h-3 w-3" />
                  <span>Cómo llegar</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Barra de progreso y acciones de Checklist */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 mb-8 shadow-xl print:bg-white print:text-slate-900 print:border print:border-slate-300 print:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider print:text-slate-600">
              Checklist Interactivo de Salida
            </span>
            <h2 className="text-2xl font-black tracking-tight mt-0.5">
              Lista de Preparación ({completedCount} de {totalItemsCount} listos)
            </h2>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-300 rounded-xl text-xs sm:text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Reiniciar lista"
              aria-label="Reiniciar lista de preparación"
            >
              <RotateCcw className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Reiniciar</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              title="Imprimir o guardar en PDF"
              aria-label="Imprimir o guardar en PDF"
            >
              <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Imprimir</span>
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-slate-800 rounded-full h-3 mb-6 overflow-hidden print:hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Categorías de checklist */}
        <div className="space-y-6">
          {plan.checklist.map((cat, catIdx) => (
            <div
              key={catIdx}
              className="bg-slate-800/60 rounded-2xl p-4 sm:p-5 border border-slate-700/60 print:bg-transparent print:border-b print:border-slate-300 print:p-2"
            >
              <h3 className="text-sm font-bold text-cyan-300 print:text-slate-900 uppercase tracking-wider mb-3">
                {cat.category}
              </h3>

              <div className="space-y-2.5">
                {cat.items.map((item) => {
                  const isChecked = !!checkedItems[item.id];
                  const inputId = `chk-${item.id}`;
                  return (
                    <label
                      key={item.id}
                      htmlFor={inputId}
                      className={`min-h-[48px] flex items-center gap-3 p-2.5 sm:p-3 rounded-xl cursor-pointer transition-all select-none ${
                        isChecked
                          ? 'bg-slate-800/80 text-slate-400 line-through print:text-slate-500'
                          : 'bg-slate-800/30 hover:bg-slate-800/60 text-slate-100 print:text-slate-900'
                      }`}
                    >
                      <input
                        type="checkbox"
                        id={inputId}
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        aria-label={item.text}
                        className="sr-only"
                      />
                      <span
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0 -m-2 text-blue-400 print:text-slate-900"
                        aria-hidden="true"
                      >
                        {isChecked ? (
                          <CheckSquare className="h-5 w-5 text-emerald-400 print:text-black" />
                        ) : (
                          <Square className="h-5 w-5 text-slate-500 print:text-black" />
                        )}
                      </span>
                      <span className="text-xs sm:text-sm select-none leading-relaxed flex-1">
                        {item.text}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enlaces y referencias oficiales */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 print:hidden">
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/reglamento" className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <FileText className="h-3.5 w-3.5" />
            <span>Consultar cupos en el Reglamento</span>
          </Link>
          <a
            href="https://cazaypesca.cba.gov.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-slate-700 dark:text-slate-300 hover:underline flex items-center gap-1"
          >
            <span>Portal Caza y Pesca Cba</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link to={plan.damGuideUrl} className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <Compass className="h-3.5 w-3.5" />
            <span>Ver guía completa de {plan.dam.name}</span>
          </Link>
        </div>

        <span className="text-slate-400 text-[11px]">
          Los datos quedan guardados automáticamente en tu dispositivo.
        </span>
      </div>
    </div>
  );
}
