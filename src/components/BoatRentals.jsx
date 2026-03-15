import React from 'react';
import { Ship, Phone, Instagram, MapPin, Anchor, ExternalLink, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BoatRentals = () => {
  const rentalData = [
    {
      dam: "Dique San Roque",
      description: "El espejo de agua más emblemático de las Sierras de Córdoba, ideal para la pesca de pejerrey.",
      rentals: [
        {
          name: "Excursiones de Pesca La Distinta",
          info: "Operan desde Bialet Massé (Club La Calera). Embarcaciones tipo tracker para hasta 5 personas. Especialistas en pejerrey, carpa y bagre.",
          contact: null,
          instagram: null,
          location: "Bialet Massé"
        },
        {
          name: "Club Loteros",
          info: "Excelente punto para el pescador. Alquiler de botes (con/sin motor) y trackers. Posta sobre profundidad de alimentación.",
          contacts: [
            { label: "Tomy Botes Motor", phone: "5493541373408" },
            { label: "Club (General)", phone: "3513817281" }
          ],
          instagram: null,
          location: "San Roque"
        },
        {
          name: "Botes Punilla",
          info: "Servicio de alquiler de botes y trackers en la zona de Bialet Massé / San Roque.",
          contacts: [
            { label: "Alejandro (Botes Punilla)", phone: "5493516221683" }
          ],
          instagram: null,
          location: "Bialet Massé"
        },
        {
          name: "Club Deportivo",
          info: "Alquiler de botes y servicios para el pescador. Atención personalizada.",
          contacts: [
            { label: "Club Deportivo", phone: "5493518097160" }
          ],
          instagram: null,
          location: "Bialet Massé"
        }
      ]
    },
    {
      dam: "Dique Los Molinos",
      description: "Un dique de aguas cristalinas rodeado de pinos, famoso por la calidad de su pejerrey.",
      rentals: [
        {
          name: "Bahía El Negro",
          info: "Alquiler de botes con motor y trackers.",
          contacts: [
            { label: "Consultas/Reservas", phone: "3547463593" }
          ],

          location: "Los Molinos"
        },
        {
          name: "Balsa Bella Vista",
          info: "Alquiler de balsa para pesca y recreación. Consultas y reservas.",
          contacts: [
            { label: "Consultas/Reservas", phone: "3512373685" }
          ],
          location: "Los Molinos"
        },
        {
          name: "Balsa Vikinga",
          info: "Alquiler de balsa para pesca y recreación. Servicio de calidad en Los Molinos.",
          contacts: [
            { label: "Consultas/Reservas", phone: "3512335845" }
          ],
          location: "Los Molinos"
        },
        {
          name: "La Pirata",
          info: "Excursiones de pesca y paseos. De 07 a 17 hs. Ubicada en Club El Pique (Potrero de Garay). Capacidad 6 personas.",
          contacts: [
            { label: "Reservas", phone: "3513864335" }
          ],
          location: "Potrero de Garay"
        }
      ]
    },
    {
      dam: "Embalse Cerro Pelado",
      description: "Aguas profundas y paisajes vírgenes. Un desafío para pescadores experimentados.",
      rentals: [
        {
          name: "Claudio Maschio",
          info: "Guía experimentado con dos trackers (6.5m y 5.3m). Seguridad garantizada. Pejerrey, tararira, bagre y truchas.",
          phone: "0354715572627",
          instagram: null,
          location: "Cerro Pelado"
        }
      ]
    },
    {
      dam: "Dique Cruz del Eje",
      description: "El hogar de los históricos 'matungos'. Un dique extenso en el noroeste cordobés.",
      rentals: [
        {
          name: "Rafael González",
          info: "Referente indispensable para la zona noroeste. El guía ideal para buscar pejerreyes de gran tamaño.",
          phone: "03541548126",
          instagram: null,
          location: "Cruz del Eje"
        }
      ]
    }
  ];

  const formatPhone = (phone) => {
    if (!phone) return null;
    return phone.replace(/[^0-9]/g, '');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Helmet>
        <title>Alquiler de Botes y Guías de Pesca en Córdoba - PescaApp</title>
        <meta name="description" content="Guía completa de alquiler de botes, trackers y guías de pesca en los principales diques de Córdoba: San Roque, Los Molinos, Cerro Pelado y más." />
      </Helmet>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
          <Ship className="h-8 w-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
          Alquiler de <span className="text-blue-600">Botes y Guías</span>
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Encontrá las mejores opciones para embarcarte en los diques de Córdoba. Guías experimentados y embarcaciones preparadas para tu jornada de pesca.
        </p>
      </div>

      <div className="space-y-16">
        {rentalData.map((section, idx) => (
          <div key={idx} className="relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <Anchor className="h-6 w-6 text-blue-500" />
                  {section.dam}
                </h2>
                <p className="text-slate-500 mt-1 max-w-xl">{section.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.rentals.map((rental, rIdx) => (
                <div key={rIdx} className="group bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {rental.name}
                      </h3>
                      {rental.location && (
                        <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-full whitespace-nowrap">
                          <MapPin className="h-3 w-3" />
                          {rental.location}
                        </span>
                      )}
                    </div>

                    <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">
                      {rental.info}
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                      {rental.phone && (
                        <a
                          href={`tel:${formatPhone(rental.phone)}`}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-200"
                        >
                          <Phone className="h-4 w-4" />
                          Llamar Ahora
                        </a>
                      )}

                      {rental.contacts && rental.contacts.map((c, cIdx) => (
                        <a
                          key={cIdx}
                          href={`https://wa.me/${formatPhone(c.phone)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-100"
                        >
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{c.label}</span>
                          </div>
                          <ExternalLink className="h-3 w-3 opacity-50" />
                        </a>
                      ))}

                      {rental.instagram && (
                        <a
                          href={`https://instagram.com/${rental.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-xl font-bold text-sm transition-all shadow-lg"
                        >
                          <Instagram className="h-4 w-4" />
                          Síguelo en Instagram
                        </a>
                      )}

                      {!rental.phone && !rental.instagram && !rental.contacts && (
                        <div className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 text-slate-500 rounded-xl font-bold text-sm">
                          <MessageCircle className="h-4 w-4" />
                          Consultar en el lugar
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4">¿Tenés un servicio de alquiler?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
            Unite a nuestra guía y llegá a cientos de pescadores que visitan nuestra app todos los días.
          </p>
          <a
            href="mailto:pescaappcordoba@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-black transition-all transform hover:scale-105"
          >
            Publicar mi servicio
            <ExternalLink className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BoatRentals;
