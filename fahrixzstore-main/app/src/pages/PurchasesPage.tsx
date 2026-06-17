import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { ShoppingBag, Package, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Purchase {
  id: string;
  productName: string;
  price: number;
  category: string;
  image: string;
  purchasedAt: any;
}

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filter, setFilter] = useState('Semua');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'purchases'), where('userId', '==', auth.currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const items: Purchase[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Purchase));
      setPurchases(items);
    });
    return () => unsub();
  }, []);

  const categories = ['Semua', 'Digital', 'Hosting', 'Bot', 'Subscription'];
  const filtered = purchases
    .filter((p) => filter === 'Semua' || p.category === filter)
    .filter((p) => !search || p.productName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <ShoppingBag className="w-6 h-6 text-[#7C3AED]" />
          <h1 className="text-2xl font-bold">Dibeli</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#1F2937] border border-[#374151] text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED]" />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${filter === c ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'}`}>{c}</button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[#374151] mx-auto mb-3" />
              <p className="text-[#6B7280]">Belum ada pembelian</p>
            </div>
          ) : (
            filtered.map((p) => (
              <div key={p.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4 flex items-center gap-4">
                <img src={p.image || 'https://placehold.co/80x80/1F2937/374151?text=FXZ'} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{p.productName}</h3>
                  <p className="text-[#7C3AED] font-bold text-sm mt-1">Rp {p.price?.toLocaleString('id-ID')}</p>
                </div>
                <Link to="/catalog" className="px-4 py-2 bg-[#1F2937] rounded-lg text-xs hover:bg-[#374151] transition-colors">Beli Lagi</Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
