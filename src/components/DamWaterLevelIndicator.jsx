import React from 'react';
import { Waves } from 'lucide-react';
import { getDamWaterLevel, evaluateWaterLevel, STATUS_STYLES } from '../data/damWaterLevels';

/**
 * Indicador visual compacto en Tailwind del nivel de cota actual vs. nivel del vertedero.
 * 
 * Colores semánticos según la bajante respecto al vertedero:
 * - Verde: bajante < 2m (diff >= -2.00m o sobre vertedero)
 * - Amarillo: bajante entre 2m y 4m (-4.00m <= diff < -2.00m)
 * - Naranja: bajante > 4m (diff < -4.00m)
 */
export default function DamWaterLevelIndicator({
  damId,
  levelData,
  currentLevel,
  spillwayLevel,
  showBar = false,
  size = 'sm',
  variant = 'badge', // 'badge' | 'bar' | 'compact' | 'card'
  className = ''
}) {
  // Resolver los datos del nivel
  let resolved = levelData;

  if (!resolved && currentLevel !== undefined && spillwayLevel !== undefined) {
    resolved = evaluateWaterLevel(currentLevel, spillwayLevel);
  } else if (!resolved && damId) {
    resolved = getDamWaterLevel(damId);
  }

  // Fallback si no hay datos disponibles
  if (!resolved || resolved.status === 'gray' || resolved.diff === null) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES.gray.badge} ${className}`}
        title="Sin medición hidrométrica oficial disponible"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES.gray.dot}`} />
        <span>Cota: Sin dato oficial</span>
      </div>
    );
  }

  const { label, diffFormatted, currentLevel: curr, spillwayLevel: spill, percentage, styles } = resolved;

  // Variantes de tamaño para texto e iconos
  const sizeClasses = {
    xs: {
      badge: 'text-[11px] px-2 py-0.5',
      icon: 'h-3 w-3',
      dot: 'h-1.5 w-1.5',
      bar: 'h-1'
    },
    sm: {
      badge: 'text-xs px-2.5 py-1',
      icon: 'h-3.5 w-3.5',
      dot: 'h-2 w-2',
      bar: 'h-1.5'
    },
    md: {
      badge: 'text-sm px-3 py-1.5',
      icon: 'h-4 w-4',
      dot: 'h-2.5 w-2.5',
      bar: 'h-2'
    }
  }[size] || {
    badge: 'text-xs px-2.5 py-1',
    icon: 'h-3.5 w-3.5',
    dot: 'h-2 w-2',
    bar: 'h-1.5'
  };

  // Solo Badge compacto
  if (variant === 'badge' && !showBar) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border font-semibold shadow-2xs transition-colors ${sizeClasses.badge} ${styles.badge} ${className}`}
        title={`Cota actual: ${curr.toFixed(2)}m | Vertedero: ${spill.toFixed(2)}m (${percentage}% de llenado)`}
      >
        <span className={`rounded-full shrink-0 animate-pulse ${sizeClasses.dot} ${styles.dot}`} />
        <span className="whitespace-nowrap">{label}</span>
      </div>
    );
  }

  // Tarjeta / Vista extendida con barra de progreso
  if (variant === 'card') {
    return (
      <div className={`rounded-2xl border p-3 sm:p-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs ${className}`}>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5">
            <Waves className={`h-4 w-4 ${styles.text}`} />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Nivel Hidrométrico
            </span>
          </div>
          <div className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClasses.badge} ${styles.badge}`}>
            <span className={`rounded-full shrink-0 ${sizeClasses.dot} ${styles.dot}`} />
            <span>{diffFormatted}</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between text-xs mb-1">
          <span className="text-slate-600 dark:text-slate-400">
            Actual: <strong className="text-slate-900 dark:text-white font-bold">{curr.toFixed(2)} m</strong>
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Vertedero: {spill.toFixed(2)} m
          </span>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-2 mb-1.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${styles.bar}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Llenado de cota: ${percentage}%`}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
          <span>{label}</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
      </div>
    );
  }

  // Modo 'compact' o 'bar' (Badge + Mini barra de progreso)
  return (
    <div className={`inline-flex flex-col gap-1 w-full max-w-xs ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClasses.badge} ${styles.badge}`}
          title={`Cota actual: ${curr.toFixed(2)}m | Vertedero: ${spill.toFixed(2)}m`}
        >
          <span className={`rounded-full shrink-0 ${sizeClasses.dot} ${styles.dot}`} />
          <span className="whitespace-nowrap">{label}</span>
        </div>
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
          {percentage}%
        </span>
      </div>

      {(showBar || variant === 'bar' || variant === 'compact') && (
        <div className={`w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ${sizeClasses.bar}`}>
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${styles.bar}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Llenado: ${percentage}%`}
          />
        </div>
      )}
    </div>
  );
}

