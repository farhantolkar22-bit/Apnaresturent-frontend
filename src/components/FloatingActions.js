'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function FloatingActions() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Check if back-to-top button should show
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Floating Buttons Container */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-[999]">
        {/* Back To Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center cursor-pointer border border-[#b71c1c]/20"
            title="Back to Top"
          >
            <ArrowUp className="w-6 h-6 stroke-[3px]" />
          </button>
        )}
      </div>
    </>
  );
}
