import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Plus, Search, Pencil, Trash2, X, Target } from 'lucide-react';

const categories = ['Registrasi', 'Download', 'Game', 'Survey', 'Medsos', 'Review', 'Pinjaman', 'Pengguna Baru'];

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  estimated_time: string;
  status: string;
  quota: number;
  type: string;
}

export default function AdminMissions() {
  const { showToast } = useStore();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Mission | null>(null);
  const [form, setForm] = useState({ title: '', description: '', category: 'Registrasi', reward: '', estimated_time: '5 menit', quota: '50', type: 'one_time' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'missions'), (snap) => {
      const items: Mission[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Mission));
      setMissions(items);
    });
    return () => unsub();
  }, []);

  const filtered = missions.filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async () => {
    try {
      const data = {
        title: form.title, description: form.description, category: form.category,
        reward: Number(form.reward), estimated_time: form.estimated_time,
        quota: Number(form.quota), type: form.type, status: 'active',
        taken_count: 0, updatedAt: serverTimestamp(),
      };
      if (editing) { await updateDoc(doc(db, 'missions', editing.id), data); showToast('Misi diperbarui!', 'success'); }
      else { await addDoc(collection(db, 'missions'), { ...data, createdAt: serverTimestamp() }); showToast('Misi ditambahkan!', 'success'); }
      setShowModal(false); setEditing(null);
      setForm({ title: '', description: '', category: 'Registrasi', reward: '', estimated_time: '5 menit', quota: '50', type: 'one_time' });
    } catch { showToast('Gagal menyimpan', 'error'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus misi ini?')) return;
    try { await deleteDoc(doc(db, 'missions', id)); showToast('Misi dihapus!', 'success'); } catch { showToast('Gagal menghapus', 'error'); }
  };

  const openEdit = (m: Mission) => {
    setEditing(m);
    setForm({ title: m.title, description: m.description, category: m.category, reward: String(m.reward), estimated_time: m.estimated_time, quota: String(m.quota), type: m.type });
    setShowModal(true);
  };

  return (
    <AdminLayout title="Kelola Misi">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari misi..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <button onClick={() => { setEditing(null); setForm({ title: '', description: '', category: 'Registrasi', reward: '', estimated_time: '5 menit', quota: '50', type: 'one_time' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-sm">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#374151]">
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Misi</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Kategori</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Reward</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Status</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Aksi</th>
            </tr></thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#7C3AED]" />
                      <div><p className="font-medium">{m.title}</p><p className="text-xs text-[#6B7280]">{m.estimated_time}</p></div>
                    </div>
                  </td>
                  <td className="p-3 text-[#9CA3AF]">{m.category}</td>
                  <td className="p-3 text-[#22C55E] font-semibold">Rp {m.reward.toLocaleString('id-ID')}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'active' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#6B7280]/20 text-[#6B7280]'}`}>{m.status}</span></td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(m)} className="p-1.5 rounded-lg hover:bg-[#374151]"><Pencil className="w-4 h-4 text-[#3B82F6]" /></button>
                      <button onClick={() => handleDelete(m.id)} className="p-1.5 rounded-lg hover:bg-[#EF4444]/20"><Trash2 className="w-4 h-4 text-[#EF4444]" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{editing ? 'Edit Misi' : 'Tambah Misi'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nama Misi" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input-field" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field min-h-[80px] resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">{categories.map((c) => <option key={c} value={c}>{c}</option>)}</select>
                <input type="number" placeholder="Reward (Rp)" value={form.reward} onChange={(e) => setForm({ ...form, reward: e.target.value })} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Estimasi Waktu" value={form.estimated_time} onChange={(e) => setForm({ ...form, estimated_time: e.target.value })} className="input-field" />
                <input type="number" placeholder="Kuota" value={form.quota} onChange={(e) => setForm({ ...form, quota: e.target.value })} className="input-field" />
              </div>
              <button onClick={handleSave} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">{editing ? 'Simpan' : 'Tambah Misi'}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
