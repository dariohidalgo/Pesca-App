import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MoveHorizontal,
  Layers
} from 'lucide-react';

export default function RigDiagram({ rigId, className = '', showControls = true }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const expandBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  const isThumbnail = !showControls || className.includes('pointer-events-none');

  const handleOpenExpanded = () => {
    setIsExpanded(true);
    setZoomLevel(1);
  };

  const handleCloseExpanded = useCallback(() => {
    setIsExpanded(false);
    setTimeout(() => {
      expandBtnRef.current?.focus();
    }, 0);
  }, []);

  // Permitir apertura directa mediante parámetro URL (?expand=true)
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('expand') === 'true') {
      setIsExpanded(true);
    }
  }, []);

  // Bloquear desplazamiento del body mientras el visor está abierto
  useEffect(() => {
    if (!isExpanded) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isExpanded]);

  // Foco inicial dentro del visor al abrir
  useEffect(() => {
    if (!isExpanded) return;

    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  // Atajos de teclado: Escape para cerrar y trampa de foco (Tab / Shift+Tab)
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleCloseExpanded();
        return;
      }

      if (e.key === 'Tab') {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !dialogRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, handleCloseExpanded]);

  const renderSvg = () => {
    switch (rigId) {
      case 'flote-pejerrey-tres-boyas':
        return <FlotePejerreySvg />;
      case 'paternoster-pejerrey':
        return <PaternosterSvg />;
      case 'fondo-carpa-feeder':
        return <FondoCarpaFeederSvg />;
      case 'fondo-pesado-tararira-bagre':
        return <FondoTarariraSvg />;
      case 'flote-boya-plop':
        return <BoyaPlopSvg />;
      default:
        return <FlotePejerreySvg />;
    }
  };

  if (isThumbnail) {
    return (
      <div className={`w-full overflow-hidden rounded-2xl bg-slate-900 p-3 text-white shadow-inner ${className}`}>
        {renderSvg()}
      </div>
    );
  }

  return (
    <>
      <div className={`relative rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-inner overflow-hidden ${className}`}>
        {/* Barra superior de controles del diagrama */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 bg-slate-950/70 border-b border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MoveHorizontal className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Desplazamiento horizontal disponible</span>
            <span className="sm:hidden font-medium">Deslizá para explorar el montaje</span>
          </div>

          <button
            ref={expandBtnRef}
            type="button"
            onClick={handleOpenExpanded}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Ampliar esquema del montaje"
          >
            <Maximize2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Ampliar esquema</span>
          </button>
        </div>

        {/* Contenedor del esquema con scroll horizontal aislado */}
        <div
          className="w-full overflow-x-auto overscroll-contain p-4 touch-pan-x"
          tabIndex={0}
          aria-label="Diagrama técnico del montaje con desplazamiento horizontal disponible."
        >
          {renderSvg()}
        </div>

        {/* Indicador inferior para móviles */}
        <div className="sm:hidden flex items-center justify-center gap-2 py-1.5 bg-slate-950/40 text-[11px] text-slate-400 border-t border-slate-800/50">
          <span>← Deslizá a los lados para recorrer el esquema completo →</span>
        </div>
      </div>

      {/* Modal / Vista Ampliada Interactiva */}
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Esquema técnico ampliado del montaje"
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6"
          onClick={handleCloseExpanded}
        >
          <div
            ref={dialogRef}
            className="relative flex flex-col w-full h-full max-w-6xl mx-auto bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra de herramientas adaptable */}
            <div className="shrink-0 w-full min-w-0 bg-slate-950 border-b border-slate-800 px-3 py-2.5 sm:px-5 sm:py-3 overflow-hidden">
              <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 sm:gap-4">
                {/* Título */}
                <div className="order-1 flex items-center gap-2 min-w-0 max-w-[calc(100%-52px)] sm:max-w-none">
                  <Layers className="h-5 w-5 text-blue-400 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-bold text-white truncate">
                    Esquema Técnico Ampliado
                  </span>
                </div>

                {/* Botón cerrar: order-2 en móvil (junto al título en fila 1), order-3 en sm */}
                <div className="order-2 sm:order-3 sm:pl-2 sm:border-l sm:border-slate-800 shrink-0">
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={handleCloseExpanded}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-red-900/60 active:bg-red-900 hover:text-red-200 text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
                    aria-label="Cerrar esquema ampliado"
                    title="Cerrar vista ampliada (ESC)"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Controles de zoom: order-3 en móvil (w-full para ocupar segunda fila), order-2 en sm (w-auto) */}
                <div className="order-3 sm:order-2 w-full sm:w-auto flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 pt-1 sm:pt-0 border-t border-slate-800/60 sm:border-t-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => setZoomLevel(prev => Math.max(0.75, Number((prev - 0.25).toFixed(2))))}
                      disabled={zoomLevel <= 0.75}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Reducir zoom"
                      title="Reducir zoom"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>

                    <span
                      data-testid="zoom-level"
                      className="text-xs font-mono font-bold text-slate-300 min-w-[44px] text-center"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      {Math.round(zoomLevel * 100)}%
                    </span>

                    <button
                      type="button"
                      onClick={() => setZoomLevel(prev => Math.min(2.5, Number((prev + 0.25).toFixed(2))))}
                      disabled={zoomLevel >= 2.5}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 disabled:opacity-40 text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Aumentar zoom"
                      title="Aumentar zoom"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Restablecer zoom al 100%"
                    title="Restablecer tamaño original"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>100%</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contenedor del visor interactivo con scroll bidireccional y zoom */}
            <div
              className="flex-1 w-full overflow-auto overscroll-contain p-4 sm:p-8 flex items-center justify-center bg-slate-900 touch-pan-x touch-pan-y"
              tabIndex={0}
              aria-label="Área de desplazamiento del esquema técnico"
            >
              <div
                className="transition-transform duration-150 origin-top flex justify-center min-w-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {renderSvg()}
              </div>
            </div>

            {/* Pie informativo */}
            <div className="shrink-0 px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Deslizá para explorar medidas y componentes o ajustá el zoom.</span>
              <span className="hidden sm:inline">Presioná ESC para cerrar</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 1. Línea de flote 3 boyas
