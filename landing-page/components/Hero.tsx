'use client';

import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import React, { useRef, useEffect, useState, Fragment } from 'react';

interface HeroProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export const Hero = ({ eyebrow, title, subtitle, ctaText, ctaLink }: HeroProps) => {
    const locale = useLocale();
    const badgeText = locale === 'es' ? 'Lanzamiento Oficial' : 'Official Launch';

    const bgVideoUrl = "https://firebasestorage.googleapis.com/v0/b/udreamms-platform-1.firebasestorage.app/o/New%20Video%20Luxor.mp4?alt=media&token=a5cd5a16-be9f-43df-bd1e-e702012fa88d";
    const presaleVideoUrl = "https://firebasestorage.googleapis.com/v0/b/udreamms-platform-1.firebasestorage.app/o/Video%20Preventa.mp4?alt=media&token=96330534-69e6-47e3-8359-444f9c1f85a5";

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isMounted, setIsMounted] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const presaleCardRef = useRef<HTMLAnchorElement>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const presaleVideoRef = useRef<HTMLVideoElement>(null);

    const isSectionInView = useInView(sectionRef, { amount: 0.1 });
    const isPresaleInView = useInView(presaleCardRef, { amount: 0.3 });

    useEffect(() => {
        if (bgVideoRef.current) {
            if (isSectionInView) bgVideoRef.current.play().catch(() => {});
            else bgVideoRef.current.pause();
        }
    }, [isSectionInView]);

    useEffect(() => {
        if (presaleVideoRef.current) {
            if (isPresaleInView) presaleVideoRef.current.play().catch(() => {});
            else presaleVideoRef.current.pause();
        }
    }, [isPresaleInView]);

    useEffect(() => {
        setIsMounted(true);
        const targetDate = new Date('2026-05-01T00:00:00-06:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full flex flex-col md:min-h-[105vh] md:justify-end items-start overflow-hidden bg-black">
            {/* 1. Main Background Video Layer */}
            <div className="relative md:absolute md:top-0 md:left-0 w-full h-[60vh] md:h-[75vh] z-0 overflow-hidden">
                <video
                    ref={bgVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale-[0.2] brightness-75 scale-110 md:scale-100"
                    preload="metadata"
                    src={bgVideoUrl}
                />
                {/* Subtle fade transition to black */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* 2. Content Layer Container */}
            <div className="relative z-10 w-full px-6 pt-10 pb-24 md:pb-44 md:px-16 lg:px-24 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
                
                {/* Original Text Layer */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-start text-left max-w-3xl"
                >
                    {/* Eyebrow - Even smaller */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[10px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-blue-400 mb-4 md:mb-3 font-sans"
                    >
                        {eyebrow}
                    </motion.span>

                    {/* Main Title - Scaled for impact on mobile */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 md:mb-5 tracking-tight leading-[1.05] font-sans whitespace-pre-line group-hover:scale-[1.01] transition-transform duration-700">
                         {title.split('Luxor').map((part, i, arr) => (
                            <Fragment key={i}>
                                {part}
                                {i !== arr.length - 1 && <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Luxor</span>}
                            </Fragment>
                        ))}
                    </h1>

                    {/* Subtitle - More compact */}
                    <p className="text-sm md:text-sm lg:text-[15px] text-white/80 mb-10 md:mb-8 max-w-lg leading-relaxed font-sans font-light">
                        {subtitle}
                    </p>

                    {/* CTA Section - Touch friendly buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                        <Link
                            href={ctaLink}
                            suppressHydrationWarning
                            {...(ctaLink.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                            className="group relative px-8 py-4 md:px-7 md:py-2.5 bg-white text-black hover:bg-blue-600 hover:text-white rounded-full font-bold text-sm md:text-[12px] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-2xl shadow-white/5"
                        >
                            <span className="relative z-10">{ctaText}</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </Link>

                        <Link
                            href="https://dial.to/?action=solana-action:https://www.byluxor.xyz/api/actions/donate"
                            target="_blank"
                            rel="noopener noreferrer"
                            suppressHydrationWarning
                            className="px-8 py-4 md:px-7 md:py-2.5 border border-white/20 hover:border-white/40 text-blue-400 rounded-full font-bold text-sm md:text-[12px] transition-all backdrop-blur-md flex items-center justify-center gap-2"
                        >
                            Support Luxor
                        </Link>
                    </div>
                </motion.div>

                {/* NEW Added Video/Countdown Component Layer */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    className="w-full max-w-sm lg:max-w-md mt-10 lg:mt-0"
                >
                    <Link 
                        ref={presaleCardRef}
                        href="https://phantom.app/tokens/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block w-full aspect-video rounded-3xl overflow-hidden border border-white/20 shadow-2xl group cursor-pointer hover:scale-[1.02] hover:shadow-blue-500/30 hover:border-blue-500/50 transition-all duration-300"
                    >
                        <video
                            ref={presaleVideoRef}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            className="absolute inset-0 w-full h-full object-cover"
                            src={presaleVideoUrl}
                        />
                        
                        {/* Overlay Filter for legibility */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] group-hover:bg-blue-900/40 group-hover:backdrop-blur-[2px] transition-all duration-500" />

                        {/* Countdown Information */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                            {/* Card Status Badge */}
                             <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="px-4 py-1.5 rounded-full border border-white/20 bg-blue-900/30 backdrop-blur-md mb-4 inline-flex items-center gap-2 group-hover:border-blue-400 transition-colors"
                             >
                                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-bold text-blue-100">{badgeText}</span>
                             </motion.div>
                            
                            {isMounted ? (
                                <div className="flex items-center gap-3 lg:gap-4 group-hover:drop-shadow-[0_0_20px_rgba(96,165,250,0.4)] transition-all">
                                    <div className="flex flex-col items-center min-w-[50px] lg:min-w-[60px]">
                                        <span suppressHydrationWarning className="text-3xl lg:text-5xl font-bold font-sans tracking-tighter drop-shadow-lg">{timeLeft.days}</span>
                                        <span className="text-[8px] lg:text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">Days</span>
                                    </div>
                                    <div className="text-xl lg:text-3xl mb-5 font-light text-white/30 animate-pulse">:</div>
                                    <div className="flex flex-col items-center min-w-[50px] lg:min-w-[60px]">
                                        <span suppressHydrationWarning className="text-3xl lg:text-5xl font-bold font-sans tracking-tighter drop-shadow-lg">{timeLeft.hours}</span>
                                        <span className="text-[8px] lg:text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">Hours</span>
                                    </div>
                                    <div className="text-xl lg:text-3xl mb-5 font-light text-white/30 animate-pulse">:</div>
                                    <div className="flex flex-col items-center min-w-[50px] lg:min-w-[60px]">
                                        <span suppressHydrationWarning className="text-3xl lg:text-5xl font-bold font-sans tracking-tighter drop-shadow-lg">{timeLeft.minutes}</span>
                                        <span className="text-[8px] lg:text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">Mins</span>
                                    </div>
                                    <div className="text-xl lg:text-3xl mb-5 font-light text-white/30 animate-pulse">:</div>
                                    <div className="flex flex-col items-center min-w-[50px] lg:min-w-[60px]">
                                        <span suppressHydrationWarning className="text-3xl lg:text-5xl font-bold font-sans tracking-tighter drop-shadow-lg">{timeLeft.seconds}</span>
                                        <span className="text-[8px] lg:text-[10px] uppercase tracking-widest text-white/50 mt-1 font-semibold">Secs</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 opacity-0">
                                    {/* Placeholder */}
                                    <div className="flex flex-col items-center min-w-[60px]">
                                        <span className="text-4xl lg:text-5xl font-bold font-sans tracking-tighter">0</span>
                                    </div>
                                </div>
                            )}

                            {/* Mountain Time Indicator */}
                            <div className="mt-4 mb-2 text-[7px] md:text-[8px] text-white/40 uppercase tracking-[0.3em] font-semibold text-center">
                                Ends 12:00 AM Mountain Time (USA)
                            </div>

                            {/* Additional Info / Links */}
                            <div className="mt-4 md:mt-5 flex flex-col items-center justify-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] md:text-[11px] font-medium text-white/90 drop-shadow-md tracking-wide">
                                    Luxor <span className="text-white/40 mx-1">|</span> LXR Meteora
                                </span>
                                <span className="text-[10px] md:text-[11px] font-medium text-white/90 drop-shadow-md tracking-wide">
                                    Luxor Origin <span className="text-white/40 mx-1">|</span> LUX Pump.fun
                                </span>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            </div>

            {/* Subtle bottom scroll indicator (Original) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 right-10 z-30 hidden lg:block"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
            </motion.div>
        </section>
    );
};
