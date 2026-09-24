'use client';

import React, { useState } from 'react';
import { MagazineHeader } from '@/components/MagazineHeader';
import { HeroCover } from '@/components/HeroCover';
import { SphereImageGrid, ImageData } from '@/components/SphereImageGrid';
import { Formation } from '@/components/Formation';
import { VideoShowcase } from '@/components/VideoShowcase';
import { BirthdayLetter } from '@/components/BirthdayLetter';
import { Footer } from '@/components/Footer';
import { MusicBar } from '@/components/MusicBar';
import { LightboxModal } from '@/components/LightboxModal';
import { Globe, MoveHorizontal } from 'lucide-react';

import {
  CAROUSEL_MEMORIES,
  DANCE_VIDEOS,
  SPHERE_GALLERY_ITEMS,
} from '@/data/memories';
import { MemoryItem } from '@/types';
import { Work } from '@/components/formation-utils/formation-poses';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  // Convert memories to 3D Formation Flat Work items
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
      {/* Editorial Navigation */}
      <MagazineHeader />

      {/* Hero Magazine Cover */}
      <HeroCover
        onPlayMusic={toggleMusic}
        isPlayingMusic={isPlayingMusic}
      />

      {/* Section 01: 3D Glóbus Spomienok (SphereImageGrid - Photos & Videos) */}
      <section id="archive" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-white/[0.08] relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400 mb-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>01 // 3D GLÓBUS SPOMIENOK</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Svet Našich Momentov
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-neutral-400">
            Otáčaj glóbus prstom • Klikni na fotku alebo video
          </p>
        </div>

        {/* 3D Sphere Interactive Grid */}
        <div className="py-6 flex items-center justify-center">
          <SphereImageGrid
            images={SPHERE_GALLERY_ITEMS}
            autoRotate={true}
            autoRotateSpeed={0.25}
            dragSensitivity={0.6}
            onSelectImage={handleSelectSphereItem}
          />
        </div>
      </section>

      {/* Section 02: Nekonečný Flat Pás (Formation - Pure Flat Mode) */}
      <section id="photos" className="py-20 border-t border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-400 block mb-1.5">
              02 // FOTO PÁS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
              Spoločné Zábery
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <MoveHorizontal className="w-4 h-4 text-amber-400" />
            <span>Ťahaj do strán pre posun</span>
          </div>
        </div>

        {/* Pure Flat Formation Carousel */}
        <div className="w-full relative">
          <Formation works={formationWorks} onSelect={handleSelectWork} />
        </div>
      </section>

      {/* Section 03: Tanečné Videá & Reels */}
      <VideoShowcase videos={DANCE_VIDEOS} />

      {/* Section 04: Osobný List k 18-tke */}
      <BirthdayLetter />

      {/* Minimalist Colophon Footer */}
      <Footer />

      {/* Floating Audio Soundtrack Player */}
      <MusicBar
        isPlaying={isPlayingMusic}
        onTogglePlay={toggleMusic}
      />

      {/* Global High-Res Lightbox Modal (Supports both Images and Videos) */}
      <LightboxModal
        item={selectedItem}
        items={CAROUSEL_MEMORIES}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </main>
  );
}
