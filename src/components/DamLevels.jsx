import React from 'react';
import SEO from './SEO';
import { Waves, ExternalLink, Info, MapPin, Fish, AlertCircle } from 'lucide-react';
import SchemaOrg from './SchemaOrg';
import AdBanner from './AdBanner';
import DamWaterLevelIndicator from './DamWaterLevelIndicator';

const DAM_REFERENCE_DATA = [
  {
    id: 'san-roque',
    name: 'Dique San Roque',
    location: 'Valle de Punilla',
    spillwayLevel: '35.30 m',
    basin: 'Cuenca del Río Suquía (Río San Antonio y Río Cosquín)',
    depthAverage: 'Aprox. 16 a 25 m en zona de garganta',
    species: ['Pejerrey', 'Carpa', 'Tararira'],
    fishingAdvice: 'Con cota cercana al vertedero, las bahías someras (como la desembocadura del San Antonio y costas de Villa Carlos Paz) concentran tarariras y carpas. En bajantes pronunciadas, los cardúmenes de pejerrey se desplazan hacia el centro del embalse y el paredón.'
  },
  {
    id: 'los-molinos',
    name: 'Dique Los Molinos',
    location: 'Valle de Calamuchita',
    spillwayLevel: '53.00 m',
    basin: 'Ríos Los Espinillos, del Medio, San Pedro y Los Reartes',
    depthAverage: 'Hasta 50 m en zonas profundas',
    species: ['Pejerrey', 'Carpa', 'Tararira'],
    fishingAdvice: 'Embalse de aguas limpias y profundas. Con niveles altos, las bahías de Potrero de Garay y la desembocadura de Los Espinillos ofrecen excelente pesca de pejerrey a flote. En bajantes, la pesca se realiza fondeada o al garete hacia el centro del espejo de agua.'
  },
  {
    id: 'embalse',
    name: 'Embalse de Río Tercero',
    location: 'Valle de Calamuchita',
    spillwayLevel: '46.50 m',
    basin: 'Ríos Santa Rosa, Grande, Amboy, Quillinzo y La Cruz',
    depthAverage: 'Gran superficie hídrica (más de 5.400 ha)',
    species: ['Pejerrey', 'Tararira', 'Carpa', 'Bagre'],
    fishingAdvice: 'Es el embalse más extenso de Córdoba. Sus múltiples brazos y bahías permiten encontrar reparo aún con viento. El nivel del agua influye directamente en el acceso a las bajadas naturales de lancha y en la actividad de las colas de los ríos afluentes.'
  },
  {
    id: 'cruz-del-eje',
    name: 'Dique Cruz del Eje',
    location: 'Noroeste Cordobés',
    spillwayLevel: '37.20 m',
    basin: 'Ríos San Marcos, Quilpo y Candelaria',
    depthAverage: 'Aprox. 20 a 30 m',
    species: ['Pejerrey', 'Tararira', 'Carpa'],
    fishingAdvice: 'Famoso por albergar pejerreyes lomo negro de gran porte. En bajantes severas emergen bancos de arena y estructuras rocosas que demandan precaución al navegar, pero concentran peces en los canales principales.'
  },
  {
    id: 'pichanas',
    name: 'Dique Pichanas',
    location: 'Departamento Cruz del Eje',
    spillwayLevel: '44.00 m',
    basin: 'Río Pichanas y afluentes serranos',
    depthAverage: 'Embalse encajonado de aguas claras',
    species: ['Pejerrey', 'Tararira', 'Carpa'],
    fishingAdvice: 'Pesquero agreste con pendientes pronunciadas. Requiere consultar el acceso por caminos de tierra tras lluvias en la cuenca. Muy sensible a frentes de viento por su topografía serrana.'
  },
  {
    id: 'la-vina',
    name: 'Dique La Viña (Medina Allende)',
    location: 'Valle de Traslasierra',
    spillwayLevel: '100.50 m',
    basin: 'Río Los Sauces y cuenca de Traslasierra',
    depthAverage: 'Paredón de más de 100 m de altura',
    species: ['Pejerrey', 'Carpa'],
    fishingAdvice: 'Uno de los paredones más altos de Sudamérica. La pesca embarcada exige fondeos largos o pesca suspendida a profundidad en paternosters calibrados para gran columna de agua.'
  }
];

