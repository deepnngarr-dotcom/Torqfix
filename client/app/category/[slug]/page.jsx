"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import ToolCard from '../../../components/ToolCard';
import DiscoveryMap from '../../../components/DiscoveryMap'; // We'll pass items as props
import api from '@/utils/api';

export default function CategoryPage() {
  const { slug } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // ORDER BY createdAt DESC is handled in the backend
      const res = await api.get(`/parts/category/${slug}`);
      setItems(res.data);
    };
    fetchData();
  }, [slug]);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0a0a0a]">
      {/* LEFT: Scrollable Cards */}
      <div className="w-1/3 overflow-y-auto p-6 no-scrollbar border-r border-gray-900">
        <h1 className="text-2xl font-black uppercase italic mb-6 text-white">{slug} Nodes</h1>
        <div className="space-y-4">
          {items.map(item => <ToolCard key={item.id} item={item} />)}
        </div>
      </div>

      {/* RIGHT: Fixed Map */}
      <div className="flex-1">
        <DiscoveryMap items={items} interactive={false} />
      </div>
    </div>
  );
}