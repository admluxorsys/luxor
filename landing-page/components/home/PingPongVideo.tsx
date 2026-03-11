'use client';
import { useRef, useEffect } from 'react';

export function PingPongVideo({ 
    src, 
    className = "w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] relative mb-40 md:mb-64 group",
    videoClassName = "w-full h-full object-cover opacity-80 transition-opacity duration-1000 group-hover:opacity-100 mix-blend-screen"
}: { 
    src: string;
    className?: string;
    videoClassName?: string;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let frameId: number;
        let isReversing = false;
        let lastTime = performance.now();

        const loop = (time: number) => {
            if (!video.duration) {
                lastTime = time;
                frameId = requestAnimationFrame(loop);
                return;
            }

            const dt = (time - lastTime) / 1000; // Delta time en segundos
            lastTime = time;

            // Si llegamos al final, preparamos la reversa
            if (!isReversing && video.currentTime >= video.duration - 0.05) {
                isReversing = true;
                video.pause();
            } 
            // Si llegamos al inicio de nuevo (en reversa), volvemos a ir hacia adelante
            else if (isReversing && video.currentTime <= 0.05) {
                isReversing = false;
                video.play().catch(() => {});
            }

            // Si está yendo hacia atrás, restamos constantemente el delta time al video
            if (isReversing) {
                video.currentTime = Math.max(0, video.currentTime - dt * 1.0); // Ajusta la velocidad de retroceso si gustas
            }

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame((time) => {
            lastTime = time;
            loop(time);
        });

        // Fuerza el autoplay seguro
        video.play().catch(() => {});

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className={className}>
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                playsInline
                className={videoClassName}
            />
        </div>
    );
}
