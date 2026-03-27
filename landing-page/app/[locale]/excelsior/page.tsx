'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ExcelsiorPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-6 relative overflow-hidden font-sans">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(224,165,189,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-4xl text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                >
                    <span className="text-[#e0a5bd] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block uppercase tracking-widest">The Pinnacle Project</span>
                    <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[1.05]">
                        Excelsior <span className="text-[#e0a5bd]/20">($XLS)</span> <br/> 
                        <span className="text-white/20">Coming Soon.</span>
                    </h1>
                    <p className="mt-8 text-white/40 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed uppercase tracking-widest italic">
                        Excellence in Motion. Excelsior is the elite administrative layer of the Luxor hemisphere. Preparing to launch the next era of abundance.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.2 }}
                    className="mt-16"
                >
                    <a href="/" className="px-10 py-3.5 bg-[#e0a5bd]/5 border border-[#e0a5bd]/10 rounded-full text-[#e0a5bd]/50 hover:text-[#e0a5bd] hover:bg-[#e0a5bd]/10 transition-all font-bold text-[10px] tracking-[0.4em] uppercase">
                        Return to Elite
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
