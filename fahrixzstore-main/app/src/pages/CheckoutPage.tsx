import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { ChevronRight, Check, CreditCard, Wallet, QrCode, Building2 } from 'lucide-react';

const paymentMethods = [
  { id: 'dana', name: 'DANA', icon: '💳', color: '#118EEA', type: 'ewallet' },
  { id: 'ovo', name: 'OVO', icon: '💳', color: '#4B2F9E', type: 'ewallet' },
  { id: 'gopay', name: 'GoPay', icon: '💳', color: '#00AED6', type: 'ewallet' },
  { id: 'shopeepay', name: 'ShopeePay', icon: '💳', color: '#EE4D2D', type: 'ewallet' },
  { id: 'qris', name: 'QRIS', icon: '▣', color: '#2B7CB4', type: 'qris' },
  { id: 'transfer', name: 'Transfer Bank', icon: '🏦', color: '#6B7280', type: 'bank' },
  { id: 'wallet', name: 'Saldo Wallet', icon: '💰', color: '#7C3AED', type: 'wallet' },
];

export default function CheckoutPage() {
  const { cart, user, clearCart, showToast } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ userId: '', server: '', whatsapp: user?.phoneNumber || '', email: user?.email || '' });
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-[#6B7280]">Keranjang kosong</p>
        <button onClick={() => navigate('/catalog')} className="mt-4 btn-primary">Belanja Dulu</button>
      </div>
    );
  }

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'DISKON10') {
      setPromoApplied(true);
      showToast('Promo berhasil! Hemat 10%', 'success');
    } else {
      showToast('Kode promo tidak valid', 'error');
    }
  };

  const handlePayment = async () => {
    if (!agreed) { showToast('Silakan setuju dengan syarat & ketentuan', 'warning'); return; }
    setProcessing(true);
    try {
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: auth.currentUser?.uid || 'guest',
        products: cart.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        total: subtotal,
        discount,
        finalTotal: total,
        paymentMethod: selectedPayment,
        status: 'pending',
        paymentStatus: 'waiting',
        formData,
        createdAt: serverTimestamp(),
        invoiceId: `INV-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      });
      clearCart();
      showToast('Pesanan berhasil dibuat!', 'success');
      navigate(`/invoice/${orderRef.id}`);
    } catch (err) {
      showToast('Gagal membuat pesanan', 'error');
    }
    setProcessing(false);
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          {['Detail', 'Pembayaran', 'Konfirmasi'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > i + 1 ? 'bg-[#22C55E] text-white' : step === i + 1 ? 'gradient-bg text-white' : 'bg-[#374151] text-[#6B7280]'
              }`}>
                {step > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-sm hidden sm:block ${step >= i + 1 ? 'text-[#F9FAFB]' : 'text-[#6B7280]'}`}>{s}</span>
              {i < 2 && <ChevronRight className="w-4 h-4 text-[#374151] ml-2" />}
            </div>
          ))}
        </div>

        {/* Step 1: Detail */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeInUp">
            {/* Order Summary */}
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
              <h3 className="font-bold mb-3">Ringkasan Pesanan</h3>
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-3 py-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-[#6B7280]">{item.quantity}x Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <p className="text-sm font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-4 space-y-4">
              <h3 className="font-bold">Data Pembeli</h3>
              <input className="input-field" placeholder="User ID (jika diperlukan)" value={formData.userId} onChange={(e) => setFormData({ ...formData, userId: e.target.value })} />
              <input className="input-field" placeholder="Server (jika diperlukan)" value={formData.server} onChange={(e) => setFormData({ ...formData, server: e.target.value })} />
              <input className="input-field" placeholder="Nomor WhatsApp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
              <input className="input-field" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>

            {/* Promo */}
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
              <h3 className="font-bold mb-3">Kode Promo</h3>
              <div className="flex gap-2">
                <input className="input-field flex-1" placeholder="Masukkan kode promo" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                <button onClick={handleApplyPromo} className="px-6 py-2 bg-[#374151] rounded-xl text-sm font-semibold hover:bg-[#4B5563] transition-colors">Pakai</button>
              </div>
              {promoApplied && <p className="text-[#22C55E] text-sm mt-2">✓ Promo DISKON10 aktif! Hemat 10%</p>}
            </div>

            <button onClick={() => setStep(2)} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">Lanjut ke Pembayaran</button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
              <h3 className="font-bold mb-4">Metode Pembayaran</h3>
              <div className="grid grid-cols-1 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`payment-card flex items-center gap-3 ${selectedPayment === method.id ? 'selected' : ''}`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{ backgroundColor: method.color + '20' }}>
                      <span className="text-xl">{method.icon}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">{method.name}</p>
                      <p className="text-xs text-[#6B7280]">{method.type === 'ewallet' ? 'E-Wallet' : method.type === 'qris' ? 'Scan QR' : method.type === 'bank' ? 'Virtual Account' : 'Saldo Anda'}</p>
                    </div>
                    {selectedPayment === method.id && <Check className="w-5 h-5 text-[#7C3AED]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3 border border-[#374151] rounded-xl font-semibold hover:bg-[#1F2937] transition-all">Kembali</button>
              <button onClick={() => selectedPayment ? setStep(3) : showToast('Pilih metode pembayaran', 'warning')} className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold">Lanjut</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeInUp">
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-4 space-y-3">
              <h3 className="font-bold">Konfirmasi Pesanan</h3>
              <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Subtotal</span><span>Rp {subtotal.toLocaleString('id-ID')}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Diskon</span><span className="text-[#22C55E]">-Rp {discount.toLocaleString('id-ID')}</span></div>}
              <hr className="border-[#374151]" />
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-[#7C3AED]">Rp {total.toLocaleString('id-ID')}</span></div>
              <div className="mt-3 p-3 bg-[#1F2937] rounded-lg">
                <p className="text-xs text-[#6B7280]">Metode: {paymentMethods.find((m) => m.id === selectedPayment)?.name}</p>
                {formData.whatsapp && <p className="text-xs text-[#6B7280]">WhatsApp: {formData.whatsapp}</p>}
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-5 h-5 rounded accent-[#7C3AED]" />
              <span className="text-sm text-[#9CA3AF]">Saya setuju dengan syarat & ketentuan</span>
            </label>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3 border border-[#374151] rounded-xl font-semibold hover:bg-[#1F2937] transition-all">Kembali</button>
              <button
                onClick={handlePayment}
                disabled={processing}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {processing ? 'Memproses...' : <><Check className="w-4 h-4" /> Bayar Sekarang</>}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
