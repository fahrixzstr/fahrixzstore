import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Search, Users, Shield, UserCheck, UserX, Eye, X } from 'lucide-react';

export default function AdminUsers() {
  const { showToast } = useStore();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'users'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      setUsers(items);
    });
    return () => unsub();
  }, []);

  const filtered = users.filter((u) =>
    !search || u.displayName?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBan = async (user: any) => {
    try {
      await updateDoc(doc(db, 'users', user.id), { isBanned: !user.isBanned });
      showToast(user.isBanned ? 'User di-unban!' : 'User di-banned!', 'success');
    } catch { showToast('Gagal', 'error'); }
  };

  const roleColors: Record<string, string> = {
    super_admin: 'bg-[#EF4444]/20 text-[#EF4444]',
    admin: 'bg-[#7C3AED]/20 text-[#7C3AED]',
    staff: 'bg-[#3B82F6]/20 text-[#3B82F6]',
    user: 'bg-[#22C55E]/20 text-[#22C55E]',
  };

  return (
    <AdminLayout title="Kelola Users">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari user..." className="w-full h-10 pl-10 pr-4 rounded-lg bg-[#1F2937] border border-[#374151] text-sm focus:outline-none focus:border-[#7C3AED]" />
        </div>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#374151]">
              <th className="text-left p-3 text-[#9CA3AF] font-medium">User</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Role</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Saldo</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Status</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Aksi</th>
            </tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                        <span className="text-white font-bold text-xs">{(u.displayName || 'U')[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium">{u.displayName || 'Unknown'}</p>
                        <p className="text-xs text-[#6B7280]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[u.role] || ''}`}>{u.role || 'user'}</span></td>
                  <td className="p-3 text-[#7C3AED] font-semibold">Rp {(u.balance || 0).toLocaleString('id-ID')}</td>
                  <td className="p-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.isBanned ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#22C55E]/20 text-[#22C55E]'}`}>{u.isBanned ? 'Banned' : 'Aktif'}</span></td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button onClick={() => setSelectedUser(u)} className="p-1.5 rounded-lg hover:bg-[#374151]"><Eye className="w-4 h-4 text-[#3B82F6]" /></button>
                      <button onClick={() => toggleBan(u)} className="p-1.5 rounded-lg hover:bg-[#EF4444]/20"><UserX className="w-4 h-4 text-[#EF4444]" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-sm w-full mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Detail User</h3>
              <button onClick={() => setSelectedUser(null)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-[#6B7280]">Nama:</span> {selectedUser.displayName || '-'}</p>
              <p><span className="text-[#6B7280]">Email:</span> {selectedUser.email}</p>
              <p><span className="text-[#6B7280]">Role:</span> <span className={`text-xs px-2 py-0.5 rounded-full ${roleColors[selectedUser.role]}`}>{selectedUser.role}</span></p>
              <p><span className="text-[#6B7280]">Saldo:</span> <span className="text-[#7C3AED] font-bold">Rp {(selectedUser.balance || 0).toLocaleString('id-ID')}</span></p>
              <p><span className="text-[#6B7280]">Referral:</span> {selectedUser.referralCode || '-'}</p>
              <p><span className="text-[#6B7280]">Bergabung:</span> {selectedUser.joinDate || '-'}</p>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
