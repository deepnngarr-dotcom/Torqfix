"use client";
import React, { useState, useEffect } from 'react';

import ToolCard from '../../../components/ToolCard';
import api from '@/utils/api';

export default function StartupsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchStartupTech = async () => {
      try {
        // Fetching Robotics & Drone tech specifically for Startup needs
        const res = await api.get('/parts/all');
        const startupTech = res.data.filter(item => 
          item.category === 'ROBOTICS' || item.name.toLowerCase().includes('drone')
        );
        setItems(startupTech);
      } catch (err) {
        console.error("Error fetching startup inventory:", err);
      }
    };
    fetchStartupTech();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Explanation Section */}
      <section className="p-20 border-b border-gray-900 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-5xl font-black uppercase italic leading-tight mb-8">
            Kickstart your <br/> <span className="text-blue-600 text-6xl">Production.</span>
          </h1>
          <div className="space-y-6 text-gray-400 text-sm leading-relaxed max-w-lg">
            <p>
              For deep-tech startups, acquiring specialized machinery is a capital-heavy hurdle. **TorqFix eliminates the barrier to entry** by providing on-demand access to robotics and drone components.
            </p>
            <ul className="space-y-3 font-bold text-[10px] uppercase tracking-widest text-gray-200">
              <li>• ZERO DEPRECIATION RISK</li>
              <li>• PAY-PER-USE SUBSCRIPTION MODELS</li>
              <li>• 45-MINUTE SITE DELIVERY</li>
            </ul>
          </div>
        </div>
        <div className="bg-[#111111] border border-gray-800 p-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 mb-4">Startup Liquidity Status</p>
          <div className="text-4xl font-black italic text-green-500">OPTIMIZED</div>
        </div>
      </section>

      {/* Robotics & Drone Tech Feed */}
      <section className="p-20">
        <header className="mb-12">
          <h2 className="text-2xl font-black uppercase italic">Robotics & Drone Tech</h2>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest mt-2">Active nodes for automated engineering</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(item => <ToolCard key={item.id} item={item} />)}
        </div>
      </section>
    </div>
  );
}