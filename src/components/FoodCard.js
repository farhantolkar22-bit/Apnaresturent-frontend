'use client';

import React, { useState } from 'react';
import { MessageCircle, Star } from 'lucide-react';

export default function FoodCard({ item }) {
  const [size, setSize] = useState('Full');

  const hasHalfPrice = item.halfPrice !== undefined && item.halfPrice !== null && item.halfPrice > 0;
  const currentPrice = hasHalfPrice && size === 'Half' ? item.halfPrice : item.price;
  const isLollipop = item.name.toLowerCase().includes('lollipop');

  const sizeLabel = size === 'Half' ? (isLollipop ? '4 Pcs' : 'Half') : (isLollipop ? '8 Pcs' : 'Full');
  const whatsappUrl = `https://wa.me/918468856752?text=${encodeURIComponent(
    `Hi, I would like to order ${item.name}${hasHalfPrice ? ` (${sizeLabel})` : ''} from Apna Restaurant.`
  )}`;

  return (
    <div className="group relative bg-[#121212] border border-white/5 rounded-3xl overflow-hidden hover:border-[#b71c1c]/45 hover:shadow-[0_8px_30px_rgb(183,28,28,0.15)] transition-all duration-300 flex flex-col h-full shadow-md">
      {/* Signature Tag */}
      {item.isSignature && (
        <span className="absolute top-4 left-4 z-10 bg-[#b71c1c] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md border border-[#b71c1c]/20">
          <Star className="w-3 h-3 fill-current" /> Signature
        </span>
      )}

      {/* Image Container with zoom hover effect */}
      <div className="relative h-52 w-full overflow-hidden bg-[#181818]">
        <img
          src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        {/* Overlay Darkening */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Category */}
          <span className="text-[9px] text-[#ff3d3d] uppercase tracking-widest font-semibold font-mono">
            {item.category?.replace('-', ' ')}
          </span>

          {/* Name */}
          <h3 className="text-white text-base font-serif font-bold tracking-wide group-hover:text-[#ff3d3d] transition duration-300">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-neutral-400 leading-relaxed font-light line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Portion Selector if Half Price exists */}
        {hasHalfPrice && (
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider font-semibold">Select Portion Size:</span>
            <div className="flex bg-[#1a1a1a] border border-white/5 rounded-xl p-0.5 w-full text-[10px] font-semibold">
              <button
                type="button"
                onClick={() => setSize('Half')}
                className={`flex-1 py-1.5 text-center rounded-lg transition duration-200 cursor-pointer ${
                  size === 'Half'
                    ? 'bg-[#b71c1c] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isLollipop ? 'Half Portion (4 Pcs)' : 'Half Portion'}
              </button>
              <button
                type="button"
                onClick={() => setSize('Full')}
                className={`flex-1 py-1.5 text-center rounded-lg transition duration-200 cursor-pointer ${
                  size === 'Full'
                    ? 'bg-[#b71c1c] text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {isLollipop ? 'Full Portion (8 Pcs)' : 'Full Portion'}
              </button>
            </div>
          </div>
        )}

        {/* Pricing and Action */}
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[#ff3d3d] text-lg font-extrabold font-mono leading-none">
              ₹{currentPrice}
            </span>
            {hasHalfPrice && (
              <span className="text-[9px] text-neutral-500 uppercase font-mono mt-0.5">
                ({size} Price)
              </span>
            )}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold transition duration-300 cursor-pointer shadow-md hover:shadow-emerald-900/10 active:scale-95 text-center"
          >
            <MessageCircle className="w-3.5 h-3.5" /> Order
          </a>
        </div>
      </div>
    </div>
  );
}
