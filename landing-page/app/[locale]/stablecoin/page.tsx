'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft, Send, Twitter, Coins } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function StablecoinPage() {
    const t = useTranslations('Navbar');

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 inline-block"
                >
                    <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 mx-auto group hover:bg-white/10 transition-all duration-500 shadow-2xl shadow-green-500/10">
                        <Coins className="w-12 h-12 text-green-500 group-hover:rotate-12 transition-transform" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-6"
                >
                    USD<span className="text-green-500">Luxor</span> <span className="text-white/40 text-4xl">($USDX)</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg md:text-xl text-white/40 font-sans mb-12 max-w-lg mx-auto leading-relaxed"
                >
                    Stability meets innovation. The native stablecoin of the Luxor Economy is arriving soon to provide the ultimate utility in decentralized finance.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-white/90 transition-all active:scale-95"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <a href="https://x.com/luxor_lxr" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                            <Twitter size={20} />
                        </a>
                        <a href="https://t.me/+HqmOhqYjNlJlYjBh" target="_blank" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                            <Send size={20} />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Info */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-12 text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold"
            >
                Coming Soon • 2026 • Luxor Economy
            </motion.div>
        </div>
    );
}
