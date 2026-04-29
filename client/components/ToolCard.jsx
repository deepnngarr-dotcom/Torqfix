export default function ToolCard({ item }) {
  const isTorqFix = item.owner?.role === 'admin';
  
  return (
    <div className="bg-[#111111] border border-gray-900 group hover:border-gray-500 transition-all duration-500 p-5">
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[8px] font-bold px-2 py-1 uppercase tracking-tighter ${isTorqFix ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
          {isTorqFix ? 'By TorqFix' : 'By Vendor'}
        </span>
        <div className="text-right">
          {item.selling_price && <p className="text-white font-mono text-sm">₹{item.selling_price}</p>}
          {item.daily_rate && <p className="text-gray-500 font-mono text-[10px]">₹{item.daily_rate}/day</p>}
        </div>
      </div>

      <h3 className="text-lg font-black text-white uppercase leading-tight mb-2 group-hover:text-blue-400 transition">
        {item.name}
      </h3>
      
      <p className="text-gray-600 text-xs line-clamp-2 mb-6 h-8">{item.description}</p>

      <div className="flex gap-2">
        <button className="flex-1 bg-white text-black py-3 text-[9px] font-black uppercase tracking-widest hover:bg-gray-200 transition">
          View Detail
        </button>
      </div>
    </div>
  );
}