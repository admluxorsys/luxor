'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useRef, useEffect, useState } from 'react';

interface HeroProps {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
}

export const Hero = ({ eyebrow, title, subtitle, ctaText, ctaLink }: HeroProps) => {
    const videoUrl = "https://firebasestorage.googleapis.com/v0/b/udreamms-platform-1.firebasestorage.app/o/New%20Video%20Luxor.mp4?alt=media&token=a5cd5a16-be9f-43df-bd1e-e702012fa88d";

    return (
        <section className="relative min-h-[100vh] md:min-h-[105vh] w-full flex items-end justify-start overflow-hidden bg-black pb-32 md:pb-44 px-6 md:px-16 lg:px-24">
            {/* 1. Video Layer - Pinned to Top */}
            <div className="absolute top-0 left-0 w-full h-[70vh] md:h-[75vh] z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover grayscale-[0.2] brightness-75 scale-110 md:scale-100"
                    src={videoUrl}
                />
                {/* Subtle fade transiton to black */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* 2. Content Layer - Positioned to overlap video and black background */}
            <div className="relative z-10 w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-start text-left"
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
                    <h1 className="text-3xl md:text-4xl lg:text-[42px] font-medium text-white mb-6 md:mb-5 tracking-tight leading-[1.1] font-sans whitespace-pre-line">
                        {title}
                    </h1>

                    {/* Subtitle - More compact */}
                    <p className="text-sm md:text-sm lg:text-[15px] text-white/80 mb-10 md:mb-8 max-w-lg leading-relaxed font-sans font-light">
                        {subtitle}
                    </p>

                    {/* CTA Section - Touch friendly buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                        <Link
                            href={ctaLink}
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
                            className="px-8 py-4 md:px-7 md:py-2.5 border border-white/20 hover:border-white/40 text-blue-400 rounded-full font-bold text-sm md:text-[12px] transition-all backdrop-blur-md flex items-center justify-center gap-2"
                        >
                            Support Luxor
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Subtle bottom scroll indicator moved to the side or kept central but minimal */}
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
