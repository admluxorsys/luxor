'use client';
import { useTranslations } from 'next-intl';
import { PlaylistSection } from './PlaylistSection';

export function GiantsSection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-24 px-4 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-3xl lg:text-5xl font-medium font-sans text-white mb-6 tracking-tight">
                        {t('giants.title')}
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {t('giants.desc')}
                    </p>
                </div>

                <PlaylistSection items={t.raw('giants.items') as any[]} />
            </div>
        </section>
    );
}
