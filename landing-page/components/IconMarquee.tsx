'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  GitBranch,
  Package,
  Code2,
  Terminal,
  RefreshCw,
  Layout,
  Folder,
  ArrowUpRight,
  CheckCircle2,
  Command,
  LogIn,
  Search,
  Wand2,
  Copy,
  Cpu,
  Zap,
  Shield,
  Layers,
  Activity,
  Box,
  Globe,
  Database,
  Link,
  Send,
  Github,
  Settings
} from 'lucide-react';

const XIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const DiscordIcon = (props: any) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.295 1.196-1.995a.076.076 0 0 0-.041-.105 13.11 13.11 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.420 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const iconList = [
  XIcon, DiscordIcon, Github, Send,
  Sparkles, GitBranch, Package, Code2, Terminal, RefreshCw, Layout, Folder,
  ArrowUpRight, CheckCircle2, Command, LogIn, Search, Wand2, Copy,
  Cpu, Zap, Shield, Layers, Activity, Box, Globe, Database, Link, Settings
];

export const IconMarquee = () => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const horizontalDuration = 100; // Controla la lentitud horizontal (más alto = más lento)
  const verticalDuration = 8;    
  const delayStep = verticalDuration / iconList.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return (
    <div className="w-full bg-black py-40 h-[400px]" />
  );

  return (
    <section className="w-full bg-black py-40 overflow-hidden relative">
      <div className="absolute top-10 md:top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-zinc-400 text-xs md:text-sm font-medium tracking-widest uppercase">Contract Address</span>
        <button 
          onClick={handleCopy}
          className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full py-2.5 px-5 md:px-7 backdrop-blur-md transition-all duration-300"
        >
          <span className="text-white/80 group-hover:text-white font-mono text-xs md:text-base transition-colors">7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth</span>
          {copied ? (
            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          ) : (
            <Copy className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-hover:text-white transition-colors" />
          )}
        </button>
      </div>

      <div className="flex w-full items-center mt-10 md:mt-16">
        <motion.div
          key={horizontalDuration}
          className="flex whitespace-nowrap gap-6 md:gap-8 items-center will-change-transform"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: horizontalDuration,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...iconList, ...iconList].map((Icon, idx) => (
            <motion.div
              key={`icon-${idx}`}
              className="flex-shrink-0"
              animate={{ 
                y: [typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 50, typeof window !== 'undefined' && window.innerWidth < 768 ? -20 : -50, typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 50] 
              }}
              transition={{
                duration: verticalDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (idx % iconList.length) * -delayStep
              }}
            >
              <div className="group relative">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10 shadow-xl">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white/40 group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
