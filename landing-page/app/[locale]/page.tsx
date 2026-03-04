'use client';

import { useTranslations } from 'next-intl';
import { Hero } from '@/components/Hero';
import { InnovationSection } from '@/components/home/InnovationSection';
import { VitalSection } from '@/components/home/VitalSection';
import { VisionSection } from '@/components/home/VisionSection';
import { GiantsSection } from '@/components/home/GiantsSection';
import { PillarsSection } from '@/components/home/PillarsSection';
import { CTASection } from '@/components/home/CTASection';

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
      <InnovationSection />

      {/* Vital Section */}
      <VitalSection />

      {/* Vision Section - Sidebar left, Media right */}
      <VisionSection />

      {/* Giants Section - Large feature left, small features right */}
      <GiantsSection />

      {/* Pillars Section */}
      <PillarsSection />

      {/* CTA Section */}
      <CTASection />

    </div>
  );
}
