'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
    Menu, X, Send, BarChart2, Disc,
    ChevronDown, ShieldCheck, PieChart,
    Lock, Flame, Copy, ExternalLink,
    Users, Briefcase, Info, Map,
    Zap, Vote, Search, Globe,
    FileText, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LanguageSwitcher from '../features/LanguageSwitcher';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);

export default function Navbar() {
    const t = useTranslations('Navbar');
    const tc = useTranslations('Common');
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMega, setActiveMega] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (menu: string) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMega(menu);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMega(null);
        }, 300);
    };

    const copyCA = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText('8N25C...LXR'); // Dummy CA
            alert(tc('ca_copied'));
        }
    };

    interface MegaMenuItem {
        icon: any;
        title: string;
        desc: string;
        href?: string;
        onClick?: () => void;
        external?: boolean;
    }

    const megaMenus: Record<string, MegaMenuItem[]> = {
        project: [
            { icon: Users, title: t('team'), desc: t('mega.eco_desc_1'), href: '/coming-soon' },
            { icon: Map, title: t('roadmap'), desc: t('mega.eco_desc_3'), href: '/coming-soon' },
            { icon: Info, title: t('docs'), desc: t('mega.eco_desc_2'), href: '/coming-soon' },
            { icon: Briefcase, title: t('mega.eco_title_4'), desc: t('mega.eco_desc_4'), href: '/coming-soon' },
        ],
        ecosystem: [
            { icon: Users, title: t('mega.eco_title_1'), desc: t('mega.eco_desc_1'), href: '/coming-soon' },
            { icon: Zap, title: t('mega.eco_title_2'), desc: t('mega.eco_desc_2'), href: '/coming-soon' },
            { icon: Map, title: t('mega.eco_title_3'), desc: t('mega.eco_desc_3'), href: '/coming-soon' },
            { icon: Search, title: t('github'), desc: t('github_desc'), href: 'https://github.com', external: true },
        ],
        tokenomics: [
            { icon: PieChart, title: t('mega.tok_title_1'), desc: t('mega.tok_desc_1'), href: '/coming-soon' },
            { icon: Users, title: t('holders'), desc: t('holders_desc'), href: 'https://orbmarkets.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth/token-holders', external: true },
            { icon: Lock, title: t('mega.tok_title_3'), desc: t('mega.tok_desc_3'), href: '/coming-soon' },
            { icon: ShieldCheck, title: t('mega.tok_title_4'), desc: t('contract_desc'), href: 'https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth', external: true },
        ],
        utility: [
            { icon: Flame, title: t('mega.util_title_1'), desc: t('mega.util_desc_1'), href: '/coming-soon' },
            { icon: Vote, title: t('mega.util_title_2'), desc: t('mega.util_desc_2'), href: '/coming-soon' },
            { icon: Globe, title: t('mega.util_title_3'), desc: t('solscan_desc'), href: 'https://solscan.io', external: true },
        ],
        business: [
            { icon: Zap, title: t('business'), desc: t('mega.eco_desc_2'), href: '/coming-soon' },
            { icon: Briefcase, title: t('mega.eco_title_1'), desc: 'Partner with Luxor.', href: '/coming-soon' },
            { icon: Map, title: t('mega.eco_title_3'), desc: 'Merchant directory.', href: '/coming-soon' },
        ],
        security: [
            { icon: ShieldCheck, title: t('mega.tok_title_2'), desc: t('mega.tok_desc_2'), href: '/coming-soon' },
            { icon: Info, title: t('certificates'), desc: t('certificates_desc'), href: '/coming-soon' },
            { icon: Lock, title: t('contract_verified'), desc: t('contract_verified_desc'), href: '/coming-soon' },
        ],
        onchain: [
            { icon: Zap, title: "Phantom", desc: t('phantom_desc'), href: 'https://phantom.app/', external: true },
            { icon: Zap, title: "Raydium (Swap)", desc: t('jupiter_desc'), href: 'https://raydium.io/swap/?inputMint=sol&outputMint=7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth', external: true },
            { icon: Search, title: "DexScreener", desc: t('dex_desc'), href: 'https://dexscreener.com/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth', external: true },
            { icon: Zap, title: "Orb Markets", desc: t('orb_desc'), href: 'https://orbmarkets.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth', external: true },
            { icon: Globe, title: "Solscan", desc: t('solscan_desc'), href: 'https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth', external: true },
        ]
    };

    return (
        <nav
            onMouseLeave={handleMouseLeave}
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? 'bg-black/90 backdrop-blur-lg border-b border-white/10'
                : 'bg-transparent border-none'
                }`}
        >
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-16">
                    {/* Left: Logo & Menu Container */}
                    <div className="flex items-center gap-10">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="flex items-center gap-2 group">
                                <Image
                                    src="/assets/icons/esfera.png"
                                    alt="Luxor Logo"
                                    width={44}
                                    height={44}
                                    className="object-cover rounded-full transition-all duration-300 transform group-hover:scale-105"
                                />
                                <span className="text-xl font-sans text-white tracking-tight font-medium">
                                    Luxor
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden xl:block">
                            <div className="flex items-center space-x-1">
                                {[
                                    { id: 'project', label: t('project') },
                                    { id: 'ecosystem', label: t('ecosystem') },
                                    { id: 'tokenomics', label: t('tokenomics') },
                                    { id: 'utility', label: t('utility') },
                                    { id: 'business', label: t('business') },
                                    { id: 'security', label: t('security') },
                                    { id: 'onchain', label: t('onchain') },
                                ].map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative"
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                    >
                                         <button 
                                            suppressHydrationWarning
                                            className={`flex items-center gap-1.5 text-[13px] font-sans px-3 py-2 rounded-full transition-all ${activeMega === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'}`}>
                                             {item.label}
                                         </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-8">
                        {/* Group 1: Social Media */}
                        <div className="flex items-center gap-5 text-white/40">
                            <a href="https://x.com/luxor_lxr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="https://t.me/+HqmOhqYjNlJlYjBh" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <Send size={15} />
                            </a>
                            <a href="https://discord.gg/pFgcmV45yn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.295 1.196-1.995a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.420 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </a>
                            <a href="https://github.com/admluxorsys/luxor" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                            </a>
                            <a href="https://github.com/admluxorsys/luxor/blob/main/Whitepaper.md" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Constitution">
                                <FileText size={16} />
                            </a>
                            <a href="https://phantom.app/tokens/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Phantom Token">
                                <Layers size={16} />
                            </a>
                            <a href="https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Solscan Explorer">
                                <Search size={16} />
                            </a>
                        </div>

                        <div className="h-6 w-[1px] bg-white/10" />

                        {/* Group 2: Functional Actions */}
                        <div className="flex items-center gap-4">
                            <LanguageSwitcher />
                            <div className="flex items-center gap-2">
                                {/* Combined Price + Buy Button */}
                                <a
                                    href="https://phantom.app/tokens/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-white/5 border border-white/10 rounded-full h-9 hover:bg-white/10 hover:border-white/20 transition-all group overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 px-4 h-full">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">LXR</span>
                                        <span className="text-xs text-white font-sans font-bold">$0.00025</span>
                                    </div>
                                    <div className="bg-blue-800 group-hover:bg-blue-900 text-white px-5 h-full flex items-center justify-center text-xs font-sans font-bold border-l border-white/10 transition-colors">
                                        {t('buy')}
                                    </div>
                                </a>

                                <a
                                    href="https://dial.to/?action=solana-action:https://www.byluxor.xyz/api/actions/donate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center bg-blue-600/20 border border-blue-500/30 rounded-full h-9 hover:bg-blue-600/40 hover:border-blue-500/50 transition-all px-4 text-xs font-bold text-blue-400 font-sans"
                                >
                                    Donate
                                </a>

                                <div className="h-9 wallet-pill-container">
                                    <WalletMultiButton>Connect</WalletMultiButton>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button 
                            suppressHydrationWarning
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="relative z-50 p-3 text-white transition-all border border-white/10 rounded-full bg-white/5 backdrop-blur-xl"
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                    >
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                    >
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mega Menus Overlay */}
            <AnimatePresence>
                {activeMega && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="hidden md:block absolute top-[64px] left-0 w-full bg-black border-b border-white/10 overflow-hidden shadow-2xl"
                        onMouseEnter={() => handleMouseEnter(activeMega)}
                    >
                        <div className="w-full px-12 py-10">
                            <div className="grid grid-cols-4 gap-8 max-w-7xl mx-auto">
                                {/* Left Side Info (Optional, like in Google AI example) */}
                                <div className="col-span-1 border-r border-white/5 pr-8">
                                    <h3 className="text-white text-lg font-bold mb-4">
                                        {activeMega === 'project' ? t('mega.title_project') :
                                            activeMega === 'ecosystem' ? t('mega.title_ecosystem') :
                                                activeMega === 'tokenomics' ? t('mega.title_tokenomics') :
                                                    activeMega === 'utility' ? t('mega.title_utility') :
                                                        activeMega === 'business' ? t('mega.title_business') :
                                                            activeMega === 'security' ? t('mega.title_security') : t('mega.title_onchain')}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed">
                                        {t('mega.intro_desc')}
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/coming-soon" className="text-blue-400 text-xs font-bold uppercase tracking-wider hover:text-blue-300 flex items-center gap-2 group">
                                            {t('view_more')}
                                            <ExternalLink size={12} className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="col-span-3 grid grid-cols-2 gap-x-12 gap-y-6">
                                    {megaMenus[activeMega]?.map((item, idx) => (
                                        item.onClick ? (
                                             <button
                                                suppressHydrationWarning
                                                key={idx}
                                                onClick={item.onClick}
                                                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group text-left"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                                                    <item.icon size={20} className="text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                                    <p className="text-white/40 text-[10px] leading-tight font-mono">{item.desc}</p>
                                                </div>
                                            </button>
                                        ) : (
                                            <Link
                                                key={idx}
                                                href={item.href as any}
                                                target={item.external ? "_blank" : "_self"}
                                                rel={item.external ? "noopener noreferrer" : ""}
                                                className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                                                    <item.icon size={20} className="text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                                    <p className="text-white/40 text-xs leading-tight">{item.desc}</p>
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu - Full Screen Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 overflow-y-auto px-6 pt-32 pb-12 flex flex-col"
                    >
                        {/* Background Decorative Element */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        
                        <div className="flex flex-col gap-10">
                            {/* Stats Card */}
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                        <span className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">LXR Live Stats</span>
                                    </div>
                                    <span className="text-xl font-bold text-white">$0.00025</span>
                                </div>
                                <div className="h-px bg-white/5 w-full" />
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Market Cap</p>
                                        <p className="text-white font-medium">$506K</p>
                                    </div>
                                    <div>
                                        <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Liquidity</p>
                                        <p className="text-white font-medium">$120K</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Main Actions */}
                            <div className="flex flex-col gap-4">
                                <motion.a
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    href="https://phantom.app/tokens/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-blue-600 text-white rounded-full h-16 flex items-center justify-center font-bold text-lg active:scale-95 transition-all shadow-2xl shadow-blue-600/20"
                                >
                                    {t('buy')} LXR
                                </motion.a>
                                <motion.a
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    href="https://dial.to/?action=solana-action:https://www.byluxor.xyz/api/actions/donate"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white/5 border border-white/10 text-white rounded-full h-16 flex items-center justify-center font-bold text-lg active:scale-95 transition-all"
                                >
                                    Support Luxor (Donate)
                                </motion.a>
                            </div>

                            {/* Socials & Region */}
                            <div className="flex flex-col gap-8 pt-4 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <motion.a 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            href="https://x.com/luxor_lxr" 
                                            target="_blank" 
                                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                        </motion.a>
                                        <motion.a 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            href="https://discord.gg/pFgcmV45yn" 
                                            target="_blank" 
                                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.295 1.196-1.995a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.420 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                                        </motion.a>
                                        <motion.a 
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            href="https://t.me/+HqmOhqYjNlJlYjBh" 
                                            target="_blank" 
                                            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                                        >
                                            <Send size={20} />
                                        </motion.a>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 px-2">
                                        <span className="text-[9px] text-white/20 uppercase font-bold tracking-widest mr-3">Region</span>
                                        <LanguageSwitcher />
                                    </div>
                                </div>
                            </div>

                            {/* Main Links - Accordion Style */}
                            <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
                                {[
                                    { label: t('home'), href: '/', id: 'home' },
                                    { label: t('project'), href: '#', id: 'project' },
                                    { label: t('ecosystem'), href: '#', id: 'ecosystem' },
                                    { label: t('tokenomics'), href: '#', id: 'tokenomics' },
                                    { label: t('utility'), href: '#', id: 'utility' },
                                    { label: t('business'), href: '#', id: 'business' },
                                    { label: t('security'), href: '#', id: 'security' },
                                    { label: t('onchain'), href: '#', id: 'onchain' },
                                ].map((link, i) => {
                                    const isExpanded = activeMega === link.id;
                                    const subItems = megaMenus[link.id as keyof typeof megaMenus];

                                    return (
                                        <motion.div
                                            key={link.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + i * 0.05 }}
                                            className="flex flex-col"
                                        >
                                            <button 
                                                onClick={() => {
                                                    if (link.id === 'home') {
                                                        setMobileMenuOpen(false);
                                                        return;
                                                    }
                                                    setActiveMega(isExpanded ? null : link.id);
                                                }}
                                                className="flex items-center justify-between text-4xl font-normal text-white hover:text-blue-500 transition-colors tracking-tighter py-2"
                                            >
                                                <span>{link.label}</span>
                                                {subItems && (
                                                    <motion.span 
                                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                                        className="text-white/20"
                                                    >
                                                        <ChevronDown size={24} />
                                                    </motion.span>
                                                )}
                                            </button>

                                            {/* Submenu Content */}
                                            <AnimatePresence>
                                                {isExpanded && subItems && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden flex flex-col gap-4 pl-4 border-l border-white/5 mt-2"
                                                    >
                                                        {subItems.map((sub, sIdx) => (
                                                            sub.onClick ? (
                                                                <button
                                                                    key={sIdx}
                                                                    onClick={() => {
                                                                        sub.onClick?.();
                                                                        setMobileMenuOpen(false);
                                                                    }}
                                                                    className="text-left text-lg text-white/50 hover:text-white transition-colors py-1 flex items-center gap-3"
                                                                >
                                                                    <sub.icon size={16} className="text-blue-500" />
                                                                    {sub.title}
                                                                </button>
                                                            ) : (
                                                                <Link
                                                                    key={sIdx}
                                                                    href={sub.href as any}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                    className="text-lg text-white/50 hover:text-white transition-colors py-1 flex items-center gap-3"
                                                                >
                                                                    <sub.icon size={16} className="text-blue-500" />
                                                                    {sub.title}
                                                                </Link>
                                                            )
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer in Menu */}
                        <div className="mt-auto pt-10 text-center">
                            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] font-medium">© 2026 Luxor Economy</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
