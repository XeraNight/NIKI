'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const DragIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center pointer-events-none select-none py-2">
      {/* Hand Icon with subtle natural drag / swipe gesture */}
      <motion.div
        animate={{
          x: [-14, 14, -14],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="text-neutral-400/80 hover:text-white transition-colors"
        title="Potiahni pre otočenie"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          {/* Natural hand pointing / grasping gesture */}
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
          <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
      </motion.div>
    </div>
  );
};

export default DragIndicator;
