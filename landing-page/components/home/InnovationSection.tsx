'use client';
import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';

export function InnovationSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-24 px-4 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-6">
                    <h2 className="text-4xl lg:text-5xl font-medium font-sans text-white leading-tight tracking-tight">
                        {t('innovation.title')}
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {t('innovation.desc')}
                    </p>
                    <button className="flex items-center gap-2 mt-4 px-6 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white font-medium transition-all group">
                        <Play size={16} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        {t('innovation.btn')}
                    </button>
                </div>
                <div className="flex-1 w-full max-w-md mx-auto">
                    <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                        <img src="/images/coin.jpg" alt="Innovation" className="w-full h-auto object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
}
