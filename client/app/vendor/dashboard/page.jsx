"use client";
import React, { useState, useEffect } from 'react';

import dynamic from 'next/dynamic';
import api from '@/utils/api';

const MapSection = dynamic(() => import('./MapSection'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#0d0d0d] flex items-center justify-center text-[10px] text-gray-700 font-black tracking-widest animate-pulse">
      BOOTING SPATIAL ENGINE...
    </div>
  )
});

export default function VendorDashboard() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState({ lat: 28.5844, lng: 77.4669 });
  const [vendor, setVendor] = useState(null);
  const [assets, setAssets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({ totalAssets: 0, pendingApprovals: 0, activeRentals: 0 });

  const [formData, setFormData] = useState({
    name: '',
    category: 'MECHANICAL',
    daily_rate: '',
    selling_price: '',
    stock: 1,
    specs: {}
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('torqfix_token');
      const res = await api.get('/vendor/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssets(res.data.myAssets);
      setBookings(res.data.myBookings);
      setStats(res.data.stats);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('torqfix_user'));
    if (user) setVendor(user);
    fetchDashboardData();
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('torqfix_token');
      await api.patch(`/vendor/bookings/${bookingId}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Subscription Activated!");
      fetchDashboardData();
    } catch (err) {
      alert("Activation Failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 🚀 Payload includes spatial coordinates from MapSection
      const payload = { ...formData, lat: coords.lat, lng: coords.lng };
      const token = localStorage.getItem('torqfix_token');
      await api.post('/parts', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Node Successfully Broadcasted!");
      setShowModal(false);
      fetchDashboardData();
    } catch (err) {
      alert(err.response?.data?.error || "Broadcast Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8 pt-24 font-sans">
      {/* Header & Stats Section */}
      <header className="border-b border-gray-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">Vendor Dashboard</h1>
          <p className="text-gray-500 text-[10px] tracking-[0.3em] uppercase mt-2 font-bold">
            Authenticated Node: {vendor?.name || 'SYNCING...'}
          </p>
        </div>
        <button 
          onClick={() => setShowModal(true)} // 🚀 Triggers the modal
          className="bg-blue-600 text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition"
        >
          Broadcast New Asset
        </button>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111111] p-6 border border-gray-800">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Broadcasted Nodes</p>
          <p className="text-3xl font-black mt-2 italic tracking-tighter">{stats.totalAssets.toString().padStart(2, '0')}</p>
        </div>
        <div className="bg-[#111111] p-6 border border-gray-800">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Active Subscriptions</p>
          <p className="text-3xl font-black mt-2 text-blue-500 italic tracking-tighter">{stats.activeRentals}</p>
        </div>
        <div className="bg-[#111111] p-6 border border-gray-800">
          <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest">Pending Approvals</p>
          <p className="text-3xl font-black mt-2 text-amber-500 italic tracking-tighter">{stats.pendingApprovals}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Technical Inventory List */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Technical Inventory</h2>
          <div className="space-y-4">
            {assets.map(asset => (
              <div key={asset.id} className="bg-[#111111] border border-gray-800 p-5 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold uppercase italic tracking-tight">{asset.name}</p>
                  <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mt-1">{asset.category}</p>
                </div>
                <p className="text-xs font-black text-blue-500">₹{asset.daily_rate}/day</p>
              </div>
            ))}
          </div>
        </section>

        {/* Incoming Requests List */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Incoming Requests</h2>
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking.id} className="bg-[#111111] border border-gray-800 p-5">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-sm ${booking.type === 'PURCHASE' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                            {booking.type} {/* 🚀 Displays RENTAL or PURCHASE */}
                          </span>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{booking.tool?.name}</p>
                        </div>
                        <p className="text-[9px] text-gray-600 uppercase mt-2 font-bold italic">
                          Customer: {booking.user?.name}
                        </p>
                      </div>
                      <span className={`text-[8px] px-2 py-1 font-black tracking-widest uppercase ${booking.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
                        {booking.status}
                      </span>
                    </div>

                    {/* 🚀 NEW: Display Duration Details */}
                    <div className="bg-black/40 p-3 mb-4 border-l-2 border-blue-600">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                        <span className="text-gray-600">Fulfillment Period:</span>
                        <span className="text-white">
                          {booking.type === 'RENTAL' ? (
                            `${Math.ceil((new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 60 * 60 * 24))} Days`
                          ) : (
                            "Immediate Ownership"
                          )}
                        </span>
                      </div>
                  </div>
                  
                {booking.status === 'PENDING' && (
                  <button 
                    onClick={() => handleAcceptBooking(booking.id)}
                    className="w-full bg-white text-black text-[9px] font-black uppercase py-3 tracking-widest hover:bg-blue-600 hover:text-white transition"
                  >
                    Accept Request & Initialize Node
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 🚀 RESTORED: Broadcast Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d0d0d] border border-gray-800 w-full max-w-5xl h-[85vh] flex overflow-hidden">
            
            {/* Left: Spatial Selection Node */}
            <div className="hidden md:block w-1/2 border-r border-gray-900 relative">
              <MapSection coords={coords} setCoords={setCoords} />
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 p-4 border border-gray-800 backdrop-blur-md z-[1000]">
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-1">Spatial Lock:</p>
                <p className="text-[10px] font-bold text-blue-500">{coords.lat.toFixed(4)}°N, {coords.lng.toFixed(4)}°E</p>
              </div>
            </div>

            {/* Right: Data Entry Node */}
            <div className="flex-1 p-10 flex flex-col">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-xl font-black uppercase italic tracking-tighter">Initialize Node</h2>
                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-widest mt-1">Broadcast to Noida Network</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition">✕</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-1 overflow-y-auto pr-4 scrollbar-hide">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Asset Identity</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., DJI AGRAS T40"
                      className="w-full bg-[#111111] border border-gray-800 p-4 text-xs font-bold focus:border-blue-600 outline-none transition"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Industry Sector</label>
                    <select 
                      className="w-full bg-[#111111] border border-gray-800 p-4 text-xs font-bold focus:border-blue-600 outline-none transition uppercase"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>DRONE</option>
                      <option>ROBOTICS</option>
                      <option>ELECTRONICS</option>
                      <option>MECHANICAL</option>
                      <option>ELECTRICAL</option>
                      <option>AUTOMOTIVE</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Daily Subscription Rate</label>
                    <input 
                      type="number" 
                      required
                      placeholder="INR / DAY"
                      className="w-full bg-[#111111] border border-gray-800 p-4 text-xs font-bold focus:border-blue-600 outline-none transition"
                      value={formData.daily_rate}
                      onChange={(e) => setFormData({...formData, daily_rate: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">Direct Buyout Price</label>
                    <input 
                      type="number" 
                      required
                      placeholder="INR"
                      className="w-full bg-[#111111] border border-gray-800 p-4 text-xs font-bold focus:border-blue-600 outline-none transition"
                      value={formData.selling_price}
                      onChange={(e) => setFormData({...formData, selling_price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-900 mt-auto">
                  <button 
                    disabled={loading}
                    className="w-full bg-white text-black py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                  >
                    {loading ? 'UPLOADING DATA NODE...' : 'BROADCAST TO ECOSYSTEM'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}