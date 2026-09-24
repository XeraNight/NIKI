'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Heart } from 'lucide-react';
import { SITE_CONFIG } from '@/data/memories';

export const MagazineHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '01. Fotky', href: '#gallery' },
    { label: '02. 3 Roky', href: '#timeline' },
    { label: '03. Polaroids', href: '#polaroids' },
    { label: '04. Videá', href: '#videos' },
    { label: '05. List', href: '#letter', highlight: true },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Magazine Title */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white group cursor-pointer"
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider group-hover:text-amber-300 transition-colors">
            NIKI <span className="text-amber-400 font-sans text-sm font-semibold">18</span>
          </span>
          <span className="hidden sm:inline text-xs text-neutral-400 font-mono tracking-widest pl-2 border-l border-white/10 uppercase">
            The Dance Archive
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`transition-colors uppercase cursor-pointer ${
                link.highlight
                  ? 'px-3 py-1.5 rounded-full bg-amber-400 text-black font-sans font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:bg-amber-300'
                  : 'text-neutral-300 hover:text-amber-300'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('#letter')}
            className="px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold font-sans shadow flex items-center gap-1"
          >
            <Heart className="w-3 h-3 fill-black" />
            <span>List 18</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white border border-white/10 bg-white/[0.03]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0e] border-b border-white/10 px-4 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-mono text-neutral-300 hover:text-amber-300 hover:bg-white/[0.04] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-[10px] text-neutral-400">→</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
