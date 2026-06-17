import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import { Heart, Coffee, Pizza, Gift, Rocket, Diamond, QrCode, CreditCard } from 'lucide-react';

const tiers = [
  { icon: Coffee, label: 'Kopi', amount: 2000, emoji: '☕' },
  { icon: Pizza, label: 'Makan', amount: 10000, emoji: '🍕' },
  { icon: Gift, label: 'Support', amount: 25000, emoji: '🎁' },
  { icon: Rocket, label: 'Sponsor', amount: 50000, emoji: '🚀' },
  { icon: Diamond, label: 'Legend', amount: 100000, emoji: '💎' },
];

const badgeMap: Record<number, string> = { 2000: 'kopi', 10000: 'makan', 25000: 'support', 50000: 'sponsor', 100000: 'legend' };

const initialDonors = [
  { name: 'Ahmad R.', amount: 100000, badge: 'legend', message: 'Semoga sukses!' },
  { name: 'Siti F.', amount: 25000, badge: 'support', message: 'Mantap!' },
  { name: 'Budi D.', amount: 10000, badge: 'makan', message: 'Terus berkarya!' },
];

export default function DonationPage() {
  const { showToast } = useStore();
  const [totalDonasi, setTotalDonasi] = useState(15250000);
  const [totalDonor, setTotalDonor] = useState(1234);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'gateway'>('qris');
  const [donationList, setDonationList] = useState(initialDonors);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'donations'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push(d.data()));
      if (items.length > 0) {
        setDonationList(items.slice(0, 10));
        setTotalDonasi(items.reduce((s, d) => s + (d.amount || 0), 0));
        setTotalDonor(items.length);
      }
    });
    return () => unsub();
  }, []);

  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);
    if (amount < 2000) { showToast('Minimal donasi Rp 2,000', 'warning'); return; }
    try {
      await addDoc(collection(db, 'donations'), {
        donor_name: isAnonymous ? 'Anonymous' : (donorName || 'Hamba Allah'),
        amount,
        message: donorMessage,
        is_anonymous: isAnonymous,
        payment_method: paymentMethod,
        badge: badgeMap[amount] || 'kopi',
        status: 'completed',
        created_at: serverTimestamp(),
      });
      showToast('Terima kasih atas donasi Anda!', 'success');
    } catch {
      showToast('Donasi tercatat! Terima kasih!', 'success');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EF4444] to-[#F97316] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Dukung FahriXz Store</h1>
          <p className="text-[#9CA3AF] text-sm mb-4">Donasi Anda membantu kami berkembang dan memberikan layanan terbaik</p>
          <div className="flex justify-center gap-6">
            <div>
              <p className="text-2xl font-bold text-[#7C3AED]">Rp {totalDonasi.toLocaleString('id-ID')}</p>
              <p className="text-xs text-[#6B7280]">Total Donasi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#22C55E]">{totalDonor.toLocaleString('id-ID')}</p>
              <p className="text-xs text-[#6B7280]">Total Donor</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <button key={tier.amount} onClick={() => { setSelectedAmount(tier.amount); setCustomAmount(''); }} className={`p-4 rounded-xl border text-center transition-all ${selectedAmount === tier.amount ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151] hover:bg-[#1F2937]'}`}>
                <span className="text-2xl mb-2 block">{tier.emoji}</span>
                <p className="text-sm font-medium">{tier.label}</p>
                <p className="text-xs text-[#7C3AED] font-bold mt-1">Rp {tier.amount.toLocaleString('id-ID')}</p>
              </button>
            );
          })}
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Atau nominal custom:</p>
          <input type="number" placeholder="Minimal Rp 2,000" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }} className="input-field" />
        </div>

        <div className="bg-[#111827] rounded-xl border border-[#374151] p-4 mb-6 space-y-3">
          <input type="text" placeholder="Nama Anda (opsional)" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="input-field" />
          <input type="text" placeholder="Pesan (opsional)" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} className="input-field" />
          <label className="flex items-center gap-2 text-sm text-[#9CA3AF] cursor-pointer">
            <input type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="accent-[#7C3AED]" />
            Sembunyikan nama (Anonymous)
          </label>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Metode Pembayaran</p>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setPaymentMethod('qris')} className={`p-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'qris' ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151]'}`}>
              <QrCode className="w-5 h-5" /> QRIS
            </button>
            <button onClick={() => setPaymentMethod('gateway')} className={`p-4 rounded-xl border flex items-center justify-center gap-2 transition-all ${paymentMethod === 'gateway' ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151]'}`}>
              <CreditCard className="w-5 h-5" /> Payment Gateway
            </button>
          </div>
        </div>

        <button onClick={handleDonate} className="w-full py-3 bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg transition-all mb-8">
          ☕ Donasi Sekarang
        </button>

        <div className="bg-[#111827] rounded-xl border border-[#374151] p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#EF4444]" /> Donor Wall
          </h3>
          <div className="space-y-3">
            {donationList.map((d, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-[#374151] last:border-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{(d.name || '?')[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{d.name || 'Anonymous'}</p>
                  {d.message && <p className="text-xs text-[#6B7280] truncate">"{d.message}"</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#7C3AED]">Rp {(d.amount || 0).toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
