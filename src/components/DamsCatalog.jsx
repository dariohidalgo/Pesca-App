import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import { canonicalUrl } from '../lib/domain';
import {
  Waves,
  MapPin,
  Fish,
  Compass,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  Calendar,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Anchor
} from 'lucide-react';
import { DAMS_DATA, getPublishedDams } from '../data/damsData';
import DamWaterLevelIndicator from './DamWaterLevelIndicator';
import SchemaOrg from './SchemaOrg';
import AdBanner from './AdBanner';

// Cotas oficiales de vertedero (parámetros técnicos oficiales de ingeniería hidrológica APRHI)
const damSpillwayBenchmarks = [
  { id: 'san-roque', name: 'Dique San Roque', spillwayLevel: 35.30, location: 'Valle de Punilla', basin: 'Cuenca del Río Suquía' },
  { id: 'los-molinos', name: 'Dique Los Molinos', spillwayLevel: 53.00, location: 'Valle de Calamuchita', basin: 'Río Los Molinos' },
  { id: 'embalse', name: 'Embalse Río Tercero', spillwayLevel: 46.50, location: 'Valle de Calamuchita', basin: 'Río Ctalamochita' },
  { id: 'cruz-del-eje', name: 'Dique Cruz del Eje', spillwayLevel: 37.20, location: 'Noroeste Cordobés', basin: 'Río Cruz del Eje' },
  { id: 'pichanas', name: 'Dique Pichanas', spillwayLevel: 44.00, location: 'Dpto. Cruz del Eje', basin: 'Río Pichanas' },
  { id: 'la-vina', name: 'Dique La Viña', spillwayLevel: 100.50, location: 'Valle de Traslasierra', basin: 'Río Los Sauces' }
];

export default function DamsCatalog() {
  const [activeTab, setActiveTab] = useState('guides'); // 'guides' | 'levels'
  const publishedDams = getPublishedDams();
  const draftDams = DAMS_DATA.filter(d => d.status === 'draft');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Guías de Pesca por Dique y Niveles de Agua - Pesca Córdoba"
        description="Guías completas de pesca deportiva para los principales diques de Córdoba: San Roque, Los Molinos, Embalse, Cruz del Eje y Pichanas. Accesos, especies, equipos y niveles de cota actualizados."
        canonical="diques"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Guías de Pesca en Diques de Córdoba",
        "description": "Información verificada, accesos, reglamentos y servicios de pesca en los diques cordobeses.",
        url: canonicalUrl("/diques"),
        "numberOfItems": publishedDams.length,
        "itemListElement": publishedDams.map((dam, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": dam.name,
          "url": canonicalUrl(`/diques/${dam.id}`)
        }))
      }} />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800 rounded-full text-xs font-semibold text-cyan-700 dark:text-cyan-300 mb-3">
              <Compass className="h-3.5 w-3.5" />
              <span>Guías Técnicas y Normativa Vigente</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center justify-center sm:justify-start gap-3">
              <Waves className="h-9 w-9 text-cyan-600 dark:text-cyan-400" />
              Diques de Córdoba
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Guías completas y estructuradas para planificar salidas de pesca: vías de acceso, especies habituales, reglamentos y recomendaciones de seguridad.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <Link
              to="/planificador"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Planificar Salida</span>
            </Link>
          </div>
        </div>

        {/* Tab switch */}
        <div className="mt-6 flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('guides')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-colors ${
              activeTab === 'guides'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Guías Completas ({publishedDams.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('levels')}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-colors ${
              activeTab === 'levels'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <Waves className="h-4 w-4" />
            <span>Cotas de Vertedero y Niveles</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Guías Completas */}
      {activeTab === 'guides' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedDams.map((dam) => {
              return (
                <div
                  key={dam.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {dam.department}
                        </span>
                        <DamWaterLevelIndicator damId={dam.id} size="xs" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
                        {dam.name}
                      </h2>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {dam.shortDescription}
                    </p>

                    {/* Especies estrella */}
                    <div className="mb-4">
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                        <Fish className="h-3.5 w-3.5 text-blue-500" />
                        <span>Especies de pesca deportiva:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {dam.species.map((sp, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md font-medium"
                          >
                            {sp.name.split('(')[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Modalidades */}
                    <div className="mb-6 flex flex-wrap gap-2 text-xs">
                      {dam.fishingModalities.map((mod, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-lg border border-slate-100 dark:border-slate-700/50"
                        >
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span className="capitalize">{mod.type}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div className="text-xs text-slate-400 dark:text-slate-500">
                      Verificado: {dam.verification.lastVerified}
                    </div>
                    <Link
                      to={`/diques/${dam.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-blue-600 dark:bg-slate-100 dark:hover:bg-blue-500 text-white dark:text-slate-900 dark:hover:text-white rounded-xl font-bold text-xs transition-colors shadow-sm"
                    >
                      <span>Ver Guía Completa</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sección de Diques en borrador técnico */}
          {draftDams.length > 0 && (
            <div className="mt-12 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-700/60 p-6">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Fichas en proceso de recopilación documental
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 max-w-3xl leading-relaxed">
                Las siguientes fichas se encuentran en estado de borrador técnico. Se publicarán una vez consolidada la normativa de acceso público, zonificación de pesca y disposiciones de navegación aplicables:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {draftDams.map(draft => (
                  <div
                    key={draft.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm block">
                        {draft.name}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {draft.department}
                      </span>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-full font-medium border border-amber-200 dark:border-amber-800">
                      Borrador Técnico
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Cotas oficiales de vertedero y estado de mediciones */}
      {activeTab === 'levels' && (
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
              <div className="text-xs sm:text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                <strong>Transparencia sobre Cotas Oficiales:</strong> Pesca Córdoba no presenta estimaciones simuladas como datos actuales. Las cotas de vertedero informadas son parámetros fijos de ingeniería hidráulica. Las lecturas hidrométricas diarias son registradas y publicadas exclusivamente por la <strong>Administración Provincial de Recursos Hídricos (APRHI)</strong> del Gobierno de Córdoba.
              </div>
            </div>
            <a
              href="https://portaldelagua.cba.gov.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shrink-0 transition-colors shadow-sm self-start sm:self-auto"
            >
              <span>Reporte Diario APRHI</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {damSpillwayBenchmarks.map((dam) => {
              return (
                <div
                  key={dam.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">
                          {dam.name}
                        </h2>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">
                          {dam.location} • {dam.basin}
                        </span>
                      </div>
                      <DamWaterLevelIndicator damId={dam.id} size="xs" />
                    </div>

                    <div className="mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Cota oficial de vertedero
                      </div>
                      <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">
                        {dam.spillwayLevel.toFixed(2)} m
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                        <DamWaterLevelIndicator damId={dam.id} showBar={true} variant="compact" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        Referencia técnica de llenado al nivel del labio del vertedero según mediciones oficiales de Recursos Hídricos (APRHI).
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <Link
                      to={`/diques/${dam.id}`}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Ver ficha del dique</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <a
                      href="https://portaldelagua.cba.gov.ar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Fuente APRHI
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-10">
        <AdBanner slot="3228900466" />
      </div>
    </div>
  );
}
