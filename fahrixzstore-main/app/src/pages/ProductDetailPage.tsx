import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc, onSnapshot, collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import { Star, ShoppingCart, Zap, ChevronLeft, Minus, Plus, Heart, Share2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  gallery?: string[];
  category: string;
  rating: number;
  reviewCount: number;
  soldCount: number;
  stock: number;
  badge?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, addToCart, showToast } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    const unsub = onSnapshot(doc(db, 'products', id), (snap) => {
      if (snap.exists()) {
        const data = { id: snap.id, ...snap.data() } as Product;
        setProduct(data);
        setMainImage(data.image);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const q = query(collection(db, 'products'), where('category', '==', product.category), where('status', '==', 'active'), limit(6));
    const unsub = onSnapshot(q, (snap) => {
      const items: Product[] = [];
      snap.forEach((d) => { if (d.id !== id) items.push({ id: d.id, ...d.data() } as Product); });
      setRelated(items);
    });
    return () => unsub();
  }, [product, id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!isLoggedIn) { showToast('Silakan login terlebih dahulu', 'warning'); navigate('/login'); return; }
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity,
      category: product.category,
    });
    showToast('Produk ditambahkan ke keranjang!', 'success');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="skeleton aspect-square rounded-2xl" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-[#6B7280]">Produk tidak ditemukan</p>
        <Link to="/catalog" className="mt-4 text-[#7C3AED] hover:underline">Kembali ke Katalog</Link>
      </div>
    );
  }

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <Link to="/" className="hover:text-[#F9FAFB]">Beranda</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-[#F9FAFB]">Katalog</Link>
          <span>/</span>
          <span className="text-[#F9FAFB]">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div>
            <div className="bg-[#111827] rounded-2xl overflow-hidden border border-[#374151] aspect-square relative">
              <img src={mainImage || product.image} alt={product.name} className="w-full h-full object-cover" />
              {discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#EF4444] text-white text-sm font-bold px-3 py-1 rounded-full">
                  DISKON {discount}%
                </span>
              )}
            </div>
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {[product.image, ...product.gallery].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setMainImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${
                      mainImage === img ? 'border-[#7C3AED]' : 'border-[#374151]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-1 text-[#FACC15]">
                <Star className="w-4 h-4 fill-current" /> {product.rating || 4.8}
              </span>
              <span className="text-[#6B7280] text-sm">{product.reviewCount || 0} ulasan</span>
              <span className="text-[#6B7280] text-sm">{product.soldCount || 0} terjual</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-[#7C3AED]">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-[#6B7280] line-through ml-3">
                  Rp {product.originalPrice.toLocaleString('id-ID')}
                </span>
              )}
            </div>

            <div className="bg-[#111827] rounded-xl p-4 border border-[#374151] mb-6">
              <h3 className="font-semibold mb-2">Deskripsi</h3>
              <p className="text-[#9CA3AF] text-sm whitespace-pre-line">{product.description || 'Tidak ada deskripsi'}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium">Jumlah:</span>
              <div className="flex items-center border border-[#374151] rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-[#1F2937] rounded-l-lg">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-[#1F2937] rounded-r-lg">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-[#6B7280]">Stok: {product.stock || 99}</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#7C3AED] text-[#7C3AED] rounded-xl font-semibold hover:bg-[#7C3AED]/10 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Tambah ke Keranjang
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <Zap className="w-5 h-5" />
                Beli Sekarang
              </button>
            </div>

            <div className="flex gap-3 mt-4">
              <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${liked ? 'border-[#EF4444] text-[#EF4444]' : 'border-[#374151] text-[#9CA3AF]'}`}>
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /> Favorit
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); showToast('Link disalin!', 'success'); }} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#374151] text-[#9CA3AF] hover:bg-[#1F2937] transition-all">
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Produk Serupa</h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {related.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} className="min-w-[180px] product-card">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image || 'https://placehold.co/600x600/1F2937/374151?text=FXZ'} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3">
                    <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
                    <p className="text-[#7C3AED] font-bold mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
