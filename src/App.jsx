import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Fish, BookOpen, Layers } from 'lucide-react';

import WeatherDashboard from './components/WeatherDashboard';
import KnotsCatalog from './components/KnotsCatalog';
import BlogPost from './components/BlogPost';
import AdBanner from './components/AdBanner';

function NavBar() {
  const location = useLocation();

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`;
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2 tracking-tight">
            <Fish className="h-8 w-8 text-blue-600" />
            Pesca<span className="text-slate-900">App</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <Link to="/" className={navLinkClass('/')}>
              <Fish className="h-5 w-5" />
              <span className="hidden sm:inline">Pronóstico</span>
            </Link>
            <Link to="/nudos" className={navLinkClass('/nudos')}>
              <Layers className="h-5 w-5" />
              <span className="hidden sm:inline">Nudos</span>
            </Link>
            <Link to="/blog" className={navLinkClass('/blog')}>
              <BookOpen className="h-5 w-5" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
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

      <NavBar />

      <main className="flex-grow w-full pb-16">
        <Routes>
          <Route path="/" element={<WeatherDashboard />} />
          <Route path="/nudos" element={<KnotsCatalog />} />
          <Route path="/blog" element={<BlogPost />} />
        </Routes>
      </main>

      <div className="max-w-4xl mx-auto px-4 w-full">
        <AdBanner slot="REEMPLAZAR_POR_ID_DE_SLOT" />
      </div>

      <footer className="bg-white border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 PescaApp - Plataforma para pescadores deportivos.</p>
      </footer>
    </div>
  );
}

export default App;

