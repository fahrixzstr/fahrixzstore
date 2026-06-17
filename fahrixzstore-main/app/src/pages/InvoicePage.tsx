import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Check, Clock, Package, Truck, Download, Share2, Printer, Home, ArrowLeft } from 'lucide-react';

interface Order {
  id: string;
  invoiceId: string;
  products: any[];
  total: number;
  discount: number;
  finalTotal: number;
  paymentMethod: string;
  status: string;
  paymentStatus: string;
  formData: any;
  createdAt: any;
}

const statusSteps = [
  { key: 'pending', label: 'Dibuat', icon: Clock },
  { key: 'paid', label: 'Dibayar', icon: Check },
  { key: 'processing', label: 'Diproses', icon: Package },
  { key: 'completed', label: 'Selesai', icon: Truck },
];

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, 'orders', id), (snap) => {
      if (snap.exists()) {
        setOrder({ id: snap.id, ...snap.data() } as Order);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="skeleton w-full max-w-xl h-96 rounded-2xl" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-[#6B7280]">Invoice tidak ditemukan</p>
        <Link to="/" className="mt-4 text-[#7C3AED] hover:underline flex items-center gap-1"><Home className="w-4 h-4" /> Kembali</Link>
      </div>
    );
  }

  const currentStep = statusSteps.findIndex((s) => s.key === order.status);
  const statusColor = order.status === 'completed' ? 'bg-[#22C55E]' : order.status === 'cancelled' ? 'bg-[#EF4444]' : 'bg-[#FACC15]';
  const statusText = order.status === 'completed' ? 'LUNAS' : order.status === 'cancelled' ? 'GAGAL' : 'MENUNGGU';

  const formatDate = (ts: any) => {
    if (!ts) return '-';
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="bg-[#111827] rounded-2xl border border-[#374151] overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-[#374151]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-[#6B7280] uppercase tracking-wider">INVOICE</p>
                <p className="text-lg font-bold mt-1">{order.invoiceId}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${statusColor}`}>
                {statusText}
              </span>
            </div>
            <p className="text-sm text-[#6B7280]">{formatDate(order.createdAt)}</p>
          </div>

          {/* Timeline */}
          <div className="px-6 py-6">
            <div className="relative flex items-start justify-between">
              {statusSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = i <= currentStep;
                const isCurrent = i === currentStep;
                return (
                  <div key={step.key} className="flex flex-col items-center relative z-10 flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isActive ? 'bg-[#22C55E] border-[#22C55E] text-white' : 'bg-[#1F2937] border-[#374151] text-[#6B7280]'
                    } ${isCurrent ? 'ring-4 ring-[#22C55E]/20' : ''}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className={`text-xs mt-2 font-medium ${isActive ? 'text-[#F9FAFB]' : 'text-[#6B7280]'}`}>{step.label}</p>
                    {i < statusSteps.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-0.5 ${
                        i < currentStep ? 'bg-[#22C55E]' : 'bg-[#374151]'
                      }`} style={{ transform: 'translateX(50%)' }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer Info */}
          <div className="px-6 py-4 border-t border-[#374151]">
            <h3 className="font-bold text-sm mb-3">Info Pelanggan</h3>
            {order.formData?.whatsapp && <p className="text-sm text-[#9CA3AF]">WhatsApp: {order.formData.whatsapp}</p>}
            {order.formData?.email && <p className="text-sm text-[#9CA3AF]">Email: {order.formData.email}</p>}
            {order.formData?.userId && <p className="text-sm text-[#9CA3AF]">User ID: {order.formData.userId}</p>}
          </div>

          {/* Products */}
          <div className="px-6 py-4 border-t border-[#374151]">
            <h3 className="font-bold text-sm mb-3">Detail Produk</h3>
            {order.products?.map((p: any, i: number) => (
              <div key={i} className="flex items-center gap-3 py-2">
                <img src={p.image || ''} alt={p.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-[#6B7280]">{p.quantity}x Rp {p.price?.toLocaleString('id-ID')}</p>
                </div>
                <p className="text-sm font-semibold">Rp {((p.price || 0) * (p.quantity || 1)).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="px-6 py-4 border-t border-[#374151] space-y-2">
            <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Subtotal</span><span>Rp {order.total?.toLocaleString('id-ID')}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-sm"><span className="text-[#9CA3AF]">Diskon</span><span className="text-[#22C55E]">-Rp {order.discount?.toLocaleString('id-ID')}</span></div>}
            <hr className="border-[#374151]" />
            <div className="flex justify-between font-bold text-lg"><span>Total</span><span className="text-[#7C3AED]">Rp {order.finalTotal?.toLocaleString('id-ID')}</span></div>
          </div>

          {/* Payment Info */}
          <div className="px-6 py-4 border-t border-[#374151]">
            <p className="text-sm text-[#9CA3AF]">Metode Pembayaran: <span className="text-[#F9FAFB] font-medium capitalize">{order.paymentMethod}</span></p>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-[#374151] grid grid-cols-3 gap-3">
            <button onClick={() => showToast('Fitur download segera hadir', 'info')} className="flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] rounded-xl text-sm hover:bg-[#374151] transition-colors">
              <Download className="w-4 h-4" /> Download
            </button>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link disalin!', 'success'); }} className="flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] rounded-xl text-sm hover:bg-[#374151] transition-colors">
              <Share2 className="w-4 h-4" /> Bagikan
            </button>
            <button onClick={() => window.print()} className="flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] rounded-xl text-sm hover:bg-[#374151] transition-colors">
              <Printer className="w-4 h-4" /> Cetak
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function showToast(message: string, type: 'success' | 'error' | 'warning' | 'info') {
  // Use global toast
  import('@/stores/useStore').then(({ useStore }) => {
    useStore.getState().showToast(message, type);
  });
}
