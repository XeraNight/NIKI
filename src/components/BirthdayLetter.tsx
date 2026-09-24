'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, PartyPopper, Check } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

export const BirthdayLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const triggerConfetti = () => {
    // Premium multi-stage gold/rose gold confetti
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#d4af37', '#f7e7ce', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#e5c07b', '#b89324', '#ff758c'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#d4af37', '#ffd700', '#ffffff'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ffffff', '#fdf2d0'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#d4af37', '#f59e0b'],
    });
  };

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      triggerConfetti();
    }
  };

  const letter = SITE_CONFIG.birthdayLetter;

  return (
    <section id="letter" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070709] via-[#0d0d12] to-[#070709] border-t border-white/[0.06]">
      {/* Background warm celebratory glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Gift className="w-3.5 h-3.5" />
            <span>KAPITOLA 05 // HLAVNÝ DARČEK</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Osobný List k 18-tke
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Tento odkaz je zapečatený len pre teba. Klikni na voskovú pečať a otvor si svoje prianie.
          </p>
        </div>

        {/* The Envelope / Letter Container */}
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Luxury Envelope */
              <motion.div
                key="sealed-envelope"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg cursor-pointer group"
                onClick={handleOpenLetter}
              >
                <div className="relative aspect-[7/5] rounded-3xl p-8 bg-gradient-to-br from-[#1c1a24] via-[#14131a] to-[#0e0d14] border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center justify-between overflow-hidden group-hover:border-amber-400/60 transition-all duration-500 group-hover:scale-[1.02]">
                  {/* Decorative envelope flaps texture */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.15),transparent_70%)]" />
                  
                  {/* Top stamp */}
                  <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-amber-300/80 uppercase tracking-widest border-b border-white/10 pb-3">
                    <span>FOR NIKI // STRICTLY CONFIDENTIAL</span>
                    <span>18TH EDITION</span>
                  </div>

                  {/* Wax Seal Button in Center */}
                  <div className="relative z-10 flex flex-col items-center my-auto">
                    <motion.div
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8a1c14] via-[#b3241b] to-[#610f09] shadow-[0_10px_25px_rgba(179,36,27,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)] border-2 border-[#d4af37]/40 flex items-center justify-center relative cursor-pointer"
                    >
                      <div className="text-center">
                        <span className="font-serif text-2xl sm:text-3xl font-black text-amber-200 block leading-none">
                          18
                        </span>
                        <span className="text-[8px] font-sans uppercase tracking-widest text-amber-300/90 font-bold block mt-0.5">
                          SEAL
                        </span>
                      </div>
                    </motion.div>
                    
                    <span className="text-xs text-amber-300/90 font-medium tracking-wider uppercase mt-4 flex items-center gap-1.5 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Klikni pre rozpečatenie listu
                    </span>
                  </div>

                  {/* Bottom sender label */}
                  <div className="relative z-10 text-center text-xs text-neutral-400 font-sans">
                    S láskou a rešpektom od Jakuba
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Unfolded Handwritten Letter */
              <motion.div
                key="open-letter"
                initial={{ scale: 0.92, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full max-w-2xl bg-[#fdfbf7] text-[#1c1917] rounded-3xl p-6 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.25)] border-4 border-[#e8d5b5] relative overflow-hidden"
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                {/* Top Letter Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-[#e2d0b5] pb-4 mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8c6b32] font-semibold">
                      Osobný odkaz // 18. Narodeniny
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d241e] mt-1">
                      {letter.title}
                    </h3>
                  </div>

                  {/* Confetti re-trigger button */}
                  <button
                    onClick={triggerConfetti}
                    className="p-2.5 rounded-full bg-[#f4ebd9] hover:bg-[#ebdcc2] text-[#8c6b32] transition-colors border border-[#d9c49d] shadow-sm flex items-center gap-1.5 text-xs font-semibold"
                    title="Vystreliť konfety znova"
                  >
                    <PartyPopper className="w-4 h-4 text-[#b8860b]" />
                    <span className="hidden sm:inline">Konfety</span>
                  </button>
                </div>

                {/* Letter Body */}
                <div className="relative z-10 space-y-4 font-sans text-neutral-800 text-sm sm:text-base leading-relaxed">
                  <p className="font-handwriting text-2xl sm:text-3xl text-[#5c3d1e] font-semibold">
                    {letter.greeting}
                  </p>

                  {letter.paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Sign-off */}
                  <div className="pt-6 border-t border-[#e2d0b5]/80 flex flex-col items-end">
                    <span className="text-sm italic text-neutral-600 font-sans">
                      {letter.closing}
                    </span>
                    <span className="font-handwriting text-4xl sm:text-5xl text-[#2d241e] font-bold mt-1">
                      {letter.signature}
                    </span>
                  </div>

                  {/* P.S. Note */}
                  {letter.pS && (
                    <div className="mt-6 p-4 rounded-xl bg-[#f4ede0] border border-[#e5d8c3] text-xs sm:text-sm text-[#4a3b32] italic">
                      {letter.pS}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
