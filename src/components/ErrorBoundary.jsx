import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-3xl font-black text-slate-900 mb-3">¡Algo salió mal!</h1>
          <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
            Ocurrió un error inesperado. Intentá recargar la página o volvé al inicio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-200"
            >
              <RefreshCw className="h-5 w-5" />
              Recargar
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all border border-slate-200 shadow-sm"
            >
              <Home className="h-5 w-5" />
              Ir al Inicio
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
