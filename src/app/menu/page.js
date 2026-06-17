'use client';

import React, { useState, useEffect } from 'react';
import FoodCard from '../../components/FoodCard';
import { Search, Loader2, Phone, Instagram, MapPin, Truck, ShoppingBag, Sparkles, Star } from 'lucide-react';

const fallbackMenu = [
  // --- SOUP VEG./NON-VEG ---
  {
    _id: "m1",
    name: "Chicken Manchow Soup",
    description: "Classic spicy and tangy chicken soup loaded with minced vegetables, ginger, garlic, and served with crispy fried noodles.",
    price: 100,
    halfPrice: 50,
    category: "soup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m2",
    name: "Chicken Clear Soup",
    description: "Light, warm, and comforting soup with tender chicken shreds and seasonal vegetables in clear chicken broth.",
    price: 100,
    halfPrice: 50,
    category: "soup",
    image: "https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m3",
    name: "Chicken Baba Soup",
    description: "Chef's special thick and rich chicken soup made with a secret blend of spicy herbs and shredded egg white.",
    price: 160,
    halfPrice: 90,
    category: "soup",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m4",
    name: "Veg Manchow Soup",
    description: "A popular Indo-Chinese soup prepared with finely chopped mixed vegetables and served hot with crispy fried noodles.",
    price: 80,
    halfPrice: 40,
    category: "soup",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m5",
    name: "Veg Clear Soup",
    description: "A nourishing clear broth containing fresh garden broccoli, carrots, mushrooms, and spring onions.",
    price: 80,
    halfPrice: 40,
    category: "soup",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m6",
    name: "Veg Baba Soup",
    description: "Vibrant vegetable soup crafted with spicy herbs, garlic, vinegar, and a touch of chili paste.",
    price: 130,
    halfPrice: 70,
    category: "soup",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },

  // --- RICE VEG./NON-VEG ---
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

  // --- STARTERS VEG./NON-VEG ---
  {
    _id: "m27",
    name: "Chicken Fry Lollipop",
    description: "Juicy chicken wings shaped into lollipops, spiced, deep-fried to perfection and served with Schezwan sauce.",
    price: 200,
    halfPrice: 100,
    category: "starters",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m28",
    name: "Chicken Masala Lollipop",
    description: "Fried chicken lollipops coated in a thick, semi-dry, flavorful dark spice gravy.",
    price: 250,
    halfPrice: 150,
    category: "starters",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m29",
    name: "Chicken Dry Chilli",
    description: "Diced chicken chunks wok-tossed dry with onions, green bell peppers, garlic, soy sauce, and red chilis.",
    price: 180,
    halfPrice: 100,
    category: "starters",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m30",
    name: "Chicken Chilli",
    description: "Indo-Chinese style tender chicken bites tossed in a delicious spicy-tangy soy chilli gravy.",
    price: 220,
    halfPrice: 120,
    category: "starters",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m31",
    name: "Chicken Crispy",
    description: "Golden crispy fried chicken strips tossed in a sweet, spicy, and tangy garlic sauce.",
    price: 220,
    halfPrice: 120,
    category: "starters",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m32",
    name: "Chicken Chinese Bhel",
    description: "Crunchy fried noodles combined with stir-fried chicken strips, fresh cabbage, onions, and hot sauce.",
    price: 160,
    halfPrice: 90,
    category: "starters",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m33",
    name: "Chicken Manchurian",
    description: "Minced chicken meatballs deep-fried and cooked in an aromatic, tangy dark soy-based Manchurian gravy.",
    price: 200,
    halfPrice: 120,
    category: "starters",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m34",
    name: "Apna Special Starter",
    description: "Our special recipe featuring marinated chicken fried and tossed with signature red spices and honey glaze.",
    price: 280,
    category: "starters",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
    isAvailable: true
  },
  {
    _id: "m35",
    name: "Veg Chilli",
    description: "Assorted crispy vegetables or cheese cubes tossed with soy sauce, garlic, and fresh green chilies.",
    price: 150,
    halfPrice: 90,
    category: "starters",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m36",
    name: "Veg Manchurian",
    description: "Crispy mixed veg dumplings fried and tossed in a tangy soy, garlic, and ginger sauce.",
    price: 150,
    halfPrice: 90,
    category: "starters",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m37",
    name: "Veg Crispy",
    description: "Fresh assorted vegetables batter-coated, fried crisp, and glazed in a mild chili-sweet seasoning.",
    price: 150,
    halfPrice: 90,
    category: "starters",
    image: "https://images.unsplash.com/photo-1607532941433-304659e8198a?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m38",
    name: "Veg Chinese Bhel",
    description: "Crunchy fried noodles mixed with raw spring vegetables, onions, cabbage, and a spicy Schezwan dressing.",
    price: 140,
    halfPrice: 80,
    category: "starters",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m39",
    name: "Paneer Chilli",
    description: "Fresh cottage cheese chunks tossed in hot wok with spring onions, capsicum, green chilies, and soy sauce.",
    price: 250,
    halfPrice: 150,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m40",
    name: "Paneer Crispy",
    description: "Batter-fried golden paneer strips tossed in a sweet-spicy garlic sauce with green onions.",
    price: 250,
    halfPrice: 150,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },
  {
    _id: "m41",
    name: "Paneer Manchurian",
    description: "Succulent paneer cubes tossed in a sweet and sour ginger-garlic soy gravy with spring onions.",
    price: 250,
    halfPrice: 150,
    category: "starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600",
    isSignature: false,
    isAvailable: true
  },

  // --- NOODLES VEG./NON-VEG ---
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
    _id: "m50",
    name: "Chicken Apna Special Noodles",
    description: "Chef's signature hakka noodles tossed with scrambled eggs, chicken shreds, and a secret house spice mix.",
    price: 280,
    halfPrice: 180,
    category: "noodles",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600",
    isSignature: true,
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

const categories = [
  { id: 'all', name: 'All Chinese Dishes' },
  { id: 'soup', name: 'Soups (Veg/Non-Veg)' },
  { id: 'starters', name: 'Starters (Veg/Non-Veg)' },
  { id: 'rice', name: 'Rice (Veg/Non-Veg)' },
  { id: 'noodles', name: 'Noodles (Veg/Non-Veg)' }
];

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/menu`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setMenuItems(data);
          } else {
            setMenuItems(fallbackMenu);
          }
        } else {
          setMenuItems(fallbackMenu);
        }
      } catch (err) {
        console.log("Could not load database menu, utilizing local fallback.", err.message);
        setMenuItems(fallbackMenu);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
        
        {/* Title / Banner matching the menu card chalkboard layout */}
        <div className="flex flex-col gap-4 text-center items-center py-12 px-6 rounded-[32px] bg-[#0c0c0c] border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle grunge background lines simulation */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212] via-transparent to-transparent opacity-50" />
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#b71c1c] to-transparent" />
          
          <div className="flex items-center gap-2 text-[#ff3d3d] z-10">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-widest font-extrabold font-mono">Premium Culinary Experience</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-black text-white tracking-widest uppercase z-10 drop-shadow-lg">
            Apna Restaurant
          </h1>
          
          {/* Distressed look styled category tag */}
          <div className="relative inline-block mt-2 z-10 transform -skew-x-3">
            <div className="absolute inset-0 bg-[#b71c1c] rounded-md -rotate-1 shadow-md" />
            <span className="relative block text-white text-base md:text-lg font-mono font-black uppercase tracking-wider px-6 py-2">
              Chinese Menu
            </span>
          </div>
        </div>

        {/* Filters and Search Bar - Dark Chalkboard Theme */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-[#0d0d0d] p-6 rounded-3xl border border-white/5 shadow-lg">
          {/* Categories list */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold transition cursor-pointer border ${
                  selectedCategory === cat.id
                    ? 'bg-[#b71c1c] text-white border-[#b71c1c] shadow-md shadow-red-950/20 active:scale-95'
                    : 'bg-[#121212] border-white/5 hover:border-[#b71c1c]/40 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Search our delicious dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-xs text-white focus:outline-none focus:border-[#b71c1c]/45 transition placeholder-neutral-500 font-mono"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-[#b71c1c] animate-spin" />
            <span className="text-xs text-neutral-500 uppercase tracking-widest font-mono">Simulating Gourmet Kitchen...</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-[#0d0d0d] border border-white/5 rounded-3xl">
            <p className="text-neutral-500 text-sm">No dishes found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <FoodCard key={item._id || item.id} item={item} />
            ))}
          </div>
        )}

        {/* Proprietors & Contact Blocks matching bottom of menu card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 pt-12 border-t border-white/5 items-stretch">
          
          {/* Proprietors Highlight (Gradient Badge) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-center items-center">
            <div className="relative w-full max-w-sm p-8 rounded-[48px] bg-gradient-to-tr from-[#00d2ff] via-[#f9629f] to-[#ff758c] text-black shadow-2xl flex flex-col items-center justify-center text-center border-4 border-black/10 overflow-hidden group">
              {/* Background shine effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -skew-x-12 scale-125" />
              
              <h3 className="text-xs tracking-widest font-black text-black/60 uppercase border-b-2 border-black/25 pb-1 mb-5">
                Proprietors
              </h3>
              <ul className="flex flex-col gap-2 z-10">
                <li className="text-2xl font-serif font-black tracking-wide text-neutral-900 drop-shadow-sm uppercase">
                  Moin Rahatwal
                </li>
                <li className="text-2xl font-serif font-black tracking-wide text-neutral-900 drop-shadow-sm uppercase">
                  Aves Rahatwal
                </li>
                <li className="text-2xl font-serif font-black tracking-wide text-neutral-900 drop-shadow-sm uppercase">
                  Mavish Rahatwal
                </li>
              </ul>
            </div>
          </div>

          {/* Contact details & updates card (Peach/salmon color block) */}
          <div className="md:col-span-6 lg:col-span-7 flex">
            <div className="w-full bg-gradient-to-br from-[#ff8d72] to-[#ff6647] text-neutral-950 p-8 rounded-[40px] shadow-2xl flex flex-col justify-between gap-6 border-4 border-black/10">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] tracking-widest font-black uppercase text-red-950/70 border-b border-red-950/20 pb-2">
                  Follow for More Details & Updates
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <a 
                    href="https://instagram.com/apna_restaurant22" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-bold hover:text-red-950 transition"
                  >
                    <Instagram className="w-5 h-5 shrink-0 text-red-950" />
                    <span>apna_restaurant22</span>
                  </a>
                  
                  <a 
                    href="tel:+918468856752"
                    className="flex items-center gap-3 text-sm font-bold hover:text-red-950 transition"
                  >
                    <Phone className="w-5 h-5 shrink-0 text-red-950" />
                    <span>+91 8468856752</span>
                  </a>
                </div>
              </div>

              {/* Service tags */}
              <div className="flex flex-wrap gap-4 items-center py-2 border-y border-red-950/10">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-red-950/90">
                  <Truck className="w-4 h-4" /> Free Home Delivery
                </div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-red-950/90">
                  <ShoppingBag className="w-4 h-4" /> Takeaway
                </div>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-red-950/90">
                  <Star className="w-4 h-4 fill-current" /> Party Orders
                </div>
              </div>

              {/* Acknowledged Address Block */}
              <div className="flex items-start gap-3 bg-red-950/10 p-4 rounded-2xl">
                <MapPin className="w-5 h-5 text-red-950 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-black uppercase text-red-950/65">Our Main Outlet</h4>
                  <p className="text-sm font-black tracking-wide mt-0.5">
                    NEAR NH 66, TEMPALE-MANGAON 402104
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