function FlotePejerreySvg() {
  return (
    <svg
        viewBox="0 0 920 340"
        className="w-full min-w-[700px] h-auto"
        role="img"
        aria-label="Diagrama esquemático de línea de flote de tres boyas para pejerrey"
      >
        <title>Esquema: Línea de flote clásica de 3 boyas</title>
        <desc>Montaje con pilotín, madre de nailon 0.30 mm con 3 boyas cometa separadas 80 cm y brazoladas escalonadas de 25, 40 y 55 cm.</desc>

        {/* Fondo sutil con cuadrícula y agua */}
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0369a1" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="buoy1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="buoy2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
          <linearGradient id="buoy3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>

        {/* Superficie del agua */}
        <path d="M 0,110 C 230,105 460,115 690,108 C 800,105 870,112 920,110 L 920,340 L 0,340 Z" fill="url(#waterGrad)" />
        <line x1="0" y1="110" x2="920" y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <text x="30" y="100" fill="#38bdf8" fontSize="12" fontWeight="600">Superficie del agua</text>

        {/* Línea hacia el reel */}
        <path d="M 40,75 L 120,110" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 3" />
        <circle cx="40" cy="75" r="4" fill="#94a3b8" />
        <text x="20" y="60" fill="#cbd5e1" fontSize="12" fontWeight="bold">Hacia la caña / reel</text>

        {/* Pilotín */}
        <circle cx="120" cy="110" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
        <text x="95" y="135" fill="#fcd34d" fontSize="11" fontWeight="600">Pilotín giratorio</text>

        {/* Madre de la línea */}
        <line x1="120" y1="110" x2="880" y2="110" stroke="#f8fafc" strokeWidth="3" />
        <text x="470" y="70" fill="#f8fafc" fontSize="14" fontWeight="bold" textAnchor="middle">
          Línea Madre: Monofilamento 0.30 - 0.35 mm (Largo total: 2.60 m)
        </text>

        {/* Cota de distancia entre boyas */}
        <line x1="220" y1="40" x2="500" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="220" y1="35" x2="220" y2="45" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="500" y1="35" x2="500" y2="45" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="360" y="32" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">Separación: 80 cm</text>

        <line x1="500" y1="40" x2="780" y2="40" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="780" y1="35" x2="780" y2="45" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="640" y="32" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">Separación: 80 cm</text>

        {/* Boya 1 (Fucsia) */}
        <g transform="translate(220, 110)">
          <ellipse cx="0" cy="0" rx="35" ry="12" fill="url(#buoy1)" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#1e293b" />
          <text x="0" y="-18" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">Boya 1</text>
          {/* Rotor y perlita */}
          <circle cx="38" cy="0" r="5" fill="#38bdf8" />
          {/* Brazolada 1 (55 cm - más larga) */}
          <line x1="38" y1="0" x2="38" y2="170" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          {/* Munición de plomo */}
          <circle cx="38" cy="140" r="3.5" fill="#94a3b8" />
          {/* Anzuelo */}
          <path d="M 38,170 C 38,185 50,185 50,175 L 50,165" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="165" r="2" fill="#ef4444" />
          <text x="48" y="145" fill="#cbd5e1" fontSize="10">plomito 0.5g</text>
          <text x="48" y="180" fill="#f8fafc" fontSize="11" fontWeight="bold">Anzuelo N° 4</text>
          <text x="48" y="195" fill="#fdba74" fontSize="11">Brazolada 55 cm</text>
        </g>

        {/* Boya 2 (Naranja) */}
        <g transform="translate(500, 110)">
          <ellipse cx="0" cy="0" rx="35" ry="12" fill="url(#buoy2)" stroke="#c2410c" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#1e293b" />
          <text x="0" y="-18" fill="#fed7aa" fontSize="12" fontWeight="bold" textAnchor="middle">Boya 2</text>
          <circle cx="38" cy="0" r="5" fill="#38bdf8" />
          {/* Brazolada 2 (40 cm) */}
          <line x1="38" y1="0" x2="38" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="38" cy="100" r="3.5" fill="#94a3b8" />
          <path d="M 38,125 C 38,140 50,140 50,130 L 50,120" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="120" r="2" fill="#ef4444" />
          <text x="48" y="135" fill="#f8fafc" fontSize="11" fontWeight="bold">Anzuelo N° 4</text>
          <text x="48" y="150" fill="#fdba74" fontSize="11">Brazolada 40 cm</text>
        </g>

        {/* Boya 3 (Amarilla - puntera) */}
        <g transform="translate(780, 110)">
          <ellipse cx="0" cy="0" rx="35" ry="12" fill="url(#buoy3)" stroke="#a16207" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="4" fill="#1e293b" />
          <text x="0" y="-18" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">Boya 3 (Puntera)</text>
          <circle cx="38" cy="0" r="5" fill="#38bdf8" />
          {/* Brazolada 3 (25 cm - corta) */}
          <line x1="38" y1="0" x2="38" y2="80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 38,80 C 38,95 50,95 50,85 L 50,75" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="50" cy="75" r="2" fill="#ef4444" />
          <text x="48" y="90" fill="#f8fafc" fontSize="11" fontWeight="bold">Anzuelo N° 4</text>
          <text x="48" y="105" fill="#fdba74" fontSize="11">Brazolada 25 cm</text>
        </g>

        {/* Remate final */}
        <circle cx="850" cy="110" r="6" fill="#64748b" />
        <text x="850" y="135" fill="#94a3b8" fontSize="11" textAnchor="middle">Esmerillón final</text>

        {/* Leyenda de nudos vinculados */}
        <rect x="50" y="270" width="820" height="50" rx="10" fill="#1e293b" stroke="#334155" />
        <text x="70" y="300" fill="#94a3b8" fontSize="13">
          <tspan fill="#38bdf8" fontWeight="bold">Nudos recomendados: </tspan>
          Nudo Palomar (anzuelos y esmerillón del reel) • Medio Barril asegurado (brazoladas al rotor) • Nudo Uni (topes corredizos)
        </text>
      </svg>
  );
}

