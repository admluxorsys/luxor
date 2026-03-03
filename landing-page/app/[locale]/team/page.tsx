'use client';

import { Shield, FileText, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TeamPage() {
    const t = useTranslations('TeamPage');

    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-20">
                    <h1 className="text-5xl font-bold text-white mb-6 uppercase tracking-tighter">{t('title')}</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                {/* Legal & Audit Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Shield className="text-green-400" /> {t('legal_title')}
                        </h2>
                        <div className="space-y-4 text-gray-300 text-sm">
                            <p>
                                {t('legal_genius')}
                            </p>
                            <p>
                                {t('legal_utility')}
                            </p>
                            <p className="text-xs text-gray-500 italic">
                                {t('legal_disclaimer')}
                            </p>
                        </div>
                    </div>

                    <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <FileText className="text-blue-400" /> {t('audit_title')}
                        </h2>
                        <ul className="space-y-4">
                            <li className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                <span className="text-gray-300">Smart Contract</span>
                                <a href="#" className="text-blue-400 hover:text-blue-300 underline text-sm">{t('view_solscan')}</a>
                            </li>
                            <li className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                <span className="text-gray-300">Treasury Wallet</span>
                                <a href="#" className="text-blue-400 hover:text-blue-300 underline text-sm">{t('view_reserves')}</a>
                            </li>
                            <li className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                <span className="text-gray-300">Burn Wallet</span>
                                <a href="#" className="text-blue-400 hover:text-blue-300 underline text-sm">{t('track_burns')}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Team Section */}
                <h2 className="text-3xl font-bold text-white mb-12 text-center uppercase tracking-widest text-opacity-50">{t('contributors_title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <TeamMember
                        name={t('founder')}
                        role={t('lead_role')}
                        wallet="Gw6...9x2 (Locked)"
                    />
                    <TeamMember
                        name={t('ops_lead')}
                        role={t('ops_role')}
                        wallet="8sA...k2L (Vesting)"
                    />
                    <TeamMember
                        name={t('comm_manager')}
                        role={t('comm_role')}
                        wallet="3xP...m9Q"
                    />
                </div>

            </div>
        </div>
    );
}

function TeamMember({ name, role, wallet }: { name: string, role: string, wallet: string }) {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-purple-400 text-sm mb-2">{role}</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full text-xs text-gray-500 font-mono">
                <CheckCircle size={12} /> {wallet}
            </div>
        </div>
    );
}
