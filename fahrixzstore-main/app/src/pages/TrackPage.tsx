import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, Clock, Check, Package, Truck, AlertCircle } from 'lucide-react';

const statusSteps = [
  { key: 'pending', label: 'Dibuat', desc: 'Pesanan dibuat', icon: Clock },
  { key: 'paid', label: 'Dibayar', desc: 'Pembayaran berhasil', icon: Check },
  { key: 'processing', label: 'Diproses', desc: 'Pesanan sedang diproses', icon: Package },
  { key: 'completed', label: 'Selesai', desc: 'Pesanan telah selesai', icon: Truck },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('trackHistory') || '[]'); } catch { return []; }
  });

  const trackOrder = async (id?: string) => {
    const searchId = id || orderId;
    if (!searchId.trim()) return;
    setLoading(true);
    setError('');
    try {
      const unsub = onSnapshot(doc(db, 'orders', searchId.trim()), (snap) => {
        if (snap.exists()) {
          setOrder({ id: snap.id, ...snap.data() });
          if (!recentSearches.includes(searchId.trim())) {
            const updated = [searchId.trim(), ...recentSearches].slice(0, 5);
            setRecentSearches(updated);
            localStorage.setItem('trackHistory', JSON.stringify(updated));
          }
        } else {
          setError('Pesanan tidak ditemukan. Pastikan ID pesanan benar.');
          setOrder(null);
        }
        setLoading(false);
      });
      return () => unsub();
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
      setLoading(false);
    }
  };

  const currentStep = statusSteps.findIndex((s) => s.key === order?.status);
  const formatDate = (ts: any) => {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Track ID Pesanan</h1>
        <p className="text-[#9CA3AF] text-sm mb-6">Lacak status pesanan Anda secara real-time</p>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Masukkan ID Pesanan"
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED]"
              onKeyDown={(e) => e.key === 'Enter' && trackOrder()}
            />
          </div>
          <button
            onClick={() => trackOrder()}
            disabled={loading}
            className="px-6 h-12 gradient-bg text-white rounded-xl font-semibold disabled:opacity-50 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Lacak
          </button>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !order && (
          <div className="mb-6">
            <p className="text-sm text-[#6B7280] mb-2">Pencarian terakhir:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((id) => (
                <button
                  key={id}
                  onClick={() => { setOrderId(id); trackOrder(id); }}
                  className="px-3 py-1.5 bg-[#1F2937] rounded-lg text-sm text-[#9CA3AF] hover:bg-[#374151] transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl text-[#EF4444] mb-6">
            <AlertCircle className="w-5 h-5" />
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {order && (
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 animate-fadeInUp">
            {/* Order Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#6B7280]">ID Pesanan</p>
                  <p className="text-lg font-bold">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#6B7280]">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    order.status === 'completed' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                    order.status === 'cancelled' ? 'bg-[#EF4444]/20 text-[#EF4444]' :
                    'bg-[#FACC15]/20 text-[#FACC15]'
                  }`}>
                    {order.status?.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#6B7280] mt-2">{formatDate(order.createdAt)}</p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {statusSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= currentStep;
                const isLast = i === statusSteps.length - 1;
                return (
                  <div key={step.key} className="flex gap-4 relative">
                    {!isLast && (
                      <div className={`absolute left-[19px] top-8 w-0.5 h-[calc(100%-16px)] ${
                        i < currentStep ? 'bg-[#22C55E]' : 'bg-[#374151]'
                      }`} />
                    )}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-[#22C55E] text-white' : 'bg-[#1F2937] text-[#6B7280] border border-[#374151]'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="pb-8">
                      <p className={`font-semibold ${isActive ? 'text-[#F9FAFB]' : 'text-[#6B7280]'}`}>{step.label}</p>
                      <p className="text-sm text-[#9CA3AF]">{step.desc}</p>
                      <p className="text-xs text-[#6B7280] mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Products */}
            <div className="mt-4 pt-4 border-t border-[#374151]">
              <p className="font-bold text-sm mb-2">Produk:</p>
              {order.products?.map((p: any, i: number) => (
                <p key={i} className="text-sm text-[#9CA3AF]">{p.name} x{p.quantity}</p>
              ))}
              <p className="text-lg font-bold text-[#7C3AED] mt-3">Total: Rp {order.finalTotal?.toLocaleString('id-ID')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
