import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Helmet>
        <title>Política de Privacidad - Pesca Córdoba</title>
        <meta name="description" content="Política de privacidad de Pesca Córdoba. Conocé cómo protegemos y utilizamos tu información personal." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-8 py-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Política de Privacidad</h1>
          </div>
          <p className="text-blue-50/90 text-lg">Tu privacidad es nuestra prioridad en PescaApp.</p>
        </div>

        <div className="p-8 md:p-12 space-y-10">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">1. Información que Recolectamos</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              En PescaApp, recolectamos información mínima necesaria para brindarte la mejor experiencia. Esto puede incluir datos técnicos como tu dirección IP (anonimizada), tipo de navegador y páginas visitadas para mejorar nuestro servicio.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">2. Uso de la Información</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Utilizamos la información recolectada para:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
              <li>Mejorar y personalizar el contenido de nuestra guía de pesca.</li>
              <li>Analizar el tráfico para entender qué secciones son más útiles para los pescadores.</li>
              <li>Mantener la seguridad de la aplicación.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">3. Cookies y Publicidad</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              PescaApp utiliza cookies de terceros (como Google AdSense y Google Analytics) para mostrar anuncios relevantes y analizar el uso del sitio. Puedes configurar tu navegador para rechazar todas las cookies si así lo deseas.
            </p>
          </section>

          <section className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Contacto</h2>
            <p className="text-slate-600">
              Si tienes preguntas sobre nuestra política de privacidad, contáctanos en <a href="mailto:pescaappcordoba@gmail.com" className="text-blue-600 font-medium hover:underline">pescaappcordoba@gmail.com</a>.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100 text-slate-400 text-sm">
            Última actualización: Marzo 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
