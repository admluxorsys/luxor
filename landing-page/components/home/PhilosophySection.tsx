'use client';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { InfoSection } from './InfoSection';

export function PhilosophySection() {
    const t = useTranslations('HomePage');
    
    const items = [
        { title: t('philosophy.items.0.title'), desc: t('philosophy.items.0.desc') },
        { title: t('philosophy.items.1.title'), desc: t('philosophy.items.1.desc') },
        { title: t('philosophy.items.2.title'), desc: t('philosophy.items.2.desc') },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
            <InfoSection 
                title={t('philosophy.title')}
                subtitle={t('philosophy.subtitle')}
                items={items}
                imageSrc="/images/coins-pile.jpg"
                imageRight={false}
                gradient="from-orange-500/20 via-red-500/10 to-transparent"
            />
        </motion.div>
    );
}