export default function DamLevels() {
  const canonicalUrl = 'https://pesca-app.com/diques';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO
        title="Nivel y Fichas Técnicas de Diques - Pesca Córdoba"
        description="Datos de referencia hidrográfica, cotas de vertedero y comportamiento de pesca en los principales diques y embalses de Córdoba."
        canonical="diques"
      />

      <SchemaOrg schema={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Nivel y Fichas Técnicas de Diques de Córdoba",
        "description": "Información hidrológica de referencia y cotas de vertedero para pesca deportiva en embalses de Córdoba, Argentina.",
        "url": canonicalUrl
      }} />

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center sm:justify-start gap-3">
          <Waves className="h-8 w-8 text-cyan-600" />
          Fichas Hidrológicas de Diques
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
          Cotas de vertedero, características de cuenca y lectura del agua para planificar tu jornada de pesca en Córdoba.
        </p>
      </div>

      {/* Nota de transparencia sobre datos oficiales */}
      <div className="mb-8 bg-blue-50 dark:bg-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 text-slate-700 dark:text-slate-300">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-base">Transparencia sobre mediciones diarias</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Pesca Córdoba no presenta estimaciones simuladas como datos actuales. Las cotas diarias oficiales son medidas y publicadas por la <strong>Administración Provincial de Recursos Hídricos (APRHI)</strong> del Gobierno de Córdoba. Podés consultar el parte hidrológico oficial actualizado directamente en su sitio institucional.
              </p>
            </div>
          </div>
          <a
            href="https://www.aprhi.gob.ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors shrink-0 shadow-sm"
          >
            Reporte Diario APRHI
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DAM_REFERENCE_DATA.map((dam) => (
          <div key={dam.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">{dam.name}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {dam.location}
                </span>
              </div>
              <DamWaterLevelIndicator damId={dam.id} size="xs" />
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 mb-4 border border-slate-100 dark:border-slate-800">
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">Cota oficial vertedero</div>
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400 tracking-tight mt-0.5">{dam.spillwayLevel}</div>
              <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                <DamWaterLevelIndicator damId={dam.id} showBar={true} variant="compact" />
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">{dam.basin}</div>
            </div>

            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300 flex-grow">
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider mb-1">Especies predominantes:</span>
                <div className="flex flex-wrap gap-1.5">
                  {dam.species.map((sp, i) => (
                    <span key={i} className="px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 rounded text-xs font-medium">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block text-xs uppercase tracking-wider mb-1">Lectura para pesca:</span>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {dam.fishingAdvice}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>{dam.depthAverage}</span>
              <a
                href="https://recursoshidricos.cba.gov.ar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
              >
                Cota oficial <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN EDUCATIVA: Hidrología y pesca */}
      <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
          Hidrología y Comportamiento Íctico en Embalses
        </h2>
        
        <div className="space-y-6 text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">1. Impacto del Nivel de Agua en el Pique</h3>
            <p className="leading-relaxed text-sm">
              El volumen de agua embalsada es un factor hidroclimático determinante en la pesca deportiva. Durante los períodos de <strong>bajante extrema</strong>, los peces se ven obligados a concentrarse en los pozones más profundos o en antiguos cauces sumergidos. Aunque esto reduce el área de búsqueda, el aumento relativo de la temperatura del agua y la menor oxigenación en capas bajas suelen volverlos más recelosos ante las carnadas y señuelos.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2. Efecto de las Crecientes Repentinas</h3>
            <p className="leading-relaxed text-sm">
              Cuando un dique experimenta un aumento de cota tras precipitaciones intensas en las cuencas altas de las sierras, los ríos afluentes aportan sedimentos, insectos y nutrientes. Este aporte dinamiza la actividad alimenticia en las desembocaduras, especialmente en especies omnívoras como la carpa y el bagre. No obstante, el agua turbia reduce la visibilidad, obligando a utilizar señuelos con vibración mecánica o cebos con mayor estímulo olfativo.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">3. Estratificación Térmica y Termoclina</h3>
            <p className="leading-relaxed text-sm">
              Con niveles estables durante varias semanas en época cálida, se establece la <em>termoclina</em> (estrato donde la temperatura del agua desciende drásticamente con la profundidad). El pejerrey suele mantenerse suspendido justo en o por encima de esta capa, donde encuentra buena oxigenación y temperatura adecuada, evitando los fondos anóxicos carentes de oxígeno.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <AdBanner slot="3228900466" />
      </div>
    </div>
  );
}
