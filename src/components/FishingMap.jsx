import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Helmet } from 'react-helmet-async';
import { MapPin, Info, Navigation2, Mail } from 'lucide-react';

// Fix for default marker icons in react-leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const mapLocations = [
  {
    id: 'san-roque',
    name: 'Dique San Roque',
    position: [-31.385, -64.448],
    species: ['Pejerrey', 'Carpa', 'Tararira'],
    services: 'Bajadas de lancha, Asadores, Proveeduría',
    description: 'El dique más cercano a Córdoba capital. Ideal para la pesca de pejerrey en invierno y carpas de buen porte.'
  },
  {
    id: 'los-molinos',
    name: 'Dique Los Molinos',
    position: [-31.816, -64.551],
    species: ['Pejerrey', 'Carpa', 'Tararira'],
    services: 'Clubes de pesca, Alquiler de botes, Cabañas',
    description: 'Excelente pesquero en el Valle de Calamuchita, reconocido por el buen tamaño de sus pejerreyes.'
  },
  {
    id: 'embalse',
    name: 'Embalse de Río Tercero',
    position: [-32.227, -64.417],
    species: ['Pejerrey', 'Tararira', 'Carpa'],
    services: 'Múltiples bajadas, Pesca nocturna, Guías locales',
    description: 'El embalse más grande de Córdoba. Ofrece gran variedad de pesca y excelentes servicios turísticos.'
  },
  {
    id: 'cruz-del-eje',
    name: 'Dique Cruz del Eje',
    position: [-30.730, -64.767],
    species: ['Pejerrey', 'Tararira'],
    services: 'Bajada de lanchas, Club de pesca',
    description: 'Un clásico del norte cordobés, famoso por albergar pejerreyes "lomo negro" de gran tamaño.'
  },
  {
    id: 'pichanas',
    name: 'Dique Pichanas',
    position: [-30.801, -65.041],
    species: ['Pejerrey', 'Tararira', 'Carpa'],
    services: 'Área agreste, Sin proveeduría (llevar todo)',
    description: 'Entorno salvaje y aguas cristalinas. Requiere precaución por vientos, pero rinde muy bien en temporada.'
  }
];

export default function FishingMap() {
  const cordobaCenter = [-31.4201, -64.1888]; // Cordoba Capital Center
  const mapZoom = 7;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Helmet>
        <title>Mapa de Pesqueros - Pesca Córdoba</title>
        <meta name="description" content="Mapa interactivo con los mejores puntos de pesca en Córdoba. Dique San Roque, Los Molinos, Embalse y más." />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <MapPin className="h-8 w-8 text-blue-600" />
          Mapa de Pesqueros en Córdoba
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Explorá los principales diques y cuerpos de agua de la provincia. Encontrá especies, servicios y rutas de acceso.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative" style={{ height: '600px' }}>
        <MapContainer
          center={cordobaCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', zIndex: 10 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapLocations.map((loc) => (
            <Marker key={loc.id} position={loc.position}>
              <Popup className="custom-popup">
                <div className="p-1">
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{loc.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{loc.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Especies</span>
                      <span className="text-sm text-slate-700">{loc.species.join(', ')}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Servicios</span>
                      <span className="text-sm text-slate-700">{loc.services}</span>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.position[0]},${loc.position[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-center items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Navigation2 className="h-4 w-4" />
                    Cómo llegar con GPS
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-4">
        <Info className="h-6 w-6 text-blue-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-blue-900">¿Falta tu lugar preferido?</h4>
          <p className="text-sm text-blue-800 mt-1">
            Revisá siempre el estado y reglamentaciones en cada punto antes de ir. Si conocés otros pesqueros o campings que valga la pena agregar, envianos un mensaje.
          </p>
          <a href="mailto:pescaappcordoba@gmail.com" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Mail className="h-4 w-4" />
            pescaappcordoba@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
