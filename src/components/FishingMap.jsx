import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Helmet } from 'react-helmet-async';
import {
  MapPin,
  ShieldCheck,
  AlertTriangle,
  List,
  Map as MapIcon,
  Navigation2,
  Filter,
  ChevronDown,
  X,
  Info
} from 'lucide-react';
import { USEFUL_POINTS, POINT_CATEGORIES } from '../data/usefulPoints';
import { DAMS_DATA } from '../data/damsData';
import SchemaOrg from './SchemaOrg';

// Iconos Leaflet personalizados con color según categoría
function createCategoryIcon(color, isVerified) {
  const verifiedRing = isVerified ? '#10b981' : '#f59e0b';
  const markerSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 44" width="32" height="44">
      <path d="M16 0C7.16 0 0 7.16 0 16c0 12 16 28 16 28s16-16 16-28c0-8.84-7.16-16-16-16z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
      <circle cx="16" cy="16" r="8" fill="#ffffff"/>
      <circle cx="16" cy="16" r="4" fill="${verifiedRing}"/>
    </svg>
  `;
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: markerSvg,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
    popupAnchor: [0, -40]
  });
}

const CATEGORY_COLORS = {
  acceso_publico: '#059669',
  bajada_embarcacion: '#2563eb',
  estacionamiento: '#7c3aed',
  camping: '#d97706',
  servicio: '#0d9488'
};

function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function FishingMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDam = searchParams.get('dique') || 'todos';

  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [viewMode, setViewMode] = useState('map');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);

  const handleDamChange = (damId) => {
    const next = new URLSearchParams(searchParams);
    if (damId === 'todos') {
      next.delete('dique');
    } else {
      next.set('dique', damId);
    }
    setSearchParams(next);
  };

  const filteredPoints = useMemo(() => {
    return USEFUL_POINTS.filter(p => {
      const matchDam = selectedDam === 'todos' || p.damId === selectedDam;
      const matchCat = selectedCategory === 'todas' || p.category === selectedCategory;
      return matchDam && matchCat;
    });
  }, [selectedDam, selectedCategory]);

  const mapCenter = useMemo(() => {
    if (selectedDam !== 'todos') {
      const targetDam = DAMS_DATA.find(d => d.id === selectedDam);
      if (targetDam) return targetDam.coordinates;
    }
    return [-31.4201, -64.4888];
  }, [selectedDam]);

  const mapZoom = selectedDam === 'todos' ? 8 : 12;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <Helmet>
        <title>Mapa de Puntos Útiles de Pesca en Córdoba - Pesca Córdoba</title>
        <meta
          name="description"
          content="Mapa interactivo y lista accesible de puntos útiles: accesos públicos de pesca, bajadas de embarcaciones, estacionamientos, campings y servicios con coordenadas georreferenciadas."
        />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Mapa de Puntos Útiles de Pesca en Córdoba",
        "description": "Accesos públicos, bajadas de lanchas, campings y servicios geolocalizados para pesca deportiva.",
        "url": "https://www.pescacordoba.com.ar/mapa",
        "numberOfItems": filteredPoints.length,
        "itemListElement": filteredPoints.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": p.name,
          "description": p.description,
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": p.coordinates[0],
            "longitude": p.coordinates[1]
          }
        }))
      }} />

      {/* Encabezado */}
      <div className="mb-4 sm:mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 rounded-full text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1 sm:mb-2">
            <MapPin className="h-3.5 w-3.5 text-blue-600" />
            <span>Accesos Públicos y Puntos de Referencia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2 sm:gap-3">
            <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Mapa de Puntos Útiles</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl hidden sm:block">
            Accesos públicos de pesca, bajadas para embarcaciones, estacionamientos seguros y campings ribereños en Córdoba.
          </p>
        </div>

        {/* Selector de modo Vista: Mapa vs Lista Accesible */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 sm:p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-stretch sm:self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('map')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              viewMode === 'map'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-pressed={viewMode === 'map'}
          >
            <MapIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Mapa</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            aria-pressed={viewMode === 'list'}
          >
            <List className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Lista ({filteredPoints.length})</span>
          </button>
        </div>
      </div>

      {/* Controles de Filtros */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 mb-3 sm:mb-4 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="map-dam-select" className="text-xs font-bold text-slate-500 dark:text-slate-400 shrink-0">
              Dique:
            </label>
            <select
              id="map-dam-select"
              value={selectedDam}
              onChange={(e) => handleDamChange(e.target.value)}
              className="w-full sm:w-auto min-h-[44px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todos los diques de Córdoba</option>
              <option value="san-roque">Dique San Roque</option>
              <option value="los-molinos">Dique Los Molinos</option>
              <option value="embalse">Embalse de Río Tercero</option>
              <option value="cruz-del-eje">Dique Cruz del Eje</option>
              <option value="pichanas">Dique Pichanas</option>
            </select>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            Mostrando <strong>{filteredPoints.length}</strong> pesqueros geolocalizados
          </div>
        </div>

        {/* Control Desplegable de Categorías en Móvil */}
        <div className="md:hidden pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setIsFiltersOpen(prev => !prev)}
              aria-expanded={isFiltersOpen}
              aria-controls="mobile-filter-options"
              className="min-h-[44px] flex-1 flex items-center justify-between gap-2 px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <div className="flex items-center gap-2 truncate">
                <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {selectedCategory === 'todas'
                    ? 'Filtros: Todas las categorías'
                    : `Filtro: ${POINT_CATEGORIES[selectedCategory]?.label}`}
                </span>
              </div>
              <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
            </button>

            {selectedCategory !== 'todas' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('todas')}
                className="min-h-[44px] px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Limpiar filtro de categoría"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          {isFiltersOpen && (
            <div
              id="mobile-filter-options"
              className="p-2 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5"
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('todas');
                  setIsFiltersOpen(false);
                }}
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                  selectedCategory === 'todas'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>Todas las categorías</span>
                <span className="text-[11px] opacity-75">
                  ({USEFUL_POINTS.filter(p => selectedDam === 'todos' || p.damId === selectedDam).length})
                </span>
              </button>

              {Object.values(POINT_CATEGORIES).map((cat) => {
                const count = USEFUL_POINTS.filter(
                  p => (selectedDam === 'todos' || p.damId === selectedDam) && p.category === cat.id
                ).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsFiltersOpen(false);
                    }}
                    className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between ${
                      selectedCategory === cat.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: CATEGORY_COLORS[cat.id] }} />
                      <span>{cat.label}</span>
                    </div>
                    <span className="text-[11px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Chips de Categorías en Escritorio */}
        <div className="hidden md:flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedCategory('todas')}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'todas'
                ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Todas las categorías
          </button>

          {Object.values(POINT_CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Leyenda en Móvil: Panel Desplegable */}
      <div className="md:hidden mb-3">
        <button
          type="button"
          onClick={() => setIsLegendOpen(prev => !prev)}
          aria-expanded={isLegendOpen}
          aria-controls="mobile-map-legend"
          className="w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" aria-hidden="true" />
            <span>Leyenda y referencias del mapa</span>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isLegendOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>

        {isLegendOpen && (
          <div
            id="mobile-map-legend"
            className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2.5"
          >
            <div className="grid grid-cols-2 gap-2">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shrink-0"></span>
                <span>Acceso público</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shrink-0"></span>
                <span>Bajada de botes</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block shrink-0"></span>
                <span>Estacionamiento</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block shrink-0"></span>
                <span>Camping</span>
              </span>
              <span className="inline-flex items-center gap-1.5 col-span-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block shrink-0"></span>
                <span>Servicios y sanitarios</span>
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1.5 text-[11px]">
              <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                <span>Referencia geolocalizada</span>
              </span>
              <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>Pendiente de confirmación</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Leyenda en Escritorio */}
      <div className="hidden md:flex mb-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-200 dark:border-slate-800 flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-bold text-slate-800 dark:text-slate-200">Leyenda:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block"></span>
            <span>Acceso público</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span>
            <span>Bajada de botes</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-600 inline-block"></span>
            <span>Estacionamiento</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-600 inline-block"></span>
            <span>Camping</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-block"></span>
            <span>Servicios</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Referencia geolocalizada</span>
          </span>
          <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Pendiente de confirmación</span>
          </span>
        </div>
      </div>

      {/* VISTA 1: Mapa Interactivo */}
      {viewMode === 'map' && (
        <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-100 dark:bg-slate-800 relative z-0">
          <div className="h-[420px] sm:h-[500px] md:h-[600px] w-full">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapRecenter center={mapCenter} zoom={mapZoom} />

              {filteredPoints.map((point) => {
                const color = CATEGORY_COLORS[point.category] || '#2563eb';
                const icon = createCategoryIcon(color, point.isVerified);
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.coordinates[0]},${point.coordinates[1]}`;

                return (
                  <Marker
                    key={point.id}
                    position={point.coordinates}
                    icon={icon}
                  >
                    <Popup className="custom-leaflet-popup">
                      <div className="p-1 max-w-xs text-slate-900 font-sans">
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            point.isVerified
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {point.isVerified ? 'Referencia geolocalizada' : 'Pendiente de confirmación'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-semibold uppercase">
                            {POINT_CATEGORIES[point.category]?.label}
                          </span>
                        </div>

                        <h3 className="font-black text-sm text-slate-900 leading-tight mb-1">
                          {point.name}
                        </h3>

                        <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                          {point.description}
                        </p>

                        <div className="text-[11px] text-slate-500 mb-2 space-y-0.5">
                          <div><strong>Acceso:</strong> {point.fee}</div>
                          <div><strong>Revisión:</strong> {point.verificationDate}</div>
                        </div>

                        {point.facilities && point.facilities.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {point.facilities.map((fac, idx) => (
                              <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">
                                {fac}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <Link
                            to={`/diques/${point.damId}`}
                            className="text-[11px] font-bold text-blue-600 hover:underline"
                          >
                            Ver guía de dique
                          </Link>
                          <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg font-bold text-[11px] shadow-sm hover:bg-blue-700 transition-colors"
                          >
                            <Navigation2 className="h-3 w-3" />
                            <span>Cómo llegar</span>
                          </a>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </div>
        </div>
      )}

      {/* VISTA 2: Lista Accesible */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filteredPoints.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500">
              No se encontraron puntos para los filtros seleccionados.
            </div>
          ) : (
            filteredPoints.map((point) => {
              const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${point.coordinates[0]},${point.coordinates[1]}`;
              const cat = POINT_CATEGORIES[point.category];

              return (
                <div
                  key={point.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${cat?.badgeColor}`}>
                          {cat?.label}
                        </span>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {point.isVerified ? 'Referencia geolocalizada' : 'Pendiente de confirmación'}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {point.name}
                      </h3>
                    </div>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors self-start shrink-0"
                    >
                      <Navigation2 className="h-3.5 w-3.5" />
                      <span>Cómo Llegar (GPS)</span>
                    </a>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                    {point.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <div>
                      <strong>Régimen:</strong> {point.fee}
                    </div>
                    <div>
                      <strong>Coordenadas:</strong> {point.coordinates[0].toFixed(4)}, {point.coordinates[1].toFixed(4)}
                    </div>
                    <div>
                      <strong>Fuente:</strong> {point.source} ({point.verificationDate})
                    </div>
                  </div>

                  {point.facilities && point.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                      {point.facilities.map((fac, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md"
                        >
                          {fac}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Panel informativo de Fuentes Cartográficas y Políticas de Uso */}
      <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-sm">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Fuentes Cartográficas, Licencias y Alcance de Información</span>
        </div>
        <p className="leading-relaxed">
          <strong>Cartografía Base:</strong> Capa de teselas renderizada con datos de <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">OpenStreetMap</a> bajo licencia Open Database License (ODbL). El uso de teselas respeta las directrices de la <a href="https://operations.osmfoundation.org/policies/tiles/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">OpenStreetMap Foundation Tile Usage Policy</a> para consultas de navegación.
        </p>
        <p className="leading-relaxed">
          <strong>Referencia Provincial (IDECOR):</strong> Las capas de referencia hidrográfica y límites de parcelas públicas se cotejan con la <a href="https://www.idecor.gob.ar/mapas-cordoba/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Infraestructura de Datos Espaciales de Córdoba (IDECOR - Mapas Córdoba)</a> y sus geoservicios WFS.
        </p>
        <p className="leading-relaxed">
          <strong>Recopilación de Pesqueros:</strong> Los accesos, rampas y campings listados se recopilan a partir de cartografía vial pública, datos municipales y referencias documentales abiertas. No se marcan accesos privados como públicos ni se publican áreas de reserva ambiental con veda biológica.
        </p>
      </div>
    </div>
  );
}
