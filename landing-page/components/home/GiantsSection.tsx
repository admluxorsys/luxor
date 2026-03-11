'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { PlaylistSection } from './PlaylistSection';

export function GiantsSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-32 md:py-48 px-6 md:px-12 bg-black border-t border-white/5 relative">
            <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full max-w-[1600px] mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-start">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.05] max-w-xl">
                        {t('giants.title')}
                    </h2>
                    <div className="flex justify-start lg:justify-end">
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md lg:text-right font-light">
                            {t('giants.desc')}
                        </p>
                    </div>
                </div>

                <PlaylistSection items={t.raw('giants.items') as any[]} />
            </motion.div>
        </section>
    );
}
