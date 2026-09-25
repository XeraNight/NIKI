'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PartyPopper, RotateCcw } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

export const RealisticEnvelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterExtracted, setLetterExtracted] = useState(false);

  const fireConfetti = () => {
    const count = 220;
    const defaults = {
      origin: { y: 0.65 },
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
      spread: 28,
      startVelocity: 55,
      colors: ['#d4af37', '#ffd700', '#ffffff'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#f7e7ce', '#e5c07b', '#ff758c'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.85,
      colors: ['#d4af37', '#ffffff', '#e0a96d'],
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

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      fireConfetti();
      setTimeout(() => {
        setLetterExtracted(true);
      }, 700);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLetterExtracted(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  const letter = SITE_CONFIG.birthdayLetter;

  return (
    <section className="py-24 px-4 sm:px-6 relative overflow-hidden flex flex-col items-center justify-center border-t border-white/[0.06]">
      {/* Background warm celebratory atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/[0.07] blur-[160px] rounded-full pointer-events-none" />

      {/* Envelope Stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-[440px] min-h-[460px] flex items-center justify-center perspective-[1200px]">
        {/* The Realistic Envelope Container */}
        <div
          onClick={!isOpen ? handleOpen : undefined}
          className={`relative w-full aspect-[1.45/1] rounded-2xl transition-transform duration-500 ${
            !isOpen ? 'cursor-pointer hover:scale-[1.02]' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.8))',
          }}
        >
          {/* 1. Envelope Back Interior Layer */}
          <div
            className="absolute inset-0 rounded-2xl bg-[#141318] border border-amber-500/20 overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#d4af3715_1px,transparent_1px)] bg-[size:12px_12px]" />
          </div>

          {/* 2. The Letter (Slides out of pocket) */}
          <motion.div
            initial={false}
            animate={{
              y: letterExtracted ? -180 : isOpen ? -60 : 0,
              scale: letterExtracted ? 1.04 : 0.94,
              zIndex: letterExtracted ? 30 : 2,
            }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 18,
            }}
            className="absolute inset-x-3 top-3 bottom-3 rounded-xl bg-[#fdfaf3] text-[#1c1917] p-5 sm:p-7 shadow-2xl flex flex-col justify-between overflow-hidden border border-[#e8ddcb]"
            style={{
              boxShadow: letterExtracted
                ? '0 30px 60px -12px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(212,175,55,0.3)'
                : '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            {/* Letter Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[#e2d6c1] pb-2 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8c6b32] font-semibold">
                  NIKI // 18
                </span>
                <span className="font-serif text-xs italic text-[#705528]">
                  2023 — 2026
                </span>
              </div>

              <h3 className="font-handwriting text-2xl sm:text-3xl text-[#3b2a1a] font-bold mb-2">
                {letter.greeting}
              </h3>

              <div className="space-y-2 text-xs sm:text-[13px] text-neutral-800 leading-relaxed font-sans max-h-[220px] overflow-y-auto pr-1">
                {letter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Signature & Controls */}
            <div className="relative z-10 pt-3 border-t border-[#e2d6c1] flex items-end justify-between mt-2">
              <div className="flex items-center gap-2">
                {letterExtracted && (
                  <button
                    onClick={fireConfetti}
                    className="p-1.5 rounded-full bg-[#f4ebd9] hover:bg-[#ebdcc2] text-[#8c6b32] transition-colors border border-[#d9c49d] cursor-pointer"
                    title="Vystreliť konfety"
                  >
                    <PartyPopper className="w-3.5 h-3.5 text-[#b8860b]" />
                  </button>
                )}
                {letterExtracted && (
                  <button
                    onClick={handleReset}
                    className="p-1.5 rounded-full bg-[#f4ebd9] hover:bg-[#ebdcc2] text-[#8c6b32] transition-colors border border-[#d9c49d] cursor-pointer"
                    title="Zavrieť list"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#b8860b]" />
                  </button>
                )}
              </div>

              <div className="text-right">
                <span className="text-[11px] italic text-neutral-600 block">
                  {letter.closing}
                </span>
                <span className="font-handwriting text-2xl sm:text-3xl text-[#2d241e] font-bold block leading-none mt-1">
                  {letter.signature}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3. Front Envelope Pocket */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden"
            style={{ zIndex: 10 }}
          >
            <div
              className="absolute inset-y-0 left-0 w-1/2 bg-[#1b1a22]"
              style={{
                clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
                boxShadow: 'inset -2px 0 10px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2 bg-[#191820]"
              style={{
                clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
                boxShadow: 'inset 2px 0 10px rgba(0,0,0,0.5)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#141318] to-[#1e1c26]"
              style={{
                clipPath: 'polygon(0% 100%, 50% 15%, 100% 100%)',
                boxShadow: '0 -4px 15px rgba(0,0,0,0.6)',
              }}
            />
          </div>

          {/* 4. Top Flap with Wax Seal */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 0 : 20,
            }}
            transition={{
              duration: 0.65,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-x-0 top-0 h-[58%] origin-top cursor-pointer pointer-events-auto"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#24222e] to-[#1c1a24] rounded-t-2xl border-t border-amber-500/30 flex items-center justify-center backface-hidden"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
              }}
            >
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#8a1c14] via-[#b3241b] to-[#610f09] shadow-[0_8px_20px_rgba(179,36,27,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] border-2 border-[#d4af37]/50 flex items-center justify-center"
                >
                  <div className="text-center select-none">
                    <span className="font-serif text-2xl font-black text-amber-200 block leading-none">
                      18
                    </span>
                    <span className="text-[7px] font-mono uppercase tracking-widest text-amber-300 font-bold block mt-0.5">
                      SEAL
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            <div
              className="absolute inset-0 bg-[#16151c] rounded-t-2xl rotate-x-180 backface-hidden"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
