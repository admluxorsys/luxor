'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ComingSoonPage() {
    const t = useTranslations('Navbar');
    const c = useTranslations('Common');

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden">
            {/* Ambient Background Gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl text-center relative z-10 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-[var(--font-outfit)] font-medium tracking-tight leading-[1.05] max-w-4xl mx-auto">
                        {t('coming_soon').split('Luxor').map((part, index) => (
                            <React.Fragment key={index}>
                                {part}
                                {index === 0 && <span className="text-[#2563EB] tracking-tighter">Luxor</span>}
                            </React.Fragment>
                        ))}
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1, duration: 2 }}
                    className="mt-16 inline-flex items-center gap-4 px-6 py-2 border border-white/10 rounded-full"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <p className="text-white text-[10px] uppercase font-bold tracking-[0.4em] pt-0.5">
                        {c('dev_tag')}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12"
                >
                    <a 
                        href="/" 
                        className="inline-flex items-center gap-2 group px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-all duration-300"
                    >
                        <span className="text-xs uppercase tracking-widest font-bold">Return Home</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
