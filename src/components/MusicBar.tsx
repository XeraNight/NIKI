'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

interface MusicBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const MusicBar: React.FC<MusicBarProps> = ({ isPlaying, onTogglePlay }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const track = SITE_CONFIG.musicTrack;

  return (
    <>
      {/* Hidden Audio Player */}
      <audio
        ref={audioRef}
        src={track.src}
        loop
        preload="auto"
      />

      {/* Floating Widget at bottom-right */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          className="editorial-card rounded-full p-2 pr-4 flex items-center gap-3 border border-amber-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-xl"
        >
          {/* Vinyl Disc Icon */}
          <button
            onClick={onTogglePlay}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform cursor-pointer relative"
            aria-label={isPlaying ? 'Pozastaviť hudbu' : 'Prehrať hudbu'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-black" />
            ) : (
              <Play className="w-5 h-5 fill-black ml-0.5" />
            )}

            {/* Rotating vinyl ring indicator */}
            {isPlaying && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-black/30 border-dashed pointer-events-none"
              />
            )}
          </button>

          {/* Track Information & Equalizer */}
          <div
            className="flex flex-col cursor-pointer select-none"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-wide">
                {track.title}
              </span>
              
              {/* Animated Equalizer Waves */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-amber-400 h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-amber-400 h-2/3 animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-amber-400 h-4/5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                </div>
              )}
            </div>
            <span className="text-[10px] text-amber-300/80 font-mono">
              {isPlaying ? 'Teraz hrá' : 'Naša pesnička'}
            </span>
          </div>

          {/* Mute Button */}
          {isPlaying && (
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              aria-label={isMuted ? 'Zapnúť zvuk' : 'Stlmiť'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </motion.div>
      </div>
    </>
  );
};
