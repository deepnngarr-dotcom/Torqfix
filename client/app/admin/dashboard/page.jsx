"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../../utils/api';

export default function AdminDashboard() {
  const [tools, setTools] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, activeNodes: 0, pendingAudits: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [toolsRes, statsRes] = await Promise.all([
          api.get('/parts/all'),
          api.get('/admin/stats') // Assume this endpoint exists
        ]);
        setTools(toolsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error("Admin Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 px-10 pb-20 font-sans">
      
      {/* 1. Command Header */}
      <header className="max-w-7xl mx-auto mb-16 flex justify-between items-end border-b border-gray-900 pb-10">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Admin<span className="text-gray-600">Center</span></h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] mt-3">TorqFix Network Governance • Noida Sector 62 Node</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xl font-mono uppercase italic">Optimal</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* 2. Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-gray-900 border border-gray-900">
          {[
            { label: 'Total Network Revenue', value: `₹${stats.revenue.toLocaleString()}`, color: 'text-white' },
            { label: 'Active P2P Nodes', value: stats.activeNodes, color: 'text-blue-500' },
            { label: 'AI Audits Pending', value: stats.pendingAudits, color: 'text-amber-500' },
            { label: 'Network Load', value: '22%', color: 'text-green-500' }
          ].map((kpi, i) => (
            <div key={i} className="bg-[#111111] p-8">
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-4">{kpi.label}</p>
              <h3 className={`text-3xl font-black italic tracking-tighter ${kpi.color}`}>{kpi.value}</h3>
            </div>
          ))}
        </div>

        {/* 3. Asset Management Table */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Inventory Oversight</h2>
            <button className="text-[9px] font-bold border border-gray-800 px-4 py-2 hover:bg-white hover:text-black transition">EXPORT LOGS</button>
          </div>
          
          <div className="bg-[#111111] border border-gray-900 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-900 bg-[#0d0d0d]">
                  {['Asset ID', 'Tool Name', 'Owner', 'Status', 'Rate/Price', 'Actions'].map(head => (
                    <th key={head} className="p-5 text-[9px] font-black uppercase tracking-widest text-gray-600">{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.id} className="border-b border-gray-900/50 hover:bg-white/5 transition-colors">
                    <td className="p-5 font-mono text-[10px] text-gray-500">#{tool.id.slice(0, 8).toUpperCase()}</td>
                    <td className="p-5 text-[11px] font-bold uppercase tracking-tight">{tool.tool_name}</td>
                    <td className="p-5 text-[10px] text-gray-400 uppercase">{tool.owner?.name || 'In-House'}</td>
                    <td className="p-5">
                      <span className={`text-[8px] font-black px-2 py-1 uppercase tracking-tighter ${
                        tool.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {tool.status}
                      </span>
                    </td>
                    <td className="p-5 text-[10px] font-mono">
                    {tool.daily_rate ? `₹${tool.daily_rate}/d` : `₹${tool.selling_price}`}
                    </td>
                    <td className="p-5 text-right">
                      <button className="text-[9px] font-black text-gray-600 hover:text-white transition uppercase tracking-widest mr-4">Edit</button>
                      <button className="text-[9px] font-black text-red-900 hover:text-red-500 transition uppercase tracking-widest">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
