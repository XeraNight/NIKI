'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Sparkles, Volume2, VolumeX, Maximize2, X, Film } from 'lucide-react';
import { VideoItem } from '@/types';

interface VideoShowcaseProps {
  videos: VideoItem[];
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ videos }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="videos" className="py-24 relative overflow-hidden bg-[#070709] border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Film className="w-3.5 h-3.5" />
            <span>KAPITOLA 04 // POHYB & RYToutput</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Videá & Tanečné Klipy
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Fotka zachytí sekundu, ale video ukáže našu skutočnú energiu. Krátke zostrihy, tréningové momenty a choreografie.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group editorial-card rounded-2xl overflow-hidden editorial-border flex flex-col hover:border-amber-400/40 transition-all duration-300 shadow-xl"
            >
              {/* Video Player Box */}
              <div
                className={`relative overflow-hidden bg-black ${
                  vid.isVertical ? 'aspect-[9/14]' : 'aspect-video'
                }`}
              >
                {/* Thumbnail / Video */}
                {playingVideoId === vid.id ? (
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 pointer-events-none" />

                {/* Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-500/30">
                    {vid.category}
                  </span>
                  {vid.duration && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
                      {vid.duration}
                    </span>
                  )}
                </div>

                {/* Play/Pause Button in Center */}
                <div className="absolute inset-0 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      if (playingVideoId === vid.id) {
                        setPlayingVideoId(null);
                      } else {
                        setPlayingVideoId(vid.id);
                      }
                    }}
                    className="w-14 h-14 rounded-full bg-amber-400/95 hover:bg-amber-300 text-black flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 group-hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label={playingVideoId === vid.id ? 'Pozastaviť' : 'Prehrať'}
                  >
                    {playingVideoId === vid.id ? (
                      <Pause className="w-6 h-6 fill-black" />
                    ) : (
                      <Play className="w-6 h-6 fill-black ml-0.5" />
                    )}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={() => setActiveModalVideo(vid)}
                    className="p-3 rounded-full bg-black/60 hover:bg-black/80 text-white/80 hover:text-white border border-white/20 transition-all active:scale-95 cursor-pointer"
                    aria-label="Otvoriť na celú obrazovku"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Sound control button if playing */}
                {playingVideoId === vid.id && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-black/70 text-white hover:text-amber-300 border border-white/10 text-xs transition-colors cursor-pointer"
                    aria-label="Stlmiť/Zapnúť zvuk"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>

              {/* Info text */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400/80 mb-1">
                    {vid.date}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                    {vid.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {vid.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
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
              className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Zatvoriť video"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full relative flex items-center justify-center bg-black max-h-[75vh]">
                <video
                  src={activeModalVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[75vh] w-auto max-w-full rounded-t-2xl"
                />
              </div>
              <div className="w-full p-4 sm:p-6 bg-[#0e0e13] border-t border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                    {activeModalVideo.title}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {activeModalVideo.date} • {activeModalVideo.category}
                  </p>
                </div>
                <p className="text-xs text-neutral-300 max-w-md">
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
