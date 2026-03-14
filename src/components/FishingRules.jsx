import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scale, FileText, Anchor, Info, ExternalLink, CalendarDays, ShieldAlert } from 'lucide-react';

const fishingRules = [
    {
        species: 'Pejerrey',
        limit: 'Hasta 30 piezas (varía según dique, ej: San Roque 40, Cruz del Eje 60).',
        size: 'Mínimo 25 cm.',
        season: 'Normalmente veda desde septiembre hasta fines de diciembre (según cada cuerpo de agua).',
        color: 'border-blue-200 bg-blue-50 text-blue-900',
        iconColor: 'text-blue-600'
    },
    {
        species: 'Tararira (Tarucha)',
        limit: 'Pesca y devolución obligatoria en la mayoría de los embalses.',
        size: 'Si se permite sacrificio: Mínimo 40 cm.',
        season: 'Veda natural de primavera (Octubre a Enero) para reproducción.',
        color: 'border-green-200 bg-green-50 text-green-900',
        iconColor: 'text-green-600'
    },
    {
        species: 'Trucha (Común, Arco Iris y Fontinalis)',
        limit: 'Pesca deportiva con devolución. Sacrificio muy limitado (1 a 3 piezas) según el río.',
        size: 'Normalmente prohibida la retención de piezas menores a 20 cm.',
        season: 'Temporada reducida (Generalmente desde Octubre hasta fines de Mayo).',
        color: 'border-amber-200 bg-amber-50 text-amber-900',
        iconColor: 'text-amber-600'
    },
    {
        species: 'Carpa',
        limit: 'Sin límite establecido (especie exótica exenta de cupos).',
        size: 'Sin restricciones.',
        season: 'Todo el año.',
        color: 'border-slate-200 bg-slate-50 text-slate-900',
        iconColor: 'text-slate-600'
    }
];

export default function FishingRules() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Helmet>
                <title>Reglamento y Permisos de Pesca - Pesca Córdoba</title>
                <meta name="description" content="Información actualizada sobre leyes de pesca deportiva, cupos, tamaños mínimos, periodos de veda y cómo obtener tu carnet de pesca en Córdoba." />
            </Helmet>

            <div className="mb-8 text-center sm:text-left">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-3">
                    <Scale className="h-8 w-8 text-slate-700" />
                    Reglamento y Permisos
                </h1>
                <p className="mt-2 text-lg text-slate-600">
                    Información legal, vedas y tramitación del carnet provincial.
                </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-sm border border-blue-200 p-6 md:p-8 mb-8 text-white">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                            <FileText className="h-6 w-6 text-blue-200" />
                            Carnet de Pesca Deportivo
                        </h2>
                        <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                            Es un requisito <b>obligatorio</b> en toda la Provincia de Córdoba. Para poder pescar legalmente tanto de costa como embarcado, se debe poseer este permiso digital, ya que la Policía Ambiental realiza controles regulares.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-sm">
                            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                                <strong>Vigencia:</strong> Anual (dura 1 año desde el pago).
                            </div>
                            <div className="bg-white/10 rounded-lg p-3 border border-white/20">
                                <strong>Exentos:</strong> Jubilados, menores de 18 años y personas con discapacidad (deben tramitarlo igual, pero sin costo).
                            </div>
                        </div>
                        <a 
                            href="https://cidi.cba.gov.ar" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                        >
                            Tramitar en CiDi
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldAlert className="h-6 w-6 text-slate-600" />
                    Cupos, Especies y Vedas
                </h2>
                
                <div className="space-y-4">
                    {fishingRules.map((rule, idx) => (
                        <div key={idx} className={`p-6 rounded-xl border ${rule.color} shadow-sm transition-all hover:shadow-md`}>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Anchor className={`h-5 w-5 ${rule.iconColor}`} />
                                {rule.species}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 p-1 rounded-full bg-white/50 ${rule.iconColor} shadow-xs`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-0.5">Cupo y Extracción</div>
                                        <div className="text-sm font-medium">{rule.limit}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 p-1 rounded-full bg-white/50 ${rule.iconColor} shadow-xs`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M20 12v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><path d="M14 20v-8"></path><path d="M10 20v-8"></path></svg>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-0.5">Tamaño Mínimo</div>
                                        <div className="text-sm font-medium">{rule.size}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className={`mt-0.5 p-1 rounded-full bg-white/50 ${rule.iconColor} shadow-xs`}>
                                        <CalendarDays className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-wide opacity-80 mb-0.5">Temporada / Veda</div>
                                        <div className="text-sm font-medium">{rule.season}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex gap-4 text-slate-700">
                <Info className="h-6 w-6 text-slate-500 flex-shrink-0" />
                <div className="text-sm">
                    <p className="font-semibold mb-1">Importante</p>
                    <p>Las regulaciones están sujetas a modificaciones anuales por parte de la Secretaría de Ambiente. Se recomienda consultar al menos una vez por temporada las actualizaciones específicas en el Boletín Oficial de la Provincia, ya que diferentes diques pueden poseer normativas especiales debido a rescates ecológicos.</p>
                </div>
            </div>
        </div>
    );
}
