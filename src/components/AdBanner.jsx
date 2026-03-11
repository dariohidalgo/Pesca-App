import { useEffect, useRef } from 'react';

export default function AdBanner({ slot, style = { display: 'block' }, format = 'auto', responsive = 'true' }) {
    const adRef = useRef(null);

    useEffect(() => {
        // Si estamos en entorno de desarrollo o Vercel (sin dominio aprobado) puede que el anuncio no cargue,
        // pero intentamos inicializarlo si el script global de adsbygoogle está disponible
        try {
            if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
                window.adsbygoogle.push({});
            }
        } catch (e) {
            console.error('Error al cargar el anuncio:', e);
        }
    }, []);

    return (
        <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg p-4 my-6 text-center text-slate-400 flex flex-col items-center justify-center min-h-[100px]">
            <span className="text-xs font-semibold uppercase tracking-widest mb-2">Espacio Publicitario</span>

            {/* Componente real de Adsense */}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ¡Reemplazar por tu ID de AdSense!
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />

            {/* Mensaje placeholder para saber dónde iría el anuncio durante desarrollo */}
            {!window.adsbygoogle && (
                <p className="text-sm">Configura tu código de AdSense para ver los anuncios reales aquí.</p>
            )}
        </div>
    );
}
