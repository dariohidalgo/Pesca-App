import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from './SEO';
import { canonicalUrl, LOGO_URL } from '../lib/domain';
import {
  Layers,
  ArrowLeft,
  Fish,
  Compass,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Link2,
  Wrench,
  Calendar,
  Sparkles
} from 'lucide-react';
import { getRigById } from '../data/rigTutorials';
import RigDiagram from './RigDiagram';
import SchemaOrg from './SchemaOrg';

export default function RigDetail() {
  const { slug } = useParams();
  const rig = getRigById(slug);

  if (!rig) {
    return <Navigate to="/lineas" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={`Tutorial: ${rig.title} - Pesca Córdoba`}
        description={`Tutorial paso a paso para armar la ${rig.title}. Materiales, medidas exactas, nudos y esquema visual para pescar en Córdoba.`}
        canonical={`/lineas/${rig.slug || rig.id}`}
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `Cómo armar: ${rig.title}`,
        "description": rig.purposeAndConditions.summary,
        "step": rig.numberedSteps.map((s) => ({
          "@type": "HowToStep",
          "position": s.step,
          "name": s.title,
          "text": s.description
        }))
      }} />

      {/* Regreso */}
      <div className="mb-6">
        <Link
          to="/lineas"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a todos los tutoriales de líneas</span>
        </Link>
      </div>

      {/* Cabecera */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                {rig.category}
              </span>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                {rig.badge}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                Dificultad: {rig.difficulty}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {rig.title}
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400">
              {rig.subtitle}
            </p>
          </div>

          <Link
            to={`/planificador?especie=${rig.species[0]?.split(' ')[0]}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none transition-all shrink-0"
          >
            <Calendar className="h-4 w-4" />
            <span>Usar en Planificador</span>
          </Link>
        </div>

        {/* Especies y diques */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="flex items-start gap-2">
            <Fish className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Especies objetivo:</strong>
              <span className="text-slate-600 dark:text-slate-400 ml-1.5">{rig.species.join(', ')}</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Compass className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800 dark:text-slate-200">Diques recomendados:</strong>
              <span className="text-slate-600 dark:text-slate-400 ml-1.5">{rig.dams.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {/* 1. Esquema visual SVG original */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Esquema Técnico Original del Montaje</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Visualización a escala orientativa con cotas y componentes numerados.
              </p>
            </div>
          </div>

          <RigDiagram rigId={rig.id} className="mt-4" />
        </section>

        {/* 2. Para qué sirve y en qué condiciones se utiliza */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
            <Compass className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>¿Para qué sirve y cuándo utilizarla?</span>
          </h2>
          <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            {rig.purposeAndConditions.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-5">
              <span className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Condiciones Ideales</span>
              </span>
              <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
                {rig.purposeAndConditions.bestConditions}
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 rounded-2xl p-5">
              <span className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>Cuándo Evitarla</span>
              </span>
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed">
                {rig.purposeAndConditions.avoidWhen}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Lista de materiales */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2.5">
            <Wrench className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>Lista de Materiales Necesarios</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Componentes recomendados con calibres sugeridos para agua dulce en Córdoba.
          </p>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 border-y border-slate-100 dark:border-slate-800">
            {rig.materials.map((mat, idx) => (
              <div key={idx} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {mat.item}
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                  {mat.spec}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Medidas orientativas y adaptación */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2.5">
            <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>Medidas Orientativas y Reglas de Adaptación</span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Dimensiones estándar y cuándo ajustarlas según el viento o el comportamiento del pez.
          </p>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 mb-6 space-y-2 text-sm">
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Largo total:</strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">{rig.measurements.totalLength}</span>
            </div>
            {rig.measurements.buoySpacing && (
              <div>
                <strong className="text-slate-900 dark:text-slate-100">Separación de boyas / elementos:</strong>{' '}
                <span className="text-slate-600 dark:text-slate-400">{rig.measurements.buoySpacing}</span>
              </div>
            )}
            <div>
              <strong className="text-slate-900 dark:text-slate-100">Brazoladas (bajadas):</strong>{' '}
              <span className="text-slate-600 dark:text-slate-400">{rig.measurements.branchLengths}</span>
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">
            ¿Cuándo y cómo adaptar estas medidas?
          </h3>
          <ul className="space-y-2.5">
            {rig.measurements.adaptationRules.map((rule, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800/30 p-3 rounded-xl border border-slate-100 dark:border-slate-800"
              >
                <CheckCircle2 className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Pasos numerados paso a paso */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2.5">
            <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>Instrucciones Paso a Paso</span>
          </h2>

          <div className="space-y-6">
            {rig.numberedSteps.map((step) => (
              <div key={step.step} className="flex gap-4 sm:gap-6 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white font-black text-lg shadow-md shadow-blue-200 dark:shadow-none">
                  {step.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Nudos necesarios con enlace directo al catálogo de nudos */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <Link2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span>Nudos Necesarios para este Aparejo</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Clickeá en cada nudo para ver su diagrama animado y paso a paso en el Catálogo de Nudos.
              </p>
            </div>
            <Link
              to="/nudos"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver todos los nudos
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rig.knots.map((k, idx) => (
              <Link
                key={idx}
                to={`${k.path}#${k.hash}`}
                className="group bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden"
              >
                {k.image && (
                  <div className="relative w-full h-44 bg-white dark:bg-slate-950 flex items-center justify-center p-3 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
                    <img
                      src={k.image}
                      alt={`Animación del ${k.name}`}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2.5 right-2.5 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-blue-600 text-white shadow-sm">
                      {k.image.endsWith('.gif') ? 'Animación GIF' : 'Esquema'}
                    </span>
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {k.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {k.use}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span>Ver paso a paso en Catálogo</span>
                    <Link2 className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Técnica de atado y resistencia corroboradas con guías náuticas internacionales (<a href="https://www.rapala.com/us_en/sufix-knot-tying-guides" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Sufix / Rapala Knot Tying Guides</a>).
            </span>
            <span className="text-slate-400">
              Esquemas vectoriales SVG y proporciones 100% originales Pesca Córdoba.
            </span>
          </div>
        </section>

        {/* 7. Errores frecuentes y alternativas */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center gap-2.5">
            <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span>Errores Frecuentes y Alternativas</span>
          </h2>

          <div className="space-y-4 mb-8">
            {rig.commonErrors.map((err, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40"
              >
                <div className="flex items-center gap-2 text-rose-900 dark:text-rose-200 font-bold text-sm mb-1">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>Error: {err.error}</span>
                </div>
                <p className="text-xs text-rose-800 dark:text-rose-300 mb-2">
                  <strong>Consecuencia:</strong> {err.consequence}
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  <strong className="text-emerald-600 dark:text-emerald-400">Solución:</strong> {err.solution}
                </p>
              </div>
            ))}
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">
            Alternativas de montajes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rig.alternatives.map((alt, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs sm:text-sm"
              >
                <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                  {alt.situation}
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  {alt.recommendation}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
