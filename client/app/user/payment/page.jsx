"use client";
import React from 'react';

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-black text-white p-20 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-4">
        Financial Gateway
      </h1>
      <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">
        Escrow Node: Initializing...
      </p>
    </div>
  );
}