// 2. Línea Paternoster
function PaternosterSvg() {
  return (
    <svg
        viewBox="0 0 760 520"
        className="w-full min-w-[580px] h-auto"
        role="img"
        aria-label="Diagrama esquemático de línea Paternoster regulable para profundidad"
      >
        <title>Esquema: Línea Paternoster regulable para pejerrey</title>
        <desc>Boya zanahoria con tope corredizo, madre vertical de 3 a 5 metros, 3 bajadas horizontales de 20 cm y plomo con fusible.</desc>

        <defs>
          <linearGradient id="deepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#082f49" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <rect x="0" y="120" width="760" height="400" fill="url(#deepGrad)" />
        <line x1="0" y1="120" x2="760" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <text x="30" y="110" fill="#38bdf8" fontSize="12" fontWeight="600">Superficie del lago</text>

        {/* Línea hacia el reel con nudo tope */}
        <line x1="280" y1="20" x2="280" y2="100" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
        <text x="180" y="40" fill="#cbd5e1" fontSize="12">Línea del reel (0.26 mm)</text>

        {/* Nudo de hilo tope corredizo */}
        <circle cx="280" cy="60" r="5" fill="#f43f5e" />
        <text x="140" y="65" fill="#fda4af" fontSize="12" fontWeight="bold">Nudo corredizo (Uni)</text>
        <text x="110" y="80" fill="#94a3b8" fontSize="10">Gradúa profundidad de 2 a 12 m</text>

        {/* Perlita de freno */}
        <circle cx="280" cy="85" r="4" fill="#facc15" />

        {/* Boya zanahoria */}
        <g transform="translate(280, 120)">
          <path d="M -12,-35 L 12,-35 L 7,30 L -7,30 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          <line x1="0" y1="-45" x2="0" y2="38" stroke="#f8fafc" strokeWidth="2" />
          <circle cx="0" cy="-45" r="3" fill="#e2e8f0" />
          <circle cx="0" cy="38" r="3" fill="#e2e8f0" />
          <text x="35" y="0" fill="#fdba74" fontSize="13" fontWeight="bold">Boya Paternoster / Zanahoria</text>
          <text x="35" y="16" fill="#94a3b8" fontSize="11">Cuerpo pasante o boyarín deslizante</text>
        </g>

        {/* Columna vertical de la madre */}
        <line x1="280" y1="160" x2="280" y2="470" stroke="#f8fafc" strokeWidth="3" />
        <text x="295" y="185" fill="#f8fafc" fontSize="12" fontWeight="bold">Madre vertical: Nailon 0.28 - 0.32 mm</text>

        {/* Anzuelo 1 (superior) */}
        <g transform="translate(280, 220)">
          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
          <line x1="0" y1="0" x2="110" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 110,0 C 122,0 122,12 114,12 L 105,12" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <text x="130" y="5" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo N° 4 o 5</text>
          <text x="130" y="20" fill="#fdba74" fontSize="11">Brazolada 20 cm (Fluorocarbon 0.20)</text>
          <text x="-120" y="5" fill="#94a3b8" fontSize="11">Rotor micro / perlitas</text>
        </g>

        {/* Separación 80 cm */}
        <line x1="260" y1="220" x2="260" y2="310" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="255" y1="220" x2="265" y2="220" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="255" y1="310" x2="265" y2="310" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="210" y="270" fill="#38bdf8" fontSize="11" fontWeight="bold">80 cm</text>

        {/* Anzuelo 2 (medio) */}
        <g transform="translate(280, 310)">
          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
          <line x1="0" y1="0" x2="110" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 110,0 C 122,0 122,12 114,12 L 105,12" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <text x="130" y="5" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo N° 4 o 5</text>
          <text x="130" y="20" fill="#fdba74" fontSize="11">Brazolada 20 cm</text>
        </g>

        {/* Separación 80 cm */}
        <line x1="260" y1="310" x2="260" y2="400" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="255" y1="310" x2="265" y2="310" stroke="#38bdf8" strokeWidth="1.5" />
        <line x1="255" y1="400" x2="265" y2="400" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="210" y="360" fill="#38bdf8" fontSize="11" fontWeight="bold">80 cm</text>

        {/* Anzuelo 3 (inferior) */}
        <g transform="translate(280, 400)">
          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
          <line x1="0" y1="0" x2="110" y2="0" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 2" />
          <path d="M 110,0 C 122,0 122,12 114,12 L 105,12" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <text x="130" y="5" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo N° 4 o 5</text>
          <text x="130" y="20" fill="#fdba74" fontSize="11">Brazolada 20 cm</text>
        </g>

        {/* Esmerillón final y fusible */}
        <circle cx="280" cy="450" r="5" fill="#64748b" />
        <text x="295" y="453" fill="#94a3b8" fontSize="11">Esmerillón de unión</text>
        <line x1="280" y1="450" x2="280" y2="480" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="170" y="475" fill="#fca5a5" fontSize="11" fontWeight="bold">Fusible: Nailon fino 0.20 mm</text>

        {/* Plomada gota */}
        <g transform="translate(280, 495)">
          <path d="M 0,-15 C 10,-5 12,10 0,15 C -12,10 -10,-5 0,-15 Z" fill="#64748b" stroke="#475569" strokeWidth="2" />
          <text x="25" y="5" fill="#e2e8f0" fontSize="12" fontWeight="bold">Plomada perita 20 - 35 g</text>
        </g>
      </svg>
  );
}

