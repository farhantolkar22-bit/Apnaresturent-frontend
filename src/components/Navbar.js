'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('apna_theme') || 'light';
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.documentElement.classList.toggle('light', savedTheme === 'light');
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Book Table', path: '/reserve' },
  ];

  const isHome = pathname === '/';
  const isMenu = pathname === '/menu';

  // Navbar background classes - ALWAYS dark
  let navbarBg = '';
  if (isHome || isMenu) {
    navbarBg = scrolled 
      ? 'bg-[#0c0c0c]/95 backdrop-blur-md py-4 shadow-md border-b border-white/5' 
      : 'bg-transparent py-6';
  } else {
    // Other pages: solid dark background from the start
    navbarBg = 'bg-[#0c0c0c] py-4 shadow-md border-b border-white/5';
  }

  // Navbar text color classes - ALWAYS red
  const navTextColor = 'text-[#b71c1c] hover:text-[#d32f2f]';
  const actionTextColor = 'text-[#b71c1c]';
  const iconButtonBg = 'bg-white/10 dark:bg-white/5';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-serif font-bold tracking-wider text-[#b71c1c] transition duration-200">
            APNA <span className="text-[#b71c1c] font-sans font-light text-xl">RESTAURANT</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-xs tracking-widest uppercase transition-colors duration-200 font-medium ${
                pathname === link.path
                  ? 'text-[#b71c1c] font-bold border-b-2 border-[#b71c1c] pb-1'
                  : navTextColor
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions (Cart, Theme, Mobile Menu) */}
        <div className="flex items-center gap-6">


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full ${iconButtonBg} transition-colors ${actionTextColor}`}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0c0c0c] border-b border-white/5 shadow-xl py-6 px-8 flex flex-col gap-4 transition-all duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-sm tracking-widest uppercase py-2 border-b border-white/5 ${
                pathname === link.path
                  ? 'text-[#b71c1c] font-bold'
                  : 'text-[#b71c1c]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
