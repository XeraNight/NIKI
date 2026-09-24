'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Heart, Music, Award } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

interface HeroCoverProps {
  onPlayMusic?: () => void;
  isPlayingMusic?: boolean;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ onPlayMusic, isPlayingMusic }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-16 pb-12 overflow-hidden border-b border-white/[0.08]">
      {/* Background ambient editorial imagery overlay with gentle parallax feel */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/80 via-[#070709]/60 to-[#070709] z-10" />
        <img
          src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1920&auto=format&fit=crop"
          alt="Dance Background"
          className="w-full h-full object-cover object-center filter grayscale opacity-25 scale-105"
        />
        {/* Subtle decorative grid/vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#070709_85%)] z-10" />
      </div>

      {/* Top Editorial Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 border border-white/10 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md"
      >
        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {SITE_CONFIG.magazineIssue}
        </span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span>SCANNED FROM PHYSICAL EDITION</span>
        <span className="hidden sm:inline text-white/30">•</span>
        <span className="text-neutral-300">{SITE_CONFIG.magazineDate}</span>
      </motion.div>

      {/* Center Hero Stage */}
      <div className="relative z-20 max-w-5xl mx-auto my-auto py-8 flex flex-col items-center">
        {/* Giant Number 18 Badge with Golden Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.9, type: 'spring', damping: 20 }}
          className="relative mb-3 sm:mb-4"
        >
          <span className="font-serif text-6xl sm:text-8xl md:text-9xl font-extrabold text-gold-gradient tracking-tight block drop-shadow-[0_10px_35px_rgba(212,175,55,0.3)]">
            18
          </span>
          <div className="absolute -top-2 -right-3 sm:-right-4 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-[10px] sm:text-xs font-sans uppercase font-bold text-amber-300 tracking-wider">
            SWEET 18
          </div>
        </motion.div>

        {/* Editorial Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-neutral-400 mb-2"
        >
          SPECIAL DIGITAL COMPANION & ARCHIVE
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6"
        >
          Niki & Jakub
        </motion.h1>

        {/* Tagline & Years */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-xl text-neutral-300 font-sans font-light leading-relaxed mb-6">
            3 roky tanca, desiatky pódií, stovky hodín tréningov a nespočetné momenty smiechu v zákulisí. Dnes oslavujeme tvoj veľký deň.
          </p>

          {/* Quick Metrics / Editorial Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mb-8 text-center">
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300">3 Roky</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Spolu na parkete</div>
            </div>
            <div className="border-x border-white/10">
              <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300">18</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Tvoj míľnik</div>
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-amber-300">∞</div>
              <div className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-wider">Spomienok</div>
            </div>
          </div>
        </motion.div>

        {/* Interactive CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto"
        >
          <button
            onClick={() => scrollToSection('gallery')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-semibold text-sm tracking-wide shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Otvoriť archív momentov</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          {onPlayMusic && (
            <button
              onClick={onPlayMusic}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-medium text-sm transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Music className={`w-4 h-4 ${isPlayingMusic ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
              <span>{isPlayingMusic ? 'Hrá naša hudba' : 'Pustiť hudbu k spomienkam'}</span>
            </button>
          )}

          <button
            onClick={() => scrollToSection('letter')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent hover:bg-white/[0.05] border border-amber-400/30 hover:border-amber-400/60 text-amber-300 font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>List k 18-tke</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom Editorial Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-20 flex flex-col items-center gap-2 text-center"
      >
        <p className="font-handwriting text-xl sm:text-2xl text-amber-200/90 max-w-lg">
          „Pretože najlepšie tance sú tie, pri ktorých zabudneš, že sa niekto pozerá.“
        </p>
        <span className="text-[11px] text-neutral-400 font-mono tracking-widest uppercase">
          — Jakub pre Niki • 2026
        </span>
      </motion.div>
    </section>
  );
};
