'use client';
import { useTranslations } from 'next-intl';
import { PingPongVideo } from './PingPongVideo';

export function CTASection() {
    const t = useTranslations('HomePage');
    return (
        <section className="py-32 px-4 relative overflow-hidden bg-black border-t border-white/5">
            <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
                {/* Reverse Loop Video */}
                <PingPongVideo src="https://firebasestorage.googleapis.com/v0/b/udreamms-platform-1.firebasestorage.app/o/Untitled.mp4?alt=media&token=15be5543-6d82-416f-9337-c64985e77632" />

                <h2 className="text-4xl lg:text-6xl font-medium font-sans text-white mb-8 tracking-tighter uppercase relative z-20">
                    {t('cta.title')}
                </h2>
                <p className="text-zinc-300 text-xl leading-relaxed mb-12 max-w-3xl mx-auto relative z-20">
                    {t('cta.desc')}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors w-full sm:w-auto">
                        {t('cta.btn_join')}
                    </button>
                    <button className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-full hover:bg-white/5 transition-colors w-full sm:w-auto">
                        {t('cta.btn_buy')}
                    </button>
                </div>

                <div className="mt-32 md:mt-48 flex justify-center">
                    <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.15)] group">
                        <img
                            src="/images/token-dark.png"
                            alt="Luxor Token"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