// 3. Línea de Fondo con Resorte Feeder (Carpa)
function FondoCarpaFeederSvg() {
  return (
    <svg
        viewBox="0 0 840 320"
        className="w-full min-w-[650px] h-auto"
        role="img"
        aria-label="Diagrama esquemático de línea de fondo con resorte cebador para carpa"
      >
        <title>Esquema: Línea Feeder para Carpa</title>
        <desc>Montaje de fondo con resorte cebador pasante cargado con masa, perlitas de goma y brazolada corta con maíz.</desc>

        {/* Lecho del dique */}
        <rect x="0" y="210" width="840" height="110" fill="#33251a" />
        <line x1="0" y1="210" x2="840" y2="210" stroke="#78350f" strokeWidth="3" />
        <text x="30" y="240" fill="#d97706" fontSize="12" fontWeight="600">Lecho del lago / fondo de barro</text>

        {/* Línea hacia el reel */}
        <line x1="40" y1="120" x2="140" y2="170" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="20" y="105" fill="#cbd5e1" fontSize="12" fontWeight="bold">Línea del reel (0.35 - 0.40 mm)</text>

        {/* Esmerillón superior */}
        <g transform="translate(140, 170)">
          <circle cx="0" cy="0" r="6" fill="#38bdf8" />
          <text x="-40" y="25" fill="#38bdf8" fontSize="11">Esmerillón N° 6 (Palomar)</text>
        </g>

        {/* Madre del aparejo */}
        <line x1="140" y1="170" x2="580" y2="170" stroke="#f8fafc" strokeWidth="3.5" />
        <text x="340" y="130" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Madre del aparejo: Nailon 0.45 mm (60 a 80 cm)
        </text>

        {/* Perlita protectora 1 */}
        <circle cx="280" cy="170" r="7" fill="#ef4444" />

        {/* Resorte cebador con bola de masa */}
        <g transform="translate(360, 170)">
          <ellipse cx="0" cy="0" rx="60" ry="32" fill="#b45309" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />
          {/* Espirales del resorte visibles */}
          <path d="M -45,-20 Q -30,0 -45,20 M -15,-25 Q 0,0 -15,25 M 15,-25 Q 30,0 15,25 M 45,-20 Q 60,0 45,20" fill="none" stroke="#fde047" strokeWidth="3" />
          <text x="0" y="-40" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">Resorte cebador (35 - 50 g)</text>
          <text x="0" y="5" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">Bola de masa</text>
          <text x="0" y="48" fill="#cbd5e1" fontSize="11" textAnchor="middle">Maíz molido, polenta y vainilla</text>
        </g>

        {/* Perlita protectora 2 */}
        <circle cx="440" cy="170" r="7" fill="#ef4444" />
        <text x="440" y="135" fill="#fca5a5" fontSize="11" textAnchor="middle">Perlita de goma</text>

        {/* Esmerillón de tope */}
        <g transform="translate(580, 170)">
          <circle cx="0" cy="0" r="6" fill="#38bdf8" />
          <text x="0" y="-15" fill="#38bdf8" fontSize="11" textAnchor="middle">Esmerillón de tope</text>
        </g>

        {/* Brazolada corta */}
        <g transform="translate(580, 170)">
          <line x1="0" y1="0" x2="140" y2="25" stroke="#f59e0b" strokeWidth="2.5" />
          <text x="70" y="45" fill="#fde047" fontSize="12" fontWeight="bold">Brazolada corta: 12 - 15 cm</text>
          <text x="70" y="60" fill="#94a3b8" fontSize="10">Dacrón trenzado o nylon duro 0.35</text>

          {/* Anzuelo y maíz */}
          <g transform="translate(140, 25)">
            <path d="M 0,0 C 15,0 18,18 5,18 L 0,18" fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <circle cx="5" cy="5" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="12" cy="7" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <text x="25" y="10" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo Wide Gape N° 1/0</text>
            <text x="25" y="25" fill="#facc15" fontSize="11">Maíz remojado o masa</text>
          </g>
        </g>
      </svg>
  );
}

