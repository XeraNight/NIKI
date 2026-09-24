'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X } from 'lucide-react';
import { VideoItem } from '@/types';

interface VideoShowcaseProps {
  videos: VideoItem[];
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videos }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="videos" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      {/* Minimalist Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
        <div>
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400 block mb-1">
            02 // VIDEO ARCHÍV
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            Tanečné Videá & Reels
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-neutral-400">
          Reels (9:16) & Záznamy zo súťaží
        </p>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {videos.map((vid) => {
          const isPlaying = playingVideoId === vid.id;

          return (
            <div
              key={vid.id}
              className="group relative rounded-2xl overflow-hidden bg-[#0e0e12] border border-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col shadow-2xl"
            >
              {/* Video Player Box */}
              <div
                className={`relative overflow-hidden bg-black ${
                  vid.isVertical ? 'aspect-[9/15]' : 'aspect-video'
                }`}
              >
                {isPlaying ? (
                  <video
                    src={vid.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                  />
                ) : (
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                )}

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Video Info Pill */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
                    {vid.category}
                  </span>
                  {vid.duration && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-neutral-300 border border-white/10">
                      {vid.duration}
                    </span>
                  )}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        setPlayingVideoId(null);
                      } else {
                        setPlayingVideoId(vid.id);
                      }
                    }}
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label={isPlaying ? 'Pozastaviť' : 'Prehrať'}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-black" />
                    ) : (
                      <Play className="w-5 h-5 fill-black ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => setActiveModalVideo(vid)}
                    className="p-3 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
                    aria-label="Celá obrazovka"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Mute toggle button when playing */}
                {isPlaying && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-black/80 text-white hover:text-amber-300 border border-white/10 text-xs transition-colors cursor-pointer"
                    aria-label="Zvuk"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Minimal caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-[#0e0e12]">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80 mb-1 block">
                    {vid.date}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-white mb-1.5">
                    {vid.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-2">
                    {vid.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Video Lightbox */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl"
            onClick={() => setActiveModalVideo(null)}
          >
            <button
              onClick={() => setActiveModalVideo(null)}
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Zatvoriť"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full relative flex items-center justify-center bg-black max-h-[75vh]">
                <video
                  src={activeModalVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full"
                />
              </div>
              <div className="w-full p-4 sm:p-5 bg-[#0e0e12] border-t border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h4 className="font-serif text-lg font-medium text-white">
                    {activeModalVideo.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono">
                    {activeModalVideo.date} • {activeModalVideo.category}
                  </p>
                </div>
                <p className="text-xs text-neutral-300 max-w-md font-sans">
                  {activeModalVideo.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
