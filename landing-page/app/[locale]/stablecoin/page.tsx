'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function StablecoinPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden font-sans">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                >
                    <span className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block opacity-40 italic">Monetary System</span>
                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05]">
                        Stablecoin <span className="text-white/20">($USDX)</span> <br/> 
                        <span className="text-white/20">Coming Soon.</span>
                    </h1>
                    <p className="mt-8 text-white/40 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed uppercase tracking-widest italic">
                        The absolute standard for stability on Solana. $USDX is the decentralized pillar of Luxor's financial sovereign state.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="mt-16"
                >
                    <a href="/" className="px-10 py-3.5 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all font-bold text-[10px] tracking-[0.4em] uppercase">
                        Return to Hub
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
