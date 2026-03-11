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
    }
];

export default function BlogPost() {
    return (
        <>
            <Helmet>
                <title>Blog de Pesca | PescaApp</title>
                <meta name="description" content="Lee nuestros últimos artículos sobre técnicas, equipos y consejos para la pesca deportiva." />
                <meta property="og:title" content="Blog de Pesca | PescaApp" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 mt-8">
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver al Inicio
                    </Link>
                    <h1 className="text-4xl font-extrabold text-slate-900 mt-6 tracking-tight">Últimos Artículos</h1>
                    <p className="text-slate-500 mt-2 text-lg">Consejos y guías para pescar mejor.</p>
                </div>

                <div className="space-y-12">
                    {POSTS.map(post => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 transition-shadow hover:shadow-md">
                            <header className="mb-10 border-b border-slate-100 pb-8">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                                    {post.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        {post.author}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-slate-400" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-slate-400" />
                                        {post.readTime}
                                    </div>
                                </div>
                            </header>

                            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:hidden prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-a:text-blue-600 prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600">
                                <ReactMarkdown
                                    components={{
                                        h2: ({ node, ...props }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2" {...props} />,
                                        h3: ({ node, ...props }) => <h4 className="text-xl font-bold mt-6 mb-3 text-slate-800" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-slate-600 leading-relaxed mb-6 text-lg" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 text-slate-600 text-lg space-y-2" {...props} />,
                                        li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900" {...props} />,
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}
