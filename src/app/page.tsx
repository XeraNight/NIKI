'use client';

import React, { useState } from 'react';
import { HeroCover } from '@/components/HeroCover';
import { UnifiedShowcase } from '@/components/UnifiedShowcase';
import { RealisticEnvelope } from '@/components/RealisticEnvelope';
import { Footer } from '@/components/Footer';
import { MusicBar } from '@/components/MusicBar';
import { LightboxModal } from '@/components/LightboxModal';

import {
  CAROUSEL_MEMORIES,
  SPHERE_GALLERY_ITEMS,
} from '@/data/memories';
import { MemoryItem } from '@/types';
import { ImageData } from '@/components/SphereImageGrid';
import { Work } from '@/components/formation-utils/formation-poses';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  // Convert memories to Flat Work items
  const formationWorks: Work[] = CAROUSEL_MEMORIES.map((m) => ({
    title: m.title,
    image: m.imageUrl,
    category: m.category,
    date: m.date,
    year: m.year,
  }));

  const handleSelectWork = (work: Work) => {
    const memory = CAROUSEL_MEMORIES.find(
      (m) => m.title === work.title || m.imageUrl === work.image
    );
    if (memory) {
      setSelectedItem(memory);
    }
  };

  const handleSelectSphereItem = (img: ImageData) => {
    setSelectedItem({
      id: img.id,
      title: img.title || img.alt,
      date: img.date || 'Spomienka',
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
      {/* 1. Minimalist Hero Cover (No navbar) */}
      <HeroCover
        onPlayMusic={toggleMusic}
        isPlayingMusic={isPlayingMusic}
      />

      {/* 2. Unified Showcase (Primary: 3D Globe + Flat Switcher) */}
      <div id="archive" className="border-t border-white/[0.08]">
        <UnifiedShowcase
          sphereItems={SPHERE_GALLERY_ITEMS}
          formationWorks={formationWorks}
          onSelectSphereItem={handleSelectSphereItem}
          onSelectFormationWork={handleSelectWork}
        />
      </div>

      {/* 3. Authentic 3D Folding Envelope with Sliding Letter & Confetti */}
      <RealisticEnvelope />

      {/* 4. Minimalist Footer */}
      <Footer />

      {/* Floating Audio Soundtrack Player */}
      <MusicBar
        isPlaying={isPlayingMusic}
        onTogglePlay={toggleMusic}
      />

      {/* Global High-Res Lightbox Modal (Supports Images and Videos) */}
      <LightboxModal
        item={selectedItem}
        items={CAROUSEL_MEMORIES}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </main>
  );
}