// 4. Línea de Fondo Pesada con Líder de Acero (Tararira / Bagre)
function FondoTarariraSvg() {
  return (
    <svg
        viewBox="0 0 820 280"
        className="w-full min-w-[620px] h-auto"
        role="img"
        aria-label="Diagrama esquemático de línea de fondo con plomada pasante y cable de acero para tararira"
      >
        <title>Esquema: Línea de fondo con líder de acero</title>
        <desc>Montaje con plomo oliva pasante, perlita de choque, esmerillón reforzado y líder de acero de 20 cm para peces predadores.</desc>

        <rect x="0" y="180" width="820" height="100" fill="#1e293b" />
        <line x1="0" y1="180" x2="820" y2="180" stroke="#334155" strokeWidth="2" />
        <text x="30" y="210" fill="#94a3b8" fontSize="12">Fondo del dique con vegetación sumergida</text>

        {/* Línea hacia el reel */}
        <line x1="30" y1="130" x2="160" y2="130" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="30" y="110" fill="#cbd5e1" fontSize="12">Desde la caña (Nylon 0.40 mm)</text>

        {/* Plomada oliva pasante */}
        <g transform="translate(230, 130)">
          <ellipse cx="0" cy="0" rx="35" ry="16" fill="#64748b" stroke="#475569" strokeWidth="2" />
          <line x1="-35" y1="0" x2="35" y2="0" stroke="#0f172a" strokeWidth="2" />
          <text x="0" y="-24" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">Plomada oliva pasante (30 - 45 g)</text>
          <text x="0" y="32" fill="#94a3b8" fontSize="10" textAnchor="middle">Corre libre por la madre</text>
        </g>

        {/* Línea madre a través de la plomada */}
        <line x1="160" y1="130" x2="330" y2="130" stroke="#f8fafc" strokeWidth="3" />

        {/* Perlita de goma */}
        <circle cx="340" cy="130" r="7" fill="#ef4444" />
        <text x="340" y="105" fill="#fca5a5" fontSize="10" textAnchor="middle">Perlita antichoque</text>

        {/* Esmerillón */}
        <circle cx="390" cy="130" r="7" fill="#38bdf8" />
        <text x="390" y="160" fill="#38bdf8" fontSize="11" textAnchor="middle">Esmerillón (Nudo Palomar)</text>

        {/* Líder de acero */}
        <line x1="397" y1="130" x2="620" y2="130" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="6 2" />
        <text x="510" y="110" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Líder de acero: 15 - 20 lb (Largo 25 cm)
        </text>
        <text x="510" y="150" fill="#cbd5e1" fontSize="11" textAnchor="middle">
          Evita cortes por dientes filosos
        </text>

        {/* Tubito de crimpado */}
        <rect x="405" y="127" width="12" height="6" fill="#64748b" />
        <rect x="605" y="127" width="12" height="6" fill="#64748b" />

        {/* Anzuelo y carnada */}
        <g transform="translate(620, 130)">
          <path d="M 0,0 C 25,0 30,30 8,30 L 0,30" fill="none" stroke="#e2e8f0" strokeWidth="3.5" />
          <polygon points="0,30 5,25 0,20" fill="#e2e8f0" />
          {/* Filete de carnada */}
          <ellipse cx="20" cy="15" rx="18" ry="7" fill="#f87171" opacity="0.85" />
          <text x="38" y="15" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo Mustad 3/0</text>
          <text x="38" y="32" fill="#fca5a5" fontSize="11">Filete de pejerrey o carpa</text>
        </g>
      </svg>
  );
}

