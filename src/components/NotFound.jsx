import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Fish, Home, MapPin } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <Helmet>
        <title>Página no encontrada - Pesca Córdoba</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mb-8">
        <Fish className="h-24 w-24 text-slate-300 mx-auto mb-6" />
        <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-3">¡Se escapó el pique!</h2>
        <p className="text-slate-500 text-lg max-w-md mx-auto">
          La página que buscás no existe o fue movida. No te preocupes, volvé al río y seguí pescando.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-200"
        >
          <Home className="h-5 w-5" />
          Ir al Inicio
        </Link>
        <Link
          to="/mapa"
          className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all border border-slate-200 shadow-sm"
        >
          <MapPin className="h-5 w-5" />
          Ver el Mapa
        </Link>
      </div>
    </div>
  );
}
