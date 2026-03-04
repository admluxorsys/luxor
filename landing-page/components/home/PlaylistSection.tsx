'use client';
import { useState, useRef, useEffect } from 'react';
import { VideoFacade } from './VideoFacade';

export function PlaylistSection({ items }: { items: any[] }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [hasInteracted, setHasInteracted] = useState(false);

    const mainItem = items[activeIdx];
    const sideItems = items.filter((_, idx) => idx !== activeIdx);

    // Generamos muchas copias para asegurar un scroll infinito fluido
    const scrollItems = [...sideItems, ...sideItems, ...sideItems, ...sideItems, ...sideItems, ...sideItems, ...sideItems, ...sideItems];

    const scrollRef = useRef<HTMLDivElement>(null);
    const isHovered = useRef(false);
    const isDragging = useRef(false);
    const dragStartY = useRef(0);
    const dragStartScrollTop = useRef(0);
    const hasMovedDuringDrag = useRef(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        // Empezamos el scroll desde la mitad para tener margen de subir hacia "arriba" (lo cual mueve los items hacia abajo visualmente)
        el.scrollTop = el.scrollHeight / 2;

        let frameId: number;
        let lastTime = performance.now();

        const loop = (currentTime: number) => {
            const delta = currentTime - lastTime;
            lastTime = currentTime;

            if (!isHovered.current && !isDragging.current) {
                // Reducir el scrollTop mueve los elementos hacia abajo. 
                // 0.02 * delta asegura que vaya constante independiente de los Hz del monitor.
                el.scrollTop -= 0.03 * delta;

                // Si llegamos arriba, reseteamos a la mitad para dar la ilusión de infinito
                if (el.scrollTop <= 0) {
                    el.scrollTop = el.scrollHeight / 2;
                }
            }
            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(frameId);
    }, [sideItems.length]); // Se resetea si cambian los videos

    const handlePointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        hasMovedDuringDrag.current = false;
        dragStartY.current = e.clientY;
        dragStartScrollTop.current = scrollRef.current?.scrollTop || 0;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing';
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current || !scrollRef.current) return;
        const dy = e.clientY - dragStartY.current;
        if (Math.abs(dy) > 5) hasMovedDuringDrag.current = true; // Si movió más de 5px, es un arrastre (no un click)

        scrollRef.current.scrollTop = dragStartScrollTop.current - dy;
    };

    const handlePointerUp = () => {
        isDragging.current = false;
        if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">
            {/* Large main card */}
            <div className="lg:col-span-2 w-full h-full min-h-[300px] lg:min-h-0 relative group rounded-3xl overflow-hidden border border-white/5 bg-[#0a0a0a]">
                <VideoFacade key={mainItem.videoId} videoId={mainItem.videoId} title={mainItem.name} autoPlay={hasInteracted} />
            </div>

            {/* Side cards (Playlist) */}
            <div className="w-full h-[400px] lg:h-full relative overflow-hidden rounded-3xl [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                <div
                    ref={scrollRef}
                    className="flex flex-col gap-6 w-full h-full cursor-grab touch-none overflow-hidden"
                    onMouseEnter={() => (isHovered.current = true)}
                    onMouseLeave={() => {
                        isHovered.current = false;
                        isDragging.current = false;
                    }}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {scrollItems.map((item, i) => (
                        <div
                            key={`${item.videoId}-${i}`}
                            className="aspect-video w-full flex-shrink-0 relative group rounded-2xl overflow-hidden border border-white/5 transition-transform bg-[#0a0a0a]"
                            style={{ transitionDuration: '400ms' }}
                            onClick={() => {
                                if (hasMovedDuringDrag.current) return; // Si estaba arrastrando, ignorar el click
                                setHasInteracted(true);
                                const originalIdx = items.findIndex(x => x.videoId === item.videoId);
                                setActiveIdx(originalIdx);
                            }}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                                onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`; }}
                                alt={item.name}
                                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
