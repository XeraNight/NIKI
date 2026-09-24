'use client';

import React, { useState } from 'react';
import { MagazineHeader } from '@/components/MagazineHeader';
import { HeroCover } from '@/components/HeroCover';
import { Formation } from '@/components/Formation';
import { InfiniteSlider } from '@/components/InfiniteSlider';
import { TimelineSection } from '@/components/TimelineSection';
import { PolaroidDeck } from '@/components/PolaroidDeck';
import { VideoShowcase } from '@/components/VideoShowcase';
import { BirthdayLetter } from '@/components/BirthdayLetter';
import { Footer } from '@/components/Footer';
import { MusicBar } from '@/components/MusicBar';
import { LightboxModal } from '@/components/LightboxModal';
import { Sparkles, MoveHorizontal } from 'lucide-react';

import {
  CAROUSEL_MEMORIES,
  TIMELINE_MILESTONES,
  POLAROIDS,
  DANCE_VIDEOS,
} from '@/data/memories';
import { MemoryItem } from '@/types';
import { Work } from '@/components/formation-utils/formation-poses';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
  };

  // Convert memories to 3D Formation Work items
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

  return (
    <main className="min-h-screen bg-[#070709] text-white flex flex-col selection:bg-amber-400/30 selection:text-amber-200">
      {/* Editorial Navigation */}
      <MagazineHeader />

      {/* Hero Magazine Cover */}
      <HeroCover
        onPlayMusic={toggleMusic}
        isPlayingMusic={isPlayingMusic}
      />

      {/* Chapter 01: 3D Formation Interactive Gallery (Flat, Tilt, Ring) */}
      <section id="gallery" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#070709] via-[#0b0b10] to-[#070709] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>KAPITOLA 01 // 3D ARCHÍV MOMENTOV</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
                3D Formácie & Spomienky
              </h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
                Prepínaj hore vpravo medzi režimami <strong>Flat</strong>, <strong>Tilt</strong> a <strong>Ring</strong> (3D kruh). Ťahaj do strán, skroluj kolieskom myši a klikni na ľubovoľnú fotku pre otvorenie detailu.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-neutral-400 border border-white/10 px-3.5 py-1.5 rounded-full bg-white/[0.03]">
              <MoveHorizontal className="w-4 h-4 text-amber-400" />
              <span>Ťahaj prstom / myšou</span>
            </div>
          </div>
        </div>

        {/* 3D Formation Component */}
        <div className="w-full relative">
          <Formation works={formationWorks} onSelect={handleSelectWork} />
        </div>
      </section>

      {/* Chapter 02: 3-Year Dance Timeline */}
      <TimelineSection
        milestones={TIMELINE_MILESTONES}
        onOpenImage={(item) => setSelectedItem(item)}
      />

      {/* Chapter 03: Draggable Polaroids Moodboard */}
      <PolaroidDeck
        polaroids={POLAROIDS}
        onOpenImage={(item) => setSelectedItem(item)}
      />

      {/* Chapter 04: Dance Videos & Reels */}
      <VideoShowcase videos={DANCE_VIDEOS} />

      {/* Chapter 05: Sealed Wax Letter & Confetti Celebration */}
      <BirthdayLetter />

      {/* Back Cover Colophon */}
      <Footer />

      {/* Floating Audio Soundtrack Player */}
      <MusicBar
        isPlaying={isPlayingMusic}
        onTogglePlay={toggleMusic}
      />

      {/* Global High-Res Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={CAROUSEL_MEMORIES}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </main>
  );
}
