'use client';
import { useTranslations } from 'next-intl';
import { InfoSection } from './InfoSection';

export function InnovationSection() {
    const t = useTranslations('HomePage');
    
    const items = [
        { title: t('innovation.items.0.title'), desc: t('innovation.items.0.desc') },
        { title: t('innovation.items.1.title'), desc: t('innovation.items.1.desc') },
        { title: t('innovation.items.2.title'), desc: t('innovation.items.2.desc') },
        { title: t('innovation.items.3.title'), desc: t('innovation.items.3.desc') },
    ];

    return (
        <InfoSection 
            title={t('innovation.title')}
            subtitle={t('innovation.subtitle')}
            description={t('innovation.desc')}
            items={items}
            imageSrc="/images/coin-new.jpg"
            imageClassName="object-center"
            showButton={true}
            buttonText={t('innovation.btn')}
            imageRight={true}
            gradient="from-blue-600/30 via-purple-500/10 to-transparent"
        />
    );
}
