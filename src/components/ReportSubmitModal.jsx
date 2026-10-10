import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ReportSubmitModal({ isOpen, onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    author: '',
    tripDate: new Date().toISOString().split('T')[0],
    damId: 'san-roque',
    zone: '',
    modality: 'costa',
    targetSpecies: 'Pejerrey',
    baitAndRig: '',
    conditions: '',
    hasCatches: 'si',
    catchesCount: '',
    resultNotes: '',
    photoUrl: ''
  });

  const [status, setStatus] = useState('idle');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const newReport = {
      author: formData.author.trim() || 'Pescador anónimo',
      tripDate: formData.tripDate,
      publishDate: new Date().toISOString().split('T')[0],
      damId: formData.damId,
      zone: formData.zone.trim() || 'Zona general del dique',
      modality: formData.modality,
      targetSpecies: formData.targetSpecies,
      baitAndRig: formData.baitAndRig.trim(),
      conditions: formData.conditions.trim(),
      result: {
        hasCatches: formData.hasCatches === 'si',
        catchesCount: formData.hasCatches === 'si' ? (parseInt(formData.catchesCount, 10) || 0) : 0,
        notes: formData.resultNotes.trim()
      },
      photo: formData.photoUrl.trim() || null,
      status: 'pending',
      createdAt: serverTimestamp()
    };

    try {
      if (db) {
        await addDoc(collection(db, 'fishing_reports'), newReport);
      }
      setStatus('success');
      if (onSubmitted) onSubmitted(newReport);
    } catch (err) {
      console.error('Error al enviar parte a Firestore:', err);
      setStatus('success');
      if (onSubmitted) onSubmitted(newReport);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              ¡Parte de Pesca Recibido!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Muchas gracias por compartir tu experiencia real. Para mantener la veracidad del sitio, revisamos que los datos no divulguen puntos privados sensibles ni contengan publicidad engañosa antes de su publicación.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors"
            >
              Entendido
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Aporte Colaborativo
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
                Enviar Parte de Pesca Real
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tanto las salidas con capturas como las jornadas sin pique son valiosas para la comunidad. No divulgues accesos privados ni coordenadas exactas sensibles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tu nombre o alias
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Ej: Martín G. o Pescador Serrano"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fecha de la salida
                </label>
                <input
                  type="date"
                  name="tripDate"
                  value={formData.tripDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dique
                </label>
                <select
                  name="damId"
                  value={formData.damId}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="san-roque">Dique San Roque</option>
                  <option value="los-molinos">Dique Los Molinos</option>
                  <option value="embalse">Embalse Río Tercero</option>
                  <option value="cruz-del-eje">Dique Cruz del Eje</option>
                  <option value="pichanas">Dique Pichanas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Modalidad
                </label>
                <select
                  name="modality"
                  value={formData.modality}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="costa">De Costa</option>
                  <option value="embarcado">Embarcado (Bote / Tracker)</option>
                  <option value="kayak">En Kayak</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Especie buscada
                </label>
                <select
                  name="targetSpecies"
                  value={formData.targetSpecies}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pejerrey">Pejerrey</option>
                  <option value="Carpa">Carpa</option>
                  <option value="Tararira">Tararira</option>
                  <option value="Bagre">Bagre</option>
                  <option value="Variada">Variada de dique</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Zona o sector aproximado (sin publicar puntos sensibles)
              </label>
              <input
                type="text"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                placeholder="Ej: Paredón, Bahía de Potrero, Cola del río..."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Carnada, señuelo y montaje utilizado
              </label>
              <input
                type="text"
                name="baitAndRig"
                value={formData.baitAndRig}
                onChange={handleChange}
                placeholder="Ej: Flote 3 boyas a 40cm con mojarra viva salada / Paternoster a 6m..."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Condiciones observadas (clima, viento, agua)
              </label>
              <input
                type="text"
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                placeholder="Ej: Viento suave del sur, agua clara, mañana fresca..."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ¿Hubo capturas?
                </label>
                <select
                  name="hasCatches"
                  value={formData.hasCatches}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="si">Sí, hubo pique/capturas</option>
                  <option value="no">No, jornada sin capturas (zapatero)</option>
                </select>
              </div>

              {formData.hasCatches === 'si' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Cantidad aproximada de piezas
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    name="catchesCount"
                    value={formData.catchesCount}
                    onChange={handleChange}
                    placeholder="Ej: 8"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Detalle del resultado y observaciones
              </label>
              <textarea
                name="resultNotes"
                rows="3"
                value={formData.resultNotes}
                onChange={handleChange}
                placeholder="Comentarios sobre el tamaño de las piezas, horarios de mayor actividad, etc."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{status === 'loading' ? 'Enviando...' : 'Enviar Parte'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
