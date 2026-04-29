"use client";
import React from 'react';
import Link from 'next/link';

export default function OpportunityPage() {
  const points = [
    { title: "CAPEX Barriers", desc: "Noida land prices hit ₹1L/sqm. Hardware startups face a 'death sentence' balancing rent and machinery costs." },
    { title: "Idle Asset Reality", desc: "MSME factories sit idle 30-40% of the time. TorqFix monetizes this downtime for owners." },
    { title: "Cluster Synergy", desc: "The tight Expressway-to-Yamuna corridor makes P2P transport efficient and cost-effective." }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24">
      <header className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-6xl font-black uppercase italic tracking-tighter mb-4">The Opportunity</h1>
        <p className="text-blue-500 text-[10px] uppercase tracking-[0.5em] font-black">Capital Efficiency • Near-Vicinity Logistics</p>
      </header>

      <div className="max-w-4xl mx-auto space-y-12">
        {points.map((p, i) => (
          <div key={i} className="flex gap-10 items-start border-l-2 border-gray-900 pl-10 py-4 hover:border-blue-600 transition-all">
            <span className="text-5xl font-black text-gray-900 italic">0{i + 1}</span>
            <div>
              <h3 className="text-xl font-black uppercase italic mb-2 tracking-tight">{p.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{p.desc}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-20 pt-10 border-t border-gray-900 text-center">
          <Link href="/discovery" className="bg-white !text-[#0a0a0a] text-black px-10 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">Explore Available Nodes</Link>
        </div>
      </div>
    </div>
  );
}