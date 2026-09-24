'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HandMetal } from 'lucide-react';
import { PolaroidItem, MemoryItem } from '@/types';

interface PolaroidDeckProps {
  polaroids: PolaroidItem[];
  onOpenImage?: (item: MemoryItem) => void;
}

export const PolaroidDeck: React.FC<PolaroidDeckProps> = ({ polaroids, onOpenImage }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="polaroids" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070709] via-[#0b0b0f] to-[#070709] border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KAPITOLA 03 // MOODBOARD</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Nefiltrované Momentky
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Každá fotka má svoj príbeh, chybu v choreografii alebo výbuch smiechu. Tieto polaroidy si môžeš voľne chytať a rozhadzovať po ploche!
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-amber-300/80 bg-white/[0.04] border border-white/10 px-3.5 py-1.5 rounded-full">
            <HandMetal className="w-3.5 h-3.5 text-amber-400" />
            <span>Potiahni fotku prstom alebo myšou</span>
          </div>
        </div>

        {/* Interactive Cork/Velvet Drag Zone */}
        <div
          ref={containerRef}
          className="relative min-h-[520px] sm:min-h-[580px] rounded-3xl p-6 sm:p-10 border border-white/[0.07] bg-[#0c0c10]/80 shadow-2xl overflow-hidden flex items-center justify-center"
        >
          {/* Subtle grid background for the moodboard */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          {/* Scattered Polaroids */}
          <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6">
            {polaroids.map((item, index) => (
              <motion.div
                key={item.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                whileDrag={{ scale: 1.1, zIndex: 50, cursor: 'grabbing' }}
                initial={{ opacity: 0, scale: 0.9, rotate: item.rotation }}
                whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
                viewport={{ once: true }}
                transition={{ type: 'spring', damping: 20, stiffness: 250 }}
                className="cursor-grab select-none relative bg-neutral-100 p-3 pb-5 rounded shadow-2xl w-[210px] sm:w-[240px] flex flex-col group border border-neutral-300/40"
                style={{
                  boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.6), 0 5px 15px rgba(0,0,0,0.4)',
                }}
              >
                {/* Washi Tape Pin on top */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 opacity-90 shadow-sm"
                  style={{
                    backgroundColor: item.tapeColor || '#e0c097',
                    clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
                    transform: `rotate(${((index % 3) - 1) * 3}deg)`,
                  }}
                />

                {/* Photo Frame */}
                <div
                  className="w-full aspect-square overflow-hidden bg-neutral-900 rounded-sm mb-3 relative cursor-pointer"
                  onClick={() => {
                    if (onOpenImage) {
                      onOpenImage({
                        id: item.id,
                        title: item.caption,
                        date: item.date,
                        year: '2025',
                        category: 'Spomienka',
                        imageUrl: item.imageUrl,
                        caption: `Polaroidová spomienka z ${item.date}`,
                      });
                    }
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-amber-500/5 mix-blend-overlay" />
                </div>

                {/* Handwritten Label */}
                <div className="px-1 text-center">
                  <p className="font-handwriting text-xl sm:text-2xl text-neutral-800 leading-tight">
                    {item.caption}
                  </p>
                  <span className="text-[10px] font-mono text-neutral-600 uppercase tracking-widest mt-1 block">
                    {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
