import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Plus, Search, Pencil, Trash2, X, Image } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  status: string;
  isFeatured: boolean;
  isFlashSale: boolean;
  rating: number;
  soldCount: number;
}

const categories = ['Digital', 'Hosting', 'Bot', 'Jasa', 'Subscription'];

export default function AdminProducts() {
  const { showToast } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', originalPrice: '', category: 'Digital', stock: '99', status: 'active', isFeatured: false, isFlashSale: false });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'), (snap) => {
      const items: Product[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Product));
      setProducts(items);
    });
    return () => unsub();
  }, []);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleSave = async () => {
    try {
      const data = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        category: form.category,
        stock: Number(form.stock),
        status: form.status,
        isFeatured: form.isFeatured,
        isFlashSale: form.isFlashSale,
        image: 'https://placehold.co/600x600/1F2937/374151?text=FXZ',
        rating: 4.8,
        soldCount: 0,
        updatedAt: serverTimestamp(),
      };
      if (editing) {
        await updateDoc(doc(db, 'products', editing.id), data);
        showToast('Produk diperbarui!', 'success');
      } else {
        await addDoc(collection(db, 'products'), { ...data, createdAt: serverTimestamp() });
        showToast('Produk ditambahkan!', 'success');
      }
      setShowModal(false);
      setEditing(null);
      setForm({ name: '', description: '', price: '', originalPrice: '', category: 'Digital', stock: '99', status: 'active', isFeatured: false, isFlashSale: false });
    } catch {
      showToast('Gagal menyimpan produk', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    try { await deleteDoc(doc(db, 'products', id)); showToast('Produk dihapus!', 'success'); } catch { showToast('Gagal menghapus', 'error'); }
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || '', price: String(p.price), originalPrice: String(p.originalPrice), category: p.category, stock: String(p.stock), status: p.status, isFeatured: p.isFeatured || false, isFlashSale: p.isFlashSale || false });
    setShowModal(true);
  };

  return (
    <AdminLayout title="Kelola Produk">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari produk..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', originalPrice: '', category: 'Digital', stock: '99', status: 'active', isFeatured: false, isFlashSale: false }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-sm transition-all">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#374151]">
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Produk</th>
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Kategori</th>
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Harga</th>
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Stok</th>
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Status</th>
                <th className="text-left p-3 text-[#9CA3AF] font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1F2937] flex items-center justify-center">
                        <Image className="w-4 h-4 text-[#6B7280]" />
                      </div>
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-[#6B7280]">{p.soldCount || 0} terjual</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-[#9CA3AF]">{p.category}</td>
                  <td className="p-3">
                    <span className="text-[#7C3AED] font-semibold">Rp {p.price?.toLocaleString('id-ID')}</span>
                    {p.originalPrice > p.price && <span className="text-xs text-[#6B7280] line-through ml-1">Rp {p.originalPrice?.toLocaleString('id-ID')}</span>}
                  </td>
                  <td className="p-3 text-[#9CA3AF]">{p.stock}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#6B7280]/20 text-[#6B7280]'}`}>{p.status}</span></td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-[#374151] transition-colors"><Pencil className="w-4 h-4 text-[#3B82F6]" /></button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-[#EF4444]/20 transition-colors"><Trash2 className="w-4 h-4 text-[#EF4444]" /></button>
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
              <h3 className="font-bold text-lg">{editing ? 'Edit Produk' : 'Tambah Produk'}</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Nama Produk" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
              <textarea placeholder="Deskripsi" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field min-h-[80px] resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Harga" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                <input type="number" placeholder="Harga Asli" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="number" placeholder="Stok" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-[#9CA3AF] cursor-pointer">
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-[#7C3AED]" /> Featured
                </label>
                <label className="flex items-center gap-2 text-sm text-[#9CA3AF] cursor-pointer">
                  <input type="checkbox" checked={form.isFlashSale} onChange={(e) => setForm({ ...form, isFlashSale: e.target.checked })} className="accent-[#7C3AED]" /> Flash Sale
                </label>
              </div>
              <button onClick={handleSave} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">{editing ? 'Simpan Perubahan' : 'Tambah Produk'}</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
