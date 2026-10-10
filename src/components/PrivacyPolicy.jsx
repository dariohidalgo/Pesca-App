import React, { useEffect } from 'react';
import { Shield, Lock, Eye, FileText, ExternalLink, Cookie, Server } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SchemaOrg from './SchemaOrg';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonicalUrl = 'https://www.pescacordoba.com.ar/privacidad';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <Helmet>
        <title>Política de Privacidad - Pesca Córdoba</title>
        <meta name="description" content="Política de privacidad de Pesca Córdoba. Información sobre el uso de cookies, publicidad de Google AdSense, analítica y protección de datos." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Política de Privacidad - Pesca Córdoba" />
        <meta property="og:description" content="Política de privacidad y cookies de Pesca Córdoba." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Política de Privacidad",
        "description": "Política de privacidad y gestión de cookies de Pesca Córdoba.",
        "url": canonicalUrl
      }} />

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-12 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Política de Privacidad</h1>
          </div>
          <p className="text-blue-100 text-base sm:text-lg">
            Transparencia sobre el tratamiento de datos, cookies y servicios de terceros en Pesca Córdoba.
          </p>
        </div>

        <div className="p-8 md:p-12 space-y-10 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Información General y Responsable</h2>
            </div>
            <p>
              El sitio web <strong>pescacordoba.com.ar</strong> es una plataforma informativa gestionada por Darío Hidalgo, con domicilio de contacto electrónico en <a href="mailto:pescaappcordoba@gmail.com" className="text-blue-600 dark:text-blue-400 underline">pescaappcordoba@gmail.com</a>. Esta política describe cómo se recopila, utiliza y protege la información cuando navegás por nuestras páginas y herramientas.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <Server className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Datos Técnicos y Navegación</h2>
            </div>
            <p>
              Al navegar por Internet, cada solicitud HTTP transmite automáticamente metadatos técnicos esenciales para la comunicación entre tu navegador y los servidores donde se aloja el sitio (proveedor de infraestructura Vercel). Esto incluye la dirección IP de conexión, fecha y hora de la solicitud, tipo y versión del navegador web, sistema operativo y página de referencia (referrer). Estos datos son procesados para entregar el contenido solicitado, prevenir abusos informáticos y garantizar la estabilidad del servicio.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Publicidad de Google AdSense y Cookies de Terceros</h2>
            </div>
            <p>
              Pesca Córdoba utiliza los servicios publicitarios de <strong>Google AdSense</strong> (Google LLC) para financiar el mantenimiento y la disponibilidad gratuita de la plataforma. En cumplimiento con los requisitos de las políticas para editores de Google:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cookies de terceros:</strong> Proveedores terceros, incluido Google, utilizan cookies para publicar anuncios basados en las visitas anteriores de los usuarios a este sitio web o a otros sitios en Internet.
              </li>
              <li>
                <strong>Personalización publicitaria:</strong> El uso de cookies publicitarias permite a Google y a sus socios comerciales orientar anuncios para los usuarios según su navegación por este u otros sitios de la red.
              </li>
              <li>
                <strong>Desactivación y control por parte del usuario:</strong> Podés inhabilitar la publicidad personalizada en cualquier momento ingresando a la configuración oficial de anuncios de Google en{' '}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1"
                >
                  Configuración de anuncios de Google <ExternalLink className="h-3.5 w-3.5" />
                </a>.
              </li>
              <li>
                Alternativamente, podés optar por no recibir cookies de proveedores externos para publicidad personalizada visitando el portal independiente{' '}
                <a
                  href="https://www.aboutads.info/choices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1"
                >
                  www.aboutads.info <ExternalLink className="h-3.5 w-3.5" />
                </a>{' '}
                o{' '}
                <a
                  href="https://www.youronlinechoices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 font-semibold underline inline-flex items-center gap-1"
                >
                  Your Online Choices <ExternalLink className="h-3.5 w-3.5" />
                </a>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Tecnologías y Herramientas Utilizadas en el Sitio</h2>
            </div>
            <div className="space-y-3">
              <p>
                A continuación detallamos las tecnologías específicas implementadas en Pesca Córdoba:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Umami Analytics:</strong> Herramienta de analítica web agregada (alojada en cloud.umami.is). No utiliza cookies de seguimiento persistentes ni elabora perfiles cruzados entre sitios. Se emplea exclusivamente para contabilizar páginas vistas de forma anónima y mejorar la navegación.
                </li>
                <li>
                  <strong>Almacenamiento Local (LocalStorage):</strong> Se utiliza de forma técnica en tu propio dispositivo para recordar tu preferencia de visualización (modo claro o modo oscuro mediante el selector de tema). No transmite datos a servidores externos.
                </li>
                <li>
                  <strong>Formulario de Servicios (Firebase / EmailJS):</strong> Si decidís voluntariamente completar el formulario "Sumar Servicio", los datos ingresados (nombre, rubro, contacto telefónico, descripción) se almacenan en una base de datos segura (Google Firebase Firestore) y se envían por correo electrónico para su moderación manual antes de su eventual publicación en la guía de botes.
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Derechos del Usuario y Contacto</h2>
            </div>
            <p>
              Tenés derecho a solicitar el acceso, rectificación o eliminación de cualquier dato que hayas remitido voluntariamente a través del formulario de contacto o servicios. Para ejercer tus derechos o realizar cualquier consulta respecto a esta política, podés escribir a:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="font-semibold text-slate-900 dark:text-white">Contacto de Privacidad:</p>
              <a href="mailto:pescaappcordoba@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                pescaappcordoba@gmail.com
              </a>
            </div>
          </section>

          <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-slate-400 text-xs flex flex-col sm:flex-row justify-between gap-2">
            <span>Última revisión: Octubre 2026</span>
            <span>Pesca Córdoba — pescacordoba.com.ar</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
