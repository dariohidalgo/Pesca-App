import { Layers, Tag, X } from 'lucide-react';
import { useState } from 'react';

const KNOTS_DATA = [
    {
        "id": "medio-nudo-barril-asegurado",
        "name": "Medio nudo barril asegurado",
        "description": "Nudo simple y resistente para sujetar anzuelos y emerillones a líneas de hasta 25 kg.",
        "category": "Línea al aparejo final",
        "image": "/img/Medio nudo barril asegurado.webp",
        "steps": [
            "Atraviese la anilla y retuerza el extremo con el cuerpo de la línea.",
            "Realice de 3 a 6 vueltas y pase el extremo por la primera.",
            "Pase el extremo por el bucle superior y apriete."
        ],
        "badges": [
            "Línea al aparejo final"
        ]
    },
    {
        "id": "nudo-palomar",
        "name": "Nudo Palomar",
        "description": "Rápido de hacer y suficientemente sólido para la mayoría de las situaciones.",
        "category": "Línea al aparejo final",
        "image": "/img/nudopalomar.jpg",
        "steps": [
            "Haga un bucle en la línea y páselo por la anilla del anzuelo.",
            "Forme un medio nudo.",
            "Pase el bucle por todo el anzuelo y cierre tirando de ambos extremos."
        ],
        "badges": [
            "Línea al aparejo final"
        ]
    },
    {
        "id": "nudo-centauri",
        "name": "Nudo Centauri",
        "description": "Ideal para anzuelos pequeños y emerillones; minimiza la fricción y no retuerce la línea.",
        "category": "Línea al aparejo final",
        "image": "/img/Nudo Centauri.jpg",
        "steps": [
            "Pase el extremo por la anilla y luego por debajo de la línea principal formando un bucle.",
            "Repita el proceso creando tres bucles.",
            "Pase el extremo por el centro de los tres bucles y deslice hasta la anilla."
        ],
        "badges": [
            "Línea al aparejo final"
        ]
    },
    {
        "id": "nudo-uni",
        "name": "Nudo Uni",
        "description": "Ampliamente utilizado para sujetar anzuelos, anillas y emerillones.",
        "category": "Línea al aparejo final",
        "image": "/img/NudoUni.webp",
        "steps": [
            "Atraviese la anilla dejando que el anzuelo cuelgue de un bucle.",
            "Forme otro bucle rodeando la línea principal.",
            "Dé 4 vueltas alrededor de las dos líneas por el interior del bucle y deslice hasta la anilla."
        ],
        "badges": [
            "Línea al aparejo final"
        ]
    },
    {
        "id": "bucle-perfection",
        "name": "Bucle Perfection",
        "description": "Utilizado para sujetar señuelos a monofilamentos gruesos mediante un bucle.",
        "category": "Nudos para atar bucles",
        "image": "/img/Bucle Perfection.jpg",
        "steps": [
            "Haga un medio nudo sin cerrar y pase el extremo por la anilla del señuelo.",
            "Vuelva a pasar el extremo por el medio nudo.",
            "Rodee la línea principal, pase por debajo del cruce inicial y luego por el hueco del paso anterior; apriete."
        ],
        "badges": [
            "Nudos para atar bucles"
        ]
    },
    {
        "id": "nudo-de-cirujano",
        "name": "Nudo de Cirujano",
        "description": "Muy simple y rápido para construir bajos de línea de mosca o sujetar derivaciones.",
        "category": "Nudos para pesca con mosca",
        "image": "/img/Nudo de Cirujano.webp",
        "steps": [
            "Coloque la línea principal y la derivación una al lado de la otra.",
            "Haga un medio nudo con ambas líneas.",
            "Dé una segunda vuelta al medio nudo (total 4 vueltas y 5 cruces) y apriete firmemente."
        ],
        "badges": [
            "Nudos pesca mosca"
        ]
    },
    {
        "id": "nudo-albright",
        "name": "Nudo Albright",
        "description": "Método para unir una línea fina a un monofilamento más grueso.",
        "category": "Nudos de línea a bajo de línea",
        "image": "/img/Nudo Albright.webp",
        "steps": [
            "Doble el monofilamento grueso y pase la línea fina por el bucle.",
            "Enrolle la línea fina hacia abajo del bucle grueso 5 veces y luego 5 veces hacia arriba sobre las anteriores.",
            "Pase el extremo por el bucle grueso y apriete."
        ],
        "badges": [
            "Línea a bajo"
        ]
    }
];

export default function KnotsCatalog() {
    const [selectedKnot, setSelectedKnot] = useState(null);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 mt-10">
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight">Catálogo de Nudos</h2>
                <p className="text-lg text-slate-500 mt-3 max-w-2xl mx-auto">
                    Aprende los nudos más efectivos para distintas modalidades de pesca.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {KNOTS_DATA.map((knot) => (
                    <div
                        key={knot.id}
                        className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 cursor-pointer transition-all duration-300 flex flex-col"
                        onClick={() => setSelectedKnot(knot)}
                    >
                        <div className="relative h-48 bg-slate-200 overflow-hidden group">
                            <img
                                src={knot.image}
                                alt={`Imagen de ${knot.name}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h3 className="absolute bottom-4 left-4 right-4 text-xl sm:text-2xl font-bold text-white drop-shadow-sm leading-tight">{knot.name}</h3>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <p className="text-slate-600 mb-5 text-sm leading-relaxed line-clamp-2">{knot.description}</p>

                            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2 mt-auto">
                                <Tag className="h-4 w-4 text-slate-400 mt-1" />
                                {knot.badges.map((badge, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                                        title={knot.category}
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedKnot && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm transition-opacity"
                    onClick={() => setSelectedKnot(null)}
                >
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedKnot(null)}
                            className="absolute z-10 top-4 right-4 p-2 bg-white/50 backdrop-blur-md hover:bg-white/80 rounded-full text-slate-800 transition-colors shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-full md:w-1/2 md:min-h-[400px] bg-slate-900 flex items-center justify-center p-4">
                            <img
                                src={selectedKnot.image}
                                alt={selectedKnot.name}
                                className="max-w-full max-h-[40vh] md:max-h-[80vh] object-contain drop-shadow-lg rounded-lg"
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
                            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 pr-8">{selectedKnot.name}</h3>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedKnot.badges.map((badge, idx) => (
                                    <span key={idx} className="px-3 py-1 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                        {badge}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                                {selectedKnot.description}
                            </p>

                            {selectedKnot.steps && selectedKnot.steps.length > 0 && (
                                <div className="mt-auto">
                                    <h4 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
                                        <Layers className="h-5 w-5" />
                                        Instrucciones Paso a Paso
                                    </h4>
                                    <ul className="space-y-4">
                                        {selectedKnot.steps.map((step, index) => (
                                            <li key={index} className="flex gap-4 items-start text-slate-700">
                                                <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs sm:text-sm shadow-sm mt-0.5">
                                                    {index + 1}
                                                </span>
                                                <span className="text-sm sm:text-base leading-relaxed">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}