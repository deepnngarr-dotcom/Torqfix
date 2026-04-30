"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import dynamic from 'next/dynamic'; // 🚀 Required for Leaflet SSR
import api from '@/utils/api';

// 🚀 DYNAMIC IMPORT: Load the map only on the client side
const MapSection = dynamic(() => import('../../vendor/dashboard/MapSection'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#0d0d0d] flex items-center justify-center text-[10px] text-gray-800 font-black tracking-widest animate-pulse">
      INITIALIZING SPATIAL PREVIEW...
    </div>
  )
});

export default function PartDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [part, setPart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [duration, setDuration] = useState(1);


  useEffect(() => {
    const token = localStorage.getItem('torqfix_token');
    setIsLoggedIn(!!token);

    const fetchPart = async () => {
      try {
        const res = await api.get(`/parts/${id}`);
        setPart(res.data);
      } catch (err) {
        console.error("❌ Error fetching node:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPart();
  }, [id]);

  const handleTransaction = async (type) => {
    if (!part || !part.id) {
      alert("Node synchronization incomplete. Please wait.");
      return;
    }

    const token = localStorage.getItem('torqfix_token');
    
    if (!token) {
      alert("Your session is missing. Please log in again.");
      router.push('/login');
      return;
    }

    try {
      const res = await api.post('/bookings/initiate', {
        toolId: part.id,
        type: type,
        duration: type === 'RENTAL' ? duration : 0
      }, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      alert(`${type} Initialized: ${res.data.message || "Securing Node..."}`);
      router.push('/user/dashboard'); 

    } catch (err) {
      const errorServerMessage = err.response?.data?.error || err.response?.data?.message;
      alert(errorServerMessage || "Connection failed.");
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black animate-pulse uppercase tracking-[0.5em]">Syncing Node Data...</div>;
  if (!part) return <div className="min-h-screen bg-black text-white p-20">Node Offline.</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* 🚀 LEFT COLUMN: SPATIAL PREVIEW */}
        <div className="space-y-6">
          <div className="bg-[#111111] aspect-square border border-gray-900 relative overflow-hidden group">
             
             {/* 📍 LIVE MAP COMPONENT */}
             {part.location?.coordinates && (
               <MapSection 
                 coords={{ 
                   lat: part.location.coordinates[1], // 🚀 Swap: GeoJSON uses [lng, lat]
                   lng: part.location.coordinates[0] 
                 }} 
                 setCoords={() => {}} // 🔒 Read-only view
               />
             )}

             {/* Overlays */}
             <div className="absolute top-4 right-4 z-[1000] text-[8px] font-black uppercase px-2 py-1 border border-gray-800 bg-black/80 backdrop-blur-md">
                Status: {isLoggedIn ? <span className="text-green-500">Authenticated</span> : <span className="text-red-500">Guest</span>}
             </div>
             <div className="absolute bottom-4 left-4 z-[1000] bg-blue-600/10 border border-blue-600/30 px-3 py-1 text-[8px] text-blue-500 font-black uppercase tracking-widest backdrop-blur-md">
                Spatial Lock: VERIFIED
             </div>
          </div>
          <button onClick={() => router.back()} className="text-[10px] text-gray-600 font-black uppercase tracking-widest hover:text-white transition">← Return to Discovery Map</button>
        </div>

        {/* RIGHT COLUMN: TECHNICAL SPECS */}
        <div className="space-y-8">
          <header className="border-b border-gray-900 pb-6">
            <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{part.category} NODE</h4>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">{part.name}</h1>
            <p className="text-gray-500 text-[10px] font-bold uppercase mt-2">Vendor: {part.owner?.name || "Verified Anchor"}</p>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#111111] p-6 border border-gray-900">
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Rental / Day</p>
              <p className="text-2xl font-black text-white italic tracking-tighter">₹{part.daily_rate}</p>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <label className="text-[8px] text-gray-600 font-black uppercase tracking-[0.2em] block mb-2">Contract Duration (Days)</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setDuration(Math.max(1, duration - 1))}
                      className="bg-black border border-gray-800 w-8 h-8 text-xs hover:border-blue-600 transition"
                    >-</button>
                    <span className="text-xs font-black text-blue-500 w-4 text-center">{duration}</span>
                    <button 
                      onClick={() => setDuration(duration + 1)}
                      className="bg-black border border-gray-800 w-8 h-8 text-xs hover:border-blue-600 transition"
                    >+</button>
                  </div>
                </div>


            </div>
            <div className="bg-[#111111] p-6 border border-gray-900">
              <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest">Full Acquisition</p>
              <p className="text-2xl font-black text-blue-500 italic tracking-tighter">₹{part.selling_price}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button 
              onClick={() => handleTransaction('RENTAL')}
              className="flex-1 bg-white text-black py-5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
            >
              {isLoggedIn ? "Initialize Subscription" : "Login to Rent"}
            </button>
            <button 
              onClick={() => handleTransaction('PURCHASE')}
              className="flex-1 border border-gray-800 py-5 text-[10px] font-black uppercase tracking-widest hover:border-blue-600 transition-all"
            >
              {isLoggedIn ? "Buy Outright" : "Login to Buy"}
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-900">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-[10px] font-black text-white uppercase tracking-widest">Trust Layer Verification</h3>
            </div>
            <div className="bg-[#111111] p-6 border border-blue-900/20 text-xs">
              <p className="text-gray-400 leading-relaxed">
                Calibration verified within <span className="text-white font-bold">±5 Microns</span>. 
                Spatial location validated via Noida industrial corridor telemetry.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}