// 5. Línea de Flote con Boya Plop
function BoyaPlopSvg() {
  return (
    <svg
        viewBox="0 0 760 300"
        className="w-full min-w-[580px] h-auto"
        role="img"
        aria-label="Diagrama esquemático de línea de flote con boya plop para tarariras"
      >
        <title>Esquema: Boya Plop para tarariras</title>
        <desc>Montaje con boya cóncava sonajera que produce sonido plop en superficie, bajada de acero y anzuelo con carnada blanca.</desc>

        <path d="M 0,110 C 200,105 400,115 600,108 L 760,110 L 760,300 L 0,300 Z" fill="#0369a1" fillOpacity="0.25" />
        <line x1="0" y1="110" x2="760" y2="110" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        <text x="30" y="95" fill="#38bdf8" fontSize="12" fontWeight="600">Superficie del agua</text>

        {/* Línea hacia el reel */}
        <line x1="40" y1="60" x2="210" y2="105" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="20" y="45" fill="#cbd5e1" fontSize="12" fontWeight="bold">Desde el reel (Nylon 0.40 o Multi 0.22)</text>

        {/* Boya Plop */}
        <g transform="translate(230, 110)">
          {/* Cuerpo de la boya */}
          <path d="M -20,-18 L 40,-15 C 55,0 40,15 40,15 L -20,18 C -30,0 -30,0 -20,-18 Z" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          {/* Boca cóncava que genera el plop */}
          <path d="M -20,-18 C -14,0 -14,0 -20,18" fill="#7c2d12" stroke="#ea580c" strokeWidth="2" />
          <circle cx="10" cy="0" r="4" fill="#fef08a" />
          <text x="15" y="-26" fill="#fdba74" fontSize="13" fontWeight="bold" textAnchor="middle">Boya Plop con sonajero</text>
          <text x="-40" y="3" fill="#38bdf8" fontSize="11" fontWeight="bold">« ¡PLOP! »</text>

          {/* Ojal inferior */}
          <circle cx="45" cy="0" r="4" fill="#38bdf8" />
        </g>

        {/* Cable de acero descendente */}
        <g transform="translate(275, 110)">
          <line x1="0" y1="0" x2="160" y2="70" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 2" />
          <text x="80" y="25" fill="#f8fafc" fontSize="12" fontWeight="bold">Líder de acero (25 cm)</text>
          <text x="80" y="40" fill="#94a3b8" fontSize="10">Resiste la mandíbula de la tararira</text>

          {/* Anzuelo y tira blanca */}
          <g transform="translate(160, 70)">
            <path d="M 0,0 C 18,0 22,25 5,25 L 0,25" fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <polygon points="0,25 4,20 0,16" fill="#e2e8f0" />
            {/* Carnada blanca ondeando */}
            <path d="M 10,12 C 30,5 50,20 75,10 C 60,30 35,22 10,18 Z" fill="#f8fafc" opacity="0.9" />
            <text x="85" y="15" fill="#f8fafc" fontSize="12" fontWeight="bold">Anzuelo N° 3/0</text>
            <text x="85" y="30" fill="#fde047" fontSize="11">Tira de carnada blanca o rana de goma</text>
          </g>
        </g>
      </svg>
  );
}
