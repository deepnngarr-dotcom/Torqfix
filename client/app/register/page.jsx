"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import api from '../../utils/api';

export default function Register() {
  const [role, setRole] = useState('user'); // Default state is lowercase 'user'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    upi_id: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends the current 'role' state ('user' or 'vendor')
      const res = await api.post('/auth/register', { ...formData, role });
      alert("Registration Successful! Please Login.");
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.error || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
          Join Torq<span className="text-gray-600">Fix</span>
        </h1>
        <p className="text-gray-500 text-sm mb-8 tracking-wide uppercase font-bold text-[10px]">
          Create your node in the engineering network.
        </p>

        {/* Improved Role Selector */}
        <div className="flex gap-2 mb-8 bg-[#111111] p-1.5 border border-gray-900 rounded-sm">
          <button 
            type="button"
            onClick={() => setRole('user')}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              role === 'user' 
                ? 'bg-white text-black shadow-lg' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            I want to Buy/Rent
          </button>
          <button 
            type="button"
            onClick={() => setRole('vendor')}
            className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              role === 'vendor' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                : 'text-gray-500 hover:text-white'
            }`}
          >
            I want to Sell
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Deepak Nagar"
              className="w-full bg-[#111111] border border-gray-800 p-4 outline-none focus:border-gray-500 transition text-sm placeholder:text-gray-800"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@company.com"
              className="w-full bg-[#111111] border border-gray-800 p-4 outline-none focus:border-gray-500 transition text-sm placeholder:text-gray-800"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Conditional UPI Field with clear animation */}
          {role === 'vendor' && (
            <div className="space-y-1 animate-in slide-in-from-top-2 fade-in duration-500">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-500 ml-1">UPI ID (optional field)</label>
              <input 
                type="text" 
                placeholder="yourname@okaxis"
                className="w-full bg-[#111111] border border-blue-900/30 p-4 outline-none focus:border-blue-500 transition text-sm placeholder:text-gray-800"
                onChange={(e) => setFormData({...formData, upi_id: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-[#111111] border border-gray-800 p-4 outline-none focus:border-gray-500 transition text-sm placeholder:text-gray-800"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            className={`w-full py-5 mt-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 ${
              role === 'vendor' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white text-black hover:bg-gray-200'
            }`}
          >
            Register {role === 'vendor' ? 'Vendor' : 'User'} Account
          </button>
        </form>

        <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-widest text-gray-600">
          Already have an account? <Link href="/login" className="text-white hover:underline">[ Sign In ]</Link>
        </p>
      </div>
    </div>
  );
}