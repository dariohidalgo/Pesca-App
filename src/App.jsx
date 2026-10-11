import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import WeatherDashboard from './components/WeatherDashboard';
import DamsCatalog from './components/DamsCatalog';
import DamDetail from './components/DamDetail';
import FishingMap from './components/FishingMap';
import RigTutorials from './components/RigTutorials';
import RigDetail from './components/RigDetail';
import TripPlanner from './components/TripPlanner';
import FishingReports from './components/FishingReports';
import FishingReportDetail from './components/FishingReportDetail';
import KnotsCatalog from './components/KnotsCatalog';
import SolunarCalendar from './components/SolunarCalendar';
import FishingRules from './components/FishingRules';
import BoatRentals from './components/BoatRentals';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import ServiceForm from './components/ServiceForm';
import AboutUs from './components/AboutUs';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import NotFound from './components/NotFound';

export default function App() {
  return (
    <div suppressHydrationWarning className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col dark:bg-slate-800">
      <NavBar />

      <main className="flex-grow w-full pb-16 dark:bg-slate-800">
        <Routes>
          {/* Inicio: Pronóstico del Clima y Pique */}
          <Route path="/" element={<WeatherDashboard />} />

          {/* 1. Guías por Dique */}
          <Route path="/diques" element={<DamsCatalog />} />
          <Route path="/diques/:slug" element={<DamDetail />} />

          {/* 2. Partes de Pesca Reales y Fechados */}
          <Route path="/partes" element={<FishingReports />} />
          <Route path="/partes/:id" element={<FishingReportDetail />} />

          {/* 3. Mapa de Puntos Útiles */}
          <Route path="/mapa" element={<FishingMap />} />

          {/* 4. Tutoriales Visuales de Líneas */}
          <Route path="/lineas" element={<RigTutorials />} />
          <Route path="/lineas/:slug" element={<RigDetail />} />

          {/* 5. Planificador de Salida */}
          <Route path="/planificador" element={<TripPlanner />} />

          {/* Secciones existentes preservadas */}
          <Route path="/calendario" element={<SolunarCalendar />} />
          <Route path="/nudos" element={<KnotsCatalog />} />
          <Route path="/reglamento" element={<FishingRules />} />
          <Route path="/botes" element={<BoatRentals />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/sumar-servicio" element={<ServiceForm />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/privacidad" element={<PrivacyPolicy />} />
          <Route path="/terminos" element={<TermsConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
