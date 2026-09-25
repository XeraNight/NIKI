'use client';

import React, { useState } from 'react';
import { SphereImageGrid, ImageData } from '@/components/SphereImageGrid';
import { DragIndicator } from '@/components/DragIndicator';
import { RealisticEnvelope } from '@/components/RealisticEnvelope';
import { Footer } from '@/components/Footer';
import { MusicBar } from '@/components/MusicBar';
import { LightboxModal } from '@/components/LightboxModal';
import { AnimatedHeroWish } from '@/components/AnimatedHeroWish';

import {
  CAROUSEL_MEMORIES,
  SPHERE_GALLERY_ITEMS,
} from '@/data/memories';
import { MemoryItem } from '@/types';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  const handleSelectSphereItem = (img: ImageData) => {
    setSelectedItem({
      id: img.id,
      title: img.title || img.alt,
      date: img.date || '',
      year: '2026',
      category: img.category || (img.isVideo ? 'Video' : 'Fotka'),
      imageUrl: img.src,
      videoUrl: img.videoUrl,
      isVideo: img.isVideo,
      caption: img.description || '',
    });
  };

  return (
    <main className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      {/* Animated Hero Header: starts centered with "Niki", shifts left after 1s, and reveals the birthday wish */}
      <AnimatedHeroWish />

      {/* 3D Globe of Photos & Videos with Visual Drag Indicator (No Text) */}
      <section className="py-6 sm:py-10 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex items-center justify-center w-full">
          <SphereImageGrid
            images={SPHERE_GALLERY_ITEMS}
            autoRotate={true}
            autoRotateSpeed={0.25}
            dragSensitivity={0.6}
            onSelectImage={handleSelectSphereItem}
          />
        </div>

        {/* 21st.dev inspired Animated Drag & 360 Rotation Gesture Indicator */}
        <div className="mt-8">
          <DragIndicator />
        </div>
      </section>

      {/* Realistic 3D Envelope with Wax Seal 18 & Emerging Letter (No Promo Text) */}
      <RealisticEnvelope />

      {/* Minimalist Colophon Footer */}
      <Footer />

      {/* Floating Audio Soundtrack Player */}
      <MusicBar
        isPlaying={isPlayingMusic}
        onTogglePlay={toggleMusic}
      />

      {/* Fullscreen HD Lightbox Modal (For Photos & Videos) */}
      <LightboxModal
        item={selectedItem}
        items={CAROUSEL_MEMORIES}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </main>
  );
}
