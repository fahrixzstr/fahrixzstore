import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-20 h-20 text-[#374151] mb-4" />
        <h2 className="text-xl font-bold mb-2">Keranjang Kosong</h2>
        <p className="text-[#6B7280] mb-6">Belum ada produk di keranjang Anda</p>
        <Link to="/catalog" className="btn-primary">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="bg-[#111827] rounded-xl border border-[#374151] p-4 flex gap-4">
                <img src={item.image || 'https://placehold.co/200x200/1F2937/374151?text=FXZ'} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                  <p className="text-[#7C3AED] font-bold mt-1">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-[#374151] rounded-lg">
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)} className="p-1.5 hover:bg-[#1F2937] rounded-l-lg">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-sm">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)} className="p-1.5 hover:bg-[#1F2937] rounded-r-lg">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={clearCart} className="text-sm text-[#EF4444] hover:underline flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Kosongkan Keranjang
            </button>
          </div>

          {/* Summary */}
          <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 h-fit">
            <h3 className="font-bold mb-4">Ringkasan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-[#9CA3AF]">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} item)</span>
                <span>Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <hr className="border-[#374151]" />
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-[#7C3AED]">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center justify-center gap-2"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </button>
            <Link to="/catalog" className="block text-center mt-3 text-sm text-[#7C3AED] hover:underline">
              Lanjutkan Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
