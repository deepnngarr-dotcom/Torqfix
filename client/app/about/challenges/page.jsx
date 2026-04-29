"use client";
import React from 'react';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-12 border-b border-gray-900 pb-8">Strategic Trust Layer</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <section className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Precision Risk</h3>
              <p className="text-gray-400 text-sm leading-relaxed">AI-powered computer vision audits machine state before and after use. "Gold-Standard" test runs verify micron-level calibration.</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Liability & Insurance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">UPI Escrow locks for portable gear; e-NACH mandates for heavy machinery exceed standard retail payment ceilings.</p>
            </div>
          </section>

          <section className="bg-[#111111] p-8 border border-gray-800">
            <h3 className="text-white text-xs font-black uppercase tracking-widest mb-6">Tiered Subscription Model</h3>
            <div className="space-y-6">
              {['Dry Lease', 'Assisted Lease', 'Job-Work'].map((tier, idx) => (
                <div key={tier} className="flex justify-between items-center border-b border-gray-900 pb-4">
                  <p className="text-sm font-bold uppercase italic tracking-tighter">Level 0{idx+1} {tier}</p>
                  <span className="text-[8px] text-gray-600 font-black">ACTIVE</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="mt-20">
          <h2 className="text-xs font-black uppercase text-gray-500 tracking-[0.4em] mb-10 text-center">TorqFix Implementation Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-blue-900/30 bg-blue-900/5 p-6">
              <p className="text-[10px] font-black text-blue-500 uppercase mb-2">FOCUSED CATEGORIES: High Demand</p>
              <p className="text-lg font-black uppercase italic">Robotics • IOT • EV • Drone Technology • Electronics </p>
            </div>
            <div className="border border-gray-900 p-6 opacity-70">
              <p className="text-[10px] font-black text-gray-600 uppercase mb-2">EXPANDING CATEGORIES: Moderate Demand </p>
              <p className="text-lg font-black uppercase italic">Mechanical • Automotive • Electrical • Plumbing </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}