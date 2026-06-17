import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Zap, ChevronRight, Server, Bot, ShoppingBag, Wrench, Repeat } from 'lucide-react';

const ParticleCanvas = lazy(() => import('@/components/ParticleCanvas'));

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
  discount?: number;
  isFlashSale?: boolean;
}

export default function HomePage() {
  const { isLoggedIn } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState([
    { name: 'Digital', icon: ShoppingBag },
    { name: 'Hosting', icon: Server },
    { name: 'Bot', icon: Bot },
    { name: 'Jasa', icon: Wrench },
    { name: 'Subscription', icon: Repeat },
  ]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 59, seconds: 59 });

  // Fetch products
  useEffect(() => {
    const q = query(collection(db, 'products'), where('status', '==', 'active'), orderBy('createdAt', 'desc'), limit(20));
    const unsub = onSnapshot(q, (snap) => {
      const items: Product[] = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() } as Product));
      setProducts(items);
      setFlashSaleProducts(items.filter((p) => p.isFlashSale));
    });
    return () => unsub();
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = activeCategory === 'Semua' ? products : products.filter((p) => p.category === activeCategory);

  const banners = [
    { title: 'FahriXz Store', subtitle: 'Toko Digital Premium Indonesia', gradient: 'from-[#7C3AED] to-[#06B6D4]', cta: 'Jelajahi', link: '/catalog' },
    { title: 'FLASH SALE', subtitle: 'Diskon up to 50% - Jangan sampai kehabisan!', gradient: 'from-[#EF4444] to-[#F97316]', cta: 'Belanja Sekarang', link: '/catalog' },
    { title: 'Bot WhatsApp', subtitle: 'Automasi bisnis Anda dengan bot pintar', gradient: 'from-[#22C55E] to-[#06B6D4]', cta: 'Lihat Bot', link: '/bot-whatsapp' },
    { title: 'Hosting Premium', subtitle: 'VPS, Cloud & Domain dengan performa tinggi', gradient: 'from-[#3B82F6] to-[#7C3AED]', cta: 'Pilih Paket', link: '/hosting' },
  ];

  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveBanner((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => `Rp ${price.toLocaleString('id-ID')}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Particles */}
      <section className="relative h-[500px] overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-[#0B0F1A]" />}>
          <ParticleCanvas />
        </Suspense>
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">
              <span className="gradient-text">{banners[activeBanner].title}</span>
            </h1>
            <p className="text-lg md:text-xl text-[#9CA3AF] mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              {banners[activeBanner].subtitle}
            </p>
            <Link
              to={banners[activeBanner].link}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-bg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all animate-fadeInUp"
              style={{ animationDelay: '200ms' }}
            >
              {banners[activeBanner].cta}
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
        {/* Banner Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBanner(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeBanner ? 'bg-[#7C3AED] w-8' : 'bg-[#374151]'}`}
            />
          ))}
        </div>
      </section>

      {/* Flash Sale Section */}
      {flashSaleProducts.length > 0 && (
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-[#FACC15]" />
                <h2 className="text-xl font-bold text-[#FACC15]">Flash Sale</h2>
                <div className="flex items-center gap-1 ml-4">
                  <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-1 rounded">{String(countdown.hours).padStart(2, '0')}</span>
                  <span className="text-[#EF4444] font-bold">:</span>
                  <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-1 rounded">{String(countdown.minutes).padStart(2, '0')}</span>
                  <span className="text-[#EF4444] font-bold">:</span>
                  <span className="bg-[#EF4444] text-white text-xs font-bold px-2 py-1 rounded">{String(countdown.seconds).padStart(2, '0')}</span>
                </div>
              </div>
              <Link to="/catalog" className="text-sm text-[#7C3AED] hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {flashSaleProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <section className="py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('Semua')}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === 'Semua' ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.name ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Katalog Produk</h2>
            <Link to="/catalog" className="text-sm text-[#7C3AED] hover:underline flex items-center gap-1">
              Lihat Semua <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredProducts.slice(0, 15).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <ShoppingBag className="w-16 h-16 text-[#374151] mx-auto mb-4" />
              <p className="text-[#6B7280] text-lg">Belum ada produk dalam kategori ini</p>
              <p className="text-[#6B7280] text-sm mt-2">Produk akan muncul di sini setelah admin menambahkannya</p>
            </div>
          )}
        </div>
      </section>

      {/* Hosting Promo */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#1F2937] to-[#111827] rounded-2xl p-8 border border-[#374151] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Hosting Premium</h2>
                <p className="text-[#9CA3AF] mb-6">VPS, Cloud Server, & Domain dengan performa tinggi dan uptime 99.9%</p>
                <Link to="/hosting" className="btn-primary inline-flex items-center gap-2">
                  Lihat Paket Hosting
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                {['VPS Basic', 'VPS Pro', 'Cloud', 'Domain'].map((plan) => (
                  <div key={plan} className="bg-[#111827] border border-[#374151] rounded-xl p-4 w-32 text-center">
                    <Server className="w-8 h-8 text-[#3B82F6] mx-auto mb-2" />
                    <p className="text-sm font-semibold">{plan}</p>
                    <p className="text-xs text-[#6B7280] mt-1">Mulai</p>
                    <p className="text-sm font-bold text-[#7C3AED]">Rp 25K</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bot WhatsApp Promo */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#1F2937] to-[#111827] rounded-2xl p-8 border border-[#374151] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Bot WhatsApp Marketplace</h2>
                <p className="text-[#9CA3AF] mb-6">Script bot, panel bot, dan API bot untuk automasi bisnis Anda</p>
                <Link to="/bot-whatsapp" className="btn-primary inline-flex items-center gap-2">
                  Jelajahi Bot
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex gap-3">
                {['Auto-Reply', 'Broadcast', 'Group Manager', 'Analytics'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 bg-[#111827] border border-[#374151] rounded-lg px-4 py-2">
                    <Bot className="w-4 h-4 text-[#22C55E]" />
                    <span className="text-xs font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Customer Service CTA */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="gradient-bg rounded-2xl p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20" />
            <div className="relative z-10">
              <Bot className="w-16 h-16 text-white mx-auto mb-4 animate-float" />
              <h2 className="text-2xl font-bold text-white mb-3">Perlu Bantuan?</h2>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">
                Customer Service AI cerdas kami siap menjawab semua pertanyaan Anda 24/7.
                Tanyakan tentang produk, order, akun, atau masalah teknis lainnya.
              </p>
              <button
                onClick={() => useStore.getState().toggleAiChat()}
                className="px-8 py-3 bg-white text-[#7C3AED] rounded-xl font-semibold hover:shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-1"
              >
                Chat dengan AI Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[#374151]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#6B7280] text-sm">
            © 2025 FahriXz Store. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 mt-3">
            <Link to="/privacy" className="text-xs text-[#6B7280] hover:text-[#9CA3AF]">Privacy Policy</Link>
            <Link to="/privacy" className="text-xs text-[#6B7280] hover:text-[#9CA3AF]">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product, compact }: { product: Product; compact?: boolean }) {
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className={`product-card ${compact ? 'min-w-[180px] snap-start' : ''}`}>
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
            product.badge === 'FLASH SALE' ? 'bg-[#F97316] text-white' :
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
          <span className="text-[#FACC15] text-xs">★ {product.rating || 4.8}</span>
          <span className="text-[#6B7280] text-xs">
            {product.soldCount ? `${product.soldCount} terjual` : '100+ terjual'}
          </span>
        </div>
      </div>
    </Link>
  );
}
