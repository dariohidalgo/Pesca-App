import React from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { Calendar, User, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const POSTS = [
    {
        id: 1,
        title: 'Secretos para la pesca de Tarariras en verano',
        description: 'Aprende qué equipos, señuelos y técnicas necesitas para pescar tarariras de manera deportiva en Argentina.',
        date: '20 de Diciembre, 2025',
        author: 'Darío Hidalgo',
        readTime: '5 min lectura',
        content: `
# Secretos para la pesca de Tarariras en verano

La tararira (hoplias malabaricus), también conocida como "tarucha", es uno de los peces más deportivos y agresivos de nuestras aguas. Su pesca con señuelos o mosca en verano regala ataques explosivos en superficie que cualquier pescador recordará por siempre.

## Equipo Recomendado

Para dominar a este predador, necesitas un equipo con buena potencia de clavada:

* **Caña:** De 1.80m a 2.10m, acción rápida o extra-rápida (10-20 lbs).
* **Reel:** Huevito (Baitcasting) o frontal mediano (tamaño 2000-2500), cargado con **multifilamento de 40 a 50 lbs**.
* **Leader:** ¡Fundamental! Un leader de acero o fluorocarbono grueso (0.60mm+) es obligatorio, ya que sus dientes afilados cortarán cualquier nylon estándar en segundos.

## Los Mejores Señuelos

La tarucha es territorial y ataca por hambre o por irritación:

1. **Ranas de goma (Superficie):** El señuelo estrella. Ideal para pescar sobre yuyos, camalotes o vegetación densa sin engancharse (anti-enganche).
2. **Paseantes y Poppers:** Excelentes cuando el agua está limpia y más calmada. El ruido del popper saca a la tararira de su escondite.
3. **Spinners y Cucharas:** Muy efectivos para buscarla a media agua o cuando las condiciones están difíciles.

## Consejos Finales

Busca a las tarariras en aguas bajas, cálidas y con buena oxigenación. Zonas con juncos o troncos sumergidos son sus apostaderos favoritos. Y recuerda siempre: **pesca y devolución**. Cuidemos a este gran guerrero de nuestras lagunas.
`
    },
    {
        id: 2,
        title: 'Mejores equipos para pesca de pejerrey en invierno en Córdoba',
        description: 'Guía completa sobre cañas, reeles y aparejos para tener éxito en la pesca del pejerrey durante la temporada invernal en los diques de Córdoba.',
        date: '15 de Mayo, 2026',
        author: 'Darío Hidalgo',
        readTime: '4 min lectura',
        content: `
# Mejores equipos para pesca de pejerrey en invierno en Córdoba

La pesca del pejerrey durante el invierno cordobés es una de las actividades más apasionantes para los pescadores deportivos. Las heladas mañanas en el San Roque o Los Molinos exigen no solo coraje, sino también el equipo adecuado.

## La Caña Ideal

Para el pejerrey, la sensibilidad es clave. Busca cañas **telescópicas de 4 a 4.5 metros**, preferentemente de grafito de alto módulo. Esto te permitirá:
- Detectar piques sutiles.
- Clavar a distancia con precisión.
- Mantener una postura cómoda de pesca (línea de flote).

## Reeles y Sedal

Un reel frontal tamaño *1000 a 2500* es más que suficiente. Lo fundamental aquí es el balance con la caña.

En cuanto al sedal, te recomendamos usar **multifilamento de 0.12mm a 0.16mm** para la línea madre, ya que al no tener memoria ni elasticidad, transmite el pique de forma instantánea. Para las brazoladas (donde van los anzuelos), usa fluorocarbono de 0.25mm a 0.30mm, que es invisible bajo el agua.

### Tipos de Líneas (Aparejos)
1. **Líneas de 3 boyas**: Las más tradicionales. Los colores limón o fucsia son excelentes para días nublados.
2. **Paternoster**: Esencial cuando el pejerrey se encuentra a mayor profundidad y no sube a comer a flote.
3. **Línea de vuelo**: Para cuando el pescado está muy activo en la superficie.

## Conclusión

El éxito en la pesca del "Flecha de Plata" radica en los detalles. No olvides un buen abrigo, un termo con mate caliente y la paciencia necesaria. ¡Buena pesca!
`
    },
    {
        id: 3,
        title: 'Armado de líneas infalibles para la pesca de Pejerrey',
        description: 'Todo lo que necesitas saber para armar líneas de flote, paternoster y de fondo para pescar pejerreyes.',
        date: '14 de Marzo, 2026',
        author: 'Darío Hidalgo',
        readTime: '6 min lectura',
        content: `
# Armado de líneas infalibles para la pesca de Pejerrey

El pejerrey es, sin lugar a dudas, la especie predilecta de muchos pescadores. Y si hay algo que define el éxito en su pesca, es la línea o aparejo que utilicemos. Aquí repasamos las mejores líneas para que tu jornada rinda al máximo.

## Línea de Flote (3 Boyas)

Es la línea más clásica y emocionante, ya que permite ver la llevada en tiempo real. 
- **Boyas:** Las preferidas son las de formato "chupetona" o "lágrima" en colores vibrantes (fucsia, verde limón o negro si hay mucho reflejo).
- **Armado:** Sobre una madre de nylon (0.40 mm), se colocan tres boyas separadas por 1 metro a 1.20 metros entre sí, fijadas con nudos corredizos. 
- **Brazoladas:** Dependen del día, pero se aconseja empezar probando entre 15 y 40 cm de profundidad. Es vital usar fluorocarbono para las brazoladas (0.23 a 0.28 mm) para que sean invisibles bajo el agua.

## El Versátil Paternoster

Cuando el pejerrey no está cazando en superficie y se encuentra a media agua o cerca del fondo, el paternoster es el salvavidas.
- Esta línea usa una boya zanahoria grande arriba (a veces corrediza) y un plomito al final de la madre.
- Permite colocar 2 o 3 anzuelos a distintas profundidades (ej: uno a 1 m, uno a 2 m y uno cerca del fondo).
- Ideal para diques profundos o lagunas en días de mucho frío.

## Línea de Vuelo o "Tramposa"

Para esos días de laguna planchada o cuando el pejerrey come muy sutil y suelta la carnada al sentir resistencia.
- Se arma agregando una mini-boya (Yo-yo o pilotín) muy cerca del anzuelo en la brazolada. 
- Esto hace que cuando el pez tome la carnada, no sienta la resistencia de la boya principal de inmediato, dándole tiempo a tragar y dándote esos segundos vitales para clavar.

## Anzuelos y Carnadas

En todos los casos, los anzuelos número 1, 2 o 3 (formato MUSTAD 1687 o similares de paleta o de ojal fino) son los más recomendados. La carnada reina indiscutida es la mojarra viva, aunque el filete de dientudo también suele dar grandes sorpresas.
`
    },
    {
        id: 4,
        title: 'Pesca de carpas en nuestros lagos cordobeses',
        description: 'Técnicas, cebados y el armado de líneas tipo "feeder" y coreanas para pescar las grandes carpas de nuestros diques.',
        date: '14 de Marzo, 2026',
        author: 'Darío Hidalgo',
        readTime: '7 min lectura',
        content: `
# Pesca de carpas en nuestros lagos cordobeses

La carpa (cyprinus carpio) se ha ganado un lugar de respeto en la pesca deportiva. Su brutal fuerza, carreras interminables y la astucia que requiere su captura, la convierten en un trofeo muy buscado en nuestros lagos y diques (como el San Roque, Los Molinos y Embalse). 

## La Paciencia como Técnica Principal

Pescar carpas no es de ansiedad; requiere preparación del pesquero. Se dice que el "cebado" representa el 70% del éxito.
- **Cebadores (Feeder):** Emplear líneas que lleven un resorte cebador (feeder) en el que se amasa pasta o masa atrayente. Al caer al agua, esto crea una nube de olor que atrae a los peces.
- **El Cebado Previo:** Arrojar maíz fermentado o preparado, junto con pellets, en la zona de pesca escogida desde el día anterior o durante las primeras horas de la mañana, hará que las carpas se acerquen y se confíen.

## Equipos Potentes

Si bien la carpa puede tomar una carnada pequeña, cuando se clava una de 5 o más kilos, la pelea es monumental.
- **Cañas:** Se recomiendan cañas de 2.70 a 3.60 m con buena acción (pesada o medio-pesada) para soportar los embates y poder lanzar plomos y cajas cebadoras de peso.
- **Reel:** Con buena capacidad de carga (tamaño 4000 a 6000), preferiblemente con sistema "Baitrunner" (doble freno), lo que permite que el pez tome hilo libremente en la primera corrida sin sentir resistencia ni llevarse la caña al agua.
- **Nylon:** Un buen monofilamento de 0.35 mm a 0.40 mm es ideal por su resistencia a la abrasión (las carpas suelen buscar obstáculos en el fondo).

## Línea Coreana (Hair Rig)

Para los más puristas del 'Carpmfishing', la línea coreana o un montaje *Hair Rig* es fundamental. El anzuelo queda completamente desnudo y la carnada (un grano de maíz duro o bollie) cuelga de un pequeño "pelo" de hilo debajo de la curva del anzuelo. Cuando la carpa absorbe la comida, el anzuelo desnudo entra en su boca y asegura una clavada perfecta en el labio inferior.

## Masas y Carnadas

La carpa es omnívora y su sentido del gusto y olfato están muy desarrollados. Las masas dulces (con esencia de vainilla, anís, ajo, polenta y harina de trigo) o los clásicos granos de maíz cocido y fermentado nunca fallan. 

Armate de paciencia, prepara buenos posacañas y ajusta bien el freno del reel. ¡La alarma de pique no tardará en sonar!
`
    }
];

export default function BlogPost() {
    const [selectedPostId, setSelectedPostId] = React.useState(null);

    const selectedPost = POSTS.find(p => p.id === selectedPostId);

    return (
        <>
            <Helmet>
                <title>{selectedPost ? `${selectedPost.title} | PescaApp` : 'Blog de Pesca | PescaApp'}</title>
                <meta name="description" content={selectedPost ? selectedPost.description : "Lee nuestros últimos artículos sobre técnicas, equipos y consejos para la pesca deportiva."} />
                <meta property="og:title" content={selectedPost ? `${selectedPost.title} | PescaApp` : 'Blog de Pesca | PescaApp'} />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 mt-8">
                {selectedPost ? (
                    <div className="max-w-3xl mx-auto">
                        <button 
                            onClick={() => setSelectedPostId(null)} 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver a los artículos
                        </button>
                        
                        <article className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12">
                            <header className="mb-10 border-b border-slate-100 pb-8">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        {selectedPost.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        {selectedPost.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        {selectedPost.readTime}
                                    </div>
                                </div>
                            </header>

                            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:hidden prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-a:text-blue-600 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ ...props }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2" {...props} />,
                                        h3: ({ ...props }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-800" {...props} />,
                                        p: ({ ...props }) => <p className="text-slate-600 leading-relaxed mb-6 text-lg" {...props} />,
                                        ul: ({ ...props }) => <ul className="list-disc pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                        ol: ({ ...props }) => <ol className="list-decimal pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                        li: ({ ...props }) => <li className="pl-2" {...props} />,
                                        strong: ({ ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
                                    }}
                                >
                                    {selectedPost.content}
                                </ReactMarkdown>
                            </div>
                        </article>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver al Inicio
                            </Link>
                            <h1 className="text-4xl font-extrabold text-slate-900 mt-6 tracking-tight">Últimos Artículos</h1>
                            <p className="text-slate-500 mt-2 text-lg">Consejos y guías para pescar mejor.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {POSTS.map(post => (
                                <article 
                                    key={post.id} 
                                    onClick={() => setSelectedPostId(post.id)}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full group"
                                >
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 mb-6 line-clamp-3">
                                            {post.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto border-t border-slate-50 pt-6">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-slate-500 font-medium">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                    {post.author}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                                    {post.date}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <span>Leer más</span>
                                                <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
