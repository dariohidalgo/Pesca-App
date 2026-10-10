import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Marca */}
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left md:col-span-1">
            <Link to="/" className="flex shrink-0 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 font-black text-2xl items-center gap-2.5 tracking-tight hover:opacity-80 transition-opacity">
              <Fish className="h-8 w-8 text-blue-600" />
              Pesca<span className="text-slate-900 dark:text-slate-100">App</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Tu guía integral de pesca deportiva en Córdoba. Información técnica confiable, mapas de pesqueros, tutoriales de líneas y pronóstico de pique.
            </p>
          </div>

          {/* Enlaces Principales */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
              Planificación y Pesca
            </h3>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-center md:text-left">
              <Link to="/diques" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Guías por Dique</Link>
              <Link to="/lineas" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Tutoriales de Líneas</Link>
              <Link to="/planificador" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Planificador de Salida</Link>
              <Link to="/partes" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Partes de Pesca</Link>
              <Link to="/mapa" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Mapa de Puntos Útiles</Link>
            </div>
          </div>

          {/* Secciones y Recursos */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
              Recursos y Normativa
            </h3>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-center md:text-left">
              <Link to="/" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Pronóstico del Clima</Link>
              <Link to="/calendario" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Calendario Solunar</Link>
              <Link to="/nudos" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Catálogo de Nudos</Link>
              <Link to="/reglamento" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Reglamento Provincial</Link>
              <Link to="/botes" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Guías y Botes</Link>
            </div>
          </div>

          {/* Contacto y Comunidad */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider text-xs">
              Comunidad
            </h3>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm text-center md:text-left mb-2">
              <Link to="/blog" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Artículos del Blog</Link>
              <Link to="/nosotros" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Sobre Nosotros</Link>
              <Link to="/sumar-servicio" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">Publicar Servicio Náutico</Link>
            </div>
            <a
              href="mailto:pescaappcordoba@gmail.com"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-50 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 text-xs font-semibold transition-all"
            >
              <Mail className="h-4 w-4" />
              <span>pescaappcordoba@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400 text-xs text-center">
          <p>© 2026 Pesca Córdoba. Plataforma independiente de información sobre pesca deportiva en Córdoba.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacidad" className="hover:text-blue-600 transition-colors">Políticas de Privacidad</Link>
            <Link to="/terminos" className="hover:text-blue-600 transition-colors">Términos y Condiciones</Link>
          </div>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" /> para pescadores de Córdoba.
          </p>
        </div>
      </div>
    </footer>
  );
}