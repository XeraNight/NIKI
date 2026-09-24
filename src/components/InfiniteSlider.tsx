'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, MoveHorizontal } from 'lucide-react';
import { MemoryItem } from '@/types';

interface InfiniteSliderProps {
  items: MemoryItem[];
  onSelect: (item: MemoryItem) => void;
}

export const InfiniteSlider: React.FC<InfiniteSliderProps> = ({ items, onSelect }) => {
  // We duplicate items 4 times to ensure seamless infinite looping in both directions
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [itemWidth, setItemWidth] = useState(340); // default card width + gap

  const x = useMotionValue(0);
  const speedRef = useRef(-0.6); // default slow drift to the left

  // Calculate actual card width dynamically on mount & resize
  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 640) {
        setItemWidth(280 + 16); // mobile card + gap
      } else if (window.innerWidth < 1024) {
        setItemWidth(320 + 20);
      } else {
        setItemWidth(360 + 24);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const totalOriginalWidth = items.length * itemWidth;

  // Seamless boundary wrap logic
  const handleBoundaryWrap = (currentX: number) => {
    if (totalOriginalWidth <= 0) return currentX;
    
    // When dragged or drifted too far left
    if (currentX <= -totalOriginalWidth * 2) {
      const reset = currentX + totalOriginalWidth;
      x.set(reset);
      return reset;
    }
    // When dragged too far right
    if (currentX >= -totalOriginalWidth * 0.5) {
      const reset = currentX - totalOriginalWidth;
      x.set(reset);
      return reset;
    }
    return currentX;
  };

  // Continuous gentle autoplay drift when user is not dragging
  useAnimationFrame((_, delta) => {
    if (isDragging || isHovered) return;
    
    const deltaMove = speedRef.current * (delta / 16);
    const newX = x.get() + deltaMove;
    const wrappedX = handleBoundaryWrap(newX);
    x.set(wrappedX);
  });

  // Manual step controls (Left & Right arrows)
  const slideLeft = () => {
    const current = x.get();
    const target = current + itemWidth;
    x.set(handleBoundaryWrap(target));
  };

  const slideRight = () => {
    const current = x.get();
    const target = current - itemWidth;
    x.set(handleBoundaryWrap(target));
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070709] via-[#0c0c10] to-[#070709]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>KAPITOLA 01 // VIZUÁLNY ARCHÍV</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Spoločné Momentky
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Nekonečný archív našich 3 rokov na parkete. Posúvaj doprava či doľava, chyť fotku a potiahni, alebo klikni pre zväčšenie detailu.
            </p>
          </div>

          {/* Navigation Controls & Drag Hint */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400 mr-2 border border-white/10 px-3 py-1.5 rounded-full bg-white/[0.02]">
              <MoveHorizontal className="w-3.5 h-3.5 text-amber-400" />
              <span>Ťahaj oboma smermi</span>
            </div>

            <button
              onClick={slideLeft}
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/90 hover:text-white border border-white/10 hover:border-amber-500/40 transition-all active:scale-95 shadow-lg"
              aria-label="Posunúť doľava"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={slideRight}
              className="p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] text-white/90 hover:text-white border border-white/10 hover:border-amber-500/40 transition-all active:scale-95 shadow-lg"
              aria-label="Posunúť doprava"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Draggable Track */}
      <div
        ref={containerRef}
        className="w-full relative cursor-grab active:cursor-grabbing select-none py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="flex gap-4 sm:gap-6 pl-4 sm:pl-8"
          style={{ x }}
          drag="x"
          dragElastic={0.05}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(_, info) => {
            setIsDragging(false);
            // Wrap coordinates smoothly
            handleBoundaryWrap(x.get() + info.velocity.x * 0.1);
          }}
          onDrag={(_, info) => {
            handleBoundaryWrap(x.get() + info.delta.x);
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px] group relative rounded-2xl overflow-hidden editorial-card editorial-border hover:border-amber-400/40 transition-all duration-300"
              whileHover={{ y: -6 }}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  draggable={false}
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-80 group-hover:opacity-75 transition-opacity" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 backdrop-blur-md text-white/90">
                    {item.year}
                  </span>
                </div>

                {/* Center Hover Magnify Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(item);
                  }}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-400/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 shadow-xl cursor-pointer"
                  aria-label="Zväčšiť fotografiu"
                >
                  <Maximize2 className="w-5 h-5" />
                </button>

                {/* Bottom Card Content */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col justify-end">
                  <span className="text-[11px] uppercase tracking-widest text-amber-400/90 font-medium mb-1">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-2 mt-1 font-sans">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Bar */}
              <div className="p-3 bg-[#0e0e13] flex items-center justify-between text-xs text-neutral-400 border-t border-white/5">
                <span className="truncate pr-2">{item.location || 'Slovensko'}</span>
                <span className="text-amber-400/80 font-medium text-[11px] uppercase tracking-wider shrink-0">
                  {item.tag || 'Moment'}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle indicator bar */}
      <div className="max-w-7xl mx-auto px-4 mt-4 flex items-center justify-center sm:justify-start gap-2">
        <span className="h-1 w-12 rounded-full bg-amber-400/80" />
        <span className="h-1 w-4 rounded-full bg-white/20" />
        <span className="h-1 w-2 rounded-full bg-white/20" />
        <span className="text-xs text-neutral-400 ml-2">Infinitely scrollable both ways</span>
      </div>
    </section>
  );
};
