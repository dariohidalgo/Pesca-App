import { useEffect, useRef } from 'react';

export default function AdBanner({ slot, style = { display: 'block' }, format = 'auto', responsive = 'true' }) {
    const adRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Evitar errores de consola en entorno de desarrollo local
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return;
        }

        const initializeAd = () => {
            try {
                if (window.adsbygoogle && adRef.current && !adRef.current.dataset.adsbygoogleStatus) {
                    const width = adRef.current.offsetWidth;
                    if (width > 0) {
                        (window.adsbygoogle = window.adsbygoogle || []).push({});
                    } else {
                        requestAnimationFrame(initializeAd);
                    }
                }
            } catch (e) {
                console.error('Error al inicializar AdSense:', e);
            }
        };

        const timer = setTimeout(initializeAd, 150);
        return () => clearTimeout(timer);
    }, [slot]);

    return (
        <div className="w-full my-6 text-center overflow-hidden flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">Publicidad</span>
            <div className="w-full flex justify-center min-h-[90px]">
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
        </div>
    );
}
