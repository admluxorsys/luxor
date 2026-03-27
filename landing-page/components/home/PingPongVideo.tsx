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

        // Standard loop is much more performant than manual reverse playback
        video.loop = true;
        video.play().catch(() => {});
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
