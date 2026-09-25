'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBacklight: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center -z-10 select-none">
      {/* Primary breathing golden stage spotlight directly behind the 3D globe */}
      <motion.div
        animate={{
          scale: [0.92, 1.08, 0.92],
          opacity: [0.28, 0.45, 0.28],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[500px] h-[500px] sm:w-[680px] sm:h-[680px] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(217, 119, 6, 0.14) 45%, rgba(180, 83, 9, 0.03) 75%, transparent 100%)',
        }}
      />

      {/* Secondary gentle floating champagne glow (drifts horizontally) */}
      <motion.div
        animate={{
          x: [-35, 35, -35],
          y: [-20, 20, -20],
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[400px] h-[400px] sm:w-[540px] sm:h-[540px] rounded-full blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.20) 0%, rgba(245, 158, 11, 0.08) 50%, transparent 100%)',
        }}
      />

      {/* Tertiary subtle rose-gold rim light (drifts diagonally) */}
      <motion.div
        animate={{
          x: [25, -25, 25],
          y: [15, -15, 15],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-[350px] h-[350px] sm:w-[480px] sm:h-[480px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.12) 0%, rgba(217, 119, 6, 0.06) 60%, transparent 100%)',
        }}
      />

      {/* Delicate floating warm bokeh specks (mimicking ballroom dust/light particles) */}
      {[
        { top: '30%', left: '22%', size: 4, delay: 0, dur: 7 },
        { top: '65%', left: '28%', size: 5, delay: 2, dur: 9 },
        { top: '25%', left: '72%', size: 3, delay: 1, dur: 8 },
        { top: '70%', left: '76%', size: 4, delay: 3, dur: 10 },
        { top: '45%', left: '15%', size: 3, delay: 4, dur: 11 },
        { top: '50%', left: '84%', size: 5, delay: 2.5, dur: 8.5 },
      ].map((speck, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-18, 18, -18],
            x: [-8, 8, -8],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: speck.dur,
            repeat: Infinity,
            delay: speck.delay,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]"
          style={{
            top: speck.top,
            left: speck.left,
            width: `${speck.size}px`,
            height: `${speck.size}px`,
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBacklight;
