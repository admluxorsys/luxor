'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useState, useTransition, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';

const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const activeLang = languages.find(l => l.code === locale) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (nextLocale: string) => {
        setIsOpen(false);
        if (nextLocale === locale) return;

        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownRef}>
             <button
                suppressHydrationWarning
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isPending}
                className={`flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-black/40 hover:bg-white/5 backdrop-blur-md transition-all duration-200 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                <Globe size={18} className="text-white" />
                <span className="text-sm font-medium text-white">{activeLang.code.toUpperCase()}</span>
                <ChevronDown size={16} className={`text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute right-0 mt-2 w-40 origin-top-right rounded-xl bg-black border border-white/10 shadow-xl shadow-black/50 backdrop-blur-xl focus:outline-none overflow-hidden"
                    >
                        <div className="py-1">
                            {languages.map((lang) => (
                                 <button
                                    suppressHydrationWarning
                                    key={lang.code}
                                    onClick={() => handleSelect(lang.code)}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${locale === lang.code
                                        ? 'bg-white/10 text-white font-medium'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span className="flex items-center gap-2">
                                        <span>{lang.flag}</span>
                                        {lang.label}
                                    </span>
                                    {locale === lang.code && <Check size={16} />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
