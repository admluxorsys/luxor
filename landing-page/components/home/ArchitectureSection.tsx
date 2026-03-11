'use client';
import { useTranslations } from 'next-intl';
import { InfoSection } from './InfoSection';
import { PingPongVideo } from './PingPongVideo';

export function ArchitectureSection() {
    const t = useTranslations('HomePage');
    
    const items = [
        { title: t('architecture.items.0.title'), desc: t('architecture.items.0.desc') },
        { title: t('architecture.items.1.title'), desc: t('architecture.items.1.desc') },
        { title: t('architecture.items.2.title'), desc: t('architecture.items.2.desc') },
    ];

    return (
        <InfoSection 
            title={t('architecture.title')}
            subtitle={t('architecture.subtitle')}
            items={items}
            customMedia={
                <PingPongVideo 
                    src="https://firebasestorage.googleapis.com/v0/b/udreamms-platform-1.firebasestorage.app/o/Untitled.mp4?alt=media&token=15be5543-6d82-416f-9337-c64985e77632"
                    className="w-full h-full"
                    videoClassName="w-full h-full object-cover transition-transform duration-[2000ms] ease-out"
                />
            }
            imageRight={true}
            gradient="from-cyan-500/20 via-blue-500/10 to-transparent"
        />
    );
}
