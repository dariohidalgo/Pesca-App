import React, { useEffect } from 'react';
import SEO from './SEO';
import { Fish, MapPin, Mail, User, Compass, Shield, BookOpen } from 'lucide-react';
import SchemaOrg from './SchemaOrg';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const canonicalUrl = 'https://www.pescacordoba.com.ar/nosotros';

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <SEO
                title="Sobre Nosotros y Proyecto Editorial - Pesca Córdoba"
                description="Conocé qué es Pesca Córdoba, su propósito editorial, quién administra la plataforma y cómo se elabora la información técnica."
                canonical="https://www.pescacordoba.com.ar/nosotros"
            />

            <SchemaOrg schema={{
                "@context": "https://schema.org",
                "@type": "AboutPage",
                "name": "Sobre Pesca Córdoba",
                "description": "Información sobre el proyecto independiente de Pesca Córdoba, su fundador y política editorial.",
                "url": canonicalUrl
            }} />

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/60 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-8 py-16 text-white text-center">
                    <div className="inline-flex p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                        <Fish className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Sobre Pesca Córdoba</h1>
                    <p className="text-blue-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        Una plataforma digital e independiente creada para brindar herramientas prácticas, claras y transparentes a los pescadores deportivos en Córdoba.
                    </p>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <Compass className="h-6 w-6 text-blue-600" />
                                Propósito del Proyecto
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                Pesca Córdoba surgió de la necesidad de centralizar en una sola web la información técnica dispersa que todo pescador necesita antes de emprender una salida: condiciones de viento y clima en los diques, efemérides solunares astronómicas, reglamentaciones de veda y técnicas de armado de aparejos.
                            </p>
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                                No pretendemos ser una agencia turística ni un organismo oficial. Nuestro compromiso es ofrecer una herramienta funcional, sobria y honesta, sin promesas infundadas de capturas garantizadas ni datos ficticios.
                            </p>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Responsable Editorial
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
                                    DH
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">Darío Hidalgo</h4>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">Desarrollo y Contenidos</p>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                                Administrador y autor de los contenidos publicados en la plataforma. Responsable de la selección de fuentes, redacción técnica y mantenimiento del sitio.
                            </p>
                        </div>
                    </section>

                    <section className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 space-y-6">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Shield className="h-6 w-6 text-blue-600" />
                            Transparencia y Origen de los Datos
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200">Meteorología</h3>
                                <p className="leading-relaxed">
                                    Los datos de viento, temperatura y presión provienen de los modelos numéricos abiertos de <strong>Open-Meteo</strong> para las coordenadas de cada dique.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200">Ciclos Lunares</h3>
                                <p className="leading-relaxed">
                                    Las fases y posiciones del Sol y la Luna se calculan matemáticamente mediante la biblioteca astronómica <strong>SunCalc</strong>.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-slate-800 dark:text-slate-200">Normativa y Vedas</h3>
                                <p className="leading-relaxed">
                                    La información sobre cupos y vedas se basa en las disposiciones públicas oficiales de la <strong>Secretaría de Ambiente</strong> del Gobierno de la Provincia de Córdoba.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-indigo-600" />
                            Criterio Editorial
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                            Todos los artículos del blog y las guías técnicas buscan proporcionar instrucciones claras, esquemas de líneas tradicionales y recomendaciones prácticas de seguridad náutica. Promovemos activamente la ética de captura y devolución (Catch and Release) de reproductores y la limpieza de nuestras orillas.
                        </p>
                    </section>

                    <section className="text-center space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contacto Directo</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg mx-auto">
                            Si detectás algún dato inexacto, querés sugerir una corrección o consultar sobre el proyecto, podés comunicarte directamente por correo electrónico:
                        </p>
                        <div>
                            <a 
                                href="mailto:pescaappcordoba@gmail.com" 
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md transition-colors dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                            >
                                <Mail className="h-4 w-4" />
                                pescaappcordoba@gmail.com
                            </a>
                        </div>
                    </section>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 text-slate-400 text-xs text-center">
                <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Córdoba, República Argentina</span>
                </div>
                <p>© 2026 Pesca Córdoba. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default AboutUs;
