'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const defaultReviews = [
  {
    name: "Aarav Sharma",
    rating: 5,
    comment: "The Hyderabadi Dum Chicken Biryani was absolutely stellar! The chicken was melt-in-the-mouth, and the spices were perfectly balanced. Highly recommend this place for family dinners.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Priya Patel",
    rating: 5,
    comment: "Apna Restaurant has a beautiful ambiance and top-tier service. The Paneer Butter Masala was rich and creamy, and the chatbot made reserving our table extremely easy!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Rohan Malhotra",
    rating: 4,
    comment: "Excellent taste and very quick delivery! Order tracking was accurate, and the sizzling chocolate brownie was divine. Definitely ordering again.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
  }
];

export default function ReviewSlider() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/menu/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (err) {
        console.log("Could not fetch reviews from backend, using defaults.", err.message);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [reviews]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const current = reviews[activeIndex];

  if (!current) return null;

  return (
    <div className="relative max-w-4xl mx-auto px-6 py-12 bg-neutral-50 dark:bg-[#1a1a1a]/40 border border-black/5 dark:border-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-sm">
      {/* Background Icon */}
      <Quote className="absolute top-8 left-8 w-28 h-28 text-[#b71c1c]/5 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        {/* Customer Image */}
        <div className="relative">
          <img
            src={current.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
            alt={current.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#b71c1c]/25 p-1 shadow-sm"
          />
        </div>

        {/* Star Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${
                i < current.rating
                  ? "text-[#b71c1c] fill-[#b71c1c]"
                  : "text-neutral-300 dark:text-neutral-700"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-200 italic leading-relaxed max-w-2xl px-4">
          "{current.comment}"
        </p>

        {/* Name */}
        <div>
          <h4 className="text-neutral-800 dark:text-white font-serif font-bold text-base tracking-wide">{current.name}</h4>
          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mt-1 block">Verified Customer</span>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handlePrev}
            className="p-3 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-neutral-500 dark:text-neutral-400 hover:border-[#b71c1c]/30 hover:bg-[#b71c1c] hover:text-white rounded-full transition duration-300 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-neutral-500 dark:text-neutral-400 hover:border-[#b71c1c]/30 hover:bg-[#b71c1c] hover:text-white rounded-full transition duration-300 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "w-6 bg-[#b71c1c]" : "w-2 bg-neutral-300 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
