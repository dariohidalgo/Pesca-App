import { useEffect, useRef } from 'react';

export default function AdBanner({ slot, style = { display: 'block' }, format = 'auto', responsive = 'true' }) {
    const adRef = useRef(null);

    useEffect(() => {
        // En desarrollo local no cargamos anuncios para evitar errores de consola
        if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            return;
        }

        const initializeAd = () => {
            try {
                if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
                    // Verificamos que el contenedor tenga ancho antes de empujar el anuncio
                    const width = adRef.current.offsetWidth;
                    if (width > 0) {
                        window.adsbygoogle.push({});
                    } else {
                        // Si aún no tiene ancho, reintentamos en el siguiente frame
                        requestAnimationFrame(initializeAd);
                    }
                }
            } catch (e) {
                console.error('Error al inicializar el anuncio:', e);
            }
        };

        // Pequeño delay para asegurar que el layout de React se haya estabilizado
        const timer = setTimeout(initializeAd, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full bg-slate-50 border border-slate-200 border-dashed rounded-lg p-4 my-6 text-center text-slate-400 flex flex-col items-center justify-center min-h-[120px] overflow-hidden">
            <span className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-60">Espacio Publicitario</span>

            <div className="w-full flex justify-center" style={{ minHeight: '90px' }}>
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{ ...style, minWidth: '250px', width: '100%' }}
                    data-ad-client="ca-pub-9506611717740136"
                    data-ad-slot={slot}
                    data-ad-format={format}
                    data-full-width-responsive={responsive}
                />
            </div>

            {!window.adsbygoogle && (
                <p className="text-sm mt-2">Configura tu código de AdSense para ver los anuncios reales aquí.</p>
            )}
        </div>
    );
}
