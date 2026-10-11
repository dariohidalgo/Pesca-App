import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from './SEO';
import { canonicalUrl, LOGO_URL, DEFAULT_IMAGE } from '../lib/domain';
import {
  Waves,
  MapPin,
  Fish,
  Calendar,
  Compass,
  ArrowLeft,
  Navigation2,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink,
  Layers,
  FileText,
  Anchor,
  Sparkles,
  Ship
} from 'lucide-react';
import { getDamById, DAMS_DATA } from '../data/damsData';
import { getPointsByDam } from '../data/usefulPoints';
import SchemaOrg from './SchemaOrg';
import AdBanner from './AdBanner';

export default function DamDetail() {
  const { slug } = useParams();
  const dam = getDamById(slug);

  if (!dam) {
    return <Navigate to="/diques" replace />;
  }

  const isDraft = dam.status === 'draft';
  const damPoints = getPointsByDam(dam.id);

  // Generar URL para navegación en Google Maps
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${dam.coordinates[0]},${dam.coordinates[1]}`;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title={`${dam.name} - Guía de Pesca y Accesos - Pesca Córdoba`}
        description={dam.shortDescription}
        canonical={`/diques/${dam.slug || dam.id}`}
        noindex={isDraft}
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "Guide",
        "name": `Guía de Pesca Deportiva en ${dam.name}`,
        "description": dam.shortDescription,
        "url": canonicalUrl(`/diques/${dam.id}`),
        "about": {
          "@type": "BodyOfWater",
          "name": dam.name,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": dam.coordinates[0],
            "longitude": dam.coordinates[1]
          }
        }
      }} />

      {/* Navegación de regreso */}
      <div className="mb-6">
        <Link
          to="/diques"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver a todas las guías de diques</span>
        </Link>
      </div>

      {/* Encabezado del Dique */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-3">
              <MapPin className="h-3.5 w-3.5" />
              <span>{dam.department}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {dam.name}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {dam.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <Link
              to={`/planificador?dique=${dam.id}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-200 dark:shadow-none transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Planificar Salida Aquí</span>
            </Link>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm transition-all"
            >
              <Navigation2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Cómo Llegar (GPS)</span>
            </a>
          </div>
        </div>

        {/* Métricas clave */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block">Espejo de agua</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {dam.surfaceKm2 ? `${dam.surfaceKm2} km²` : 'En medición'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block">Profundidad máx.</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {dam.maxDepthMeters ? `${dam.maxDepthMeters} m` : 'En medición'}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block">Pesqueros activos</span>
            <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
              {damPoints.length} puntos útiles
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 dark:text-slate-500 block">Tipo de ficha</span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 dark:text-blue-400">
              <Compass className="h-4 w-4" />
              <span>{isDraft ? 'Borrador Técnico' : 'Guía Informativa'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Manejo de Borrador */}
      {isDraft ? (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-3xl p-8 text-center my-12">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200 mb-2">
            Guía Técnica en Elaboración
          </h2>
          <p className="text-amber-800 dark:text-amber-300 max-w-xl mx-auto text-sm leading-relaxed mb-6">
            Para proteger a nuestros usuarios de información errónea o accesos prohibidos, mantenemos esta ficha como borrador hasta finalizar la validación con la Secretaría de Ambiente y Seguridad Náutica de Córdoba.
          </p>
          <Link
            to="/diques"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl font-bold text-sm hover:bg-amber-700 transition-colors"
          >
            Ver catálogo de diques
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Aviso obligatorio de datos dinámicos vs permanentes y metadatos de verificación */}
          <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <Info className="h-5 w-5 text-sky-600 dark:text-sky-400 mt-0.5 shrink-0" />
            <div className="text-sm text-sky-900 dark:text-sky-200 leading-relaxed w-full">
              <div className="font-bold mb-1">Alcance Documental y Normativo de la Ficha:</div>
              <p className="text-xs text-sky-800 dark:text-sky-300 mb-2 leading-relaxed">
                Información recopilada a partir de resoluciones oficiales de la Secretaría de Ambiente (Resolución N° 318/2026), leyes provinciales de seguridad náutica (Ley N° 5040) y cartografía vial oficial. No constituye un relevamiento de campo presencial. Tarifas de clubes, horarios de bajadas y servicios concesionados fluctúan y deben confirmarse localmente antes de viajar.
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-sky-700 dark:text-sky-400 border-t border-sky-200/60 dark:border-sky-800/60 pt-2">
                <span><strong>Fuentes documentales:</strong> {dam.verification?.source || 'Secretaría de Ambiente de Córdoba y Seguridad Náutica'}</span>
                <span className="text-blue-700 dark:text-blue-400 font-semibold">● Información documental de referencia</span>
              </div>
            </div>
          </div>

          {/* 1. Descripción y modalidades */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
              <Compass className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Entorno y Modalidades de Pesca</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-base">
              {dam.fullDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dam.fishingModalities.map((mod, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-base mb-1 block">
                      {mod.name}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {mod.notes}
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Modalidad autorizada</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Especies presentes respaldadas por fuentes */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
              <Fish className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Especies Presentes y Normativa de Captura</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Poblaciones respaldadas por resoluciones de la Secretaría de Ambiente de Córdoba.
            </p>

            <div className="space-y-4">
              {dam.species.map((sp, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-100 dark:border-slate-700/60"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                      {sp.name}
                    </h3>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 rounded-full w-fit">
                      {sp.season}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400 mt-3">
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Técnicas recomendadas:</strong>{' '}
                      {sp.techniques.join(', ')}
                    </div>
                    <div>
                      <strong className="text-slate-700 dark:text-slate-300">Carnadas / Señuelos:</strong>{' '}
                      {sp.bait}
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <span className="text-slate-800 dark:text-slate-200 font-semibold">
                      {sp.regulations}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      Fuente: {sp.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Accesos públicos y restricciones conocidas */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2.5">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Accesos Públicos y Restricciones</span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Puntos de acceso público referenciados según cartografía vial e información municipal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dam.publicAccess.map((acc, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {acc.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-600">
                        {acc.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      {acc.description}
                    </p>
                  </div>
                  {acc.restrictions && (
                    <div className="text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800">
                      <strong>Restricción:</strong> {acc.restrictions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* 4. Opciones de pesca desde costa y embarcado */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
              <Anchor className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Costa vs Embarcado vs Kayak</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block mb-2">
                  Pesca de Costa
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dam.shoreAndBoatOptions.shore}
                </p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block mb-2">
                  Pesca Embarcada
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dam.shoreAndBoatOptions.boat}
                </p>
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 block mb-2">
                  Pesca en Kayak
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {dam.shoreAndBoatOptions.kayak}
                </p>
              </div>
            </div>
          </section>

          {/* 5. Cómo llegar e indicaciones */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2.5">
              <Navigation2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Cómo Llegar y Rutas de Acceso</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              {dam.directions}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors"
              >
                <Navigation2 className="h-4 w-4" />
                <span>Abrir ubicación en Google Maps</span>
              </a>
              <Link
                to={`/mapa?dique=${dam.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold text-sm transition-colors"
              >
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>Ver puntos útiles de este dique en el mapa ({damPoints.length})</span>
              </Link>
            </div>
          </section>

          {/* 6. Equipos recomendados con enlace a tutoriales de líneas */}
          <section className="bg-gradient-to-br from-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex items-center gap-2.5 mb-2">
              <Layers className="h-6 w-6 text-cyan-400" />
              <h2 className="text-2xl font-bold">Equipo y Montajes Recomendados</h2>
            </div>
            <p className="text-sm text-blue-200 mb-6 max-w-2xl">
              Configuraciones y montajes tradicionales sugeridos para este dique con enlaces paso a paso a nuestros tutoriales visuales.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dam.recommendedGear.map((gear, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold text-base text-cyan-300 block mb-1">
                      {gear.title}
                    </span>
                    <p className="text-xs text-blue-100 leading-relaxed mb-4">
                      {gear.gear}
                    </p>
                  </div>
                  <Link
                    to={`/lineas/${gear.rigId}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-2 rounded-xl transition-colors w-fit"
                  >
                    <span>Ver Tutorial: {gear.rigName}</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 7. Servicios y Directorio */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                  <Ship className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <span>Servicios Disponibles en {dam.name}</span>
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Guarderías, alquiler de botes y venta de carnadas.
                </p>
              </div>
              <Link
                to="/botes"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Ver directorio completo de botes</span>
              </Link>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
              {dam.services.map((srv, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Normativa y Enlaces Oficiales */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2.5">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span>Normativa y Enlaces Oficiales</span>
            </h2>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p>
                <strong>Permiso de pesca:</strong> {dam.regulations.permitRequired}
              </p>
              <p>
                <strong>Vedas y horarios:</strong> {dam.regulations.vedaNote}
              </p>
              <p>
                <strong>Seguridad Náutica:</strong> {dam.regulations.safetyNotice}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 items-center">
              <a
                href={dam.regulations.officialPortal || 'https://cazaypesca.cba.gov.ar'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline bg-blue-50 dark:bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900"
              >
                <span>{dam.regulations.officialPortalName || 'Portal Oficial Caza y Pesca Córdoba'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              {dam.regulations.tourismPortal && (
                <a
                  href={dam.regulations.tourismPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
                >
                  <span>Agencia Córdoba Turismo</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              <a
                href="https://www.smn.gob.ar/alertas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-900"
              >
                <span>Alertas Oficiales SMN</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.aprhi.gob.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 rounded-lg border border-teal-200 dark:border-teal-900"
              >
                <span>Monitoreo de Aguas APRHI</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/reglamento"
                className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline px-2 py-1.5"
              >
                <span>Reglamento Provincial Completo</span>
              </Link>
            </div>
          </section>

          {/* Enlaces cruzados hacia Partes y Planificador */}
          <div className="bg-slate-100 dark:bg-slate-800/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                ¿Querés saber cómo estuvo el pique recientemente?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Mirá los reportes fechados de pescadores deportivos o armá tu lista de equipo personalizada.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/partes?dique=${dam.id}`}
                className="px-4 py-2.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
              >
                Partes de Pesca
              </Link>
              <Link
                to={`/planificador?dique=${dam.id}`}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors"
              >
                Planificar Salida
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <AdBanner slot="3228900466" />
          </div>
        </div>
      )}
    </div>
  );
}
