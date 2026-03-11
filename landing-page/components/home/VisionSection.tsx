'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function VisionSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-32 md:py-48 px-4 bg-black border-t border-white/5">
            <motion.div 
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="max-w-7xl mx-auto"
            >
                <div className="mb-24 md:mb-32">
                    <h2 className="text-4xl lg:text-5xl font-medium font-sans text-white mb-4 tracking-tight">
                        {t('vision.title')}
                    </h2>
                    <p className="text-blue-400 text-xl font-medium tracking-tight">
                        {t('vision.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="space-y-8 flex flex-col justify-between">
                        <div className="space-y-6 text-zinc-400 leading-relaxed">
                            <p>{t('vision.desc1')}</p>
                            <div className="h-px w-full bg-white/10" />
                            <p>{t('vision.desc2')}</p>
                        </div>
                        <button className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors bg-white/5 border border-white/5 hover:border-white/10 px-6 py-3 rounded-full w-fit">
                            {t('vision.btn')} <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-center">
                        <div className="w-full relative rounded-3xl overflow-hidden border border-white/5">
                            <img src="/images/coins-pile.jpg" alt="Vision Grid" className="w-full h-auto object-contain opacity-90" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
