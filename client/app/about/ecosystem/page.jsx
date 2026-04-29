"use client";
import React from 'react';
import Link from 'next/link';

export default function EcosystemPage() {
  const sectors = [
    { name: "Robotics & Automation (IOT)", companies: ["Addverb", "Simulanis", "Unbox Robotics"] },
    { name: "Drones & Aerospace", companies: ["Raphe", "IG Drones", "EndureAir Systems"] },
    { name: "CleanTech & Industrial AI", companies: ["Lohum", "Vecmocon", "Ripik.AI"] }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 font-sans">
      <header className="max-w-6xl mx-auto border-b border-gray-900 pb-8 mb-12">
        <Link href="/" className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-4 inline-block hover:text-white transition">← Return to Network</Link>
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">Noida Deep Tech Corridor</h1>
        <p className="text-gray-500 text-xs uppercase mt-2 tracking-[0.3em] font-bold">Ecological Audit • 2026 Census</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-16">
          <p className="text-xl text-gray-400 leading-relaxed mb-12 max-w-3xl">
            Noida has emerged as a global hub for hardware innovation. With exactly <span className="text-white font-bold">261 Deep Tech startups</span>, the corridor is scaling production through Robotics, IOT, EV Battery Recycling and Drone Technology. And <span className="text-white font-bold">~400 Agile Engineering MSMEs</span> located in Sectors 63, 67, 80, and 83 involved in component manufacturing. 
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div key={sector.name} className="bg-[#111111] p-8 border border-gray-900">
                <h3 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-6">{sector.name}</h3>
                <ul className="space-y-4">
                  {sector.companies.map(co => (
                    <li key={co} className="text-lg font-bold tracking-tight">{co}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#111111] border border-gray-900 p-10">
          <h2 className="text-2xl font-black uppercase italic mb-8 tracking-tighter">Ecosystem Metrics (2026)</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <p className="text-[9px] uppercase text-gray-600 font-black tracking-widest">Total Startups</p>
              <p className="text-3xl font-black mt-2">261</p>
            </div>
            <div>
              <p className="text-[9px] uppercase text-gray-600 font-black tracking-widest">Funded Nodes</p>
              <p className="text-3xl font-black mt-2 text-blue-500">69</p>
            </div>
            <div>
              <p className="text-[9px] uppercase text-gray-600 font-black tracking-widest">Late Stage</p>
              <p className="text-3xl font-black mt-2">21</p>
            </div>
            <div>
              <p className="text-[9px] uppercase text-gray-600 font-black tracking-widest">Total Raised</p>
              <p className="text-3xl font-black mt-2">~₹2000 Cr+</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}