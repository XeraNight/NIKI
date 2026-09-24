'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { MemoryItem } from '@/types';

interface LightboxModalProps {
  item: MemoryItem | null;
  items?: MemoryItem[];
  onClose: () => void;
  onSelect?: (item: MemoryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!items || !item || !onSelect) return;
      const currentIndex = items.findIndex((i) => i.id === item.id);
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        onSelect(items[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelect(items[currentIndex - 1]);
      }
    };

    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, items, onClose, onSelect]);

  if (!item) return null;

  const currentIndex = items ? items.findIndex((i) => i.id === item.id) : -1;
  const hasPrev = items && currentIndex > 0;
  const hasNext = items && currentIndex !== -1 && currentIndex < items.length - 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasPrev && items && onSelect) {
      onSelect(items[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasNext && items && onSelect) {
      onSelect(items[currentIndex + 1]);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
          aria-label="Zatvoriť"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
            aria-label="Predchádzajúca fotka"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10"
            aria-label="Nasledujúca fotka"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Content Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-[#101014] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Container */}
          <div className="md:w-3/5 bg-black flex items-center justify-center relative min-h-[300px] max-h-[60vh] md:max-h-[85vh]">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="max-h-[60vh] md:max-h-[85vh] w-full object-contain select-none"
            />
            {item.tag && (
              <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium tracking-widest uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30 rounded-full">
                {item.tag}
              </span>
            )}
          </div>

          {/* Details Column */}
          <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[85vh]">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium tracking-wider uppercase mb-2">
                <Tag className="w-3.5 h-3.5" />
                <span>{item.category}</span>
                <span>•</span>
                <span>{item.year}</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                {item.title}
              </h3>
              {item.subtitle && (
                <p className="text-sm text-neutral-400 font-sans mb-4">
                  {item.subtitle}
                </p>
              )}

              <p className="text-neutral-200 text-sm leading-relaxed mb-4">
                {item.caption}
              </p>

              {item.story && (
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                  <p className="text-xs text-amber-200/80 italic font-serif">
                    „{item.story}“
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{item.date}</span>
              </div>
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
