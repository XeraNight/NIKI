'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  isVideo?: boolean;
  videoUrl?: string;
  videoLoopUrl?: string;
  category?: string;
  date?: string;
}

export interface SphereImageGridProps {
  images?: ImageData[];
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
  onSelectImage?: (image: ImageData) => void;
}

export const SphereImageGrid: React.FC<SphereImageGridProps> = ({
  images = [],
  containerSize: customSize,
  sphereRadius,
  dragSensitivity = 0.55,
  momentumDecay = 0.95,
  maxRotationSpeed = 4,
  baseImageScale = 0.25,
  perspective = 1100,
  autoRotate = true,
  autoRotateSpeed = 0.22,
  className = '',
  onSelectImage,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [containerSize, setContainerSize] = useState<number>(customSize || 560);

  // References for Zero-Re-render Animation Loop
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rotationRef = useRef({ x: 12, y: 25 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  // Responsive sizing listener
  useEffect(() => {
    const updateSize = () => {
      if (customSize) {
        setContainerSize(customSize);
        return;
      }
      const w = window.innerWidth;
      if (w < 480) {
        setContainerSize(Math.min(360, w - 24));
      } else if (w < 768) {
        setContainerSize(480);
      } else if (w < 1024) {
        setContainerSize(560);
      } else {
        setContainerSize(640);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [customSize]);

  const actualSphereRadius = sphereRadius || containerSize * 0.40;
  const baseCardSize = containerSize * baseImageScale;

  // 1. Precalculate 3D Cartesian coordinates ONCE per layout change
  // (Zero trigonometry during animation loop!)
  const baseCoordinates = useMemo<Position3D[]>(() => {
    const count = images.length;
    if (count === 0) return [];

    const coords: Position3D[] = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 35;
      if (phi < 90) {
        phi = Math.max(5, phi - poleBonus);
      } else {
        phi = Math.min(175, phi + poleBonus);
      }

      phi = 15 + (phi / 180) * 150;

      const phiRad = phi * (Math.PI / 180);
      const thetaRad = theta * (Math.PI / 180);

      coords.push({
        x: actualSphereRadius * Math.sin(phiRad) * Math.cos(thetaRad),
        y: actualSphereRadius * Math.cos(phiRad),
        z: actualSphereRadius * Math.sin(phiRad) * Math.sin(thetaRad),
      });
    }

    return coords;
  }, [images.length, actualSphereRadius]);

  // 2. High-Performance Animation Frame (Direct GPU transform updates, 0ms React re-renders)
  const renderFrame = useCallback(() => {
    const rot = rotationRef.current;
    const vel = velocityRef.current;

    // Apply Momentum & Friction
    if (!isDraggingRef.current) {
      vel.x *= momentumDecay;
      vel.y *= momentumDecay;

      if (autoRotate) {
        rot.y += autoRotateSpeed;
      }

      const clampedVelX = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, vel.x));
      const clampedVelY = Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, vel.y));

      rot.x = (rot.x + clampedVelX) % 360;
      rot.y = (rot.y + clampedVelY) % 360;
    }

    // Precompute rotation matrices ONCE per frame (4 trig calls total vs 216!)
    const rotXRad = rot.x * (Math.PI / 180);
    const rotYRad = rot.y * (Math.PI / 180);
    const cosY = Math.cos(rotYRad);
    const sinY = Math.sin(rotYRad);
    const cosX = Math.cos(rotXRad);
    const sinX = Math.sin(rotXRad);

    const fadeZoneStart = -15;
    const fadeZoneEnd = -actualSphereRadius * 0.7;

    const cards = cardRefs.current;
    const coords = baseCoordinates;
    const total = coords.length;

    for (let i = 0; i < total; i++) {
      const node = cards[i];
      if (!node) continue;

      const p = coords[i];

      // Fast SIMD-style matrix rotation (4 multiplications, 2 additions)
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;

      // Culling & Visibility
      if (z2 <= fadeZoneEnd) {
        if (node.style.visibility !== 'hidden') {
          node.style.visibility = 'hidden';
        }
        continue;
      }

      if (node.style.visibility === 'hidden') {
        node.style.visibility = 'visible';
      }

      // Smooth Depth and Perspective Scaling
      const fadeOpacity =
        z2 <= fadeZoneStart
          ? Math.max(0.1, (z2 - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd))
          : 1;

      const distFromCenter = Math.sqrt(x1 * x1 + y2 * y2);
      const distRatio = Math.min(distFromCenter / actualSphereRadius, 1);
      const centerScale = Math.max(0.4, 1 - distRatio * 0.4);
      const depthScale = (z2 + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.55, 0.75 + depthScale * 0.35);
      const zIndex = Math.round(1000 + z2);

      // Direct GPU Compositor transform (0 layout reflows, 0ms main thread)
      node.style.transform = `translate3d(${x1.toFixed(1)}px, ${y2.toFixed(1)}px, 0px) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      node.style.opacity = fadeOpacity.toFixed(2);
      node.style.zIndex = String(zIndex);
    }
  }, [
    baseCoordinates,
    actualSphereRadius,
    momentumDecay,
    autoRotate,
    autoRotateSpeed,
    maxRotationSpeed,
  ]);

  // RequestAnimationFrame Loop
  useEffect(() => {
    if (!isMounted) return;

    let isRunning = true;
    const loop = () => {
      if (!isRunning) return;
      renderFrame();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMounted, renderFrame]);

  // High-frequency Touch and Drag Handlers (Bypassing React re-renders)
  const onPointerDown = useCallback((clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    velocityRef.current = { x: 0, y: 0 };
    lastMousePos.current = { x: clientX, y: clientY };
    dragStartPos.current = { x: clientX, y: clientY };
  }, []);

  const onPointerMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!isDraggingRef.current) return;

      const deltaX = clientX - lastMousePos.current.x;
      const deltaY = clientY - lastMousePos.current.y;

      const rotDeltaX = -deltaY * dragSensitivity;
      const rotDeltaY = deltaX * dragSensitivity;

      const rot = rotationRef.current;
      rot.x = (rot.x + rotDeltaX) % 360;
      rot.y = (rot.y + rotDeltaY) % 360;

      velocityRef.current = {
        x: Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, rotDeltaX)),
        y: Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, rotDeltaY)),
      };

      lastMousePos.current = { x: clientX, y: clientY };
    },
    [dragSensitivity, maxRotationSpeed]
  );

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  // Global mouse & touch listeners
  useEffect(() => {
    if (!isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      onPointerMove(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      onPointerUp();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchEnd = () => {
      onPointerUp();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, onPointerMove, onPointerUp]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCardClick = (e: React.MouseEvent, image: ImageData) => {
    e.stopPropagation();
    // Only trigger modal click if user didn't drag across the screen
    const dx = Math.abs(lastMousePos.current.x - dragStartPos.current.x);
    const dy = Math.abs(lastMousePos.current.y - dragStartPos.current.y);
    if (dx < 6 && dy < 6 && onSelectImage) {
      onSelectImage(image);
    }
  };

  if (!isMounted) {
    return (
      <div
        className="rounded-full bg-white/[0.02] border border-white/10 animate-pulse flex items-center justify-center mx-auto"
        style={{ width: containerSize, height: containerSize }}
      >
        <span className="text-xs font-mono text-neutral-500">Načítavam 3D glóbus...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div
        ref={containerRef}
        className={`relative select-none cursor-grab active:cursor-grabbing mx-auto touch-none ${className}`}
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          perspective: `${perspective}px`,
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          onPointerDown(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
        }}
      >
        {/* Hardware-accelerated 3D Sphere Stage */}
        <div className="relative w-full h-full" style={{ zIndex: 10 }}>
          {images.map((image, index) => (
            <div
              key={image.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute top-1/2 left-1/2 cursor-pointer select-none will-change-transform"
              style={{
                width: `${baseCardSize}px`,
                height: `${baseCardSize}px`,
                transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              onClick={(e) => handleCardClick(e, image)}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-neutral-900 group hover:border-amber-400/50 transition-colors duration-300">
                {image.isVideo && (image.videoLoopUrl || image.videoUrl) ? (
                  <video
                    src={image.videoLoopUrl || image.videoUrl}
                    poster={image.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                ) : (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-300"
                    draggable={false}
                    loading={index < 8 ? 'eager' : 'lazy'}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SphereImageGrid;
