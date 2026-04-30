"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../../utils/api';

const UserDashboard = () => {
  const [data, setData] = useState({ subscriptions: [], orderHistory: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('torqfix_token'); 
        const { data } = await api.get('/user/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Ensure data exists before setting state
        setData({
          subscriptions: data.subscriptions || [],
          orderHistory: data.orderHistory || []
        });
      } catch (err) {
        console.error("Dashboard Sync Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-gray-500 font-black uppercase tracking-[0.5em] animate-pulse text-xs">
        Syncing Fulfillment Nodes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-12 font-sans pt-32">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">User Dashboard</h1>
          <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">Sector 62/63 Node • User Instance</p>
        </header>

        {/* 1. Subscription Hub (Active & Pending Bookings) */}
        <section className="mb-20">
          <h2 className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-6">Active & Pending Subscriptions</h2>
          <div className="grid gap-4">
            {data.subscriptions.length > 0 ? (
              data.subscriptions.map((sub) => (
                <div key={sub.id} className="bg-[#111111] p-8 border border-gray-900 group hover:border-blue-900/30 transition-all flex justify-between items-center">
                  <div>
                    <span className="text-[8px] text-gray-600 font-black uppercase tracking-widest">{sub.tool?.category} Node</span>
                    <h3 className="font-black text-xl uppercase italic tracking-tighter mt-1">{sub.tool?.name || "Initializing Node..."}</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Type: {sub.type}</p>
                      <div className="h-2 w-[1px] bg-gray-800" />
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold text-white">Total: ₹{sub.total_price}</p>
                    </div>
                  </div>
                        <div className="bg-[#111111] p-4 border border-gray-800">
                          <div className="flex justify-between">
                            <p className="text-xs font-black uppercase italic">{sub.tool?.name}</p>
                            <p className="text-[10px] font-black text-blue-500">₹{sub.total_price}</p>
                          </div>
                          
                          {/* 🚀 NEW: Duration Indicator */}
                          <div className="mt-3 flex items-center justify-between text-[8px] font-black uppercase tracking-widest">
                            <span className="text-gray-600">Cycle:</span>
                            <span className={sub.type === 'PURCHASE' ? "text-blue-500" : "text-amber-500"}>
                              {sub.type === 'RENTAL' 
                                ? `${new Date(sub.start_date).toLocaleDateString()} to ${new Date(sub.end_date).toLocaleDateString()}` 
                                : 'PERMANENT ACQUISITION'}
                            </span>
                          </div>
                        </div>
                  <div className="text-right">
                    <span className={`text-[8px] font-black px-4 py-1.5 uppercase tracking-widest shadow-lg ${sub.status === 'PENDING' ? 'bg-yellow-600/10 text-yellow-500 border border-yellow-900/30' : 'bg-blue-600 text-white'}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-800 text-[10px] font-black uppercase italic py-12 border border-dashed border-gray-900 text-center tracking-widest">
                No active machinery subscriptions found.
              </div>
            )}
          </div>
        </section>

        {/* 2. Order Fulfillment (Direct Purchases) */}
        <section>
          <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">Recent Spare Deliveries</h2>
          <div className="bg-[#111111] border border-gray-900 overflow-hidden shadow-2xl">
            <table className="w-full text-left">
              <thead className="bg-[#0d0d0d] text-[9px] font-black text-gray-600 uppercase tracking-widest border-b border-gray-900">
                <tr>
                  <th className="p-6">Technical Asset</th>
                  <th className="p-6">Tracking ID</th>
                  <th className="p-6 text-right">Total Outflow</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data.orderHistory.map((order) => (
                  <tr key={order.id} className="border-t border-gray-900 hover:bg-white/5 transition">
                    <td className="p-6 font-black text-white uppercase italic">{order.part_name}</td>
                    <td className="p-6 font-mono text-blue-500 font-black tracking-tighter uppercase">
                      TX-{order.id.slice(0, 8)}
                    </td>
                    <td className="p-6 font-black text-gray-400 text-right">₹{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-gray-900 flex justify-between opacity-30">
          <p className="text-[8px] font-black uppercase tracking-tighter">TorqFix Node v1.0.4</p>
          <p className="text-[8px] font-black uppercase tracking-tighter">Secure Logistics Channel • Noida Sector 63</p>
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;