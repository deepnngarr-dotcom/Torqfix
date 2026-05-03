"use client";
import React from 'react';

export default function ChallengesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-12 border-b border-gray-900 pb-8">
          Strategic Challenges & Solutions
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* 🚀 LEFT & CENTER COLUMNS: EXPANDED STRATEGIC AUDIT */}
          <section className="lg:col-span-2 space-y-12">
            
            {/* Existing: Precision Risk */}
            <div className="space-y-2">
              <h3 className="text-blue-500 text-[14px] font-black uppercase tracking-widest">01 Precision Risk Management</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered computer vision audits machine state before and after use. "Gold-Standard" test runs verify micron-level calibration.
              </p>
            </div>

            {/* 1. High Logistics Complexity[cite: 5] */}
            <div className="space-y-3">
              <h3 className="text-blue-500 text-[14px] font-black uppercase tracking-widest">02 Logistics Complexity → Hyperlocal Networks</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-white font-bold block mb-1">The Shift:</span> 
                Instead of using flatbeds for heavy machinery, small IoT boards, drone parts, or testing modules fit perfectly into a standard delivery backpack[cite: 5].
              </p>
              <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                Current Reality: Leveraging intra-city logistics (e.g., Porter) for instant movement of light engineering goods.
              </p>
            </div>

            {/* 2. Mandatory Pre-Delivery Inspections[cite: 5] */}
            <div className="space-y-3">
              <h3 className="text-blue-500 text-[14px] font-black uppercase tracking-widest">03 Pre-Delivery Inspections → "Ever-Ready" Dispatch</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-white font-bold block mb-1">The Shift:</span> 
                B2B equipment providers pre-calibrate, update firmware, and test battery cycles beforehand.
              </p>
              <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                Current Reality: Fleet is maintained in a sealed, tested state for instant pickup without fulfillment delays.
              </p>
            </div>

            {/* 3. Low SKU Turnaround[cite: 5] */}
            <div className="space-y-3">
              <h3 className="text-blue-500 text-[14px] font-black uppercase tracking-widest">04 SKU Turnaround → Decentralized Local Supply</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                <span className="text-white font-bold block mb-1">The Shift:</span> 
                Eliminating the need for dedicated micro-warehouses (dark stores) by utilizing a verified local vendor ecosystem.
              </p>
              <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                Current Reality: Relying entirely on a verified network of local manufacturers and distributors.
              </p>
            </div>

            {/* Existing: Liability & Insurance */}
            <div className="space-y-2">
              <h3 className="text-blue-500 text-[14px] font-black uppercase tracking-widest">05 Liability & Asset Protection</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                UPI Escrow locks for portable gear; e-NACH mandates for heavy machinery exceed standard retail payment ceilings.
              </p>
            </div>
          </section>

          {/* 🚀 RIGHT COLUMN: SUBSCRIPTION & SYSTEM DATA */}
          <aside className="space-y-10">
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

            <div className="p-6 bg-blue-600/5 border border-blue-600/20">
               <p className="text-[8px] text-blue-500 font-black uppercase tracking-[0.4em] mb-4">Audit Metadata</p>
               <p className="text-gray-500 text-[10px] leading-loose uppercase tracking-widest">
                 AI vision audits • Noida Corridor Intel • Optimized for 45-Minute Fulfillment
               </p>
            </div>
          </aside>
        </div>

        {/* 🚀 BOTTOM SECTION: IMPLEMENTATION STRATEGY */}
        <section className="mt-24">
          <h2 className="text-xs font-black uppercase text-gray-500 tracking-[0.4em] mb-10 text-center">TorqFix Deployment Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-blue-900/30 bg-blue-900/5 p-8">
              <p className="text-[10px] font-black text-blue-500 uppercase mb-2">Primary Nodes: Instant Fulfillment</p>
              <p className="text-xl font-black uppercase italic tracking-tighter">Robotics • IOT • EV • Drone Technology • Electronics</p>
            </div>
            <div className="border border-gray-900 p-8 opacity-70">
              <p className="text-[10px] font-black text-gray-600 uppercase mb-2">Secondary Nodes: Scheduled Logistics</p>
              <p className="text-xl font-black uppercase italic tracking-tighter">Mechanical • Automotive • Electrical • Plumbing</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}