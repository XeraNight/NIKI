'use client';

import React, { useState } from 'react';
import { SphereImageGrid, ImageData } from '@/components/SphereImageGrid';
import { DragIndicator } from '@/components/DragIndicator';
import { LightboxModal } from '@/components/LightboxModal';
import { AnimatedHeroWish } from '@/components/AnimatedHeroWish';

import {
  CAROUSEL_MEMORIES,
  SPHERE_GALLERY_ITEMS,
} from '@/data/memories';
import { MemoryItem } from '@/types';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);

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

      {/* 3D Globe of Photos & Videos Section */}
      <section className="pt-14 sm:pt-20 pb-20 sm:pb-28 px-4 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Section Heading: Memory transition text */}
        <div className="w-full max-w-2xl mx-auto text-center mb-8 sm:mb-12 px-4 z-10">
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-neutral-200/90 font-light leading-relaxed tracking-wide">
            „A aby som nezabudol, pár videí a fotiek na spomienku, čo všetko si zažila za tie 3 roky, čo ťa poznám.“
          </p>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mt-5" />
        </div>

        <div className="flex items-center justify-center w-full">
          <SphereImageGrid
            images={SPHERE_GALLERY_ITEMS}
            autoRotate={true}
            autoRotateSpeed={0.25}
            dragSensitivity={0.6}
            onSelectImage={handleSelectSphereItem}
          />
        </div>

        {/* Minimal Hand Swipe Gesture Indicator */}
        <div className="mt-6">
          <DragIndicator />
        </div>
      </section>

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
