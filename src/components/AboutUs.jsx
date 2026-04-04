import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Fish, MapPin, Heart, ShieldCheck, Mail, Users } from 'lucide-react';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
            <Helmet>
                <title>Sobre Nosotros - Pesca Córdoba</title>
                <meta name="description" content="Conoce la historia detrás de Pesca Córdoba, nuestra misión de promover la pesca deportiva responsable y el equipo que hace posible esta guía." />
            </Helmet>

            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-700 to-indigo-600 px-8 py-16 text-white text-center">
                    <div className="inline-flex p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                        <Fish className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Sobre Pesca Córdoba</h1>
                    <p className="text-blue-100 text-xl max-w-2xl mx-auto">
                        Nuestra misión es ser el compañero definitivo para todo pescador deportivo en la provincia de Córdoba.
                    </p>
                </div>

                <div className="p-8 md:p-12 space-y-12">
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <Heart className="h-7 w-7 text-red-500" />
                                Nuestra Historia
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Pesca Córdoba nació de la pasión por el aire libre y el respeto por nuestros ecosistemas acuáticos. Como pescadores locales, entendemos que tener información precisa sobre el clima, los niveles de los diques y las regulaciones vigentes no solo mejora la jornada de pesca, sino que también fomenta una actividad más consciente y segura.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                Lo que comenzó como un simple cuaderno de notas personal sobre el pique en el San Roque y Los Molinos, se transformó en esta plataforma digital abierta para toda la comunidad.
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 space-y-4">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Users className="h-6 w-6 text-blue-600" />
                                El Equipo
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl">
                                    DH
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">Darío Hidalgo</h4>
                                    <p className="text-slate-500 text-sm italic">Fundador y Editor de Contenidos</p>
                                </div>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed pt-2">
                                Pescador deportivo con más de 20 años recorriendo los ríos y diques de Córdoba. Especialista en la pesca de Pejerrey y Tararira con señuelos.
                            </p>
                        </div>
                    </section>

                    <section className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100/50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <ShieldCheck className="h-7 w-7 text-blue-600" />
                            Nuestro Compromiso
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-800 tracking-tight">Información Veraz</h4>
                                <p className="text-slate-600 text-sm">Utilizamos datos meteorológicos en tiempo real y fuentes oficiales para garantizar la precisión.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-800 tracking-tight">Pesca Responsable</h4>
                                <p className="text-slate-600 text-sm">Promovemos activamente el "Captura y Devolución" y el respeto por las temporadas de veda.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-800 tracking-tight">Comunidad</h4>
                                <p className="text-slate-600 text-sm">Apoyamos a los guías locales y servicios de botes, conectándolos con pescadores de todo el país.</p>
                            </div>
                        </div>
                    </section>

                    {/* NEW E-E-A-T SECTION para AdSense */}
                    <section className="bg-white rounded-2xl p-8 border border-slate-200 outline outline-4 outline-slate-50/50">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <ShieldCheck className="h-7 w-7 text-indigo-600" />
                            Nuestra Política Editorial y Rigor (E-E-A-T)
                        </h2>
                        <div className="space-y-4 text-slate-600 leading-relaxed text-md">
                            <p>
                                En <strong>Pesca Córdoba</strong> nos tomamos muy en serio la calidad y la veracidad de la información que publicamos. Al ser una herramienta utilizada por pescadores antes de emprender viajes o navegaciones, sabemos que una información errónea puede no solo arruinar un fin de semana, sino poner en riesgo la seguridad.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Experiencia de primera mano (Experience):</strong> Todos nuestros reportes, mapas de pesqueros y guías técnicas están escritos por pescadores locales con al menos 10 años de experiencia comprobable en los diques cordobeses. No utilizamos contenido 100% automatizado para nuestros artículos de blog.</li>
                                <li><strong>Conocimiento Técnico (Expertise):</strong> Para la redacción de los artículos sobre biología de las especies (como desoves, alimentación estacional) colaboramos con técnicos acuícolas y biólogos de la región.</li>
                                <li><strong>Autoridad (Authoritativeness):</strong> Nuestros reportes meteorológicos y solunares son cruzados con los partes oficiales e internacionales de meteorología aeronáutica y el Servicio Meteorológico Nacional (SMN).</li>
                                <li><strong>Confianza (Trustworthiness):</strong> Somos completamente transparentes con nuestros usuarios. Si una información es un rumor (por ejemplo, "se dice que hay pique en la bahía norte"), lo aclaramos como tal. Jamás garantizamos la captura, solo ofrecemos las mejores herramientas probabilísticas.</li>
                            </ul>
                        </div>
                    </section>

                    <section className="text-center space-y-6 pt-6">
                        <h2 className="text-2xl font-bold text-slate-900">¿Tienes alguna duda o sugerencia?</h2>
                        <p className="text-slate-600 max-w-xl mx-auto">
                            Estamos en constante evolución. Si crees que falta algún pesquero o quieres compartir información sobre el pique, no dudes en escribirnos.
                        </p>
                        <a 
                            href="mailto:pescaappcordoba@gmail.com" 
                            className="inline-flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors font-bold shadow-lg"
                        >
                            <Mail className="h-5 w-5" />
                            Contáctanos vía Email
                        </a>
                    </section>
                </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Córdoba, Argentina</span>
                </div>
                <p>Copyright © 2026 Pesca Córdoba. Todos los derechos reservados.</p>
            </div>
        </div>
    );
};

export default AboutUs;
