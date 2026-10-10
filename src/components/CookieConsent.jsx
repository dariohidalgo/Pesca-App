import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consented = localStorage.getItem('pescacordoba_cookie_consent');
      if (!consented) {
        setVisible(true);
      }
    } catch {
      // ignorar en entornos donde localStorage no esté disponible
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('pescacordoba_cookie_consent', 'accepted');
    } catch {
      // ignorar
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside aria-label="Aviso de cookies" className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5 bg-slate-900/95 text-slate-100 backdrop-blur-md border-t border-slate-800 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Utilizamos cookies técnicas y publicitarias de terceros (como Google AdSense) para financiar el sitio y analizar visitas. Podés conocer más y configurar tus opciones en nuestra{' '}
            <Link to="/privacidad" className="text-blue-400 hover:underline font-semibold">
              Política de Privacidad
            </Link>.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-sm cursor-pointer"
          >
            Aceptar
          </button>
          <button
            onClick={() => setVisible(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Cerrar aviso"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
