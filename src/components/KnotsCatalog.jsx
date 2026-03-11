import { Image, Layers, Scissors, Tag } from 'lucide-react';

const KNOTS_DATA = [
    {
        id: 'clinch',
        name: 'Nudo Clinch Mejorado',
        description: 'El nudo más confiable y fácil para atar sedal a un anzuelo, señuelo o esmerillón.',
        image: 'https://images.unsplash.com/photo-1599507941014-9989b537e24a?auto=format&fit=crop&w=600&q=80',
        steps: [
            'Pasa la línea por el ojal del anzuelo.',
            'Da 5-7 vueltas alrededor de la línea principal.',
            'Pasa el extremo por el primer lazo cerca del ojal.',
            'Pasa el extremo de vuelta por el lazo grande recién creado.',
            'Humedece y tira firmemente para ajustar.'
        ],
        badges: ['Nylon', 'Fluorocarbono', 'Básico']
    },
    {
        id: 'rapala',
        name: 'Nudo Rapala',
        description: 'Crea un lazo fijo que permite al señuelo moverse libremente en el agua con una acción natural.',
        image: 'https://images.unsplash.com/photo-1544258941-bd56a4b18dfb?auto=format&fit=crop&w=600&q=80',
        steps: [
            'Haz un nudo simple sin apretar en la línea principal.',
            'Pasa el extremo por el ojal del señuelo y luego por el nudo simple.',
            'Da 3 vueltas alrededor de la línea principal.',
            'Pasa el extremo nuevamente por el nudo simple original.',
            'Humedece y ajusta tirando de ambos lados.'
        ],
        badges: ['Señuelos', 'Fluorocarbono', 'Movimiento Libre']
    },
    {
        id: 'sangre',
        name: 'Nudo de Sangre',
        description: 'Ideal para unir dos líneas de monofilamento de diámetro similar con alta resistencia.',
        image: 'https://images.unsplash.com/photo-1504855233158-9ff1217e997a?auto=format&fit=crop&w=600&q=80',
        steps: [
            'Cruza las dos líneas superponiéndolas.',
            'Da 5 vueltas con una línea sobre la otra y vuelve al centro.',
            'Haz lo mismo con la otra línea en dirección opuesta.',
            'Pasa ambos extremos por el espacio central creado.',
            'Tira de las líneas principales lentamente para ceñir.'
        ],
        badges: ['Unión de líneas', 'Nylon', 'Avanzado']
    }
];

export default function KnotsCatalog() {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 mt-10">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Catálogo de Nudos</h2>
                <p className="text-lg text-slate-500 mt-3 max-w-2xl mx-auto">
                    Aprende paso a paso los nudos más efectivos para distintas modalidades de pesca.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {KNOTS_DATA.map((knot) => (
                    <div key={knot.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">

                        <div className="relative h-48 bg-slate-200 overflow-hidden group">
                            <img
                                src={knot.image}
                                alt={`Imagen de ${knot.name}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 right-4 text-2xl font-bold text-white drop-shadow-sm">{knot.name}</h3>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-slate-600 mb-5 text-sm leading-relaxed">{knot.description}</p>

                            <div className="mb-6 flex-1">
                                <h4 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-2">
                                    <Layers className="h-4 w-4" />
                                    Instrucciones Paso a Paso
                                </h4>
                                <ul className="space-y-3">
                                    {knot.steps.map((step, index) => (
                                        <li key={index} className="flex gap-3 items-start text-sm text-slate-700">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 mt-auto">
                                <Tag className="h-4 w-4 text-slate-400 mt-1" />
                                {knot.badges.map((badge, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
