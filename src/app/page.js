'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Clock, Award, ChefHat, Sparkles, MapPin, Phone, Mail, ArrowRight, Star, Copy, Check } from 'lucide-react';
import FoodCard from '../components/FoodCard';

const galleryImages = [
  "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600"
];

const mockSignatures = [
  {
    _id: "m50",
    name: "Chicken Apna Special Noodles",
    category: "noodles",
    price: 280,
    halfPrice: 180,
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    description: "Chef's signature hakka noodles tossed with scrambled eggs, chicken shreds, and a secret house spice mix.",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m27",
    name: "Chicken Fry Lollipop",
    category: "starters",
    price: 200,
    halfPrice: 100,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600",
    description: "Juicy chicken wings shaped into lollipops, spiced, deep-fried to perfection and served with Schezwan sauce.",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m39",
    name: "Paneer Chilli",
    category: "starters",
    price: 250,
    halfPrice: 150,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    description: "Fresh cottage cheese chunks tossed in hot wok with spring onions, capsicum, green chilies, and soy sauce.",
    isSignature: false,
    isAvailable: true
  },
  // --- ALL RICE DISHES FROM THE MENU ---
  {
    _id: "m7",
    name: "Egg Fried Rice",
    description: "Fluffy basmati rice wok-tossed with scrambled eggs, light soy sauce, green peas, and scallions.",
    price: 140,
    halfPrice: 70,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m8",
    name: "Chicken Fried Rice",
    description: "Long-grain rice stir-fried with diced chicken pieces, spring onions, fresh carrots, and authentic spices.",
    price: 150,
    halfPrice: 80,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m9",
    name: "Chicken Shezwan Fried Rice",
    description: "Fiery red fried rice stir-fried with tender chicken chunks and spicy house-made Schezwan paste.",
    price: 170,
    halfPrice: 90,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m10",
    name: "Chicken Triple Fried Rice",
    description: "Combination of chicken fried rice and noodles served with a delicious spicy gravy and crispy fried noodles.",
    price: 200,
    halfPrice: 120,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m11",
    name: "Chicken Chopper Fried Rice",
    description: "Wok-tossed chicken fried rice topped with a thick, savory chicken gravy and garnished with chopped green onions.",
    price: 240,
    halfPrice: 140,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m12",
    name: "Chicken Thousand Rice",
    description: "A combination of spicy fried rice served with rich, creamy tomato-based chicken gravy containing roasted dry chilis.",
    price: 280,
    halfPrice: 150,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m13",
    name: "Chicken Chilli Rice",
    description: "Spicy stir-fried chicken rice paired with delicious classic chicken chili chunks.",
    price: 240,
    halfPrice: 140,
    category: "rice",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m14",
    name: "Chicken Packing Rice",
    description: "Flavor-packed fried rice wrapped and infused with garlic chicken gravy, green peppers, and exotic spices.",
    price: 280,
    halfPrice: 180,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m15",
    name: "Chicken Apna Special Rice",
    description: "Our signature rice preparation tossed with tender chicken strips, fried eggs, and chef's secret aromatic spice blend.",
    price: 280,
    halfPrice: 180,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m16",
    name: "Chicken Hong Kong Rice",
    description: "Sweet and spicy stir-fried chicken rice cooked with bell peppers, cashew nuts, and dark soy sauce.",
    price: 180,
    halfPrice: 100,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m17",
    name: "Chicken Crispy Rice",
    description: "Stir-fried rice topped with golden, crispy batter-fried chicken nuggets and spring onions.",
    price: 200,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m18",
    name: "Chicken Boiled Fried Rice",
    description: "Healthy and lightly tossed basmati rice with sliced boiled chicken breast and minimal oil.",
    price: 100,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m19",
    name: "Veg Fried Rice",
    description: "Classic wok-tossed basmati rice with finely chopped carrots, French beans, cabbage, and spring onions.",
    price: 140,
    halfPrice: 70,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m20",
    name: "Veg Shezwan Fried Rice",
    description: "Spicy and flavorful fried rice tossed with seasonal vegetables and loaded with hot Schezwan sauce.",
    price: 150,
    halfPrice: 80,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m21",
    name: "Veg Triple Fried Rice",
    description: "A tasty combination of veg fried rice, noodles, and crispy noodles served with a spicy vegetable gravy.",
    price: 180,
    halfPrice: 100,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m22",
    name: "Veg Chopper Fried Rice",
    description: "Indo-Chinese rice served with an appetizing topping of finely chopped vegetables in a soy-garlic gravy.",
    price: 220,
    halfPrice: 120,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m23",
    name: "Paneer Chilli Rice",
    description: "Wok-fried rice paired with hot, spicy paneer chunks tossed with capsicum and green chilies.",
    price: 250,
    halfPrice: 150,
    category: "rice",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m24",
    name: "Paneer Fried Rice",
    description: "A delicious stir-fry of basmati rice, tender paneer cubes, green peas, carrots, and spring onions.",
    price: 150,
    halfPrice: 80,
    category: "rice",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m25",
    name: "Veg Manchurian Chilli Rice",
    description: "Flavorsome veg fried rice served alongside juicy vegetable Manchurian dumplings in a rich spicy gravy.",
    price: 220,
    halfPrice: 130,
    category: "rice",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m26",
    name: "Veg Crispy Rice",
    description: "Veg fried rice accompanied by batter-fried crunchy vegetables tossed in sweet chili sauce.",
    price: 180,
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  // --- ALL NOODLES DISHES FROM THE MENU ---
  {
    _id: "m42",
    name: "Egg Fried Noodles",
    description: "Stir-fried soft noodles tossed with scrambled eggs, cabbage, carrots, bell peppers, and soy sauce.",
    price: 140,
    halfPrice: 70,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m43",
    name: "Chicken Hakka Noodles",
    description: "Hakka-style wheat noodles wok-tossed with tender chicken strips, fresh crisp vegetables, and light seasoning.",
    price: 150,
    halfPrice: 80,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m44",
    name: "Chicken Shezwan Noodles",
    description: "Fiery red soft noodles stir-fried with chicken strips and mixed veggies in a spicy Schezwan sauce.",
    price: 170,
    halfPrice: 90,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m45",
    name: "Chicken Triple Noodles",
    description: "Combination of stir-fried noodles and rice served with a delicious spicy chicken gravy and crispy fried noodles.",
    price: 200,
    halfPrice: 120,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m46",
    name: "Chicken Chopper Noodles",
    description: "Hakka noodles topped with a delicious, rich chicken gravy and finely chopped fresh vegetables.",
    price: 240,
    halfPrice: 140,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m47",
    name: "Chicken Thousand Noodles",
    description: "Spicy noodles served with a luscious garlic-chili chicken gravy containing dry red chilis and spring onions.",
    price: 280,
    halfPrice: 150,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m48",
    name: "Chicken Chilli Noodles",
    description: "Delicious stir-fried noodles paired with separate wok-tossed spicy chicken chilli chunks.",
    price: 240,
    halfPrice: 140,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m49",
    name: "Chicken Packing Noodles",
    description: "Savory noodles wrapped in a foil and cooked with thick chicken-veggie garlic gravy.",
    price: 280,
    halfPrice: 180,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m51",
    name: "Chicken Hong Kong Noodles",
    description: "Delicious noodles cooked with bell peppers, cashew nuts, green chilies, and dark soy sauce.",
    price: 180,
    halfPrice: 100,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m52",
    name: "Chicken Crispy Noodles",
    description: "Wok-fried soft noodles tossed with batter-fried chicken nuggets and raw cabbage salad.",
    price: 200,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m53",
    name: "Chicken Boiled Noodles",
    description: "Health-focused boiled noodles tossed lightly with olive oil, boiled chicken shreds, and spring onions.",
    price: 100,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m54",
    name: "Veg Fried Noodles",
    description: "Classic hakka noodles stir-fried with julienned carrots, cabbage, French beans, and bell peppers.",
    price: 140,
    halfPrice: 70,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m55",
    name: "Veg Shezwan Noodles",
    description: "Spicy and tangy noodles stir-fried with sliced vegetables and hot, fiery Schezwan sauce.",
    price: 150,
    halfPrice: 80,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m56",
    name: "Veg Triple Noodles",
    description: "Stir-fried noodles combined with fried rice, topped with a flavorful hot vegetable Manchurian gravy and crispy noodles.",
    price: 180,
    halfPrice: 100,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m57",
    name: "Veg Chopper Noodles",
    description: "Hakka noodles served with an appetizing topping of finely chopped vegetables in a thick garlic gravy.",
    price: 220,
    halfPrice: 120,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m58",
    name: "Paneer Chilli Noodles",
    description: "Wok-fried noodles served with spicy paneer chunks tossed with capsicum and dark soy-chili sauce.",
    price: 250,
    halfPrice: 150,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m59",
    name: "Paneer Fried Noodles",
    description: "Classic hakka noodles tossed with golden fried paneer cubes, soy sauce, and spring vegetables.",
    price: 150,
    halfPrice: 80,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m60",
    name: "Veg Manchurian Chilli Noodles",
    description: "Stir-fried noodles paired with hot, saucy vegetable Manchurian dumplings.",
    price: 220,
    halfPrice: 120,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m61",
    name: "Veg Crispy Noodles",
    description: "Soft stir-fried noodles accompanied by crispy, golden vegetables tossed in a sweet chili soy sauce.",
    price: 180,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  }
];

export default function Home() {
  const [activeImage, setActiveImage] = useState(null);
  const [copiedCoupon, setCopiedCoupon] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reserveForm, setReserveForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: 2
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const handleCopyCoupon = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(''), 3000);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reserveForm)
      });
      if (res.ok) {
        setBookingSuccess(true);
        setReserveForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
        setTimeout(() => setBookingSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredSignatures = selectedCategory === 'all' 
    ? mockSignatures 
    : mockSignatures.filter(s => s.category === selectedCategory);

  return (
    <div className="flex flex-col w-full overflow-hidden bg-white dark:bg-[#0c0c0c] transition-colors duration-400">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920"
            alt="Chinese noodles dish"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/65" /> {/* Dark filter mask */}
        </div>

        {/* Content & Floating Cards Grid */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and descriptions */}
          <div className="lg:col-span-10 flex flex-col gap-6 text-left items-start">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold text-white tracking-wide leading-tight"
            >
              Experience Authentic Taste Like Never Before
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm sm:text-base text-neutral-300 max-w-xl font-light leading-relaxed"
            >
              We craft exquisite culinary art using organic spices hand-ground in-house, delivering gourmet Indian flavors in an award-winning luxury setting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Link
                href="/reserve"
                className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition duration-300 shadow-md text-xs cursor-pointer"
              >
                Reserve a Table
              </Link>
              <Link
                href="/menu"
                className="bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-widest px-8 py-4 rounded-xl transition duration-300 text-xs cursor-pointer backdrop-blur-sm"
              >
                Explore Menu
              </Link>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Chef Image Stack with scroll entry */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-80 h-96 sm:w-96 sm:h-[450px] mx-auto lg:mx-0"
        >
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
            alt="Our Chef"
            className="w-full h-full object-cover rounded-3xl border border-black/5 dark:border-white/5 shadow-xl"
          />
          <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#b71c1c]/35 rounded-3xl -z-10" />
        </motion.div>

        {/* Right Info Story */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-[#b71c1c]">
            <ChefHat className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-semibold font-mono">Our Legacy</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white tracking-wide">
            Crafting Culinary Legacies Since 2025
          </h2>

          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            Founded with a passion to redefine luxury Indian dining, Apna Restaurant fuses classical cooking secrets with high-art plating styles. Our ingredients are freshly handpicked, ensuring that each bite guarantees pure, unadulterated taste.
          </p>

          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            Guided by award-winning Chefs, we take pride in serving you recipes that satisfy both the gourmet foodie and the traditional dining purist.
          </p>


        </div>
      </section>

      {/* 3. CHEF'S SPECIAL SECTION */}
      <section className="py-24 bg-neutral-50 dark:bg-[#1a1a1a]/30 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Content Description (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
            <div className="flex items-center gap-2 text-[#b71c1c]">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-semibold font-mono">Chef's Signature Creation</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white">
              Authentic Chicken Fried Rice
            </h2>

            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
              Experience our signature Chicken Fried Rice with vibrant red color, prepared with tender chicken pieces, fresh vegetables, and premium jasmine rice. Wok-tossed with aromatic soy sauce, ginger, and garlic, finished with a touch of sesame oil for that authentic Asian flavor.
            </p>

            <div className="flex items-center gap-4 bg-white dark:bg-[#1a1a1a] p-5 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm max-w-md">
              <Award className="w-10 h-10 text-[#b71c1c] shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-neutral-800 dark:text-white">Award-Winning Recipe</h4>
                <p className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5">Voted top specialty dish in Hyderabad gourmet reviews 2025.</p>
              </div>
            </div>

            <Link
              href="/menu"
              className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold uppercase tracking-widest px-6 py-3.5 rounded-xl transition text-xs flex items-center gap-2 max-w-max cursor-pointer"
            >
              Order Signature Dishes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Large Image (Right 5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            <div className="h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-black/5 dark:border-white/5">
              <img
                src="/chicken_fried_rice.png"
                alt="Chicken Fried Rice Red"
                className="w-full h-full object-cover zoom-image"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. SIGNATURE DISHES INLINE FILTER GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs text-[#b71c1c] uppercase tracking-widest font-semibold font-mono">Signature Selections</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white">Gourmet Showcases</h2>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['all', 'starters', 'rice', 'noodles'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#b71c1c] text-white border-[#b71c1c] font-bold shadow-sm'
                  : 'bg-white dark:bg-[#1a1a1a] border-black/5 dark:border-white/5 hover:border-[#b71c1c]/30 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Card Grid with transitions */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSignatures.map((item, idx) => (
              <motion.div
                layout
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 6. FOOD GALLERY WITH LIGHTBOX */}
      <section className="py-24 max-w-7xl mx-auto px-6 flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-xs text-[#b71c1c] uppercase tracking-widest font-semibold font-mono">Gourmet Moments</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white tracking-wide">Food Gallery</h2>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryImages.map((src, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(src)}
              className="relative overflow-hidden rounded-2xl group cursor-pointer h-72 border border-black/5 dark:border-white/5"
            >
              <img
                src={src}
                alt={`Gourmet gallery dish ${idx}`}
                className="w-full h-full object-cover zoom-image"
              />
              <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                <span className="border border-[#b71c1c] text-[#b71c1c] rounded-full px-4 py-2 text-xs uppercase tracking-widest font-semibold">
                  Zoom View
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-md"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl"
              >
                <img
                  src={activeImage}
                  alt="Enlarged gallery view"
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-white/10"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 7. ONLINE TABLE RESERVATION FORM */}
      <section className="py-24 bg-neutral-50 dark:bg-[#1a1a1a]/30 border-y border-black/5 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-6 flex flex-col gap-12">
          
          <div className="text-center flex flex-col items-center gap-3">
            <span className="text-xs text-[#b71c1c] uppercase tracking-widest font-semibold font-mono">Secure Your Place</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white tracking-wide">Online Table Reservation</h2>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">Book your dinner table instantly. A confirmation email and text receipt will be sent shortly.</p>
          </div>

          {bookingSuccess ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-8 rounded-3xl text-center flex flex-col items-center gap-4"
            >
              <Award className="w-12 h-12" />
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-800 dark:text-white">Reservation Request Received!</h3>
                <p className="text-xs text-neutral-400 mt-1">Our manager is verifying table availability and will confirm shortly.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="bg-white dark:bg-neutral-950/60 border border-black/5 dark:border-white/5 p-8 rounded-3xl flex flex-col gap-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={reserveForm.name}
                    onChange={(e) => setReserveForm({...reserveForm, name: e.target.value})}
                    placeholder="Enter your name"
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={reserveForm.phone}
                    onChange={(e) => setReserveForm({...reserveForm, phone: e.target.value})}
                    placeholder="10-digit mobile"
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Email Address (Optional)</label>
                  <input
                    type="email"
                    value={reserveForm.email}
                    onChange={(e) => setReserveForm({...reserveForm, email: e.target.value})}
                    placeholder="name@example.com"
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Number of Guests</label>
                  <select
                    value={reserveForm.guests}
                    onChange={(e) => setReserveForm({...reserveForm, guests: Number(e.target.value)})}
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  >
                    {[1,2,3,4,5,6,7,8,10,12].map(num => (
                      <option key={num} value={num} className="bg-white dark:bg-neutral-950">{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Reservation Date</label>
                  <input
                    type="date"
                    required
                    value={reserveForm.date}
                    onChange={(e) => setReserveForm({...reserveForm, date: e.target.value})}
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-neutral-400 tracking-wider">Dinner Time Slot</label>
                  <input
                    type="time"
                    required
                    value={reserveForm.time}
                    onChange={(e) => setReserveForm({...reserveForm, time: e.target.value})}
                    className="bg-neutral-50 dark:bg-neutral-900 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold uppercase tracking-widest py-4 rounded-xl transition cursor-pointer mt-2 shadow-sm disabled:opacity-50"
              >
                {bookingLoading ? 'Processing Booking...' : 'Request Reservation'}
              </button>
            </form>
          )}

        </div>
      </section>



      {/* 9. CONTACT & GOOGLE MAPS */}
      <section className="py-24 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          
          {/* Details */}
          <div className="flex flex-col gap-8 justify-between">
            <div className="flex flex-col gap-4">
              <span className="text-xs text-[#b71c1c] uppercase tracking-widest font-semibold font-mono">Connect With Us</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-800 dark:text-white tracking-wide">Get in Touch</h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md font-light">Have questions regarding a special event booking, catering, or home delivery? Reach out and our manager will assist you.</p>
            </div>

            <div className="flex flex-col gap-6 text-sm">
              <div className="flex items-center gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 p-3.5 rounded-xl border border-black/5 dark:border-white/5 text-[#b71c1c]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-neutral-800 dark:text-white font-serif font-semibold text-xs sm:text-sm">Our Address</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] sm:text-xs mt-0.5">NEAR NH 66, TEMPALE-MANGAON 402104</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 p-3.5 rounded-xl border border-black/5 dark:border-white/5 text-[#b71c1c]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-neutral-800 dark:text-white font-serif font-semibold text-xs sm:text-sm">Phone Inquiries</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] sm:text-xs mt-0.5">+91 8468856752</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-neutral-50 dark:bg-neutral-900 p-3.5 rounded-xl border border-black/5 dark:border-white/5 text-[#b71c1c]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-neutral-800 dark:text-white font-serif font-semibold text-xs sm:text-sm">Email Support</h4>
                  <p className="text-neutral-500 dark:text-neutral-400 text-[11px] sm:text-xs mt-0.5">info@apnarestaurant.com</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/918468856752"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/reserve"
                className="border border-[#b71c1c]/30 hover:border-[#b71c1c] text-[#b71c1c] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                Reserve Table Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Map Box Mockup */}
          <div className="relative rounded-3xl overflow-hidden min-h-[350px] border border-black/5 dark:border-white/5 shadow-md bg-neutral-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3788.083832049592!2d73.3082522!3d18.2514157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be83dc09d94bdff%3A0xe54d924d54628fbc!2sTempale%2C%20Maharashtra%20402104!5e0!3m2!1sen!2sin!4v1718536294719!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
