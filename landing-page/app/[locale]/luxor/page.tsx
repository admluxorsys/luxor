'use client';

import { motion } from 'framer-motion';
import {
    Flame, ShieldCheck, ArrowRight, Activity,
    Zap, ExternalLink, PieChart
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LuxorPage() {
    const t = useTranslations('LuxorPage');

    const tokenomicsData = [
        { label: t('vaults.reserve'), percent: "59%", amount: "1,194,750,000", color: "bg-blue-500", address: "FR6mPMN9NegBYkMGsZymuNEXxYQjesQDNsetVTFRh5JG", cond: t('vaults.reserve_desc') },
        { label: t('vaults.vesting'), percent: "15%", amount: "303,750,000", color: "bg-purple-500", address: "BQEPJzJNpaUhxZiZYuqJG64oHaJykLoxMQGBfERVJCqc", cond: t('vaults.vesting_desc') },
        { label: t('vaults.ops'), percent: "10%", amount: "202,500,000", color: "bg-pink-500", address: "HcYv3HVXi3Qd3B494QUhf7odX6JvABZwao1r7kMLDHXf", cond: t('vaults.ops_desc') },
        { label: t('vaults.founder_lock'), percent: "9%", amount: "182,250,000", color: "bg-yellow-500", address: "8YtDVK2qC7V8nM1GFqXnic4sANA5FoYBj5dtLePs3zpi", cond: t('vaults.founder_lock_desc') },
        { label: t('vaults.liquid'), percent: "5%", amount: "101,250,000", color: "bg-indigo-500", address: "CziGTVvL8ZSph4xYsxoox52x1aDEX4UxT7HC2Y2TZCVs", cond: t('vaults.liquid_desc') },
        { label: t('vaults.liquidity'), percent: "1%", amount: "20,250,000", color: "bg-green-500", address: "FEARFtN9VueEFVDCahtoWGu1A8Xdsmr2et3iWqAVo6hg", cond: t('vaults.liquidity_desc') },
        { label: t('vaults.personal'), percent: "1%", amount: "20,250,000", color: "bg-orange-500", address: "AcurPgkabibbSNPXCtaVZQZcQcAGptkoMzLBbdMzq76d", cond: t('vaults.personal_desc') },
    ];

    const feeDistribution = [
        { label: t('fee_items.xls'), p: "30%", addr: "7rMZcFmPXoDYqVeWd4v9tRmC99R88EToS7U6aDADzYv8" },
        { label: t('fee_items.usdx'), p: "30%", addr: "F9k4xRUrNvb6qrhY2c72ytNuqokVQZUh1VXLNi5XzsAz" },
        { label: t('fee_items.founder'), p: "40%", addr: "ANXx5N1ZbA4FM9WbZsD9m3Cda11SMmxg8zkN85ZvqCbY" },
    ];

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans overflow-x-hidden selection:bg-blue-500/10">
            {/* Soft Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/[0.03] blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/[0.03] blur-[120px] rounded-full" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-8 pt-40 pb-32">

                {/* Header Section - Clean & Sophisticated */}
                <header className="mb-24 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-semibold uppercase tracking-widest mb-10"
                    >
                        <Activity size={12} /> {t('header_eyebrow')}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-medium tracking-tight mb-8 text-[#111111]"
                    >
                        {t('title')} <span className="text-[#A0A0A0]">$LXR</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-[#666666] leading-relaxed max-w-2xl font-normal"
                    >
                        {t('subtitle')}
                    </motion.p>
                </header>

                {/* Dashboard Grid - Clean White Surfaces */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Distribution Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="lg:col-span-8 group relative overflow-hidden rounded-[48px] bg-white border border-[#F0F0F0] p-10 md:p-14 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)]"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                            <div>
                                <h2 className="text-3xl font-semibold text-[#111111] mb-2">{t('distribution_title')}</h2>
                                <p className="text-[#999999] text-base">{t('distribution_subtitle')}</p>
                            </div>
                            <div className="flex items-center gap-10">
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-[#CCCCCC] tracking-widest mb-1">{t('fixed_supply')}</div>
                                    <div className="text-3xl font-medium tracking-tight text-[#111111]">2.025B</div>
                                </div>
                                <div className="h-10 w-[1px] bg-[#EEEEEE]" />
                                <div>
                                    <div className="text-[10px] uppercase font-bold text-[#CCCCCC] tracking-widest mb-1">{t('genesis_price')}</div>
                                    <div className="text-3xl font-medium tracking-tight text-blue-600">$0.00025</div>
                                </div>
                            </div>
                        </div>

                        {/* Distribution List */}
                        <div className="space-y-4">
                            {tokenomicsData.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.08) }}
                                    className="group/item flex flex-col md:flex-row md:items-center justify-between p-7 rounded-3xl bg-[#FAFAFA] border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-500"
                                >
                                    <div className="flex items-center gap-6 flex-1">
                                        <div className={`w-1.5 h-12 rounded-full ${item.color} opacity-40 group-hover/item:opacity-100 transition-opacity`} />
                                        <div className="flex-1">
                                            <div className="font-semibold text-lg text-[#111111] flex items-center gap-4">
                                                {item.label}
                                                <span className="text-[10px] font-mono text-[#BBBBBB] select-all hidden sm:inline">{item.address}</span>
                                            </div>
                                            <div className="text-sm text-[#888888] font-normal">{item.cond}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-12 mt-6 md:mt-0">
                                        <div className="hidden lg:block text-xs font-mono text-[#AAAAAA]">{item.amount}</div>
                                        <div className="text-4xl font-semibold tracking-tighter text-[#111111] group-hover/item:text-blue-600 transition-colors w-24 text-right">{item.percent}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* Fees Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="rounded-[40px] bg-white border border-[#F0F0F0] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)]"
                        >
                            <h3 className="text-sm font-bold text-[#BBBBBB] uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                                <Flame className="text-orange-500" size={18} /> {t('stats_burn_title')}
                            </h3>

                            <div className="space-y-8">
                                {feeDistribution.map((fee, idx) => (
                                    <div key={idx} className="relative">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-[#888888] uppercase">{fee.label}</span>
                                            <span className="text-4xl font-semibold text-blue-600 leading-none">{fee.p}</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-[#CCCCCC] truncate select-all">{fee.addr}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 p-5 rounded-2xl bg-[#F8F9FF] border border-blue-50 text-[11px] text-[#6677AA] leading-relaxed">
                                {t('stats_fees_desc')}
                            </div>
                        </motion.div>

                        {/* Metrics Widget */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="rounded-[40px] bg-white border border-[#F0F0F0] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] group"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-3 rounded-2xl bg-green-50 text-green-600">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#111111]">{t('stats_safety')}</h3>
                                    <p className="text-[10px] text-[#BBBBBB] uppercase font-bold tracking-widest leading-none mt-1">{t('stats_consensus')}</p>
                                </div>
                            </div>

                            <div className="space-y-5 mb-10">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#999999]">{t('stats_liquidity')}</span>
                                    <span className="text-[#111111] font-semibold">{t('stats_locked')}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-[#999999]">{t('stats_protocol')}</span>
                                    <span className="text-[#111111] font-semibold">{t('stats_audited')}</span>
                                </div>
                            </div>

                            <a href="https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth" target="_blank" className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#111111] text-white text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-black/10">
                                {t('stats_trace')} <ExternalLink size={14} />
                            </a>
                        </motion.div>

                        {/* Final CTA */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="w-full group px-10 py-8 rounded-[48px] bg-white border border-[#F0F0F0] hover:border-blue-200 transition-all shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] text-left"
                        >
                            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{t('stats_cta_eyebrow')}</div>
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-semibold text-[#111111]">{t('stats_cta_title')}</span>
                                <div className="p-3 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                        </motion.button>
                    </div>
                </div>

                {/* Refined Footer */}
                <footer className="mt-32 pt-12 border-t border-[#F0F0F0] flex flex-col md:flex-row items-center justify-between gap-10 text-[#CCCCCC] text-[10px] uppercase font-bold tracking-[0.3em]">
                    <div className="flex items-center gap-12">
                        <span className="flex items-center gap-2 transition-colors hover:text-[#999999]"><Zap size={14} /> Solana Architecture</span>
                        <span className="flex items-center gap-2 transition-colors hover:text-[#999999]"><PieChart size={14} /> Fixed Supply 1.0</span>
                    </div>
                    <div>
                        © 2026 Luxor Enterprise — Protocol v1.02
                    </div>
                </footer>
            </main>
        </div>
    );
}
