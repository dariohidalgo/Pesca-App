import React from 'react';
import { Ship, Phone, Instagram, MapPin, Anchor, ExternalLink, MessageCircle, Plus } from 'lucide-react';

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { CardSkeleton } from './LoadingSkeleton';
import SchemaOrg from './SchemaOrg';


const BoatRentals = () => {
  const [dynamicServices, setDynamicServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(collection(db, 'services'), where('status', '==', 'approved'));
        const querySnapshot = await getDocs(q);
        const services = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDynamicServices(services);
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Agrupar los servicios pre-aprobados de Firebase por 'dam'
  const groupedDynamicServices = dynamicServices.reduce((acc, service) => {
    const damParts = service.location ? service.location.split('-') : [];
    const damName = damParts.length > 1 ? damParts[damParts.length - 1].trim() : "Otros";

    if (!acc[damName]) {
      acc[damName] = {
        dam: damName,
        description: `Servicios de pesca y botes en ${damName}.`,
        rentals: []
      };
    }

    acc[damName].rentals.push({
      ...service,
      info: service.description, // Mapear properties
      phone: service.contact
    });

    return acc;
  }, {});

  const finalData = Object.values(groupedDynamicServices);

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

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Guías y Botes de Pesca en Córdoba",
        "description": "Directorio de servicios de alquiler de botes, guías de pesca y embarcaciones en los diques de Córdoba.",
        "url": "https://www.pescacordoba.com.ar/botes"
      }} />

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4 text-blue-600">
          <Ship className="h-8 w-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6 dark:text-white">
          Guías y Botes en Córdoba
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto dark:text-white">
          Encontrá las mejores opciones para embarcarte en los diques de Córdoba. Guías experimentados y embarcaciones preparadas para tu jornada de pesca.
        </p>
      </div>

      <div className="space-y-12">
        {loading ? (
          <CardSkeleton count={3} />
        ) : finalData.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-white">
            <p>No hay servicios disponibles por el momento.</p>
          </div>
        ) : (
          finalData.map((location, idx) => {
            const allRentals = location.rentals;

            return (
              <div key={idx} className="relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-200 pb-4 dark:text-white">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 dark:text-white">
                      <Anchor className="h-6 w-6 text-blue-500" />
                      {location.dam}
                    </h2>
                    <p className="text-slate-500 mt-1 max-w-xl dark:text-white">{location.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allRentals.map((rental, rIdx) => (
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

                        <div className="flex gap-2 mb-4">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${rental.type === 'guide' ? 'bg-blue-100 text-blue-700' :
                            rental.type === 'boat_rental' ? 'bg-emerald-100 text-emerald-700' :
                              rental.type === 'raft_rental' ? 'bg-orange-100 text-orange-700' :
                                'bg-amber-100 text-amber-700'
                            }`}>
                            {rental.type === 'guide' ? 'Guía' :
                              rental.type === 'boat_rental' ? 'Bote' :
                                rental.type === 'raft_rental' ? 'Balsa' :
                                  'Carnada'}
                          </span>
                        </div>

                        <p className="text-slate-600 text-sm mb-8 flex-grow leading-relaxed">
                          {rental.info || rental.description}
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

                          {rental.contact && (
                            <a
                              href={`https://wa.me/${formatPhone(rental.contact)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-100"
                            >
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                <span>WhatsApp</span>
                              </div>
                              <ExternalLink className="h-3 w-3 opacity-50" />
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

                          {!rental.phone && !rental.instagram && !rental.contacts && !rental.contact && (
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
            );
          })
        )}
      </div>


      <div className="mt-20 bg-blue-600 rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-400 rounded-full opacity-50 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-4">¿Tenés un servicio de alquiler?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto leading-relaxed">
            Unite a nuestra guía y llegá a cientos de pescadores que visitan nuestra app todos los días.
          </p>
          <Link
            to="/sumar-servicio"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-2xl font-black transition-all transform hover:scale-105"
          >
            Publicar mi servicio
            <Plus className="h-5 w-5" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default BoatRentals;
