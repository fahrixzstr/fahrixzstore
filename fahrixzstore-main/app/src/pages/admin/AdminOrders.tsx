import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Search, Package, Eye, X } from 'lucide-react';

export default function AdminOrders() {
  const { showToast } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'orders'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      setOrders(items);
    });
    return () => unsub();
  }, []);

  const statusColors: Record<string, string> = {
    pending: 'bg-[#FACC15]/20 text-[#FACC15]',
    paid: 'bg-[#3B82F6]/20 text-[#3B82F6]',
    processing: 'bg-[#7C3AED]/20 text-[#7C3AED]',
    completed: 'bg-[#22C55E]/20 text-[#22C55E]',
    cancelled: 'bg-[#EF4444]/20 text-[#EF4444]',
  };

  const filtered = orders
    .filter((o) => filter === 'Semua' || o.status === filter)
    .filter((o) => !search || o.id.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      showToast('Status diperbarui!', 'success');
      setSelectedOrder(null);
    } catch { showToast('Gagal memperbarui', 'error'); }
  };

  return (
    <AdminLayout title="Kelola Order">
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari order..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <div className="flex gap-1">
          {['Semua', 'pending', 'paid', 'processing', 'completed'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-2 rounded-lg text-xs transition-all ${filter === s ? 'bg-[#7C3AED] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'}`}>{s === 'Semua' ? s : s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#374151]">
              <th className="text-left p-3 text-[#9CA3AF] font-medium">ID</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Produk</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Total</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Status</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Aksi</th>
            </tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3 font-mono text-xs">{o.id.slice(0, 8)}...</td>
                  <td className="p-3">{o.products?.map((p: any) => p.name).join(', ') || '-'}</td>
                  <td className="p-3 text-[#7C3AED] font-semibold">Rp {o.finalTotal?.toLocaleString('id-ID')}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.status] || ''}`}>{o.status}</span></td>
                  <td className="p-3">
                    <button onClick={() => setSelectedOrder(o)} className="p-1.5 rounded-lg hover:bg-[#374151]"><Eye className="w-4 h-4 text-[#3B82F6]" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Detail Order</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <p><span className="text-[#6B7280]">ID:</span> {selectedOrder.id}</p>
              <p><span className="text-[#6B7280]">Total:</span> <span className="text-[#7C3AED] font-bold">Rp {selectedOrder.finalTotal?.toLocaleString('id-ID')}</span></p>
              <p><span className="text-[#6B7280]">Metode:</span> {selectedOrder.paymentMethod}</p>
              <p><span className="text-[#6B7280]">Status:</span> <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[selectedOrder.status]}`}>{selectedOrder.status}</span></p>
            </div>
            <p className="text-xs text-[#6B7280] mb-2">Update Status:</p>
            <div className="flex flex-wrap gap-2">
              {['pending', 'paid', 'processing', 'completed', 'cancelled'].map((s) => (
                <button key={s} onClick={() => updateStatus(selectedOrder.id, s)} className={`px-3 py-1.5 rounded-lg text-xs ${selectedOrder.status === s ? 'bg-[#7C3AED] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
