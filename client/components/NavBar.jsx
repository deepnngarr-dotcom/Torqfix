"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 🔄 Sync with unified storage key
    const storedUser = localStorage.getItem('torqfix_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('torqfix_token');
    localStorage.removeItem('torqfix_user');
    window.location.href = '/'; // Hard redirect to clear all states
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-900 px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <Link href="/" className="text-4xl font-black uppercase italic tracking-tighter group">
          Torq<span className="text-gray-500 group-hover:text-white transition">Fix</span>
        </Link>

        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
          {/* 🚀 Hide Live Inventory from Vendors */}
            {user?.role !== 'vendor' && (
              <Link href="/discovery" className="hover:text-white transition">Live Inventory</Link>
            )}
          <Link href="/category/startups" className="hover:text-white transition">Startups</Link>
          <Link href="/category/vendors" className="hover:text-white transition">Vendors</Link>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">

              {user.role === 'vendor'&& (
              <Link href="/vendor/profile" className="text-[9px] font-black tracking-widest text-blue-500 border border-blue-500/20 px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-500 uppercase">
                MY PROFILE
              </Link>
              )}             

              {user.role === 'user'&& (
              <Link href="/user/profile" className="text-[9px] font-black tracking-widest text-blue-500 border border-blue-500/20 px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-500 uppercase">
                MY PROFILE
              </Link>
              )}

              {user.role === 'user' && (
                <Link href="/user/dashboard" className="text-[9px] font-black tracking-widest text-blue-500 border border-blue-500/20 px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-500 uppercase">
                 USER DASHBOARD
                </Link>
              )}

              {user.role === 'vendor' && (
                <Link href="/vendor/dashboard" className="text-[9px] font-black tracking-widest text-blue-500 border border-blue-500/20 px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-500 uppercase">
                  VENDOR DASHBOARD
                </Link>
              )}

              <button 
                onClick={handleLogout} 
                className="text-[9px] font-black text-gray-600 hover:text-red-500 transition tracking-widest uppercase"
              >
                [ Signout ]
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-8">
              <Link href="/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition">
                Sign In
              </Link>
              <Link href="/register" className="bg-white !text-black text-[10px] font-black px-6 py-3 hover:bg-blue-600 hover:text-white transition duration-500 uppercase tracking-widest">
                Join Network
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}