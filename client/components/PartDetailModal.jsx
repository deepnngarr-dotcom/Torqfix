import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const PartDetailModal = ({ part, onPurchase, onClose }) => {
  if (!part) return null;

  function LocationPicker({ setCoords }) {
    useMapEvents({
      click(e) {
        setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-300">
        <header className="flex justify-between items-start mb-6">
          <div>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">
              {part.category}
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tighter uppercase">{part.name}</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-900 text-xl font-bold">×</button>
        </header>

        {/* Dynamic Technical Datasheet (JSONB specs) [1] */}
        <div className="bg-slate-50 rounded-2xl p-6 grid grid-cols-2 gap-4 mb-8">
          {Object.entries(part.technical_specs).map(([key, val]) => (
            <div key={key} className="border-b border-slate-200 pb-2">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">{key}</p>
              <p className="text-xs font-bold text-slate-700 uppercase">{val || 'N/A'}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 px-2">
          <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Settlement Price</p>
              <p className="text-2xl font-black text-slate-900 font-mono">
                {/* Use the correct model keys */}
                ₹{part.daily_rate ? `${part.daily_rate}/day` : part.selling_price}
              </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">Stock Level</p>
            <p className={`text-sm font-black ${part.stock > 0? 'text-green-600' : 'text-red-500'}`}>
              {part.stock > 0? `${part.stock} UNITS AVAILABLE` : 'OUT OF STOCK'}
            </p>
          </div>
        </div>

        <button 
          onClick={() => onPurchase(part.id)}
          disabled={part.stock <= 0}
          className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest transition-all ${
            part.stock > 0 
             ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-95' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
          }`}
        >
          {part.stock > 0? 'CONFIRM LOCAL PURCHASE' : 'NOTIFY WHEN RESTOCKED'}
        </button>
        
        <p className="mt-6 text-[9px] text-slate-400 text-center uppercase tracking-widest leading-relaxed">
          Secure UPI Transaction • Micro-Logistics Handoff • Noida Sector 63
        </p>
      </div>

     {/* Replace your current map block with this view-only version */}
        <div className="h-48 w-full mb-4 rounded-2xl overflow-hidden border border-slate-100">
          <MapContainer 
            center={[part.location.coordinates[1], part.location.coordinates[0]]} 
            zoom={14} 
            style={{height: '100%'}}
            zoomControl={false}
            dragging={false}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[part.location.coordinates[1], part.location.coordinates[0]]} />
          </MapContainer>
        </div>

    </div>
  );
};

export default PartDetailModal;