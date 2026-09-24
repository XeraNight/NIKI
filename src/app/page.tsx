'use client';

import React, { useState } from 'react';
import { MagazineHeader } from '@/components/MagazineHeader';
import { HeroCover } from '@/components/HeroCover';
import { InfiniteSlider } from '@/components/InfiniteSlider';
import { TimelineSection } from '@/components/TimelineSection';
import { PolaroidDeck } from '@/components/PolaroidDeck';
import { VideoShowcase } from '@/components/VideoShowcase';
import { BirthdayLetter } from '@/components/BirthdayLetter';
import { Footer } from '@/components/Footer';
import { MusicBar } from '@/components/MusicBar';
import { LightboxModal } from '@/components/LightboxModal';

import {
  CAROUSEL_MEMORIES,
  TIMELINE_MILESTONES,
  POLAROIDS,
  DANCE_VIDEOS,
} from '@/data/memories';
import { MemoryItem } from '@/types';

export default function HomePage() {
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const toggleMusic = () => {
    setIsPlayingMusic((prev) => !prev);
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

      {/* Chapter 01: Infinite Bi-directional Slider */}
      <InfiniteSlider
        items={CAROUSEL_MEMORIES}
        onSelect={(item) => setSelectedItem(item)}
      />

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
