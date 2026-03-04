'use client';
import { useTranslations } from 'next-intl';
import { Users, ShieldCheck, Zap } from 'lucide-react';

export function VitalSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-24 px-4 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl lg:text-5xl font-medium font-sans text-white mb-6 tracking-tight">
                            {t('vital.title')}
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed">
                            {t('vital.desc')}
                        </p>
                    </div>
                    <button className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors whitespace-nowrap h-fit">
                        {t('vital.btn')}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(t.raw('vital.items') as any[]).map((item, idx) => (
                        <div key={idx} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:bg-[#111111] hover:border-white/10 transition-all group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
                                {idx === 0 ? <Users className="text-blue-400" /> : idx === 1 ? <ShieldCheck className="text-emerald-400" /> : <Zap className="text-yellow-400" />}
                            </div>
                            <h3 className="text-xl font-medium font-sans text-white mb-4 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm font-sans">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
