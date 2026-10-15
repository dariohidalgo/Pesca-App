import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from './SEO';
import { canonicalUrl } from '../lib/domain';
import {
  FileText,
  Fish,
  PlusCircle,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';
import { getInitialReports, MODALITIES, SPECIES_FILTER_OPTIONS } from '../data/fishingReports';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ReportSubmitModal from './ReportSubmitModal';
import SchemaOrg from './SchemaOrg';

export default function FishingReports() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDam = searchParams.get('dique') || 'todos';

  const [reports, setReports] = useState(getInitialReports());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState('todas');
  const [selectedModality, setSelectedModality] = useState('todas');

  // Cargar partes aprobados desde Firestore si está disponible
  useEffect(() => {
    let isMounted = true;
    const fetchApprovedReports = async () => {
      try {
        if (!db) return;
        const q = query(collection(db, 'fishing_reports'), where('status', '==', 'approved'));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (fetched.length > 0 && isMounted) {
          setReports(prev => {
            const ids = new Set(fetched.map(f => f.id));
            const filteredPrev = prev.filter(p => !ids.has(p.id));
            return [...fetched, ...filteredPrev];
          });
        }
      } catch (err) {
        console.warn('Operando con fuente de partes local:', err.message);
      }
    };
    fetchApprovedReports();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDamFilterChange = (damId) => {
    const next = new URLSearchParams(searchParams);
    if (damId === 'todos') {
      next.delete('dique');
    } else {
      next.set('dique', damId);
    }
    setSearchParams(next);
  };

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchDam = selectedDam === 'todos' || r.damId === selectedDam;
      const matchSpecies = selectedSpecies === 'todas' || r.targetSpecies.toLowerCase().includes(selectedSpecies.toLowerCase());
      const matchMod = selectedModality === 'todas' || r.modality === selectedModality;
      return matchDam && matchSpecies && matchMod;
    });
  }, [reports, selectedDam, selectedSpecies, selectedModality]);

  const handleReportSubmitted = () => {
    // Los reportes quedan en estado pendiente para moderación previa
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Partes de Pesca Reales y Fechados - Pesca Córdoba"
        description="Partes de pesca deportiva fechados y moderados en los diques de Córdoba. Estado del pique, carnadas y modalidades según la experiencia de pescadores locales."
        canonical="partes"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Partes de Pesca Deportiva en Córdoba",
        "description": "Reportes y experiencias de pescadores locales en los diques cordobeses.",
        url: canonicalUrl("/partes")
      }} />

      {/* Encabezado */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Experiencias Reales • Salidas Fechadas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Partes de Pesca
          </h1>
          <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl">
            Reportes fechados de salidas reales con datos de montaje, clima y resultados (incluyendo salidas sin capturas).
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Subir mi Parte</span>
        </button>
      </div>

      {/* Aviso ético obligatorio */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Transparencia deportiva:</strong> Cada reporte refleja una experiencia particular en un día, horario y condiciones específicas. <em>No constituyen garantías de pique ni compromisos de captura.</em> Cuidamos nuestros ecosistemas no divulgando coordenadas sensibles de cría.
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Dique o Embalse
            </label>
            <select
              value={selectedDam}
              onChange={(e) => handleDamFilterChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los diques</option>
              <option value="san-roque">Dique San Roque</option>
              <option value="los-molinos">Dique Los Molinos</option>
              <option value="embalse">Embalse Río Tercero</option>
              <option value="cruz-del-eje">Dique Cruz del Eje</option>
              <option value="pichanas">Dique Pichanas</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Especie buscada
            </label>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SPECIES_FILTER_OPTIONS.map(sp => (
                <option key={sp.id} value={sp.id}>{sp.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
              Modalidad
            </label>
            <select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {MODALITIES.map(mod => (
                <option key={mod.id} value={mod.id}>{mod.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Listado de partes o Estado Vacío Honesto */}
      {filteredReports.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center my-8 shadow-sm">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <Fish className="h-8 w-8" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">
            No hay partes de pesca publicados para este filtro
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-6">
            En Pesca Córdoba tenemos el compromiso de <strong>no inventar testimonios ni partes ficticios</strong>. Si pescaste en esta zona recientemente, podés ser el primero en sumar tu reporte verificado.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Subir mi Parte</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredReports.map((report) => {
            const hasCatches = report.result?.hasCatches;

            return (
              <div
                key={report.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {report.damName || report.damId}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                        {report.modality}
                      </span>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        hasCatches
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {hasCatches ? (
                          <>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>{report.result?.catchesCount ? `${report.result.catchesCount} piezas` : 'Con capturas'}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3.5 w-3.5" />
                            <span>Sin capturas (documentada)</span>
                          </>
                        )}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                      Pesca de {report.targetSpecies} • {report.zone}
                    </h2>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-400 dark:text-slate-500 shrink-0">
                    <div><strong>Fecha de salida:</strong> {report.tripDate}</div>
                    <div>Publicado: {report.publishDate}</div>
                  </div>
                </div>

                {/* Detalles técnicos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs sm:text-sm">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Aparejo y Carnada:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {report.baitAndRig}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      Condiciones del día:
                    </span>
                    <p className="text-slate-600 dark:text-slate-400">
                      {report.conditions}
                    </p>
                  </div>
                </div>

                {/* Resultado y observaciones */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4 text-xs sm:text-sm">
                  <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                    Observaciones del pescador:
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {report.result?.notes || report.comment || report.notes}
                  </p>
                </div>

                {/* Foto si está presente */}
                {report.photo && (
                  <div className="mb-4">
                    <img
                      src={report.photo}
                      alt={`Foto de captura en ${report.damName || report.damId}`}
                      className="w-full max-h-72 object-cover rounded-2xl border border-slate-200 dark:border-slate-800"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    Reportado por: <strong>{report.author}</strong>
                  </span>

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/diques/${report.damId}`}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Guía del dique
                    </Link>
                    <Link
                      to={`/partes/${report.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg font-bold transition-colors"
                    >
                      <span>Ver ficha completa</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Nota de transparencia y antecedentes */}
      <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Compromiso de Honestidad en Partes de Pesca</span>
        </h3>
        <p className="leading-relaxed">
          En Córdoba no existe una API pública ni centralizada de pique actual. Antecedentes institucionales (como las memorias y crónicas de la <a href="https://luzyfuerzacordobaelectrum.com.ar/subcomision-de-pesca-3/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Subcomisión de Pesca de Luz y Fuerza Electrum</a>) constituyen referencias históricas y de contacto, pero no información en tiempo real.
        </p>
        <p className="leading-relaxed">
          Por este motivo, en Pesca Córdoba los partes provienen de <strong>salidas reales y aportes autorizados de pescadores</strong>. Nunca publicamos testimonios ficticios ni datos inventados: si no hay reportes recientes para un filtro, mostramos un estado vacío honesto. Asimismo, documentamos con idéntico rigor las salidas exitosas y aquellas sin capturas, recordando que cada reporte refleja una experiencia particular bajo condiciones meteorológicas específicas y no una garantía de pesca.
        </p>
      </div>

      {/* Modal de envío */}
      <ReportSubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitted={handleReportSubmitted}
      />
    </div>
  );
}
