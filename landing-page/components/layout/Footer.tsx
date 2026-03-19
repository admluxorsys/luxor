'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import {
    Send,
    Github,
    Globe,
    FileText,
    Layers,
    Search,
    Heart
} from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Navbar');
    const tf = useTranslations('Footer');
    const tc = useTranslations('Common');

    const socialLinks = [
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            href: "https://x.com/luxor_lxr",
            name: "X"
        },
        { icon: <Send size={18} />, href: "https://t.me/+HqmOhqYjNlJlYjBh", name: "Telegram" },
        {
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.295 1.196-1.995a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.420 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
            ),
            href: "https://discord.gg/pFgcmV45yn",
            name: "Discord"
        },
        { icon: <Github size={20} />, href: "https://github.com/admluxorsys/luxor", name: "GitHub" },
        { icon: <FileText size={18} />, href: "https://github.com/admluxorsys/luxor/blob/main/Whitepaper.md", name: t('docs') },
        { icon: <Layers size={18} />, href: "https://phantom.app/tokens/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth", name: "Phantom Token" },
        { icon: <Search size={18} />, href: "https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth", name: "Solscan" },
    ];

    const footerSections = [
        {
            title: tf('col_project_title'),
            links: [
                { name: t('team'), href: '/team' },
                { name: t('roadmap'), href: '#' },
                { name: t('docs'), href: '#' },
                { name: t('mega.eco_title_4'), href: '#' },
            ]
        },
        {
            title: t('ecosystem'),
            links: [
                { name: t('mega.eco_title_1'), href: '#' },
                { name: t('mega.eco_title_2'), href: '#' },
                { name: t('mega.eco_title_3'), href: '#' },
                { name: "Github", href: 'https://github.com' },
            ]
        },
        {
            title: t('tokenomics'),
            links: [
                { name: t('mega.tok_title_1'), href: '#' },
                { name: tf('link_holders'), href: '#' },
                { name: t('mega.tok_title_3'), href: '#' },
                { name: tf('link_verified'), href: 'https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth' },
            ]
        },
        {
            title: t('utility'),
            links: [
                { name: t('mega.util_title_1'), href: '#' },
                { name: t('mega.util_title_2'), href: '#' },
                { name: t('mega.util_title_3'), href: '#' },
            ]
        },
        {
            title: tf('col_biz_title'),
            links: [
                { name: tf('link_integra'), href: '/coming-soon' },
                { name: tf('link_autonomous'), href: '/coming-soon' },
                { name: tf('link_glasses'), href: '/coming-soon' },
            ]
        },
        {
            title: tf('col_sec_title'),
            links: [
                { name: t('mega.tok_title_2'), href: '#' },
                { name: tf('link_certificates'), href: '#' },
                { name: tf('link_verified'), href: '#' },
            ]
        },
        {
            title: tf('col_onchain_title'),
            links: [
                { name: "Phantom", href: 'https://phantom.app/' },
                { name: "Raydium (Swap)", href: 'https://raydium.io/swap/?inputMint=sol&outputMint=7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth' },
                { name: "DexScreener", href: 'https://dexscreener.com/solana/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth' },
                { name: "Streamflow", href: 'https://app.streamflow.finance/' },
                { name: "Solscan", href: 'https://solscan.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth' },
                { name: "Dial.to (Blinks)", href: 'https://dial.to/?action=solana-action:https://jup.ag/swap/SOL-7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth' },
                { name: "Orb (Holders)", href: 'https://orbmarkets.io/token/7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth/token-holders?page=1&pageSize=10' },
            ]
        },
        {
            title: "Contact",
            links: [
                { name: 'services@byluxor.com', href: 'mailto:services@byluxor.com' },
                { name: '+13859779375', href: 'tel:+13859779375' },
                { name: '170 S W Temple St, Salt Lake City, UT 84101', href: 'https://maps.google.com/?q=170+S+W+Temple+St,+Salt+Lake+City,+UT+84101', target: '_blank' },
            ]
        }
    ];

    return (
        <footer className="bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* 1. Header Row - Follow Us & Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 pb-16 border-b border-white/5">
                    {/* Left side: Socials */}
                    <div className="flex items-center gap-8 mb-2 lg:mb-0">
                        <span className="text-white/30 font-sans text-[10px] tracking-[0.2em] uppercase font-bold">{tf('followUs')}</span>
                        <div className="flex items-center gap-6">
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white/40 hover:text-white transition-all transform hover:scale-110"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Newsletter Section */}
                    <div className="flex flex-col gap-5 w-full max-w-[440px]">
                        <div className="space-y-1">
                            <h3 className="text-white text-lg font-sans font-medium tracking-tight">{tf('newsletter_title')}</h3>
                            <p className="text-white/40 text-xs leading-relaxed">{tf('newsletter_desc')}</p>
                        </div>
                        <div className="flex gap-2 w-full">
                            <input
                                type="email"
                                placeholder={tf('newsletter_placeholder')}
                                className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-xs focus:outline-none focus:border-white/20 flex-grow transition-colors placeholder:text-white/20"
                            />
                            <button className="bg-white text-black rounded-full px-7 py-2.5 text-xs font-bold hover:bg-white/90 active:scale-95 transition-all shrink-0">
                                {tf('newsletter_cta')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. Main content area: Slogan (Left) + Grid (Right) */}
                <div className="flex flex-col lg:flex-row gap-x-12 gap-y-20 mb-32">
                    {/* Left Side: Slogan */}
                    <div className="lg:w-1/4">
                        <h2 className="text-2xl md:text-3xl font-sans font-medium tracking-tight leading-tight sticky top-24 text-white">
                            {tf('slogan_1')} <br />
                            {tf('slogan_2')} <br />
                            {tf('slogan_3')}
                        </h2>
                    </div>

                    {/* Right Side: Columns in a Grid */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
                            {footerSections.map((section, idx) => (
                                <div key={idx} className="flex flex-col gap-6">
                                    <div>
                                        <h3 className="text-white text-lg font-sans font-medium mb-3">{section.title}</h3>
                                    </div>
                                    <ul className="flex flex-col gap-4">
                                        {section.links.map((link, lIdx) => {
                                            const isHighlight = link.name === tf('link_integra');
                                            return (
                                                <li key={lIdx}>
                                                    <Link
                                                        href={link.href}
                                                        target={(link as any).target}
                                                        className={`${isHighlight
                                                            ? "text-[#2563EB] hover:text-[#3B82F6] font-bold"
                                                            : "text-white/60 hover:text-white"
                                                            } text-sm font-sans transition-colors flex items-center gap-2 group`}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Accepted In Ecosystem Section */}
                        <div className="mt-28 pt-16 border-t border-white/5">
                            <h4 className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold mb-10">
                                {tf('accepted_in')}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-16 gap-y-10">
                                <span className="text-white/20 text-2xl font-black tracking-tighter hover:text-white transition-colors cursor-default select-none">PHANTOM</span>
                                <span className="text-white/20 text-2xl font-black tracking-tighter hover:text-white transition-colors cursor-default select-none">SOLANA</span>
                                <span className="text-white/20 text-2xl font-black tracking-tighter hover:text-white transition-colors cursor-default select-none">JUPITER</span>
                                <span className="text-white/20 text-2xl font-black tracking-tighter hover:text-white transition-colors cursor-default select-none">SQUADS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Bottom Row */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3 group cursor-default">
                        <img
                            src="/assets/icons/esfera.png"
                            alt="Luxor Logo"
                            className="w-8 h-8 object-contain brightness-125 filter group-hover:rotate-12 transition-transform duration-500"
                        />
                        <span className="text-lg font-sans font-medium tracking-tighter">{tc('luxor_economy')}</span>
                    </div>

                    {/* Secondary Navigation */}
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-sans text-white/40">
                        <Link href="/about" className="hover:text-white transition-colors">{tf('about')}</Link>
                        <Link href="/products" className="hover:text-white transition-colors">{t('ecosystem')}</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">{tf('privacy')}</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">{tf('terms')}</Link>
                        <span className="md:ml-4 flex items-center gap-1">
                            © 2026 Luxor {tf('copyright')} <Heart className="w-3 h-3 text-red-500 fill-current" />
                        </span>
                    </div>

                    {/* Language/Location Hint */}
                    <div className="flex items-center gap-2 text-xs font-sans text-white/40">
                        <Globe size={14} />
                        <span>{
                            (() => {
                                const locale = useLocale();
                                const labels: Record<string, string> = {
                                    en: 'English (US)',
                                    es: 'Español (Latinoamérica)',
                                    fr: 'Français',
                                    pt: 'Português',
                                    de: 'Deutsch',
                                    zh: '中文',
                                    ja: '日本語',
                                    ru: 'Русский'
                                };
                                return labels[locale] || 'English (US)';
                            })()
                        }</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
