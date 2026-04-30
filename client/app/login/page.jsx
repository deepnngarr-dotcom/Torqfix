"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import api from '@/utils/api';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  // 🛡️ Route Guard: Prevent "Double Login" logic gap
  useEffect(() => {
    const token = localStorage.getItem('torqfix_token');
    if (token) {
      router.push('/discovery'); // Redirect if session is already active
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', formData);
      
      // 🔄 Unified Storage Keys: Matching PartDetailPage
      localStorage.setItem('torqfix_token', res.data.token);
      localStorage.setItem('torqfix_user', JSON.stringify(res.data.user));
      
      const role = res.data.user.role;
      alert("Welcome back to the TorqFix network.");

      // Full reload ensures the Navbar state synchronizes immediately
      if (role === 'vendor') {
        window.location.href = '/vendor/dashboard';
      } else {
        window.location.href = '/discovery';
      }
    } catch (err) {
      alert(err.response?.data?.error || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-center items-center px-6 font-sans">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase italic">
          Torq<span className="text-gray-600">Fix</span> Login
        </h1>
        <p className="text-gray-500 text-xs mb-10 tracking-widest uppercase">Identity Verification Required</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-600 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="engineer@torqfix.com"
              className="w-full bg-[#111111] border border-gray-900 p-4 outline-none focus:border-blue-600 transition text-sm placeholder:text-gray-800"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center mr-1">
              <label className="text-[10px] uppercase tracking-[0.2em] text-gray-600 ml-1">Password</label>
              <Link href="/forgot-password" size="tiny" className="text-[9px] uppercase tracking-widest text-gray-600 hover:text-white transition">Forgot Keys?</Link>
            </div>
            <input 
              type="password" 
              required
              className="w-full bg-[#111111] border border-gray-900 p-4 outline-none focus:border-blue-600 transition text-sm"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black py-4 mt-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all disabled:bg-gray-800"
          >
            {loading ? "Authenticating Node..." : "Initialize Session"}
          </button>
        </form>

        <p className="mt-10 text-center text-[10px] uppercase tracking-widest text-gray-700">
          New to the corridor? <Link href="/register" className="text-white hover:text-blue-500 font-bold transition">Create Identity</Link>
        </p>
      </div>
    </div>
  );
}