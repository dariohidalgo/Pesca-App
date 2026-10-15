import React, { useState, useRef } from 'react';
import { X, Send, CheckCircle, Camera, Trash2, AlertCircle } from 'lucide-react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDamById } from '../data/damsData';

const DAMS_OPTIONS = [
  { id: 'san-roque', name: 'Dique San Roque' },
  { id: 'los-molinos', name: 'Dique Los Molinos' },
  { id: 'embalse', name: 'Embalse Río Tercero' },
  { id: 'cruz-del-eje', name: 'Dique Cruz del Eje' },
  { id: 'la-vina', name: 'Dique La Viña' },
  { id: 'piedras-moras', name: 'Dique Piedras Moras' },
  { id: 'pichanas', name: 'Dique Pichanas' }
];

export default function ReportSubmitModal({ isOpen, onClose, onSubmitted }) {
  const [formData, setFormData] = useState({
    damId: 'san-roque',
    tripDate: new Date().toISOString().split('T')[0],
    modality: 'costa',
    depthAndBait: '',
    comment: '',
    author: '',
    photo: ''
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setFormData({
      damId: 'san-roque',
      tripDate: new Date().toISOString().split('T')[0],
      modality: 'costa',
      depthAndBait: '',
      comment: '',
      author: '',
      photo: ''
    });
    setPhotoPreview(null);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('La foto debe ser menor a 5MB.');
      return;
    }

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.7);
            setPhotoPreview(compressed);
            setFormData(prev => ({ ...prev, photo: compressed }));
          } else {
            setPhotoPreview(event.target.result);
            setFormData(prev => ({ ...prev, photo: event.target.result }));
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, photo: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const targetDam = getDamById(formData.damId);

    const newReport = {
      damId: formData.damId,
      damName: targetDam?.name || 'Dique de Córdoba',
      tripDate: formData.tripDate,
      publishDate: new Date().toISOString().split('T')[0],
      modality: formData.modality, // 'costa' | 'embarcado'
      depthAndBait: formData.depthAndBait.trim(),
      baitAndRig: formData.depthAndBait.trim(), // retrocompatibilidad
      comment: formData.comment.trim(),
      notes: formData.comment.trim(), // retrocompatibilidad
      zone: targetDam?.name || 'Zona general',
      targetSpecies: 'Variada / Pejerrey',
      conditions: 'Aporte de la comunidad',
      result: {
        hasCatches: true,
        notes: formData.comment.trim()
      },
      author: formData.author.trim() || 'Pescador anónimo',
      photo: formData.photo || null,
      pending: true, // Requisito estricto: guardado como pendiente
      status: 'pending', // Requisito de moderación y reglas
      createdAt: serverTimestamp ? serverTimestamp() : new Date()
    };

    try {
      if (db) {
        await addDoc(collection(db, 'fishing_reports'), newReport);
      }
      setStatus('success');
      if (onSubmitted) {
        onSubmitted(newReport);
      }
    } catch (err) {
      console.error('Error al guardar parte de pesca:', err);
      setErrorMessage('No se pudo enviar el reporte. Por favor verificá la conexión e intentá de nuevo.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
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
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              ¡Parte de Pesca Recibido!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Muchas gracias por compartir tu experiencia. El reporte quedó guardado con estado pendiente (<code>pending: true</code>) y será revisado antes de publicarse en el listado general.
            </p>
            <button
              onClick={handleClose}
              className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Aceptar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Aporte de la comunidad
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
                Subir mi Parte
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Compartí los datos de tu salida. El parte se guardará para moderación antes de ser visible públicamente.
              </p>
            </div>

            {status === 'error' && errorMessage && (
              <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Dique y Fecha */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="modal-damId" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dique
                </label>
                <select
                  id="modal-damId"
                  name="damId"
                  value={formData.damId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DAMS_OPTIONS.map(dam => (
                    <option key={dam.id} value={dam.id}>{dam.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-tripDate" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fecha
                </label>
                <input
                  id="modal-tripDate"
                  type="date"
                  name="tripDate"
                  value={formData.tripDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Modalidad */}
            <div>
              <label htmlFor="modal-modality" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Modalidad
              </label>
              <select
                id="modal-modality"
                name="modality"
                value={formData.modality}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="costa">Costa</option>
                <option value="embarcado">Embarcado</option>
              </select>
            </div>

            {/* Profundidad / Encarne */}
            <div>
              <label htmlFor="modal-depthAndBait" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Profundidad / Encarne
              </label>
              <input
                id="modal-depthAndBait"
                type="text"
                name="depthAndBait"
                value={formData.depthAndBait}
                onChange={handleChange}
                placeholder="Ej: Al barro con mojarra viva"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Comentario breve */}
            <div>
              <label htmlFor="modal-comment" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Comentario breve
              </label>
              <textarea
                id="modal-comment"
                name="comment"
                rows="3"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Contanos brevemente sobre el pique, clima o recomendaciones..."
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {/* Nombre del pescador (opcional) */}
            <div>
              <label htmlFor="modal-author" className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nombre del pescador <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <input
                id="modal-author"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Ej: Martín G. (dejar vacío para anónimo)"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Foto */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Foto de la salida <span className="text-slate-400 font-normal">(opcional)</span>
              </label>

              {photoPreview ? (
                <div className="relative inline-block mt-1">
                  <img
                    src={photoPreview}
                    alt="Vista previa de la captura"
                    className="w-32 h-24 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow transition-colors"
                    title="Quitar foto"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mt-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="modal-photo-file"
                      accept="image/*"
                      onChange={handlePhotoFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="modal-photo-file"
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold cursor-pointer transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      <Camera className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span>Seleccionar foto</span>
                    </label>
                    <span className="text-xs text-slate-400">o ingresar URL abajo</span>
                  </div>
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo.startsWith('data:') ? '' : formData.photo}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData(prev => ({ ...prev, photo: val }));
                      setPhotoPreview(val.trim() || null);
                    }}
                    placeholder="https://ejemplo.com/mifoto.jpg"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                <span>{status === 'loading' ? 'Enviando...' : 'Subir Parte'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
