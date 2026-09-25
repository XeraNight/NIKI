'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const DragIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
      <div className="px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center gap-2 shadow-lg">
        {/* Animated 360 Orbit Icon */}
        <div className="relative w-5 h-5 flex items-center justify-center text-amber-400">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 animate-[spin_10s_linear_infinite]"
          >
            <circle cx="12" cy="12" r="9" strokeDasharray="3 3" opacity="0.4" />
            <path d="M12 3a9 9 0 0 1 9 9" strokeWidth="2" />
            <path d="M21 12l-2-2m2 2l-2 2" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Animated Drag / Swipe Motion Hand */}
        <motion.div
          animate={{ x: [-5, 5, -5] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-white/80 flex items-center"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 text-neutral-300"
          >
            <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
            <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
            <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
            <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
};

export default DragIndicator;
