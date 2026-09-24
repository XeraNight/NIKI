'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MoveHorizontal } from 'lucide-react';
import { SphereImageGrid, ImageData } from '@/components/SphereImageGrid';
import { Formation } from '@/components/Formation';
import { Work } from '@/components/formation-utils/formation-poses';

interface UnifiedShowcaseProps {
  sphereItems: ImageData[];
  formationWorks: Work[];
  onSelectSphereItem: (item: ImageData) => void;
  onSelectFormationWork: (work: Work) => void;
}

export const UnifiedShowcase: React.FC<UnifiedShowcaseProps> = ({
  sphereItems,
  formationWorks,
  onSelectSphereItem,
  onSelectFormationWork,
}) => {
  // Primary default view is 'globe' as requested!
  const [viewMode, setViewMode] = useState<'globe' | 'flat'>('globe');

  return (
    <section className="py-12 sm:py-16 w-full relative overflow-hidden flex flex-col items-center">
      {/* Minimalist Switcher Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-400 block mb-1">
            ARCHÍV MOMENTOV // 2023 — 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Spoločné Zábery & Videá
          </h2>
        </div>

        {/* Minimalist Toggle Pill: Glóbus (Default) vs Pás */}
        <div
          role="tablist"
          className="flex items-center gap-1 p-1 rounded-full bg-[#121217] border border-white/10 shadow-xl"
        >
          <button
            type="button"
            onClick={() => setViewMode('globe')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === 'globe'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3D Glóbus</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('flat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              viewMode === 'flat'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>Pás Fotiek</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with AnimatePresence */}
      <div className="w-full relative min-h-[480px] sm:min-h-[560px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {viewMode === 'globe' ? (
            /* 1. 3D Rotating Globe */
            <motion.div
              key="globe-mode"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-center py-4"
            >
              <SphereImageGrid
                images={sphereItems}
                autoRotate={true}
                autoRotateSpeed={0.25}
                dragSensitivity={0.6}
                onSelectImage={onSelectSphereItem}
              />
              <p className="mt-6 text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                Otáčaj glóbus prstom / myšou • Klikni na položku
              </p>
            </motion.div>
          ) : (
            /* 2. Flat Horizontal Infinite Drag Carousel */
            <motion.div
              key="flat-mode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <Formation
                works={formationWorks}
                onSelect={onSelectFormationWork}
              />
              <p className="mt-4 text-center text-[11px] font-mono tracking-widest uppercase text-neutral-400">
                Ťahaj pás do strán • Klikni pre detail
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
