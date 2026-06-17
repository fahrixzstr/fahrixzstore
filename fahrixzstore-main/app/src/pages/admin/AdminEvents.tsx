import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Plus, Search, Trash2, X, Gift } from 'lucide-react';

export default function AdminEvents() {
  const { showToast } = useStore();
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', start_date: '', end_date: '', terms: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'events'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      setEvents(items);
    });
    return () => unsub();
  }, []);

  const filtered = events.filter((e) => e.title?.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'events'), {
        title: form.title, description: form.description,
        start_date: form.start_date, end_date: form.end_date,
        terms: form.terms, status: 'active', participants_count: 0,
        created_at: serverTimestamp(),
      });
      showToast('Event dibuat!', 'success');
      setShowModal(false);
      setForm({ title: '', description: '', start_date: '', end_date: '', terms: '' });
    } catch { showToast('Gagal membuat event', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus event ini?')) return;
    try { await deleteDoc(doc(db, 'events', id)); showToast('Event dihapus!', 'success'); } catch { showToast('Gagal', 'error'); }
  };

  return (
    <AdminLayout title="Kelola Acara">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari acara..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-sm">
          <Plus className="w-4 h-4" /> Buat
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((e) => (
          <div key={e.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">{e.title}</h3>
                  <p className="text-xs text-[#6B7280]">{e.start_date} - {e.end_date}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(e.id)} className="p-1.5 rounded-lg hover:bg-[#EF4444]/20"><Trash2 className="w-4 h-4 text-[#EF4444]" /></button>
            </div>
            <p className="text-sm text-[#9CA3AF] mt-3">{e.description}</p>
            <p className="text-xs text-[#6B7280] mt-2">{e.participants_count || 0} peserta</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Buat Acara</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nama Acara" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field min-h-[80px] resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className="input-field" />
                <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className="input-field" />
              </div>
              <input placeholder="Syarat & Ketentuan" value={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.value })} className="input-field" />
              <button onClick={handleSave} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">Buat Acara</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
