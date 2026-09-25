'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AnimatedHeroWishProps {
  className?: string;
}

export const AnimatedHeroWish: React.FC<AnimatedHeroWishProps> = ({ className = '' }) => {
  // Phase 1: 'center' (first 1 second, "Niki" centered like the original hero)
  // Phase 2: 'shifted' (after 1000ms, shrinks & transitions to top-left, revealing the wish)
  const [phase, setPhase] = useState<'center' | 'shifted'>('center');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('shifted');
    }, 1000); // exactly 1 second as requested

    return () => clearTimeout(timer);
  }, []);

  // Sentence tokens configured for staggered progressive blooming
  const tokens = [
    { text: ', ', isGold: false },
    { text: 'všetko ', isGold: false },
    { text: 'najlepšie ', isGold: false },
    { text: 'k ', isGold: false },
    { text: 'tvojim ', isGold: false },
    { text: '18.', isGold: true },
    { text: 'narodeninám. ', isGold: false },
    { text: 'Prajem ', isGold: false },
    { text: 'ti, ', isGold: false },
    { text: 'aby ', isGold: false },
    { text: 'si ', isGold: false },
    { text: 'bola ', isGold: false },
    { text: 'zdravá, ', isGold: false },
    { text: 'šťastná ', isGold: false },
    { text: 'a ', isGold: false },
    { text: 'aby ', isGold: false },
    { text: 'si ', isGold: false },
    { text: 'svoj ', isGold: false },
    { text: 'životný ', isGold: false },
    { text: 'príbeh ', isGold: false },
    { text: 'písala ', isGold: false },
    { text: 's ', isGold: false },
    { text: 'eufóriou ', isGold: false },
    { text: 'a ', isGold: false },
    { text: 'veľkým ', isGold: false },
    { text: 'úsmevom ', isGold: false },
    { text: 'na ', isGold: false },
    { text: 'tvári.', isGold: false },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.15,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <header className={`w-full max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-4 sm:pb-8 flex flex-col justify-center min-h-[180px] sm:min-h-[240px] transition-all duration-700 ${className}`}>
      <div
        className={`w-full flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          phase === 'center'
            ? 'items-center text-center'
            : 'items-start text-left'
        }`}
      >
        <div className="relative inline leading-snug">
          {/* Main Name "Niki" */}
          <motion.span
            layout
            transition={{
              type: 'spring',
              stiffness: 75,
              damping: 18,
              mass: 0.8,
            }}
            className={`font-serif tracking-tight select-none inline-block transition-all duration-1000 ${
              phase === 'center'
                ? 'text-7xl sm:text-9xl md:text-[11rem] font-light text-white leading-none'
                : 'text-3xl sm:text-5xl md:text-6xl font-normal text-amber-200/90 leading-tight align-baseline mr-1 drop-shadow-[0_0_20px_rgba(251,191,36,0.25)]'
            }`}
          >
            Niki
          </motion.span>

          {/* Progressive reveal of the wish sentence */}
          {phase === 'shifted' && (
            <motion.span
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-serif text-xl sm:text-3xl md:text-4xl text-neutral-200/95 font-light leading-relaxed tracking-normal align-baseline"
            >
              {tokens.map((token, idx) => {
                if (token.isGold) {
                  return (
                    <motion.span
                      key={idx}
                      variants={{
                        hidden: { scale: 0.3, opacity: 0, y: 15, rotate: -6 },
                        visible: {
                          scale: 1,
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          transition: {
                            type: 'spring',
                            stiffness: 220,
                            damping: 12,
                          },
                        },
                      }}
                      className="relative inline-block mx-1.5 align-baseline font-serif font-bold text-3xl sm:text-5xl md:text-6xl"
                    >
                      {/* Pulsing multi-tone 24k gold gradient */}
                      <span className="relative z-10 bg-gradient-to-b from-[#FFFBE6] via-[#FFD700] to-[#C99700] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(255,215,0,0.7)] animate-pulse inline-block">
                        18
                      </span>

                      {/* Continuous gold shimmer sweep */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent bg-clip-text text-transparent pointer-events-none -translate-x-full animate-[shimmerSweep_2.6s_infinite]" />

                      {/* Golden Sparkle Star */}
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                          scale: [0.7, 1.25, 0.7],
                          opacity: [0.4, 1, 0.4],
                          rotate: [0, 90, 180],
                        }}
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="absolute -top-3 -right-3 text-amber-300 pointer-events-none"
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300 drop-shadow-[0_0_8px_#ffd700]" />
                      </motion.span>
                      <span className="text-neutral-200 font-light text-xl sm:text-3xl md:text-4xl">. </span>
                    </motion.span>
                  );
                }

                return (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block"
                  >
                    {token.text}&nbsp;
                  </motion.span>
                );
              })}
            </motion.span>
          )}
        </div>
      </div>
    </header>
  );
};

export default AnimatedHeroWish;
