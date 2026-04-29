"use client";
import React, { useState } from 'react';

const CATEGORIES = ['ALL', 'ROBOTICS', 'ELECTRONICS TESTING', 'DRONE TECHNOLOGY', 'ELECTRICAL', 'MECHANICAL', 'AUTOMOTIVE', 'PLUMBING'];

const ToolSidebar = ({ tools, selectedTool, onToolClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredItems = tools.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const renderBadges = (item) => {
    const isTorqFix = item.owner?.role === 'admin';
    const canRent = !!item.daily_rate;
    const canBuy = !!item.selling_price;

    return (
      <div className="flex flex-wrap gap-1 mt-3">
        {/* Entity Badge */}
        <span className={`px-2 py-0.5 text-[7px] font-black uppercase tracking-widest ${isTorqFix ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
          {isTorqFix ? 'By TorqFix' : 'By Vendor'}
        </span>

        {/* Transaction Badge */}
        <span className="px-2 py-0.5 text-[7px] font-black uppercase tracking-widest bg-white text-black">
          {canRent && canBuy ? 'Buy / Rent' : canBuy ? 'Buy Only' : 'Rent Only'}
        </span>
      </div>
    );
  };

  return (
    <aside className="w-96 h-screen bg-[#0a0a0a] border-r border-gray-900 flex flex-col z-10 font-sans">
      
      {/* Header */}
      <div className="p-8 border-b border-gray-900 bg-[#0d0d0d]">
        <h1 className="text-xl font-black italic uppercase tracking-tighter mb-6">
          Torq<span className="text-gray-500">Fix</span> Inventory
        </h1>
        <input 
          type="text" 
          placeholder="SEARCH ASSET NODES..."
          className="w-full bg-black border border-gray-800 py-3 px-4 text-[10px] font-bold uppercase tracking-widest focus:border-blue-500 transition outline-none text-white placeholder-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar p-4 border-b border-gray-900">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-1.5 text-[8px] font-black tracking-widest transition-all uppercase ${
              activeCategory === cat ? 'bg-white text-black' : 'text-gray-600 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {filteredItems?.map(item => (
          <div 
            key={item.id}
            onClick={() => onToolClick(item)}
            className={`p-5 border group transition-all duration-300 ${
              selectedTool?.id === item.id 
                ? 'border-blue-600 bg-[#111111]' 
                : 'border-gray-900 bg-[#0d0d0d] hover:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start">
              <h4 className="font-black text-white text-xs uppercase italic tracking-tighter leading-tight max-w-[70%]">
                {item.name}
              </h4>
              <div className="text-right">
                {item.selling_price && <p className="text-[10px] font-black">₹{item.selling_price}</p>}
                {item.daily_rate && <p className="text-[8px] text-gray-500 italic uppercase">₹{item.daily_rate}/Day</p>}
              </div>
            </div>

            {renderBadges(item)}

            <div className="mt-4 flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full ${item.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
              <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">
                {item.status} • {item.category}
              </span>
            </div>
          </div>
        ))}

        {filteredItems?.length === 0 && (
          <div className="text-center py-20 text-gray-700 text-[10px] font-black uppercase tracking-widest italic">
            No Network Nodes Found
          </div>
        )}
      </div>

      {/* Industrial Footer */}
      <div className="p-6 bg-[#0d0d0d] border-t border-gray-900">
        <div className="flex justify-between items-center opacity-40">
          <span className="text-[8px] font-black uppercase tracking-tighter">System.v1.0</span>
          <span className="text-[8px] font-black uppercase tracking-tighter">20KM Buffer Active</span>
        </div>
      </div>
    </aside>
  );
};

export default ToolSidebar;