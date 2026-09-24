'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Music } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

interface HeroCoverProps {
  onPlayMusic?: () => void;
  isPlayingMusic?: boolean;
}

export const HeroCover: React.FC<HeroCoverProps> = ({ onPlayMusic, isPlayingMusic }) => {
  const scrollToContent = () => {
    const el = document.getElementById('archive');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[82vh] flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-20 pb-12 overflow-hidden">
      {/* Minimalist Top Tag */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-neutral-400"
      >
        <span>{SITE_CONFIG.magazineIssue}</span>
        <span className="text-white/20">•</span>
        <span className="text-amber-300/80">EDITION 18</span>
      </motion.div>

      {/* Main Minimalist Title */}
      <div className="max-w-4xl mx-auto my-auto py-6 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="font-serif text-7xl sm:text-9xl md:text-[11rem] font-light tracking-tight text-white leading-none block select-none"
        >
          Niki
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-amber-200/90 mt-4 mb-3"
        >
          3 ROKY NA PARKETE • 2023 — 2026
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-neutral-400 font-sans max-w-md font-light leading-relaxed mb-8"
        >
          Čistý archív našich spoločných videí, fotiek a momentov od prvého dňa až po tvoju 18-tku.
        </motion.p>

        {/* Minimal Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <button
            onClick={scrollToContent}
            className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs tracking-wider uppercase hover:bg-neutral-200 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <span>Prezrieť momenty</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {onPlayMusic && (
            <button
              onClick={onPlayMusic}
              className="px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white text-xs font-mono tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            >
              <Music className={`w-3.5 h-3.5 ${isPlayingMusic ? 'text-amber-400 animate-pulse' : 'text-neutral-400'}`} />
              <span>{isPlayingMusic ? 'Hudba zapnutá' : 'Pustiť hudbu'}</span>
            </button>
          )}
        </motion.div>
      </div>

      {/* Subtle indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-[11px] text-neutral-400 font-mono tracking-widest uppercase flex items-center gap-2"
      >
        <span className="w-8 h-px bg-white/20" />
        <span>FOKUS NA FOTKY & VIDEÁ</span>
        <span className="w-8 h-px bg-white/20" />
      </motion.div>
    </section>
  );
};
