export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 rounded-lg"
          style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
        />
      ))}
    </div>
  );
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="h-6 bg-slate-200 rounded-lg w-3/4" />
            <div className="h-5 bg-slate-200 rounded-full w-16" />
          </div>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-slate-200 rounded-lg w-full" />
            <div className="h-4 bg-slate-200 rounded-lg w-5/6" />
          </div>
          <div className="mt-6">
            <div className="h-10 bg-slate-200 rounded-xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function WeatherSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-xl mt-6 animate-pulse">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div>
          <div className="h-8 bg-slate-200 rounded-lg w-56 mb-2" />
          <div className="h-4 bg-slate-200 rounded-lg w-72" />
        </div>
        <div className="h-12 bg-slate-200 rounded-xl w-64" />
      </div>
      <div className="h-32 bg-slate-200 rounded-2xl mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
