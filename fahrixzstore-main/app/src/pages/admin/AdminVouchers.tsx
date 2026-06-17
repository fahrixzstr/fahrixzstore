import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Plus, Search, Trash2, X, Ticket } from 'lucide-react';

export default function AdminVouchers() {
  const { showToast } = useStore();
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ code: '', name: '', type: 'diskon', value: '', min_order: '', expiry: '', usage_limit: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'vouchers'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      setVouchers(items);
    });
    return () => unsub();
  }, []);

  const filtered = vouchers.filter((v) => v.name?.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'vouchers'), {
        code: form.code.toUpperCase(), name: form.name, type: form.type,
        value: form.value, min_order: Number(form.min_order), expiry: form.expiry,
        usage_limit: Number(form.usage_limit), used_count: 0, status: 'active',
        createdAt: serverTimestamp(),
      });
      showToast('Voucher dibuat!', 'success');
      setShowModal(false);
      setForm({ code: '', name: '', type: 'diskon', value: '', min_order: '', expiry: '', usage_limit: '' });
    } catch { showToast('Gagal membuat voucher', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus voucher ini?')) return;
    try { await deleteDoc(doc(db, 'vouchers', id)); showToast('Voucher dihapus!', 'success'); } catch { showToast('Gagal', 'error'); }
  };

  return (
    <AdminLayout title="Kelola Voucher">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari voucher..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-sm">
          <Plus className="w-4 h-4" /> Buat
        </button>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#374151]">
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Kode</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Nama</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Tipe</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Nilai</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Aksi</th>
            </tr></thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3 font-mono text-xs">{v.code}</td>
                  <td className="p-3 font-medium">{v.name}</td>
                  <td className="p-3 text-[#9CA3AF]">{v.type}</td>
                  <td className="p-3 text-[#7C3AED] font-semibold">{v.value}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(v.id)} className="p-1.5 rounded-lg hover:bg-[#EF4444]/20"><Trash2 className="w-4 h-4 text-[#EF4444]" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Buat Voucher</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Kode Voucher" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input-field" />
              <input placeholder="Nama Voucher" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="diskon">Diskon</option>
                <option value="gratis_ongkir">Gratis Ongkir</option>
                <option value="cashback">Cashback</option>
              </select>
              <input placeholder="Nilai (contoh: 10% atau Rp 5000)" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className="input-field" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Min. Order" value={form.min_order} onChange={(e) => setForm({ ...form, min_order: e.target.value })} className="input-field" />
                <input type="number" placeholder="Limit Penggunaan" value={form.usage_limit} onChange={(e) => setForm({ ...form, usage_limit: e.target.value })} className="input-field" />
              </div>
              <input type="date" value={form.expiry} onChange={(e) => setForm({ ...form, expiry: e.target.value })} className="input-field" />
              <button onClick={handleSave} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">Buat Voucher</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
