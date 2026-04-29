"use client";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Helper component to jump the map to your location
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
}

export default function DiscoveryMap({ tools, setTools, selectedTool, setSelectedTool }) {
  console.log("📍 MAP RECEIVED TOOLS:", tools);
  const [myLocation, setMyLocation] = useState([28.6273, 77.3725]); // Default to Sector 62
  const [hasLocated, setHasLocated] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMyLocation([pos.coords.latitude, pos.coords.longitude]);
          setHasLocated(true);
        },
        (err) => console.error("Location access denied", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="w-full h-[500px] border border-gray-800 overflow-hidden shadow-2xl"> 
      <MapContainer center={myLocation} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {/* Syncs map view to your real location */}
        <RecenterMap position={myLocation} />

        {/* Your Dynamic 2km Geofence */}
        <Circle 
          center={myLocation} 
          radius={20000} 
          pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.15, weight: 1 }} 
        />

        {/* Your Current Position Marker */}
        <Marker position={myLocation} icon={icon}>
          <Popup>
            <span className="font-bold text-xs">YOU ARE HERE</span><br/>
            <span className="text-[10px] text-gray-500 italic">Scanning 2km radius...</span>
          </Popup>
        </Marker>

        {/* --- UPDATED MARKER LOOP --- */}
        {tools && tools.map((tool) => (
          <Marker 
            key={tool.id} 
            // Coordinates [1] is Lat, [0] is Lng for Leaflet
            position={[tool.location.coordinates[1], tool.location.coordinates[0]]} 
            icon={icon}
            eventHandlers={{
              click: () => setSelectedTool(tool),
            }}
          >
            <Popup>
              <div className="p-2">
                <div className="font-black uppercase italic text-xs tracking-tighter">
                  {tool.name} {/* 👈 FIXED: Changed from tool_name to name */}
                </div>
                <div className="text-[10px] text-blue-500 font-bold mt-1 uppercase">
                  {tool.daily_rate ? `Rent: ₹${tool.daily_rate}/d` : `Buy: ₹${tool.selling_price}`}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}