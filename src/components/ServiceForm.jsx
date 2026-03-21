import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Helmet } from 'react-helmet-async';

const ServiceForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: 'guide', // default
        contact: '',
        location: '',
        description: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await addDoc(collection(db, 'services'), {
                ...formData,
                status: 'pending',
                createdAt: serverTimestamp()
            });

            // Enviar notificación por email
            await emailjs.send(
                'service_6qv9ymk',
                'template_3773hv4',
                {
                    service_name: formData.name,
                    service_type: 
                        formData.type === 'guide' ? 'Guía de Pesca' : 
                        formData.type === 'boat_rental' ? 'Alquiler de Botes' : 
                        formData.type === 'raft_rental' ? 'Alquiler de Balsas' : 
                        'Venta de Carnada',
                    service_contact: formData.contact,
                    service_location: formData.location,
                    service_description: formData.description,
                },
                'WGVqfAUeMvV26IdHZ'
            );

            setStatus('success');
            setFormData({
                name: '',
                type: 'guide',
                contact: '',
                location: '',
                description: ''
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud Enviada!</h2>
                <p className="text-slate-600 mb-6">Tu servicio ha sido registrado y está a la espera de autorización.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Cargar otro servicio
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-12 mb-20 p-8 bg-white rounded-2xl shadow-xl">
            <Helmet>
                <title>Sumar Servicio de Pesca - Pesca Córdoba</title>
                <meta name="description" content="Publicá tu servicio de guía de pesca, alquiler de botes o venta de carnada en Pesca Córdoba. Llegá a cientos de pescadores." />
            </Helmet>

            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Cargar Nuevo Servicio</h2>
            <p className="text-slate-500 mb-8">Completa el formulario para cargar tu guía de pesca, alquiler de botes/balsas o venta de carnada. El servicio será visible una vez que sea autorizado.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre del Servicio / Guía</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Ej: Guía Juan Pérez"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Servicio</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="guide">Guía de Pesca</option>
                            <option value="boat_rental">Alquiler de Botes</option>
                            <option value="raft_rental">Alquiler de Balsas</option>
                            <option value="bait_seller">Venta de Carnada</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contacto (WhatsApp / Teléfono / IG)</label>
                    <input
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Ej: +54 351 1234567"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ubicación / Dique</label>
                    <input
                        required
                        type="text"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Ej: Dique San Roque"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Descripción de los servicios</label>
                    <textarea
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Describe lo que ofreces, embarcación, equipos, etc."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-medium">Ocurrió un error al cargar el servicio. Inténtalo de nuevo.</p>
                    </div>
                )}

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {status === 'loading' ? 'Enviando...' : (
                        <>
                            <Send className="w-5 h-5" />
                            Enviar para revisión
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ServiceForm;
