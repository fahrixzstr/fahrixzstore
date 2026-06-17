import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import { Ticket, Copy, Clock, Tag, Truck, RefreshCw, ShoppingBag } from 'lucide-react';

interface Voucher {
  id: string;
  code: string;
  name: string;
  type: 'diskon' | 'gratis_ongkir' | 'cashback' | 'bogo';
  value: string;
  min_order: number;
  expiry: string;
  used: boolean;
  usage_limit: number;
  used_count: number;
}

export default function VoucherPage() {
  const { showToast } = useStore();
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [inputCode, setInputCode] = useState('');
  const [filter, setFilter] = useState('Semua');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'vouchers'), (snap) => {
      const items: Voucher[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Voucher));
      if (items.length === 0) {
        setVouchers([
          { id: '1', code: 'DISKON10', name: 'Diskon 10%', type: 'diskon', value: '10%', min_order: 50000, expiry: '2025-12-31', used: false, usage_limit: 100, used_count: 23 },
          { id: '2', code: 'GRATISONGKIR', name: 'Gratis Ongkir', type: 'gratis_ongkir', value: 'Gratis', min_order: 30000, expiry: '2025-12-31', used: false, usage_limit: 50, used_count: 12 },
          { id: '3', code: 'CASHBACK5K', name: 'Cashback Rp 5,000', type: 'cashback', value: 'Rp 5,000', min_order: 25000, expiry: '2025-06-30', used: true, usage_limit: 200, used_count: 156 },
        ]);
      } else {
        setVouchers(items);
      }
    });
    return () => unsub();
  }, []);

  const filtered = filter === 'Semua' ? vouchers : vouchers.filter((v) => v.type === filter.toLowerCase());

  const typeIcons: Record<string, any> = { diskon: Tag, gratis_ongkir: Truck, cashback: RefreshCw, bogo: ShoppingBag };
  const typeLabels: Record<string, string> = { diskon: 'Diskon', gratis_ongkir: 'Gratis Ongkir', cashback: 'Cashback', bogo: 'Buy X Get Y' };
  const typeColors: Record<string, string> = { diskon: 'bg-[#7C3AED]', gratis_ongkir: 'bg-[#3B82F6]', cashback: 'bg-[#22C55E]', bogo: 'bg-[#F97316]' };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Ticket className="w-6 h-6 text-[#7C3AED]" />
          <h1 className="text-2xl font-bold">Voucher</h1>
        </div>

        {/* Input */}
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-4 mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Masukkan kode voucher..."
              className="input-field flex-1"
            />
            <button
              onClick={() => { if (inputCode.trim()) showToast(`Voucher ${inputCode} dicek!`, 'info'); }}
              className="px-6 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-sm font-semibold transition-all"
            >
              Gunakan
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['Semua', 'Diskon', 'Gratis Ongkir', 'Cashback'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${filter === f ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'}`}>{f}</button>
          ))}
        </div>

        {/* Vouchers */}
        <div className="space-y-3">
          {filtered.map((v) => {
            const Icon = typeIcons[v.type] || Tag;
            return (
              <div key={v.id} className={`bg-[#111827] rounded-xl border p-4 flex items-center gap-4 ${v.used ? 'border-[#374151] opacity-60' : 'border-[#374151]'}`}>
                <div className={`w-12 h-12 rounded-xl ${typeColors[v.type] || 'bg-[#7C3AED]'} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm">{v.name}</h3>
                    {v.used && <span className="text-[10px] bg-[#6B7280] px-2 py-0.5 rounded-full">Sudah Digunakan</span>}
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">Kode: ••••••{v.code.slice(-4)}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Berlaku s/d {v.expiry}</span>
                    <span>Min. Rp {v.min_order.toLocaleString('id-ID')}</span>
                  </div>
                  {v.usage_limit > 0 && (
                    <div className="mt-2">
                      <div className="w-full h-1.5 bg-[#1F2937] rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C3AED] rounded-full" style={{ width: `${(v.used_count / v.usage_limit) * 100}%` }} />
                      </div>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">{v.used_count}/{v.usage_limit} digunakan</p>
                    </div>
                  )}
                </div>
                {!v.used && (
                  <button
                    onClick={() => { navigator.clipboard.writeText(v.code); showToast('Kode disalin!', 'success'); }}
                    className="p-2 rounded-lg hover:bg-[#374151] transition-colors flex-shrink-0"
                  >
                    <Copy className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
