'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#1a1a1a] text-neutral-400 pt-20 pb-10 border-t border-[#b71c1c]/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About column */}
        <div className="flex flex-col gap-5">
          <Link href="/">
            <span className="text-2xl font-serif font-bold tracking-wider text-[#b71c1c]">
              APNA <span className="text-white font-sans font-light text-xl">RESTAURANT</span>
            </span>
          </Link>
          <p className="text-xs leading-relaxed text-neutral-400">
            Experience the culinary artistry of authentic Chinese cuisine and Indo-Chinese fusion food. Truly premium taste, memorable experiences.
          </p>
          
          <div className="flex flex-col gap-1 text-xs border-y border-white/5 py-3.5 my-1">
            <span className="text-white font-bold text-[10px] tracking-wider uppercase">Proprietors:</span>
            <span className="bg-gradient-to-r from-[#00d2ff] to-[#f9629f] text-transparent bg-clip-text font-black uppercase tracking-wider text-[11px]">
              Moin • Aves • Mavish Rahatwal
            </span>
          </div>

          <div className="flex flex-col gap-2.5 text-xs text-neutral-400">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#b71c1c] shrink-0" />
              <span className="leading-tight">NEAR NH 66, TEMPALE-MANGAON 402104</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#b71c1c] shrink-0" />
              <span>+91 8468856752</span>
            </div>
          </div>

          <div className="flex gap-4 items-center mt-1">
            <a href="https://instagram.com/apna_restaurant22" target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-900 rounded-full text-[#b71c1c] hover:bg-[#b71c1c] hover:text-white transition duration-300">
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a href="#" className="p-2 bg-neutral-900 rounded-full text-[#b71c1c] hover:bg-[#b71c1c] hover:text-white transition duration-300">
              <Facebook className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-sm uppercase tracking-widest font-serif font-semibold border-l-2 border-[#b71c1c] pl-3">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-3 text-xs">
            <li>
              <Link href="/" className="hover:text-[#b71c1c] transition duration-200">Home</Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-[#b71c1c] transition duration-200">Our Menu</Link>
            </li>
            <li>
              <Link href="/reserve" className="hover:text-[#b71c1c] transition duration-200">Book Table</Link>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="flex flex-col gap-6">
          <h4 className="text-white text-sm uppercase tracking-widest font-serif font-semibold border-l-2 border-[#b71c1c] pl-3">
            Opening Hours
          </h4>
          <ul className="flex flex-col gap-3 text-xs">
            <li className="flex justify-between items-center gap-2">
              <span>We are open:</span>
              <span className="text-[#ff3d3d] font-bold tracking-widest text-[13px] font-mono bg-red-950/20 px-3 py-1 rounded-md border border-red-950">24/7</span>
            </li>
            <li className="text-neutral-400 text-[11px] leading-relaxed mt-1">
              Serving you premium dine-in, takeaway, and fast home delivery 24 hours a day, 7 days a week.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
        <p>&copy; {new Date().getFullYear()} Apna Restaurant. All rights reserved.</p>
        <p>Crafted for Fine Dining & Premium Taste.</p>
      </div>
    </footer>
  );
}
