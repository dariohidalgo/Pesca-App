import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Fish, BookOpen, Layers, MapPin, Moon, Waves, FileText, Mail, Menu, X, Ship, PlusCircle, Users } from 'lucide-react';


import WeatherDashboard from './components/WeatherDashboard';
import KnotsCatalog from './components/KnotsCatalog';
import BlogPost from './components/BlogPost';
import BlogList from './components/BlogList';
import AdBanner from './components/AdBanner';
import FishingMap from './components/FishingMap';
import SolunarCalendar from './components/SolunarCalendar';
import DamLevels from './components/DamLevels';
import FishingRules from './components/FishingRules';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import BoatRentals from './components/BoatRentals';
import ServiceForm from './components/ServiceForm';
import AboutUs from './components/AboutUs';
import NotFound from './components/NotFound';
import SchemaOrg from './components/SchemaOrg';
import ThemeToggle from './components/ThemeToggle';
import SearchModal, { SearchButton } from './components/SearchModal';


function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-3.5 py-2 rounded-lg font-medium transition-colors ${isActive
      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      }`;
  };

  const mobileNavLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all ${isActive
      ? 'bg-blue-50 text-blue-700 scale-[0.98] dark:bg-blue-900/50 dark:text-blue-300'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
      }`;
  };

  return (
    <>
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2 tracking-tight hover:opacity-80 transition-opacity">
              <Fish className="h-8 w-8 text-blue-600" />
              Pesca<span className="text-slate-900 dark:text-white">App</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-3">
              <div className="flex items-center gap-1 xl:gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-3 mr-3">
                <Link to="/" className={navLinkClass('/')}>
                  <Fish className="h-4 w-4" />
                  <span className="hidden xl:inline text-sm">Pronóstico</span>
                </Link>
                <Link to="/mapa" className={navLinkClass('/mapa')}>
                  <MapPin className="h-4 w-4" />
                  <span className="hidden xl:inline text-sm">Mapa</span>
                </Link>
                <Link to="/calendario" className={navLinkClass('/calendario')}>
                  <Moon className="h-4 w-4" />
                  <span className="hidden xl:inline text-sm">Solunar</span>
                </Link>
              </div>

              <div className="flex items-center gap-1 xl:gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-3 mr-3">
                <Link to="/diques" className={navLinkClass('/diques')}>
                  <Waves className="h-4 w-4" />
                  <span className="hidden 2xl:inline text-sm">Diques</span>
                </Link>
                <Link to="/botes" className={navLinkClass('/botes')}>
                  <Ship className="h-4 w-4" />
                  <span className="hidden 2xl:inline text-sm">Botes</span>
                </Link>
                <Link to="/nudos" className={navLinkClass('/nudos')}>
                  <Layers className="h-4 w-4" />
                  <span className="hidden 2xl:inline text-sm">Nudos</span>
                </Link>
                <Link to="/reglamento" className={navLinkClass('/reglamento')}>
                  <FileText className="h-4 w-4" />
                  <span className="hidden 2xl:inline text-sm">Reglamento</span>
                </Link>
                <Link to="/blog" className={navLinkClass('/blog')}>
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden 2xl:inline text-sm">Blog</span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <SearchButton onClick={() => setSearchOpen(true)} />
                <ThemeToggle />
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700" />
                <Link to="/sumar-servicio" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-semibold transition-all text-sm border border-blue-100 shadow-sm dark:bg-blue-900/50 dark:text-blue-300 dark:hover:bg-blue-900 dark:border-blue-800">
                  <PlusCircle className="h-4 w-4" />
                  <span>Sumar Servicio</span>
                </Link>
                <Link to="/nosotros" className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-xl font-semibold transition-all text-sm shadow-md shadow-slate-200 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white dark:shadow-slate-900">
                  <Users className="h-4 w-4" />
                  <span>Nosotros</span>
                </Link>
              </div>
            </div>


            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <SearchButton onClick={() => setSearchOpen(true)} />
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl focus:outline-none p-2.5 transition-colors border border-transparent hover:border-slate-200 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden fixed inset-x-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'top-16 opacity-100 visible' : 'top-12 opacity-0 invisible pointer-events-none'
            }`}
          style={{ zIndex: 40 }}
        >
          <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
            <Link to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Fish className="h-5 w-5" />
              </div>
              <span>Pronóstico</span>
            </Link>
            <Link to="/mapa" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/mapa')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/mapa' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <MapPin className="h-5 w-5" />
              </div>
              <span>Mapa</span>
            </Link>
            <Link to="/calendario" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/calendario')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/calendario' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Moon className="h-5 w-5" />
              </div>
              <span>Solunar</span>
            </Link>
            <Link to="/diques" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/diques')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/diques' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Waves className="h-5 w-5" />
              </div>
              <span>Diques</span>
            </Link>
            <Link to="/botes" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/botes')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/botes' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Ship className="h-5 w-5" />
              </div>
              <span>Botes</span>
            </Link>
            <Link to="/nudos" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/nudos')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/nudos' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Layers className="h-5 w-5" />
              </div>
              <span>Nudos</span>
            </Link>
            <Link to="/reglamento" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/reglamento')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/reglamento' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <FileText className="h-5 w-5" />
              </div>
              <span>Reglamento</span>
            </Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/blog')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/blog' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <BookOpen className="h-5 w-5" />
              </div>
              <span>Blog</span>
            </Link>
            <Link to="/sumar-servicio" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/sumar-servicio')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/sumar-servicio' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <PlusCircle className="h-5 w-5" />
              </div>
              <span>Sumar Servicio</span>
            </Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className={mobileNavLinkClass('/nosotros')}>
              <div className={`p-2 rounded-lg ${location.pathname === '/nosotros' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white shadow-sm dark:bg-slate-800'}`}>
                <Users className="h-5 w-5" />
              </div>
              <span>Nosotros</span>
            </Link>
          </div>

        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col dark:bg-slate-800 ">
      <Helmet>
        <title>Pesca Córdoba - Guía, Pronóstico y Nudos</title>
        <meta name="title" content="Pesca Córdoba - Guía, Pronóstico y Nudos" />
        <meta name="description" content="La mejor guía de pesca deportiva en Córdoba. Descubre nudos, especies de peces, pronóstico del clima y los mejores lugares para pescar en Argentina." />
        <meta name="keywords" content="pesca, córdoba, pesca deportiva, nudos de pesca, especies de peces, clima para pesca, lugares de pesca, argentina" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.pescacordoba.com.ar/" />
        <meta property="og:title" content="Pesca Córdoba - Guía, Pronóstico y Nudos" />
        <meta property="og:description" content="La mejor guía de pesca deportiva en Córdoba. Descubre nudos, especies de peces, pronóstico del clima y los mejores lugares para pescar en Argentina." />
        <meta property="og:image" content="https://www.pescacordoba.com.ar/seo.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.pescacordoba.com.ar/" />
        <meta property="twitter:title" content="Pesca Córdoba - Guía, Pronóstico y Nudos" />
        <meta property="twitter:description" content="La mejor guía de pesca deportiva en Córdoba. Descubre nudos, especies de peces, pronóstico del clima y los mejores lugares para pescar en Argentina." />
        <meta property="twitter:image" content="https://www.pescacordoba.com.ar/seo.jpg" />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Pesca Córdoba",
        "url": "https://www.pescacordoba.com.ar/",
        "description": "La mejor guía de pesca deportiva en Córdoba. Pronóstico del clima, mapa de pesqueros, calendario solunar y más.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.pescacordoba.com.ar/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }} />

      <NavBar />

      <main className="flex-grow w-full pb-16 dark:bg-slate-800 ">
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/mapa" element={<FishingMap />} />
          <Route path="/calendario" element={<SolunarCalendar />} />
          <Route path="/diques" element={<DamLevels />} />
          <Route path="/nudos" element={<KnotsCatalog />} />
          <Route path="/reglamento" element={<FishingRules />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/botes" element={<BoatRentals />} />
          <Route path="/sumar-servicio" element={<ServiceForm />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />

          <Route path="/terminos" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <div className="max-w-4xl mx-auto px-4 w-full dark:bg-slate-800 ">
        <AdBanner slot="3228900466" />
      </div>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand Section */}
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <Link to="/" className="flex shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2.5 tracking-tight hover:opacity-80 transition-opacity">
                <Fish className="h-8 w-8 text-blue-600" />
                Pesca<span className="text-slate-900 dark:text-slate-100">App</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs leading-relaxed">
                Tu compañero ideal para la pesca deportiva en Córdoba. Pronósticos precisos, mapas interactivos y todo lo que necesitas saber.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Enlaces Rápidos</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center md:text-left">
                <Link to="/" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Pronóstico</Link>
                <Link to="/mapa" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Mapa</Link>
                <Link to="/calendario" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Solunar</Link>
                <Link to="/diques" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Diques</Link>
                <Link to="/nudos" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Nudos</Link>
                <Link to="/botes" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Botes</Link>
                <Link to="/blog" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Blog</Link>
                <Link to="/nosotros" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 text-sm transition-colors">Nosotros</Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="flex flex-col items-center md:items-end gap-4">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">Contacto</h3>
              <a href="mailto:pescaappcordoba@gmail.com" className="group flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/50 border border-slate-100 hover:border-blue-100 dark:border-slate-700 dark:hover:border-blue-800 rounded-xl text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all">
                <Mail className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium">Email</span>
              </a>
              <div className="flex items-center gap-4 text-slate-400">
                {/* Social links could go here */}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 text-xs text-center">
            <p>© 2026 PescaApp. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacidad" className="hover:text-blue-600 transition-colors">Políticas de Privacidad</Link>
              <Link to="/terminos" className="hover:text-blue-600 transition-colors">Términos y Condiciones</Link>
            </div>
            <p className="flex items-center gap-1">
              Hecho con <span className="text-red-400">❤</span> para pescadores.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

