import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminLayout from './AdminLayout';
import { Heart, TrendingUp, Users } from 'lucide-react';

export default function AdminDonations() {
  const [donations, setDonations] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, count: 0, avg: 0 });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'donations'), (snap) => {
      const items: any[] = [];
      let total = 0;
      snap.forEach((d) => { items.push({ id: d.id, ...d.data() }); total += d.data().amount || 0; });
      setDonations(items);
      setStats({ total, count: items.length, avg: items.length > 0 ? Math.round(total / items.length) : 0 });
    });
    return () => unsub();
  }, []);

  return (
    <AdminLayout title="Kelola Donasi">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
          <Heart className="w-8 h-8 text-[#EF4444] mb-2" />
          <p className="text-2xl font-bold">Rp {stats.total.toLocaleString('id-ID')}</p>
          <p className="text-xs text-[#6B7280]">Total Donasi</p>
        </div>
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
          <Users className="w-8 h-8 text-[#3B82F6] mb-2" />
          <p className="text-2xl font-bold">{stats.count}</p>
          <p className="text-xs text-[#6B7280]">Total Donor</p>
        </div>
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
          <TrendingUp className="w-8 h-8 text-[#22C55E] mb-2" />
          <p className="text-2xl font-bold">Rp {stats.avg.toLocaleString('id-ID')}</p>
          <p className="text-xs text-[#6B7280]">Rata-rata</p>
        </div>
      </div>

      <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-[#374151]">
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Donor</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Jumlah</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Metode</th>
              <th className="text-left p-3 text-[#9CA3AF] font-medium">Pesan</th>
            </tr></thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-b border-[#374151] last:border-0 hover:bg-[#1F2937]">
                  <td className="p-3">{d.is_anonymous ? 'Anonymous' : (d.donor_name || '-')}</td>
                  <td className="p-3 text-[#7C3AED] font-semibold">Rp {(d.amount || 0).toLocaleString('id-ID')}</td>
                  <td className="p-3 text-[#9CA3AF] text-xs">{d.payment_method}</td>
                  <td className="p-3 text-[#9CA3AF] text-xs max-w-[200px] truncate">{d.message || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
