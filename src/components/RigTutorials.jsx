import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Layers,
  Fish,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { RIG_TUTORIALS } from '../data/rigTutorials';
import RigDiagram from './RigDiagram';
import SchemaOrg from './SchemaOrg';

export default function RigTutorials() {
  const [selectedCategory, setSelectedCategory] = useState('todas');

  const categories = [
    { id: 'todas', label: 'Todos los montajes' },
    { id: 'Flote', label: 'Líneas de Flote' },
    { id: 'Profundidad', label: 'Profundidad / Paternoster' },
    { id: 'Fondo', label: 'Líneas de Fondo' },
    { id: 'Superficie', label: 'Superficie' }
  ];

  const filteredRigs = selectedCategory === 'todas'
    ? RIG_TUTORIALS
    : RIG_TUTORIALS.filter(r => r.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Tutoriales Visuales de Líneas de Pesca - Pesca Córdoba</title>
        <meta
          name="description"
          content="Aprende a armar líneas y aparejos de pesca para los diques de Córdoba con esquemas originales, medidas precisas, nudos y materiales. Flote 3 boyas, paternoster, feeder y fondo."
        />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Tutoriales Visuales de Líneas de Pesca",
        "description": "Montajes y líneas de pesca deportiva con esquemas explicativos paso a paso para Córdoba.",
        "url": "https://www.pescacordoba.com.ar/lineas",
        "numberOfItems": RIG_TUTORIALS.length,
        "itemListElement": RIG_TUTORIALS.map((r, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": r.title,
          "url": `https://www.pescacordoba.com.ar/lineas/${r.id}`
        }))
      }} />

      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-3">
              <Layers className="h-3.5 w-3.5" />
              <span>Complemento Práctico del Catálogo de Nudos</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center justify-center sm:justify-start gap-3">
              <Layers className="h-9 w-9 text-blue-600 dark:text-blue-400" />
              Tutoriales de Líneas de Pesca
            </h1>
            <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              Esquemas técnicos originales y medidas exactas para armar tus propios aparejos. Probados y adaptados para los diques y ríos de Córdoba.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-2">
            <Link
              to="/nudos"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-sm transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              <span>Ver Catálogo de Nudos</span>
            </Link>
          </div>
        </div>

        {/* Filtro de categoría */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de tutoriales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredRigs.map((rig) => (
          <div
            key={rig.id}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                  {rig.category} • Dificultad: {rig.difficulty}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {rig.badge}
                </span>
              </div>

              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {rig.title}
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 mb-4">
                {rig.subtitle}
              </p>

              {/* Vista previa miniatura del diagrama */}
              <div className="my-4 rounded-xl overflow-hidden border border-slate-700">
                <RigDiagram rigId={rig.id} className="max-h-48 overflow-hidden pointer-events-none opacity-90" />
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                {rig.purposeAndConditions.summary}
              </p>

              {/* Especies y diques recomendados */}
              <div className="space-y-2 mb-6 text-xs">
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Fish className="h-4 w-4 text-blue-500 shrink-0" />
                  <span><strong>Especies:</strong> {rig.species.join(', ')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                  <Compass className="h-4 w-4 text-cyan-500 shrink-0" />
                  <span><strong>Diques clave:</strong> {rig.dams.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {rig.numberedSteps.length} pasos detallados
              </span>
              <Link
                to={`/lineas/${rig.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
              >
                <span>Ver Tutorial y Medidas</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Referencias técnicas y originalidad */}
      <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600" />
          <span>Metodología de Montajes y Referencias Técnicas</span>
        </h3>
        <p className="leading-relaxed">
          <strong>Esquemas e Instrucciones Originales:</strong> Cada diagrama vectorial y lista de medidas fue desarrollado específicamente para Pesca Córdoba, adaptado a las condiciones de aguas serranas (profundidad de embalses, vientos y hábitos de alimentación del pejerrey y carpa en Córdoba). No se emplean imágenes copiadas ni simulaciones fotográficas no autorizadas.
        </p>
        <p className="leading-relaxed">
          <strong>Corroboración de Nudos:</strong> Los nudos vinculados en cada aparejo (Palomar, Uni, Medio Barril / Clinch) se corroboran técnicamente con guías de resistencia y confección náutica deportiva (<a href="https://www.rapala.com/us_en/sufix-knot-tying-guides" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Sufix / Rapala Knot Tying Guides</a>), adaptados a las líneas del catálogo provincial.
        </p>
      </div>
    </div>
  );
}
