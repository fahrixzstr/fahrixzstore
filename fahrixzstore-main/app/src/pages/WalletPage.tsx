import { useState } from 'react';
import { useStore } from '@/stores/useStore';
import { Eye, EyeOff, CreditCard, ArrowUpRight, ArrowDownRight, History } from 'lucide-react';

const topUpAmounts = [10000, 25000, 50000, 100000, 200000, 500000];
const methods = [
  { id: 'dana', name: 'DANA', color: '#118EEA' },
  { id: 'ovo', name: 'OVO', color: '#4B2F9E' },
  { id: 'gopay', name: 'GoPay', color: '#00AED6' },
  { id: 'qris', name: 'QRIS', color: '#2B7CB4' },
  { id: 'transfer', name: 'Transfer Bank', color: '#6B7280' },
];

export default function WalletPage() {
  const { user } = useStore();
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState<'topup' | 'withdraw' | 'history'>('topup');
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [topUpMethod, setTopUpMethod] = useState('dana');
  const [customAmount, setCustomAmount] = useState('');

  const balance = user?.balance || 0;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Wallet</h1>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-2xl p-6 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-8 -mb-8" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/70 text-sm">Total Saldo</span>
              <button onClick={() => setShowBalance(!showBalance)} className="text-white/70 hover:text-white transition-colors">
                {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-3xl font-bold text-white">
              {showBalance ? `Rp ${balance.toLocaleString('id-ID')}` : 'Rp ****'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'topup', label: 'Top Up', icon: ArrowDownRight },
            { key: 'withdraw', label: 'Tarik', icon: ArrowUpRight },
            { key: 'history', label: 'Riwayat', icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.key ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                }`}
              >
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'topup' && (
          <div className="animate-fadeInUp">
            <p className="text-sm font-medium mb-3">Pilih Nominal</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {topUpAmounts.map((a) => (
                <button
                  key={a}
                  onClick={() => { setTopUpAmount(a); setCustomAmount(''); }}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${
                    topUpAmount === a ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                  }`}
                >
                  Rp {a.toLocaleString('id-ID')}
                </button>
              ))}
            </div>
            <p className="text-sm font-medium mb-2">Atau nominal lain:</p>
            <input
              type="number"
              placeholder="Minimal Rp 10,000"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setTopUpAmount(Number(e.target.value)); }}
              className="input-field mb-4"
            />
            <p className="text-sm font-medium mb-3">Metode Pembayaran</p>
            <div className="space-y-2 mb-6">
              {methods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setTopUpMethod(m.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    topUpMethod === m.id ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151] hover:bg-[#1F2937]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.color + '20' }}>
                    <CreditCard className="w-4 h-4" style={{ color: m.color }} />
                  </div>
                  <span className="text-sm">{m.name}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                const amount = topUpAmount || Number(customAmount);
                if (amount < 10000) { useStore.getState().showToast('Minimal top up Rp 10,000', 'warning'); return; }
                useStore.getState().showToast(`Top up Rp ${amount.toLocaleString('id-ID')} berhasil!`, 'success');
              }}
              className="w-full py-3 gradient-bg text-white rounded-xl font-semibold"
            >
              Top Up Sekarang
            </button>
          </div>
        )}

        {activeTab === 'withdraw' && (
          <div className="animate-fadeInUp">
            <p className="text-sm font-medium mb-2">Nominal Penarikan</p>
            <input type="number" placeholder="Minimal Rp 50,000" className="input-field mb-4" />
            <p className="text-sm font-medium mb-2">Metode Penarikan</p>
            <div className="space-y-2 mb-4">
              {['DANA', 'GoPay', 'Bank Transfer'].map((m) => (
                <button key={m} className="w-full p-3 rounded-xl border border-[#374151] text-left hover:bg-[#1F2937] transition-all text-sm">{m}</button>
              ))}
            </div>
            <p className="text-sm font-medium mb-2">Nomor Rekening/E-Wallet</p>
            <input type="text" placeholder="Nomor tujuan" className="input-field mb-4" />
            <p className="text-xs text-[#6B7280] mb-4">Biaya penarikan: Rp 2,500</p>
            <button
              onClick={() => useStore.getState().showToast('Penarikan berhasil diajukan!', 'success')}
              className="w-full py-3 gradient-bg text-white rounded-xl font-semibold"
            >
              Tarik Saldo
            </button>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="animate-fadeInUp">
            <div className="flex gap-2 mb-4">
              {['Semua', 'Masuk', 'Keluar'].map((f) => (
                <button key={f} className="px-3 py-1.5 rounded-full bg-[#1F2937] text-xs text-[#9CA3AF] hover:bg-[#374151]">{f}</button>
              ))}
            </div>
            <div className="text-center py-12">
              <History className="w-12 h-12 text-[#374151] mx-auto mb-3" />
              <p className="text-[#6B7280]">Belum ada transaksi</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
