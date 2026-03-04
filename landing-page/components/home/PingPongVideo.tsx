'use client';
import { useRef, useEffect } from 'react';

export function PingPongVideo({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        let frameId: number;
        let isReversing = false;

        const loop = () => {
            if (!isReversing && video.duration && video.currentTime >= video.duration - 0.05) {
                isReversing = true;
                video.pause();
            } else if (isReversing && video.currentTime <= 0.05) {
                isReversing = false;
                video.play();
            }

            if (isReversing) {
                // Manually step back time to simulate reverse playback (slowed down)
                video.currentTime = Math.max(0, video.currentTime - 0.02);
            }

            frameId = requestAnimationFrame(loop);
        };

        const onPlay = () => {
            frameId = requestAnimationFrame(loop);
        };

        video.addEventListener('play', onPlay);

        if (!video.paused) {
            frameId = requestAnimationFrame(loop);
        }

        // Set playback rate to make the forward video play slower
        video.playbackRate = 0.5;

        return () => {
            video.removeEventListener('play', onPlay);
            cancelAnimationFrame(frameId);
        };
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] relative mb-40 md:mb-64 group">
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover opacity-80 transition-opacity duration-1000 group-hover:opacity-100 mix-blend-screen"
            />
        </div>
    );
}
