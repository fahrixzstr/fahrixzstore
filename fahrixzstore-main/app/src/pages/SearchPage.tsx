import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, TrendingUp, Clock, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  rating: number;
  soldCount: number;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryText, setQueryText] = useState(searchParams.get('q') || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('searchHistory') || '[]'); } catch { return []; }
  });

  const trending = ['#ScriptBot', '#VPSMurah', '#FlashSale', '#HostingPremium', '#MisiCuan', '#BotWhatsApp'];

  useEffect(() => {
    const q = query(collection(db, 'products'), where('status', '==', 'active'));
    const unsub = onSnapshot(q, (snap) => {
      const items: Product[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Product));
      setProducts(items);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setQueryText(q);
      doSearch(q);
    }
  }, [searchParams]);

  const doSearch = (term: string) => {
    setLoading(true);
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.category.toLowerCase().includes(term.toLowerCase())
    );
    setResults(filtered);
    setLoading(false);

    if (term && !history.includes(term)) {
      const updated = [term, ...history].slice(0, 10);
      setHistory(updated);
      localStorage.setItem('searchHistory', JSON.stringify(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryText.trim()) {
      setSearchParams({ q: queryText.trim() });
      doSearch(queryText.trim());
    }
  };

  const clearHistory = () => { setHistory([]); localStorage.removeItem('searchHistory'); };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto">
        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            autoFocus
            type="text"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Cari produk, hosting, bot..."
            className="w-full h-14 pl-12 pr-12 rounded-2xl bg-[#1F2937] border border-[#374151] text-lg text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED]"
          />
          {queryText && (
            <button type="button" onClick={() => { setQueryText(''); setResults([]); }} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-5 h-5 text-[#6B7280]" />
            </button>
          )}
        </form>

        {/* Trending Tags */}
        {!queryText && (
          <div className="mb-6 animate-fadeInUp">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-medium">Sedang Trending</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trending.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { setQueryText(tag.replace('#', '')); setSearchParams({ q: tag.replace('#', '') }); }}
                  className="px-4 py-2 rounded-full bg-[#1F2937] text-sm text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search History */}
        {!queryText && history.length > 0 && (
          <div className="mb-6 animate-fadeInUp">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-sm font-medium">Riwayat Pencarian</span>
              </div>
              <button onClick={clearHistory} className="text-xs text-[#EF4444] hover:underline">Hapus</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((h) => (
                <button
                  key={h}
                  onClick={() => { setQueryText(h); setSearchParams({ q: h }); }}
                  className="px-3 py-1.5 rounded-lg bg-[#1F2937] text-sm text-[#9CA3AF] hover:bg-[#374151] transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {(queryText || results.length > 0) && (
          <div className="animate-fadeInUp">
            {loading ? (
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}><div className="skeleton aspect-square rounded-xl" /><div className="skeleton h-4 w-3/4 mt-2" /></div>
                ))}
              </div>
            ) : results.length > 0 ? (
              <div>
                <p className="text-sm text-[#6B7280] mb-4">{results.length} hasil untuk "{queryText}"</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {results.map((p) => (
                    <Link key={p.id} to={`/product/${p.id}`} className="product-card">
                      <img src={p.image || 'https://placehold.co/600x600/1F2937/374151?text=FXZ'} alt={p.name} className="product-image" />
                      <div className="p-3">
                        <h3 className="text-sm font-medium line-clamp-2">{p.name}</h3>
                        <p className="text-[#7C3AED] font-bold mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-[#374151] mx-auto mb-4" />
                <p className="text-[#6B7280] text-lg">Produk tidak ditemukan</p>
                <p className="text-[#6B7280] text-sm mt-2">Coba kata kunci lain</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
