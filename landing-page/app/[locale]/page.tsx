'use client';

import { useTranslations } from 'next-intl';
import { Hero } from '@/components/Hero';
import { Play, Users, ShieldCheck, Zap, ArrowRight, Brain, Globe, Network, Cpu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

function PingPongVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let frameId: number;
    let isReversing = false;

    const loop = () => {
      if (!isReversing && video.duration && video.currentTime >= video.duration - 0.05) {
        isReversing = true;
        video.pause();
      } else if (isReversing && video.currentTime <= 0.05) {
        isReversing = false;
        video.play();
      }

      if (isReversing) {
        // Manually step back time to simulate reverse playback (slowed down)
        video.currentTime = Math.max(0, video.currentTime - 0.02);
      }

      frameId = requestAnimationFrame(loop);
    };

    const onPlay = () => {
      frameId = requestAnimationFrame(loop);
    };

    video.addEventListener('play', onPlay);

    if (!video.paused) {
      frameId = requestAnimationFrame(loop);
    }

    // Set playback rate to make the forward video play slower
    video.playbackRate = 0.5;

    return () => {
      video.removeEventListener('play', onPlay);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto aspect-video md:aspect-[21/9] relative mb-40 md:mb-64 group">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover opacity-80 transition-opacity duration-1000 group-hover:opacity-100 mix-blend-screen"
      />
    </div>
  );
}

function VideoFacade({ videoId, title }: { videoId: string, title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div
      className="absolute inset-0 w-full h-full cursor-pointer group bg-black"
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
        alt={title}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />

      {/* Overlay Title */}
      <div className="absolute top-0 left-0 w-full p-6 md:p-8 bg-gradient-to-b from-black/90 to-transparent pointer-events-none">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-500/20 backdrop-blur-md">Visionary</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-medium font-sans text-white drop-shadow-lg">{title}</h3>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-20 h-20 rounded-full bg-blue-600/90 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50">
          <Play className="text-white ml-2 flex-shrink-0" size={32} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden font-sans">
      <Hero
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
        ctaText={t('cta_main')}
        ctaLink="/luxor"
      />

      {/* Innovation Section - Text left, Media Right */}
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

      {/* Vital Section */}
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

      {/* Vision Section - Sidebar left, Media right */}
      <section className="py-24 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
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
        </div>
      </section>

      {/* Giants Section - Large feature left, small features right */}
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Large main card */}
            <div className="lg:col-span-2 aspect-video w-full relative group">
              <VideoFacade videoId={(t.raw('giants.items') as any[])[0].videoId} title={(t.raw('giants.items') as any[])[0].name} />
            </div>

            {/* Side cards */}
            <div className="flex flex-col gap-8">
              <div className="flex-1 aspect-video w-full relative group">
                <VideoFacade videoId={(t.raw('giants.items') as any[])[1].videoId} title={(t.raw('giants.items') as any[])[1].name} />
              </div>

              <div className="flex-1 aspect-video w-full relative group">
                <VideoFacade videoId={(t.raw('giants.items') as any[])[2].videoId} title={(t.raw('giants.items') as any[])[2].name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
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
        </div>
      </section>

      {/* CTA Section */}
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

    </div>
  );
}
