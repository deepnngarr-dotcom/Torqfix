"use client";
import React, { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data stored during login
    const storedUser = localStorage.getItem('torqfix_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <div className="bg-black min-h-screen text-white p-20">Access Denied.</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12 pt-32 font-sans">
      <div className="max-w-3xl mx-auto border border-gray-900 p-12 bg-[#111111]">
        <header className="border-b border-gray-800 pb-8 mb-8">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">User Profile</h1>
          <p className="text-blue-500 text-[10px] uppercase tracking-[0.3em] mt-2">Verified System User</p>
        </header>

        <div className="space-y-8">
          <div>
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Full Name</p>
            <p className="text-xl font-bold uppercase italic">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Network Email</p>
            <p className="text-xl font-bold">{user.email}</p>
          </div>
          <div className="p-6 bg-blue-600/5 border border-blue-900/20">
            <p className="text-blue-500 text-[9px] font-black uppercase tracking-widest mb-2">Escrow Payment ID</p>
            <p className="text-lg font-mono font-black">{user.upi_id || "NOT_CONFIGURED"}</p>
            <p className="text-gray-500 text-[9px] mt-2 italic">This ID is utilized for UPI Reserve Pay handshakes on the Noida corridor.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
           <button className="bg-white text-black px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">Deactivate Instance</button>
        </div>
      </div>
    </div>
  );
}