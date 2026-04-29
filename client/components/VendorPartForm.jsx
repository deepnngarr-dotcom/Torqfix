"use client";
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SPEC_MAP = { /* ... keep your existing SPEC_MAP ... */ };

const VendorPartForm = ({ onSave }) => {
  const [category, setCategory] = useState('ROBOTICS');
  const [specs, setSpecs] = useState({});
  const [coords, setCoords] = useState({ lat: 28.6273, lng: 77.3725 });
  
  // Add these missing states
  const [name, setName] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [dailyRate, setDailyRate] = useState('');

  function LocationPicker() {
    useMapEvents({
      click(e) { setCoords({ lat: e.latlng.lat, lng: e.latlng.lng }); },
    });
    return null;
  }

  const handleSave = () => {
    // Correctly bundle the data for partController.js
    onSave({
      name,
      category,
      selling_price: sellingPrice,
      daily_rate: dailyRate,
      specs,
      lat: coords.lat,
      lng: coords.lng
    });
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full">
      <h2 className="text-xl font-black mb-6 uppercase tracking-tighter text-slate-900">Add Engineering Spare</h2>
      
      <input 
        type="text" placeholder="PART NAME" 
        className="w-full mb-3 p-3 bg-slate-50 rounded-xl border-none font-bold"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <input type="number" placeholder="BUY PRICE" className="w-1/2 p-3 bg-slate-50 rounded-xl border-none text-xs" onChange={(e) => setSellingPrice(e.target.value)} />
        <input type="number" placeholder="RENT RATE" className="w-1/2 p-3 bg-slate-50 rounded-xl border-none text-xs" onChange={(e) => setDailyRate(e.target.value)} />
      </div>

      <select 
        className="w-full mb-4 p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-blue-500 font-bold text-xs"
        onChange={(e) => { setCategory(e.target.value); setSpecs({}); }}
      >
        {Object.keys(SPEC_MAP).map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      <div className="h-40 w-full mt-4 rounded-xl overflow-hidden border border-slate-200">
        <MapContainer center={[coords.lat, coords.lng]} zoom={13} style={{height: '100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker />
          <Marker position={[coords.lat, coords.lng]} />
        </MapContainer>
      </div>

      <button 
        onClick={handleSave}
        className="w-full mt-6 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase tracking-widest text-xs"
      >
        LIST COMPONENT
      </button>
    </div>
  );
};