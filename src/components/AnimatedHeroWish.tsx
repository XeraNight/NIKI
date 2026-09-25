'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedHeroWish: React.FC = () => {
  // Phase 1: 'center' (0 to 1s) - "Niki" in center on dark canvas
  // Phase 2: 'paper' (1s+) - Cream paper appears and handwriting animates
  const [phase, setPhase] = useState<'center' | 'paper'>('center');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('paper');
    }, 1000); // exactly 1 second

    return () => clearTimeout(timer);
  }, []);

  // Words breakdown for progressive ink writing
  const introWords = ['všetko', 'najlepšie', 'k', 'tvojim'];
  const post18Words = ['narodeninám.'];
  const wishWords = [
    'Prajem', 'ti,', 'aby', 'si', 'bola', 'zdravá,', 'šťastná',
    'a', 'aby', 'si', 'svoj', 'životný', 'príbeh', 'písala',
    's', 'eufóriou', 'a', 'veľkým', 'úsmevom', 'na', 'tvári.'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-6 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[440px] relative">
      
      {/* PHASE 1: Centered "Niki" on Dark Background (0 to 1.0s) */}
      <AnimatePresence>
        {phase === 'center' && (
          <motion.div
            key="center-name"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.4 } }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center text-center py-12"
          >
            <h1 className="font-serif text-7xl sm:text-9xl md:text-[11rem] font-light tracking-tight text-white leading-none select-none drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
              Niki
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: Cream Paper Sheet with Handwritten Ink Letter (1.0s+) */}
      {phase === 'paper' && (
        <motion.div
          key="paper-sheet"
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.85,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full max-w-2xl sm:max-w-3xl bg-[#FAF7EE] text-[#241F1A] rounded-xl sm:rounded-2xl p-6 sm:p-10 md:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_0_1px_rgba(224,213,190,0.7)] overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(#e5dbc3 0.65px, transparent 0.65px),
              linear-gradient(to bottom, #FAF7EE, #F5EFE0)
            `,
            backgroundSize: '16px 16px, 100% 100%',
          }}
        >
          {/* Subtle paper grain & tactile stationery edge */}
          <div className="absolute inset-0 border border-[#dfd4bd] rounded-xl sm:rounded-2xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

          {/* Letter Content */}
          <div className="relative z-10 flex flex-col gap-4 sm:gap-6 font-handwriting leading-relaxed select-none">
            
            {/* Salutation: "Niki," */}
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl text-[#1E1A17] font-semibold tracking-wide"
            >
              Niki,
            </motion.div>

            {/* Line 1: "... všetko najlepšie k tvojim 18. narodeninám." */}
            <div className="text-2xl sm:text-3xl md:text-4xl text-[#2B2520] flex flex-wrap items-baseline gap-x-2 gap-y-1">
              {introWords.map((word, index) => (
                <motion.span
                  key={`intro-${index}`}
                  initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.35,
                    delay: 0.5 + index * 0.12,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}

              {/* Realistic Gold Leaf Foil Embossed "18." (No AI video-game glow) */}
              <motion.span
                initial={{ opacity: 0, scale: 0.7, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + introWords.length * 0.12 + 0.1,
                  type: 'spring',
                  stiffness: 180,
                  damping: 15,
                }}
                className="relative inline-flex items-baseline mx-1 align-baseline font-serif font-black text-3xl sm:text-4xl md:text-5xl"
              >
                {/* Burnished Gold Leaf Gradient */}
                <span
                  className="relative z-10 bg-gradient-to-b from-[#dfba52] via-[#c59b27] to-[#8f660d] bg-clip-text text-transparent"
                  style={{
                    filter: 'drop-shadow(0 1px 1px rgba(255,255,255,0.85)) drop-shadow(0 1px 2px rgba(0,0,0,0.35))',
                  }}
                >
                  18
                </span>

                {/* Subtle natural metallic sheen reflection */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent bg-clip-text text-transparent pointer-events-none -translate-x-full animate-[shimmerSweep_3s_infinite]" />
                
                <span className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#2B2520] ml-0.5">.</span>
              </motion.span>

              {post18Words.map((word, index) => (
                <motion.span
                  key={`post-${index}`}
                  initial={{ opacity: 0, y: 6, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.35,
                    delay: 0.65 + (introWords.length + 1 + index) * 0.12,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Line 2: Heartfelt wish appearing naturally like handwriting */}
            <div className="text-2xl sm:text-3xl md:text-4xl text-[#332C26] flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-1 sm:pt-2">
              {wishWords.map((word, index) => (
                <motion.span
                  key={`wish-${index}`}
                  initial={{ opacity: 0, y: 5, filter: 'blur(1.5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{
                    duration: 0.32,
                    delay: 1.4 + index * 0.08,
                    ease: 'easeOut',
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </div>

          </div>

          {/* Discreet authentic corner watermark / stationery accent */}
          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#b3a589]/60 select-none">
            2023 – 2026 // 18.
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default AnimatedHeroWish;
