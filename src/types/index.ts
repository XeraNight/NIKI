export interface MemoryItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  year: '2023' | '2024' | '2025' | '2026' | string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  isVideo?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  caption: string;
  story?: string;
  location?: string;
  tag?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  date: string;
  category: string;
  duration?: string;
  thumbnailUrl: string;
  videoUrl: string; // can be local /memories/video.mp4 or YouTube / Vimeo embed or MP4 direct link
  description: string;
  isVertical?: boolean; // 9:16 format typical for dance reels
}

export interface TimelineMilestone {
  year: string;
  season: string;
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  image: string;
  quote?: string;
  achievements?: string[];
}

export interface PolaroidItem {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  rotation: number; // in degrees
  tapeColor?: string;
}
