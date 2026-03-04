'use client';
import { useState, useRef, useEffect } from 'react';

export function VideoFacade({ videoId, title, autoPlay = false }: { videoId: string, title: string, autoPlay?: boolean }) {
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [videoPlaying, setVideoPlaying] = useState(autoPlay);
    const [progress, setProgress] = useState(0);
    const durationRef = useRef(100); // Prevents div/0 before loaded

    useEffect(() => {
        setIsPlaying(autoPlay);
        setVideoPlaying(autoPlay);
    }, [videoId, autoPlay]);

    // Read time updates directly from iframe
    useEffect(() => {
        if (!isPlaying) return;

        const handleMessage = (e: MessageEvent) => {
            if (e.origin !== "https://www.youtube.com") return;
            try {
                const data = JSON.parse(e.data);
                if (data.event === 'infoDelivery' && data.info) {
                    if (data.info.duration) durationRef.current = data.info.duration;
                    if (data.info.currentTime && durationRef.current) {
                        setProgress((data.info.currentTime / durationRef.current) * 100);
                    }
                }
            } catch (err) { }
        };

        window.addEventListener('message', handleMessage);

        // Poll the iframe config to ensure it starts sending messages
        const ping = setInterval(() => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'listening' }), '*');
            }
        }, 1000);

        return () => {
            window.removeEventListener('message', handleMessage);
            clearInterval(ping);
        };
    }, [isPlaying]);

    const togglePlay = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (!iframeRef.current) return;
        const func = videoPlaying ? 'pauseVideo' : 'playVideo';
        iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func }), '*');
        setVideoPlaying(!videoPlaying);
    };

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!containerRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            containerRef.current.requestFullscreen();
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!iframeRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const targetPercent = Math.max(0, Math.min(1, clickX / rect.width));
        const targetTime = targetPercent * durationRef.current;

        iframeRef.current.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'seekTo', args: [targetTime, true] }), '*');
        setProgress(targetPercent * 100);
    };

    if (isPlaying) {
        return (
            <div ref={containerRef} className="absolute inset-0 w-full h-full group bg-black">
                <iframe
                    ref={iframeRef}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                {/* Invisible Click Overlay for Play/Pause */}
                <div className="absolute inset-0 z-10 cursor-pointer" onClick={togglePlay} />

                {/* Custom Controls Layer */}
                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 pb-4 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-end">

                    {/* Progress Bar */}
                    <div
                        className="w-full h-1.5 md:h-2 bg-white/20 rounded-full mb-4 cursor-pointer relative overflow-hidden group/bar"
                        onClick={handleSeek}
                    >
                        <div
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-100 group-hover/bar:bg-blue-400"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={togglePlay}
                            className="text-white hover:text-blue-400 transition-colors p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        >
                            {videoPlaying ? (
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                            ) : (
                                <svg className="w-5 h-5 md:w-6 md:h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            )}
                        </button>

                        <button
                            onClick={toggleFullscreen}
                            className="text-white hover:text-blue-400 transition-colors p-1.5 md:p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                        >
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="absolute inset-0 w-full h-full cursor-pointer group bg-black"
            onClick={() => setIsPlaying(true)}
        >
            <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
                alt={title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />


        </div>
    );
}
