'use client';

import React from 'react';
import { Heart, Sparkles, ArrowUp } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] py-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Column: Magazine Back Cover Colophon */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-serif text-2xl font-bold text-white tracking-wider">
              NIKI <span className="text-amber-400">18</span>
            </span>
            <span className="text-neutral-400 font-mono">|</span>
            <span className="font-mono text-[11px] text-amber-400 tracking-widest uppercase">
              {SITE_CONFIG.magazineIssue}
            </span>
          </div>
          <p className="max-w-md text-neutral-400 leading-relaxed font-sans">
            Vytvorené s láskou a obdivom k 18. narodeninám pre moju najlepšiu tanečnú partnerku. 3 roky nezabudnuteľných momentov, súťaží, driny a nekončiaceho smiechu.
          </p>
          <div className="mt-4 flex items-center gap-1.5 text-neutral-300">
            <span>Kódované a vymyslené od</span>
            <span className="font-bold text-amber-300">{SITE_CONFIG.authorName}</span>
            <span>pre</span>
            <span className="font-bold text-amber-300">{SITE_CONFIG.partnerName}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1 inline" />
          </div>
        </div>

        {/* Center: Stylized Magazine Barcode */}
        <div className="flex flex-col items-center">
          <div className="p-3 bg-white rounded-lg shadow-lg flex flex-col items-center">
            {/* SVG barcode effect */}
            <div className="flex items-stretch h-10 gap-[2px] px-2">
              <span className="w-1 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-1.5 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-2 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-1 bg-black" />
              <span className="w-2.5 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-1 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-2 bg-black" />
              <span className="w-1 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-1.5 bg-black" />
              <span className="w-2 bg-black" />
              <span className="w-0.5 bg-black" />
              <span className="w-1 bg-black" />
            </div>
            <span className="text-[9px] font-mono text-black font-bold tracking-[0.25em] mt-1">
              9 780201 182026
            </span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-2">
            PHYSICAL MAGAZINE COMPANION
          </span>
        </div>

        {/* Right Column: Scroll to Top */}
        <div className="flex flex-col items-center md:items-end">
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white border border-white/10 hover:border-amber-400/40 transition-all flex items-center gap-2 group cursor-pointer mb-2"
          >
            <span className="text-xs font-mono uppercase tracking-wider group-hover:text-amber-300">
              Späť na začiatok
            </span>
            <ArrowUp className="w-4 h-4 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <span className="text-[11px] text-neutral-400 font-mono">
            {SITE_CONFIG.startYear} — {SITE_CONFIG.currentYear} • All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};
