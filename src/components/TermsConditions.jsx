import React, { useEffect } from 'react';
import { Scale, CheckCircle2, AlertCircle, Info, Mail } from 'lucide-react';
import SEO from './SEO';
import { canonicalUrl } from '../lib/domain';
import SchemaOrg from './SchemaOrg';

const TermsConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = 'https://pesca-app.com/terminos';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <SEO
        title="Términos y Condiciones de Uso - Pesca Córdoba"
        description="Términos y condiciones de uso de Pesca Córdoba. Normas de uso, alcance informativo y responsabilidades."
        canonical="terminos"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Términos y Condiciones",
        "description": "Condiciones generales de uso de Pesca Córdoba.",
        "url": canonicalUrl
      }} />

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Términos y Condiciones</h1>
          </div>
          <p className="text-slate-300 text-base sm:text-lg">Condiciones generales de uso del sitio pescacordoba.com.ar</p>
        </div>

        <div className="p-8 md:p-12 space-y-10 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Aceptación de los Términos</h2>
            </div>
            <p>
              Al acceder, navegar o utilizar las herramientas disponibles en <strong>pescacordoba.com.ar</strong> (en adelante, "Pesca Córdoba"), aceptás los presentes Términos y Condiciones. Si no estás de acuerdo con alguna de estas disposiciones, te solicitamos abstenerte de utilizar el sitio.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <Info className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Carácter Informativo y Orientativo</h2>
            </div>
            <p>
              Pesca Córdoba es una plataforma informativa y educativa de acceso libre. Las herramientas disponibles (pronóstico del tiempo, índice de pique, fases lunares, fichas de diques, catálogo de nudos y reglamentos) son de carácter referencial. Aunque nos esforzamos por mantener la información técnica rigurosa y actualizada:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                El pronóstico meteorológico y los índices derivados son modelos probabilísticos que pueden variar por frentes locales imprevistos.
              </li>
              <li>
                Las normativas de veda, cupos y permisos son reguladas por la Secretaría de Ambiente del Gobierno de la Provincia de Córdoba; el usuario debe verificar siempre las resoluciones anuales vigentes publicadas en los boletines oficiales antes de su jornada.
              </li>
              <li>
                La práctica de la navegación y la pesca deportiva involucran factores ambientales de riesgo (viento, oleaje, hipotermia, cambios de cota); es responsabilidad exclusiva del usuario cumplir con la normativa de Seguridad Náutica y actuar con prudencia.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Directorio de Servicios de Terceros</h2>
            </div>
            <p>
              La sección de guías de pesca, alquiler de botes y venta de carnada incluye datos de prestadores independientes. Pesca Córdoba actúa únicamente como canal de contacto y difusión comunitaria, sin intermediación comercial, sin cobro de comisiones y sin asumir responsabilidad civil, contractual o penal por los servicios prestados por terceros.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <Scale className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Propiedad Intelectual</h2>
            </div>
            <p>
              Los textos editoriales, guías originales, logotipos y código fuente de esta plataforma son propiedad de su autor o se utilizan bajo licencias abiertas correspondientes. Se permite la cita o referencia con atribución clara del enlace de origen. Queda prohibida la reproducción masiva no autorizada con fines comerciales.
            </p>
          </section>

          <section className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Consultas y Contacto
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Para consultas relativas a estos términos, podés comunicarte vía email a <a href="mailto:pescaappcordoba@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">pescaappcordoba@gmail.com</a>.
            </p>
          </section>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-xs flex flex-col sm:flex-row justify-between gap-2">
            <span>Vigente desde: Octubre 2026</span>
            <span>Pesca Córdoba — Córdoba, Argentina</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
