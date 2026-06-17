import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, SlidersHorizontal, Star, ChevronDown } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  soldCount: number;
  badge?: string;
}

export default function CatalogPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [sortBy, setSortBy] = useState('Paling Sesuai');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [showSort, setShowSort] = useState(false);

  const categories = ['Semua', 'Digital', 'Hosting', 'Bot', 'Jasa', 'Subscription'];
  const sortOptions = ['Paling Sesuai', 'Termurah', 'Termahal', 'Terlaris', 'Terbaru', 'Rating Tertinggi'];

  useEffect(() => {
    const q = query(collection(db, 'products'), where('status', '==', 'active'), orderBy('createdAt', 'desc'), limit(50));
    const unsub = onSnapshot(q, (snap) => {
      const items: Product[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as Product));
      setProducts(items);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const filtered = products
    .filter((p) => activeCategory === 'Semua' || p.category === activeCategory)
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'Termurah': return a.price - b.price;
        case 'Termahal': return b.price - a.price;
        case 'Terlaris': return (b.soldCount || 0) - (a.soldCount || 0);
        case 'Rating Tertinggi': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Katalog Produk</h1>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari produk..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#1F2937] border border-[#374151] text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED]"
          />
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm hover:bg-[#374151] transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {sortBy}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showSort && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowSort(false)} />
                <div className="absolute right-0 top-12 w-48 bg-[#1F2937] border border-[#374151] rounded-xl shadow-xl z-50 overflow-hidden">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSort(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#374151] transition-colors ${sortBy === opt ? 'text-[#7C3AED] font-medium' : 'text-[#9CA3AF]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="skeleton aspect-square" />
                <div className="p-3 space-y-2">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-[#374151] mx-auto mb-4" />
            <p className="text-[#6B7280] text-lg">Produk tidak ditemukan</p>
            <button
              onClick={() => { setActiveCategory('Semua'); setSearchQuery(''); }}
              className="mt-4 text-[#7C3AED] hover:underline"
            >
              Lihat semua produk
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      <div className="relative overflow-hidden">
        <img
          src={product.image || 'https://placehold.co/600x600/1F2937/374151?text=FXZ'}
          alt={product.name}
          loading="lazy"
          className="product-image"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#EF4444] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            DISKON {discount}%
          </span>
        )}
        {product.badge && (
          <span className={`absolute top-2 ${discount > 0 ? 'top-7' : ''} left-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
            product.badge === 'FLASH SALE' ? 'bg-[#F97316] text-white animate-pulse' :
            product.badge === 'BEST SELLER' ? 'bg-[#FACC15] text-black' :
            'bg-[#7C3AED] text-white'
          }`}>
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-[#F9FAFB] line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        <div className="mt-2">
          <span className="text-[#7C3AED] font-bold text-base">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[#6B7280] text-xs line-through ml-2">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[#FACC15] text-xs flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-current" /> {product.rating || 4.8}
          </span>
          <span className="text-[#6B7280] text-xs">
            {product.soldCount ? `${product.soldCount} terjual` : '100+ terjual'}
          </span>
        </div>
        <button className="w-full mt-3 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold rounded-lg transition-all hover:shadow-md active:scale-[0.98]">
          Beli
        </button>
      </div>
    </Link>
  );
}
