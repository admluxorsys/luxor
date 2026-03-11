'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Cpu, Zap } from 'lucide-react';

export function PillarsSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-32 md:py-48 px-4 md:px-8 bg-black border-t border-white/5">
            <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full max-w-[1800px] mx-auto"
            >
                <div className="text-center mb-24 md:mb-32 max-w-3xl mx-auto">
                    <h2 className="text-3xl lg:text-5xl font-medium font-sans text-white mb-6 tracking-tight">
                        {t('pillars.title')}
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {t('pillars.desc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-white/5 py-12">
                    {(t.raw('pillars.items') as any[]).map((col, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                {i === 0 ? <Globe className="text-blue-400" /> : i === 1 ? <Cpu className="text-emerald-400" /> : <Zap className="text-yellow-400" />}
                            </div>
                            <h3 className="text-2xl font-medium font-sans text-white mb-4">{col.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm max-w-xs mx-auto font-sans">
                                {col.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
