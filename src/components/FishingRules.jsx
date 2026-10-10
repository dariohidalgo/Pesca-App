import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Scale,
  FileText,
  Anchor,
  Info,
  ExternalLink,
  CalendarDays,
  ShieldAlert,
  Fish,
  AlertTriangle,
  LifeBuoy,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';
import { FISHING_REGULATIONS, NAUTICAL_SAFETY } from '../data/officialRegulations';
import AdBanner from './AdBanner';

export default function FishingRules() {
  const damQuotasList = Object.entries(FISHING_REGULATIONS.damQuotas);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Reglamento Oficial y Permisos de Pesca - Pesca Córdoba</title>
        <meta
          name="description"
          content="Normativa oficial de pesca deportiva en Córdoba: Resolución N° 250/2024, Resolución N° 318/2026, carnet digital CiDi, vedas, cupos por dique y seguridad náutica (Ley N° 5040)."
        />
        <link rel="canonical" href="https://www.pescacordoba.com.ar/reglamento" />
        <meta property="og:title" content="Reglamento Oficial y Permisos de Pesca - Pesca Córdoba" />
        <meta property="og:url" content="https://www.pescacordoba.com.ar/reglamento" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Encabezado */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-3">
          <Scale className="h-3.5 w-3.5" />
          <span>Normativa Oficial de la Provincia de Córdoba</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3 dark:text-white">
          Reglamento Oficial y Permisos de Pesca
        </h1>
        <p className="mt-2 text-base sm:text-lg text-slate-600 dark:text-slate-300">
          Disposiciones emitidas por el {FISHING_REGULATIONS.authority}.
        </p>
      </div>

      {/* Marco Normativo Base */}
      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 mb-8 text-xs text-slate-600 dark:text-slate-400 space-y-2">
        <div className="font-bold text-slate-800 dark:text-slate-200 text-sm flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Documentos Oficiales de Respaldo</span>
        </div>
        <p>
          <strong>Reglamento Marco General:</strong> {FISHING_REGULATIONS.generalFramework}.
        </p>
        <p>
          <strong>Regulación de Temporada:</strong> {FISHING_REGULATIONS.seasonFramework}.
        </p>
        <p>
          <strong>Veda Nocturna:</strong> {FISHING_REGULATIONS.nightBanFramework}.
        </p>
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 text-xs font-bold text-blue-600 dark:text-blue-400">
          <a
            href={FISHING_REGULATIONS.officialGazette}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <span>Buscador del Boletín Oficial de Córdoba</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={FISHING_REGULATIONS.officialPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <span>Portal Oficial Caza y Pesca (CiDi)</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 1. Carnet de Pesca CiDi */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-sm border border-blue-200 p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-200" />
              Carnet de Pesca Deportivo Digital
            </h2>
            <p className="text-blue-100 mb-4 text-sm leading-relaxed">
              Es un requisito <b>obligatorio</b> en toda la Provincia de Córdoba bajo la Ley Provincial N° 4412 y Resolución N° 250/2024. Para pescar legalmente tanto de costa como embarcado, se debe portar la credencial digital con código QR en el teléfono o impresa, verificada por Policía Ambiental.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                <strong>Vigencia:</strong> Anual (1 año calendario desde su emisión o renovación).
              </div>
              <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                <strong>Exentos de tasa arancelaria:</strong> Jubilados, menores de 18 años y personas con discapacidad (deben tramitar la credencial obligatoria sin costo).
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={FISHING_REGULATIONS.officialPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-2.5 px-6 rounded-xl transition-colors shadow-sm text-sm"
              >
                <span>Tramitar Licencia en Caza y Pesca</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://cidi.cba.gov.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-blue-800/80 hover:bg-blue-800 text-white font-bold py-2.5 px-6 rounded-xl transition-colors border border-blue-400/40 text-sm"
              >
                <span>Acceso Ciudadano Digital (CiDi)</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Reglas Generales Corroboradas (Vedas y Tallas) */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 dark:text-white">
          <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Vedas y Restricciones Provinciales Corroboradas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-red-200 bg-red-50/70 dark:bg-red-950/30 dark:border-red-900/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-1">
                Veda Total de Pejerrey
              </div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
                1 de Septiembre al 30 de Noviembre
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Rige en todos los embalses y lagunas públicas de Córdoba. Prohíbe la captura bajo cualquier modalidad, incluso la pesca con devolución.
              </p>
            </div>
            <div className="pt-2 border-t border-red-200/60 dark:border-red-900/40 text-[11px] text-red-800 dark:text-red-300">
              Resolución N° 272/2024 y Res. N° 318/2026 (B.O. 02/10/2026)
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/70 dark:bg-amber-950/30 dark:border-amber-900/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                Veda de Costa
              </div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
                Septiembre a Diciembre
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Del 3° fin de semana de septiembre al 3° fin de semana de diciembre. Prohíbe pescar desde la orilla y a menos de 200 m de la costa en cuerpos lénticos para proteger áreas de desove.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300">
              Permite pesca embarcada a más de 200 m de la orilla
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50/70 dark:bg-indigo-950/30 dark:border-indigo-900/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide mb-1">
                Veda Nocturna Permanente
              </div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">
                Exclusivamente Horario Diurno
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                La pesca deportiva está permitida únicamente entre la salida y la puesta del sol. Prohibida la pesca nocturna en todos los embalses y ríos públicos de Córdoba.
              </p>
            </div>
            <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/40 text-[11px] text-indigo-800 dark:text-indigo-300">
              Resolución N° 01/2024 (prorrogada hasta el 31/12/2027)
            </div>
          </div>
        </div>
      </div>

      {/* Aclaración biológica vs normativa de pesca nocturna */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 mb-8 flex items-start gap-3">
        <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed space-y-1">
          <div className="font-bold text-sm">Hábito Biológico vs Restricción Legal de Pesca Nocturna:</div>
          <p>
            Determinadas especies como el <strong>bagre sapo (moncholo)</strong> o la <strong>tararira</strong> presentan biológicamente picos de alimentación crepusculares o nocturnos. Sin embargo, <strong>la pesca deportiva en todas las aguas públicas de la provincia está sujeta a la veda nocturna legal</strong> (Resolución N° 01/2024), por lo que la actividad debe realizarse estrictamente dentro de las horas de luz diurna hasta el ocaso. Ninguna guía o planificador de Pesca Córdoba promueve la pesca fuera del horario autorizado por la autoridad de aplicación.
          </p>
        </div>
      </div>

      {/* 3. Tabla de Estado de Verificación de Cupos de Pejerrey por Embalse */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 dark:text-white">
            <Fish className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Estado de Verificación de Cupos de Pejerrey por Dique
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full w-fit">
            Talla mínima legal: 25 cm (Res. N° 250/2024)
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
          Al no disponer de un enlace directo al documento oficial con anexo desglosado para cada embalse, las cifras numéricas no se publican como oficiales ni de referencia. Consultá la normativa vigente en el portal oficial antes de salir:
        </p>

        {/* Presentación Móvil: Fichas con Etiquetas Claras */}
        <div className="md:hidden space-y-3 mb-4">
          {damQuotasList.map(([key, data]) => {
            const pejerreyQuota = data.quotas.find(q => q.species.includes('Pejerrey'));
            return (
              <div
                key={key}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
                      {data.damName}
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {data.cuenca}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                    Pejerrey
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Cupo Diario Oficial
                    </span>
                    <span className="font-semibold text-amber-700 dark:text-amber-400 leading-relaxed block">
                      {pejerreyQuota?.limitNotice || data.statusNotice}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Talla Mínima Legal
                    </span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {pejerreyQuota?.minSize || '25 cm de longitud total'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href={data.officialPortalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Consultar en cazaypesca.cba.gov.ar</span>
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Presentación Escritorio: Tabla Completa */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs mb-3">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-100 dark:bg-slate-800 text-xs uppercase font-bold text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-5 py-3">Dique / Cuenca</th>
                <th className="px-5 py-3">Cupo Diario Oficial</th>
                <th className="px-5 py-3">Talla Mínima Legal</th>
                <th className="px-5 py-3">Consulta Oficial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {damQuotasList.map(([key, data]) => {
                const pejerreyQuota = data.quotas.find(q => q.species.includes('Pejerrey'));
                return (
                  <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{data.damName}</div>
                      <div className="text-[11px] text-slate-400">{data.cuenca}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-semibold text-amber-700 dark:text-amber-400 block mb-0.5">
                        {pejerreyQuota?.limitNotice || data.statusNotice}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium">
                      {pejerreyQuota?.minSize || '25 cm de longitud total'}
                    </td>
                    <td className="px-5 py-3.5 text-xs">
                      <a
                        href={data.officialPortalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Consultar en cazaypesca.cba.gov.ar</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Régimen Provincial para Otras Especies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2 dark:text-white">
          <ShieldAlert className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          Régimen Provincial para Otras Especies Deportivas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          {FISHING_REGULATIONS.secondarySpecies.map(sp => (
            <div key={sp.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{sp.name}</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold">{sp.category}</span>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mb-2 font-semibold">
                  <strong>Cupo:</strong> {sp.statusNotice}.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {sp.notes}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={sp.officialPortalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span>Consultar organismo oficial</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Normativa de Seguridad Náutica (Ley N° 5040) */}
      <div className="mb-8 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <LifeBuoy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Seguridad Náutica Obligatoria ({NAUTICAL_SAFETY.framework})
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          La {NAUTICAL_SAFETY.authority} fiscaliza la navegación en todos los lagos cordobeses. Los requisitos diferencian las exigencias legales obligatorias de las recomendaciones prácticas de seguridad:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Anchor className="h-4 w-4" />
              <span>Kayaks y Botes a Remo</span>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Chaleco DAF obligatorio:</strong> colocado y abrochado el 100% del tiempo de navegación. Prohibido llevarlo guardado.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Silbato náutico adosado:</strong> dispositivo acústico obligatorio fijado al salvavidas para emitir señales sonoras de auxilio.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Navegación diurna exclusiva:</strong> prohibida la navegación nocturna de embarcaciones a remo en aguas provinciales.</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-500">
                <Info className="h-4 w-4 text-sky-500 shrink-0 mt-0.5" />
                <span><em>Recomendaciones prácticas de seguridad:</em> cabo de fondeo con zafado rápido, leash para palas y bolsa estanca para resguardo de pertenencias.</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-3 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Anchor className="h-4 w-4" />
              <span>Embarcaciones a Motor (Lanchas / Trackers)</span>
            </div>
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Matrícula e inspección técnica:</strong> embarcación debidamente registrada ante la Dirección de Seguridad Náutica de Córdoba.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Timonel habilitado:</strong> carnet de conductor náutico vigente expedido por la autoridad competente.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Salvavidas aprobados:</strong> un chaleco reglamentario por persona a bordo.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Matafuego y kit de auxilio:</strong> extintor 1 kg ABC vigente, pala-bichero, balde o bomba de achique y sistema de fondeo.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-4 text-xs font-bold text-blue-600 dark:text-blue-400">
          <a
            href={NAUTICAL_SAFETY.officialPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:underline"
          >
            <span>Dirección de Seguridad Náutica de Córdoba</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* 6. Ética y Conservación */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Fish className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-3xl font-black mb-6 tracking-tight">Ética del Pescador y Conservación</h3>
          <div className="space-y-6 text-slate-300 leading-relaxed text-sm">
            <p>
              En Pesca Córdoba creemos que el futuro de nuestro deporte depende directamente de la salud de nuestros ríos y diques. El compromiso del pescador deportivo va más allá de seguir la ley; se trata de una ética de respeto por los ecosistemas acuáticos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <h4 className="text-white font-bold text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                  Pesca y Devolución
                </h4>
                <p className="text-xs leading-relaxed">
                  Incluso cuando la ley permite sacrificar piezas, alentamos a devolver los ejemplares de gran porte. Los grandes reproductores garantizan poblaciones saludables para las próximas temporadas.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold text-base flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  Basura Cero en Orillas
                </h4>
                <p className="text-xs leading-relaxed">
                  El sedal abandonado y los envases plásticos son mortales para las aves y la fauna silvestre. Llevate siempre tus residuos y preservá las costas limpias.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Publicidad contextual */}
      <div className="mt-8">
        <AdBanner slot="3228900466" />
      </div>
    </div>
  );
}
