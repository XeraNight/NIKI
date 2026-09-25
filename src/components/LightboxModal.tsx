'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Video, Camera } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 left-4 right-4 z-50 flex items-center justify-between pointer-events-none">
          {/* Subtle Counter / Label */}
          <div className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-mono text-neutral-300 pointer-events-auto">
            {item.isVideo ? (
              <>
                <Video className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">Video</span>
              </>
            ) : (
              <>
                <Camera className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-white font-medium">Fotka</span>
              </>
            )}
            {currentIndex !== -1 && items && (
              <>
                <span className="text-white/30">•</span>
                <span>{currentIndex + 1} / {items.length}</span>
              </>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10 pointer-events-auto"
            aria-label="Zatvoriť"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Previous Button */}
        {hasPrev && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10 shadow-lg"
            aria-label="Predchádzajúce"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-50 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors border border-white/10 shadow-lg"
            aria-label="Nasledujúce"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Pure Media Center Viewport */}
        <motion.div
          key={item.id}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative max-w-5xl max-h-[85vh] w-auto h-auto flex items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {item.isVideo && item.videoUrl ? (
            <video
              src={item.videoUrl}
              controls
              autoPlay
              playsInline
              className="max-h-[82vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl"
            />
          ) : (
            <img
              src={item.imageUrl}
              alt={item.isVideo ? 'Video' : 'Fotka'}
              className="max-h-[82vh] max-w-[92vw] sm:max-w-[85vw] object-contain rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl select-none"
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightboxModal;
