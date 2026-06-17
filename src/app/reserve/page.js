'use client';

import React, { useState } from 'react';
import { Calendar, Users, Clock, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', date: '', time: '', guests: 2 });
      }
    } catch (err) {
      console.error('Reservation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
      
      {/* Left Columns: Policy & Rules */}
      <div className="lg:col-span-5 flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-xs text-[#b71c1c] uppercase tracking-widest font-semibold font-mono">Fine Dining</span>
          <h1 className="text-4xl md:text-5xl font-serif font-extrabold text-neutral-800 dark:text-white tracking-wide leading-tight">
            Book A Table
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
            Reserve your table at Apna Restaurant to enjoy custom-curated spices, royal hospitality, and an unforgettable ambiance.
          </p>
        </div>

        {/* Policies */}
        <div className="flex flex-col gap-6 bg-neutral-50 dark:bg-[#1a1a1a]/40 p-8 rounded-3xl border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-lg text-neutral-800 dark:text-white font-serif font-bold tracking-wide">Reservation Policies</h3>
          <ul className="flex flex-col gap-4 text-xs text-neutral-600 dark:text-neutral-400">
            <li className="flex gap-3">
              <Clock className="w-4 h-4 text-[#b71c1c] shrink-0" />
              <span>We hold reserved tables for a maximum of 15 minutes past scheduled booking time.</span>
            </li>
            <li className="flex gap-3">
              <Users className="w-4 h-4 text-[#b71c1c] shrink-0" />
              <span>For reservations exceeding 12 guests, please contact our events coordinator directly at +91 98765 43210.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="w-4 h-4 text-[#b71c1c] shrink-0" />
              <span>A smart-casual dress code is appreciated in our main dining hall. Sleeveless shirts are not permitted for men.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Columns: Reservation Form */}
      <div className="lg:col-span-7 w-full">
        {success ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 p-10 rounded-3xl text-center flex flex-col items-center gap-6"
          >
            <Award className="w-16 h-16 text-emerald-500" />
            <div>
              <h2 className="text-2xl font-serif font-bold text-neutral-800 dark:text-white">Table Booking Confirmed!</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 max-w-sm mx-auto font-light">
                Thank you for choosing Apna Restaurant. A verification message has been sent to your email. We look forward to hosting you!
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="bg-[#b71c1c] hover:bg-[#d32f2f] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition cursor-pointer"
            >
              Book Another Table
            </button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-neutral-900/40 border border-black/5 dark:border-white/5 p-8 sm:p-10 rounded-3xl flex flex-col gap-6 shadow-sm"
          >
            <h2 className="text-xl text-neutral-800 dark:text-white font-serif font-bold border-b border-black/5 dark:border-white/5 pb-4">
              Reservation Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10 digit number"
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Email Address (Optional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Number of Guests</label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Choose Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 tracking-wider">Dinner Time</label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-neutral-50 dark:bg-neutral-950 border border-black/5 dark:border-white/5 text-sm rounded-xl px-4 py-3 text-neutral-800 dark:text-white focus:outline-none focus:border-[#b71c1c]/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#b71c1c] hover:bg-[#d32f2f] text-white font-bold uppercase tracking-widest py-4 rounded-xl transition cursor-pointer mt-4 shadow-sm disabled:opacity-50"
            >
              {loading ? 'Confirming Table...' : 'Confirm Reservation'}
            </button>
          </form>
        )}
      </div>

    </div>
  );
}
