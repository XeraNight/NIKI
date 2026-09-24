'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { TimelineMilestone, MemoryItem } from '@/types';

interface TimelineSectionProps {
  milestones: TimelineMilestone[];
  onOpenImage?: (item: MemoryItem) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ milestones, onOpenImage }) => {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-[#070709] border-t border-white/[0.06]">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KAPITOLA 02 // CHRONOLÓGIA</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            3 Roky na Parkete
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            Každý rok priniesol novú výzvu, novú hudbu a nový posun vpred. Pozri sa, ako sme krok po krôčiku vybudovali to, čím sme dnes.
          </p>
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          {/* Center Vertical Connecting Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px -translate-x-1/2 bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-transparent" />
          {/* Mobile Left Connecting Line */}
          <div className="md:hidden absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-amber-400/40 via-amber-500/20 to-transparent" />

          <div className="space-y-12 sm:space-y-16">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-10 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Badge in Center */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#121216] border-2 border-amber-400/60 shadow-[0_0_20px_rgba(212,175,55,0.3)] items-center justify-center z-20">
                    <span className="font-mono text-xs font-bold text-amber-300">
                      {item.year.slice(-2)}'
                    </span>
                  </div>

                  {/* Image Card Column */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <div
                      className="group relative rounded-2xl overflow-hidden editorial-card editorial-border hover:border-amber-400/40 transition-all duration-300 shadow-xl cursor-pointer"
                      onClick={() => {
                        if (onOpenImage) {
                          onOpenImage({
                            id: `timeline-${item.year}`,
                            title: item.title,
                            subtitle: item.tagline,
                            date: item.season,
                            year: item.year as any,
                            category: 'Míľnik',
                            imageUrl: item.image,
                            caption: item.description,
                            story: item.quote,
                          });
                        }
                      }}
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-neutral-900 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>{item.season}</span>
                        </div>
                        {item.badge && (
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-xs font-bold text-amber-300">
                            {item.badge}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Story Text Column */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0">
                    <div className="editorial-card p-6 sm:p-8 rounded-2xl editorial-border relative">
                      <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                        {item.year} // {item.season}
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-amber-200/90 mb-4">
                        {item.tagline}
                      </p>
                      <p className="text-sm text-neutral-300 leading-relaxed mb-5 font-sans">
                        {item.description}
                      </p>

                      {/* Quote Box */}
                      {item.quote && (
                        <div className="mb-5 pl-4 border-l-2 border-amber-400/60 py-1 bg-white/[0.01]">
                          <p className="font-handwriting text-lg sm:text-xl text-amber-100">
                            {item.quote}
                          </p>
                        </div>
                      )}

                      {/* Achievements bullets */}
                      {item.achievements && item.achievements.length > 0 && (
                        <div className="pt-4 border-t border-white/10 space-y-2">
                          <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2">
                            <Award className="w-3.5 h-3.5 text-amber-400" />
                            <span>Míľniky tohto obdobia</span>
                          </div>
                          <ul className="space-y-1.5">
                            {item.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
