"use client";
import React from 'react';
import Link from 'next/link';

export default function VendorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-20">
      <div className="max-w-4xl text-center space-y-10">
        <h1 className="text-6xl font-black uppercase italic leading-none">
          Monetize your <br/> <span className="text-gray-500">Idle Inventory.</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-20">
          <div className="p-8 border border-gray-900 bg-[#0d0d0d]">
            <h4 className="text-xs font-bold uppercase mb-4 text-blue-500">Global Reach</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">Your assets are visible to every startup and MSME within a 20KM radius of your node.</p>
          </div>
          <div className="p-8 border border-gray-900 bg-[#0d0d0d]">
            <h4 className="text-xs font-bold uppercase mb-4 text-blue-500">AI-Audit Shield</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">Every rental is protected by our visual AI-audit handover, ensuring your machinery returns in prime condition.</p>
          </div>
          <div className="p-8 border border-gray-900 bg-[#0d0d0d]">
            <h4 className="text-xs font-bold uppercase mb-4 text-blue-500">Instant Settlement</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed">Payments are locked via UPI/Escrow at the start of rental and released instantly upon return.</p>
          </div>
        </div>

        <div className="pt-12">
          <Link href="/register" className="bg-white !text-[#0a0a0a] text-black px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gray-200 transition">
            Register to be a Verified Vendor
          </Link>
        </div>
      </div>
    </div>
  );
}