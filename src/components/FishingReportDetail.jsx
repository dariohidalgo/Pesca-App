import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FileText,
  Calendar,
  MapPin,
  Fish,
  Anchor,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Compass,
  Layers,
  Info
} from 'lucide-react';
import { getInitialReports } from '../data/fishingReports';
import { getDamById } from '../data/damsData';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import SchemaOrg from './SchemaOrg';

export default function FishingReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(() => {
    return getInitialReports().find(r => r.id === id) || null;
  });
  const [loading, setLoading] = useState(!report);

  useEffect(() => {
    if (!report && db) {
      const fetchDoc = async () => {
        try {
          const docRef = doc(db, 'fishing_reports', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setReport({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (err) {
          console.warn('Error fetching report:', err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchDoc();
    } else {
      setLoading(false);
    }
  }, [id, report]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center text-slate-500">
        Cargando reporte de pesca...
      </div>
    );
  }

  if (!report) {
    return <Navigate to="/partes" replace />;
  }

  const dam = getDamById(report.damId);
  const hasCatches = report.result?.hasCatches;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>{`Parte de Pesca: ${report.targetSpecies} en ${report.damName || report.damId} - Pesca Córdoba`}</title>
        <meta
          name="description"
          content={`Reporte de pesca deportiva del ${report.tripDate} en ${report.damName || report.damId}. Modalidad ${report.modality}, aparejo: ${report.baitAndRig}.`}
        />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "Report",
        "headline": `Parte de Pesca en ${report.damName || report.damId} - ${report.tripDate}`,
        "author": {
          "@type": "Person",
          "name": report.author
        },
        "datePublished": report.publishDate,
        "description": report.result?.notes
      }} />

      {/* Regreso */}
      <div className="mb-6">
        <Link
          to="/partes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al listado de partes</span>
        </Link>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
            {report.damName || dam?.name || report.damId}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
            Modalidad: {report.modality}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
            hasCatches
              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            {hasCatches ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{report.result?.catchesCount ? `${report.result.catchesCount} capturas obtenidas` : 'Salida con capturas'}</span>
              </>
            ) : (
              <>
                <XCircle className="h-3.5 w-3.5" />
                <span>Jornada sin capturas (Zapatero documentado)</span>
              </>
            )}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-2">
          Salida a {report.targetSpecies} • {report.zone}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-6">
          <span>Fecha de la salida: <strong>{report.tripDate}</strong></span>
          <span>•</span>
          <span>Fecha de publicación: <strong>{report.publishDate}</strong></span>
          <span>•</span>
          <span>Pescador: <strong>{report.author}</strong></span>
        </div>

        {/* Disclaimer específico */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <span>
            <strong>Experiencia particular:</strong> {report.disclaimer || 'Este reporte describe una jornada puntual. El comportamiento del pez varía por presión atmosférica, viento y fluctuaciones térmicas.'}
          </span>
        </div>

        {/* Ficha técnica */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block mb-1.5 flex items-center gap-2">
                <Fish className="h-4 w-4 text-blue-500" />
                <span>Montaje y Carnada Utilizada</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {report.baitAndRig}
              </p>
              {report.rigId && (
                <Link
                  to={`/lineas/${report.rigId}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mt-3"
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>Ver cómo armar este montaje</span>
                </Link>
              )}
            </div>

            <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block mb-1.5 flex items-center gap-2">
                <Compass className="h-4 w-4 text-cyan-500" />
                <span>Condiciones Meteorológicas Observadas</span>
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {report.conditions}
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <span className="font-bold text-base text-slate-900 dark:text-slate-100 block mb-2">
              Observaciones y Resultado
            </span>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {report.result?.notes}
            </p>
          </div>
        </div>

        {/* Enlaces cruzados */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            <Link
              to={`/diques/${report.damId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
            >
              <Compass className="h-3.5 w-3.5 text-blue-500" />
              <span>Ver Guía de {report.damName || report.damId}</span>
            </Link>
            <Link
              to={`/mapa?dique=${report.damId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-blue-500" />
              <span>Ver Pesqueros de este Dique</span>
            </Link>
          </div>

          <Link
            to={`/planificador?dique=${report.damId}&especie=${report.targetSpecies}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Planificar Salida a este Dique</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
