import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Fish,
  BookOpen,
  Layers,
  MapPin,
  Moon,
  Waves,
  FileText,
  Menu,
  X,
  Ship,
  PlusCircle,
  Users,
  Calendar,
  MessageSquare
} from 'lucide-react';
import SearchModal, { SearchButton } from './SearchModal';
import ThemeToggle from './ThemeToggle';

export default function NavBar({ onSearchOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);

  const handleSearchToggle = useCallback(() => {
    if (onSearchOpen) {
      onSearchOpen(prev => !prev);
    } else {
      setInternalSearchOpen(prev => !prev);
    }
  }, [onSearchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchToggle();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [handleSearchToggle]);

  const navLinkClass = (path) => {
    const isActive = typeof window !== 'undefined' && (window.location.pathname === path || (path !== '/' && window.location.pathname.startsWith(path)));
    return `flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors text-xs xl:text-sm ${
      isActive
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 font-bold'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  const mobileNavLinkClass = (path) => {
    const isActive = typeof window !== 'undefined' && (window.location.pathname === path || (path !== '/' && window.location.pathname.startsWith(path)));
    return `flex items-center gap-3 px-3.5 py-3 min-h-[44px] rounded-xl font-medium transition-all text-sm ${
      isActive
        ? 'bg-blue-50 text-blue-700 font-bold scale-[0.99] dark:bg-blue-900/50 dark:text-blue-300'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
    }`;
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2 tracking-tight hover:opacity-80 transition-opacity"
            >
              <Fish className="h-8 w-8 text-blue-600" />
              Pesca<span className="text-slate-900 dark:text-white">App</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2 mr-2">
                <Link to="/" className={navLinkClass('/')}>
                  <Fish className="h-4 w-4" />
                  <span>Pronóstico</span>
                </Link>
                <Link to="/mapa" className={navLinkClass('/mapa')}>
                  <MapPin className="h-4 w-4" />
                  <span>Mapa</span>
                </Link>
                <Link to="/diques" className={navLinkClass('/diques')}>
                  <Waves className="h-4 w-4" />
                  <span>Diques</span>
                </Link>
                <Link to="/lineas" className={navLinkClass('/lineas')}>
                  <Layers className="h-4 w-4" />
                  <span>Líneas</span>
                </Link>
                <Link to="/planificador" className={navLinkClass('/planificador')}>
                  <Calendar className="h-4 w-4" />
                  <span>Planificador</span>
                </Link>
                <Link to="/partes" className={navLinkClass('/partes')}>
                  <MessageSquare className="h-4 w-4" />
                  <span>Partes</span>
                </Link>
              </div>

              <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-700 pr-2 mr-2">
                <Link to="/calendario" className={navLinkClass('/calendario')}>
                  <Moon className="h-4 w-4" />
                  <span className="hidden xl:inline">Solunar</span>
                </Link>
                <Link to="/botes" className={navLinkClass('/botes')}>
                  <Ship className="h-4 w-4" />
                  <span className="hidden xl:inline">Botes</span>
                </Link>
                <Link to="/nudos" className={navLinkClass('/nudos')}>
                  <span className="hidden 2xl:inline">Nudos</span>
                </Link>
                <Link to="/reglamento" className={navLinkClass('/reglamento')}>
                  <span className="hidden 2xl:inline">Reglamento</span>
                </Link>
                <Link to="/blog" className={navLinkClass('/blog')}>
                  <span className="hidden 2xl:inline">Blog</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <SearchButton onClick={handleSearchToggle} />
                <ThemeToggle />
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                <Link
                  to="/sumar-servicio"
                  className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-semibold transition-all text-xs border border-blue-100 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Sumar Servicio</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchButton onClick={handleSearchToggle} />
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 p-2.5 transition-colors dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation-menu"
              >
                {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-navigation-menu"
          role="region"
          aria-label="Menú de navegación móvil"
          aria-hidden={!isOpen}
          inert={!isOpen ? true : undefined}
          className={`lg:hidden fixed inset-x-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 ease-in-out ${
            isOpen ? 'top-16 opacity-100 visible' : 'top-12 opacity-0 invisible pointer-events-none'
          }`}
          style={{ zIndex: 40 }}
        >
          <div className="px-4 py-4 space-y-1.5 max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/')}>
              <Fish className="h-5 w-5 text-blue-600 shrink-0" />
              <span>Pronóstico de Pique</span>
            </Link>
            <Link to="/mapa" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/mapa')}>
              <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Mapa de Puntos Útiles</span>
            </Link>
            <Link to="/diques" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/diques')}>
              <Waves className="h-5 w-5 text-cyan-600 shrink-0" />
              <span>Guías por Dique</span>
            </Link>
            <Link to="/lineas" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/lineas')}>
              <Layers className="h-5 w-5 text-indigo-600 shrink-0" />
              <span>Tutoriales de Líneas</span>
            </Link>
            <Link to="/planificador" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/planificador')}>
              <Calendar className="h-5 w-5 text-amber-600 shrink-0" />
              <span>Planificador de Salida</span>
            </Link>
            <Link to="/partes" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/partes')}>
              <MessageSquare className="h-5 w-5 text-rose-600 shrink-0" />
              <span>Partes de Pesca</span>
            </Link>
            <div className="pt-2 pb-1 border-t border-slate-200 dark:border-slate-800 my-2" />
            <Link to="/calendario" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/calendario')}>
              <Moon className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Calendario Solunar</span>
            </Link>
            <Link to="/botes" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/botes')}>
              <Ship className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Guías y Botes</span>
            </Link>
            <Link to="/nudos" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/nudos')}>
              <Layers className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Catálogo de Nudos</span>
            </Link>
            <Link to="/reglamento" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/reglamento')}>
              <FileText className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Reglamento y Permisos</span>
            </Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/blog')}>
              <BookOpen className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Blog de Pesca</span>
            </Link>
            <Link to="/sumar-servicio" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/sumar-servicio')}>
              <PlusCircle className="h-5 w-5 text-blue-600 shrink-0" />
              <span>Sumar Servicio</span>
            </Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/nosotros')}>
              <Users className="h-5 w-5 text-slate-500 shrink-0" />
              <span>Sobre Nosotros</span>
            </Link>
          </div>
        </div>
      </nav>

      <SearchModal
        isOpen={onSearchOpen ? false : internalSearchOpen}
        onClose={() => setInternalSearchOpen(false)}
      />
    </>
  );
}