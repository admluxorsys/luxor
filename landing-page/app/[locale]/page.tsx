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

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "By Luxor",
    "url": "https://byluxor.com",
    "logo": "https://byluxor.com/logo.png",
    "sameAs": [
      "https://x.com/byluxor",
      "https://github.com/byluxor"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
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
