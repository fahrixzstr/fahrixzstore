import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Check, Smartphone, MessageSquare, Users, BarChart3, Shield, Zap, RefreshCw, Command, Star, Download } from 'lucide-react';

const categories = [
  { name: 'Script Bot', icon: Command },
  { name: 'Panel Bot', icon: Smartphone },
  { name: 'API Bot', icon: Zap },
  { name: 'Add-ons', icon: RefreshCw },
  { name: 'Subscription', icon: Star },
];

const products = [
  { name: 'Script Auto-Reply Premium', category: 'Script Bot', version: 'v2.5.1', tags: ['Baileys', 'Multi-Device'], price: 50000, originalPrice: 75000, rating: 4.9, downloads: 1200, image: '' },
  { name: 'Broadcast Manager Pro', category: 'Script Bot', version: 'v1.8.0', tags: ['API', 'Fast'], price: 35000, originalPrice: 50000, rating: 4.7, downloads: 800, image: '' },
  { name: 'Panel Bot Manager', category: 'Panel Bot', version: 'v3.0.0', tags: ['Web Panel', 'Multi-User'], price: 100000, originalPrice: 150000, rating: 4.8, downloads: 500, image: '' },
];

const features = [
  { icon: MessageSquare, title: 'Auto-Reply Cerdas', desc: 'Balas pesan otomatis dengan AI' },
  { icon: Users, title: 'Group Manager', desc: 'Kelola grup dengan mudah' },
  { icon: BarChart3, title: 'Analytics', desc: 'Lihat statistik penggunaan' },
  { icon: Shield, title: 'Anti-Banned', desc: 'Sistem keamanan canggih' },
  { icon: Zap, title: 'Fast Response', desc: 'Respons kurang dari 1 detik' },
  { icon: RefreshCw, title: 'Auto Backup', desc: 'Backup otomatis setiap hari' },
  { icon: Command, title: 'Custom Commands', desc: 'Buat perintah custom' },
  { icon: Smartphone, title: 'Multi-Device', desc: 'Support banyak perangkat' },
];

const subscriptions = [
  { name: 'FREE', desc: 'Akses terbatas, delay 5s, watermark', price: 0, features: ['Basic reply', '5s delay', 'Watermark'] },
  { name: 'PLUS', desc: 'Fitur dasar, delay 2s, no watermark', price: 25000, features: ['Full basic', '2s delay', 'No watermark', 'Basic support'] },
  { name: 'PRO', desc: 'Full fitur, instant, priority support', price: 75000, popular: true, features: ['All features', 'Instant reply', 'Priority support', 'API access', 'No watermark'] },
  { name: 'VIP', desc: 'Full access + premium scripts', price: 150000, features: ['Everything in PRO', 'Premium scripts', 'Panel access', 'Dedicated support'] },
];

export default function BotWhatsappPage() {
  const [activeCategory, setActiveCategory] = useState('Script Bot');
  const filtered = activeCategory === 'Script Bot' ? products : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <Bot className="w-12 h-12 text-[#22C55E] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Bot WhatsApp Marketplace</h1>
          <p className="text-[#9CA3AF]">Script bot, panel, dan API untuk automasi bisnis Anda</p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-2 mb-8 overflow-x-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${activeCategory === cat.name ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'}`}>
                <Icon className="w-4 h-4" /> {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filtered.map((p) => (
            <div key={p.name} className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden card-hover">
              <div className="aspect-[9/16] max-h-[200px] bg-gradient-to-br from-[#22C55E]/20 to-[#06B6D4]/20 flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-[#22C55E]/50" />
              </div>
              <div className="p-4">
                <span className="text-[10px] bg-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full">{p.version}</span>
                <h3 className="font-bold mt-2 mb-1">{p.name}</h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {p.tags.map((t) => <span key={t} className="text-[10px] bg-[#1F2937] px-2 py-0.5 rounded-full text-[#9CA3AF]">{t}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#7C3AED] font-bold">Rp {p.price.toLocaleString('id-ID')}</span>
                    <span className="text-xs text-[#6B7280] line-through ml-2">Rp {p.originalPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-[#FACC15] fill-current" /> {p.rating}</span>
                    <span className="flex items-center gap-0.5"><Download className="w-3 h-3" /> {p.downloads}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full mt-3 py-2 bg-[#22C55E] hover:bg-[#16A34A] text-white text-center rounded-lg text-sm font-semibold transition-all">Beli Script</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-center mb-6">Fitur Bot WhatsApp</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-[#111827] rounded-xl border border-[#374151] p-4 text-center">
                  <Icon className="w-8 h-8 text-[#22C55E] mx-auto mb-2" />
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-[#6B7280] mt-1">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subscriptions */}
        <div>
          <h2 className="text-xl font-bold text-center mb-6">Paket Langganan</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.name} className={`bg-[#111827] rounded-xl border p-4 text-center relative ${sub.popular ? 'border-[#7C3AED] neon-glow' : 'border-[#374151]'}`}>
                {sub.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 gradient-bg text-white text-[10px] font-bold rounded-full">Paling Populer</span>}
                <h3 className="font-bold text-lg mb-1">{sub.name}</h3>
                <p className="text-2xl font-bold text-[#7C3AED] mb-1">{sub.price === 0 ? 'FREE' : `Rp ${sub.price.toLocaleString('id-ID')}/bln`}</p>
                <p className="text-xs text-[#6B7280] mb-4">{sub.desc}</p>
                <ul className="text-left text-sm space-y-1 mb-4">
                  {sub.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-[#9CA3AF]"><Check className="w-3 h-3 text-[#22C55E] flex-shrink-0" /> {f}</li>
                  ))}
                </ul>
                <Link to="/checkout" className={`block w-full py-2 rounded-lg text-sm font-semibold ${sub.popular ? 'gradient-bg text-white' : 'bg-[#1F2937] hover:bg-[#374151]'}`}>
                  {sub.price === 0 ? 'Mulai' : 'Langganan'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
