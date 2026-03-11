'use client';

import { useTranslations } from 'next-intl';
import { Hero } from '@/components/Hero';
import { IconMarquee } from '@/components/IconMarquee';
import { InnovationSection } from '@/components/home/InnovationSection';
import { PhilosophySection } from '@/components/home/PhilosophySection';
import { ArchitectureSection } from '@/components/home/ArchitectureSection';
import { BracketsSection } from '@/components/home/BracketsSection';
import { JoinSection } from '@/components/home/JoinSection';
import { ShowcaseSection } from '@/components/home/ShowcaseSection';
import { GiantsSection } from '@/components/home/GiantsSection';
import { PillarsSection } from '@/components/home/PillarsSection';
import { CTASection } from '@/components/home/CTASection';
import { ReviewsSection } from '@/components/home/ReviewsSection';

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

      <IconMarquee />

      <InnovationSection />
      <PhilosophySection />
      <ArchitectureSection />

      <BracketsSection />

      <JoinSection />

      <ShowcaseSection />

      {/* Pillars Section */}
      <PillarsSection />

      {/* Giants Section - Large feature left, small features right */}
      <GiantsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Reviews Section */}
      <ReviewsSection />

    </div>
  );
}
