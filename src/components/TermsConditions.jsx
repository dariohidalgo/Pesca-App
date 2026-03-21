import React, { useEffect } from 'react';
import { Scale, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Helmet>
        <title>Términos y Condiciones - Pesca Córdoba</title>
        <meta name="description" content="Términos y condiciones de uso de la plataforma Pesca Córdoba. Reglas, responsabilidades y propiedad intelectual." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Términos y Condiciones</h1>
          </div>
          <p className="text-slate-300 text-lg">Reglas de uso de nuestra plataforma y servicios.</p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">1. Aceptación de los Términos</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Al acceder y utilizar PescaApp, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestra aplicación.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">2. Uso de la Información</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              PescaApp es una herramienta informativa. Aunque nos esforzamos por proporcionar datos precisos sobre el clima, niveles de diques y reglamentos, el usuario es responsable de verificar esta información con fuentes oficiales antes de realizar actividades de pesca.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">3. Limitación de Responsabilidad</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              PescaApp no se hace responsable de:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Daños directos o indirectos derivados del uso de la aplicación.</li>
              <li>Inexactitudes en el pronóstico del tiempo o estado de los diques.</li>
              <li>Incidentes ocurridos durante la práctica de la pesca deportiva.</li>
            </ul>
          </section>

          <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Propiedad Intelectual</h2>
            <p className="text-slate-600">
              Todos los contenidos de PescaApp, incluyendo textos, diseños y logos, son propiedad de PescaApp y están protegidos por las leyes de propiedad intelectual.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100 text-slate-400 text-sm text-right">
            Vigente desde: Marzo 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
