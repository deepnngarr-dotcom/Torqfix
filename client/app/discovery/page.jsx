"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // 1. Added for navigation
import ToolSidebar from '../../components/ToolSidebar';
import HandoverCamera from '../../components/HandoverCamera';

const DiscoveryMap = dynamic(
  () => import('../../components/DiscoveryMap'),
  { 
    ssr: false,
    loading: () => <div className="h-[500px] bg-[#111111] animate-pulse flex items-center justify-center text-gray-500 uppercase tracking-widest text-xs">Loading Geospatial Data...</div>
  }
);

function DiscoveryPage() {
  const router = useRouter(); // 2. Initialize the router
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showAudit, setShowAudit] = useState(false);

  useEffect(() => {
    const initializeDiscovery = async () => {
      // Fetch Activity Logs
      try {
        const logRes = await axios.get('http://localhost:5005/api/activity/logs');
        setLogs(logRes.data);
      } catch (err) { console.error("Error fetching logs:", err); }

      // Get Location & Fetch Unified Inventory
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
            const res = await axios.get(
              `http://localhost:5005/api/parts/nearby?lat=${latitude}&lng=${longitude}&category=ALL`
            );
            setTools(res.data);
          } catch (err) { console.error("Error fetching inventory:", err); }
        });
      }
    };
    initializeDiscovery();

    
  }, []);

  // 3. Navigation handler for a unified detail view
  const handleNodeNavigation = (tool) => {
    router.push(`/parts/${tool.id}`);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0a0a] font-sans text-white">
      
      {/* Visual Audit Overlay */}
      {showAudit && (
        <div className="absolute inset-0 z-50 bg-black/95 flex items-center justify-center p-6 backdrop-blur-md">
          <div className="bg-[#111111] border border-gray-800 p-10 max-w-xl w-full">
            <header className="flex justify-between items-start mb-6">
               <h2 className="text-2xl font-black uppercase italic tracking-tighter">AI Inspection</h2>
               <button onClick={() => setShowAudit(false)}>✕</button>
            </header>
            <HandoverCamera onCapture={() => {}} />
          </div>
        </div>
      )}

      {/* 4. Updated Sidebar: Now navigates instead of opening modal */}
      <ToolSidebar 
        tools={tools} 
        selectedTool={selectedTool} 
        onToolClick={handleNodeNavigation} 
      />

      {/* Discovery Surface */}
      <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-10">
          <header className="flex justify-between items-end border-b border-gray-900 pb-6">
            <div>
              <h2 className="text-2xl font-black tracking-tighter uppercase italic">Geospatial Inventory</h2>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em]">Sector 62/63 Node • 20KM Radius</p>
            </div>
            <div className="flex gap-8 font-mono">
              <div className="text-right">
                <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest">Active Nodes</p>
                <p className="text-xl">{tools.length}</p>
              </div>
            </div>
          </header>

          {/* 5. Updated Map: Clicking a marker now navigates to the detail page */}
          <div className="bg-[#111111] border border-gray-800 p-1 shadow-2xl">
            <DiscoveryMap 
              tools={tools} 
              setSelectedTool={handleNodeNavigation} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-[#111111] border border-gray-900 p-6">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">Geofence Status</h3>
                <p className="text-sm font-medium text-blue-500">20KM RADIUS ACTIVE</p>
             </div>
             <div className="bg-[#111111] border border-gray-900 p-6 md:col-span-2">
                <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-4 tracking-widest">Recent Activity</h3>
                <div className="space-y-2">
                  {logs.slice(0,3).map(log => (
                    <p key={log.id} className="text-[10px] text-gray-400 uppercase">
                      <span className="text-white">[{log.User.name.split(' ')[0]}]</span> Acquired {log.Tool.name}
                    </p>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* 6. Removed Checkout Modal: Replaced by dedicated detail page */}
    </div>
  );
}

export default DiscoveryPage;