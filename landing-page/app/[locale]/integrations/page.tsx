import React from 'react';
import { getTranslations } from 'next-intl/server';
import { getDb } from '../../../lib/firebase-admin';

export const dynamic = 'force-dynamic';

async function getIntegrations() {
    const db = getDb();
    if (!db) return [];
    
    try {
        const snapshot = await db.collection('integrations').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
    } catch (error: any) {
        console.error('❌ Firestore integrations fetch error:', error.message);
        return [];
    }
}

export default async function IntegrationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'IntegrationsPage' });
    const integrations = await getIntegrations();

    return (
        <div className="min-h-screen bg-black flex flex-col items-center px-6 relative overflow-hidden font-sans pt-32 pb-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,189,224,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10 text-center mb-20">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#a5bde0]/10 border border-[#a5bde0]/20 text-[#a5bde0] font-bold uppercase tracking-[0.3em] text-[10px] mb-8">
                    {t('eyebrow')}
                </span>
                
                <h1 className="text-white text-5xl md:text-8xl font-medium tracking-tighter leading-[1] mb-8">
                    {t('title')} <br/> 
                    <span className="text-white/20">{t('subtitle')}</span>
                </h1>
                
                <p className="text-white/40 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12 uppercase tracking-widest italic">
                    {t('description')}
                </p>
            </div>

            <div className="max-w-7xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {integrations.length === 0 ? (
                    <div className="col-span-full text-center py-20 border border-white/5 bg-white/5 rounded-3xl">
                         <p className="text-white/40 uppercase tracking-widest text-sm">No active integrations found in Firestore.</p>
                    </div>
                ) : (
                    integrations.map((item: any) => (
                        <a 
                            key={item.id}
                            href={`/${locale}/integrations/${item.id}`}
                            className="group relative h-full flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#a5bde0]/30 transition-all duration-500 overflow-hidden"
                        >
                            <div className="aspect-video w-full overflow-hidden border-b border-white/5">
                                <img 
                                    src={item.imageUrl || '/images/token-dark.png'} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl text-white font-medium mb-4 group-hover:text-[#a5bde0] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/40 text-sm font-light leading-relaxed mb-8 flex-grow">
                                    {item.description}
                                </p>
                                <div className="flex items-center text-[#a5bde0] font-bold text-[10px] tracking-[0.3em] uppercase mt-auto">
                                    <span>Explore integration</span>
                                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>
            
            <div className="mt-20 relative z-10">
                <a href="/" className="px-10 py-3.5 bg-white/5 border border-white/10 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-all font-bold text-[10px] tracking-[0.4em] uppercase">
                    {t('cta')}
                </a>
            </div>
        </div>
    );
}
