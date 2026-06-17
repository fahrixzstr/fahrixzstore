import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, Check, Cpu, HardDrive, Wifi, Globe, Zap } from 'lucide-react';

const plans = [
  { name: 'VPS Basic', type: 'vps', ram: '1 GB', cpu: '1 Core', storage: '20 GB SSD', bandwidth: '1 TB', priceMonthly: 25000, priceYearly: 250000, popular: false, features: ['Full Root Access', '1 Gbps Network', 'DDoS Protection', '24/7 Support'] },
  { name: 'VPS Pro', type: 'vps', ram: '2 GB', cpu: '2 Core', storage: '40 GB SSD', bandwidth: '2 TB', priceMonthly: 50000, priceYearly: 500000, popular: true, features: ['Full Root Access', '1 Gbps Network', 'DDoS Protection', 'Priority Support', 'Backup Harian'] },
  { name: 'VPS Business', type: 'vps', ram: '4 GB', cpu: '4 Core', storage: '80 GB SSD', bandwidth: '5 TB', priceMonthly: 100000, priceYearly: 1000000, popular: false, features: ['Full Root Access', '10 Gbps Network', 'Advanced DDoS', 'Dedicated Support', 'Backup Harian', 'Monitoring'] },
  { name: 'Cloud Starter', type: 'cloud', ram: '2 GB', cpu: '2 Core', storage: '50 GB SSD', bandwidth: '2 TB', priceMonthly: 75000, priceYearly: 750000, popular: false, features: ['Auto Scaling', 'Load Balancer', '99.9% Uptime', '24/7 Support'] },
];

const categories = [
  { name: 'VPS', icon: Server },
  { name: 'Cloud', icon: Zap },
  { name: 'Domain', icon: Globe },
];

export default function HostingPage() {
  const [activeCategory, setActiveCategory] = useState('VPS');
  const [yearly, setYearly] = useState(false);

  const filtered = plans.filter((p) => p.type.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-8">
          <Server className="w-12 h-12 text-[#3B82F6] mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Hosting Premium</h1>
          <p className="text-[#9CA3AF]">Server berkualitas dengan performa tinggi dan uptime 99.9%</p>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-3 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button key={cat.name} onClick={() => setActiveCategory(cat.name)} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeCategory === cat.name ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'}`}>
                <Icon className="w-4 h-4" /> {cat.name}
              </button>
            );
          })}
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#1F2937] rounded-xl p-1 flex">
            <button onClick={() => setYearly(false)} className={`px-6 py-2 rounded-lg text-sm transition-all ${!yearly ? 'bg-[#374151] text-white' : 'text-[#9CA3AF]'}`}>Bulanan</button>
            <button onClick={() => setYearly(true)} className={`px-6 py-2 rounded-lg text-sm transition-all ${yearly ? 'bg-[#374151] text-white' : 'text-[#9CA3AF]'}`}>Tahunan <span className="text-[#22C55E] text-xs">Hemat 20%</span></button>
          </div>
        </div>

        {/* Plans */}
        <div className={`grid gap-6 ${filtered.length === 1 ? 'max-w-md mx-auto' : filtered.length === 2 ? 'md:grid-cols-2 max-w-2xl mx-auto' : 'md:grid-cols-3'}`}>
          {filtered.map((plan) => (
            <div key={plan.name} className={`bg-[#111827] rounded-2xl border p-6 relative ${plan.popular ? 'border-[#7C3AED] neon-glow' : 'border-[#374151]'}`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 gradient-bg text-white text-xs font-bold rounded-full">Paling Populer</span>}
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-[#7C3AED]">Rp {(yearly ? plan.priceYearly : plan.priceMonthly).toLocaleString('id-ID')}</span>
                <span className="text-sm text-[#6B7280]">/{yearly ? 'thn' : 'bln'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Cpu className="w-3 h-3" /> {plan.cpu}</div>
                <div className="flex items-center gap-1 text-xs text-[#9CA3AF]"><HardDrive className="w-3 h-3" /> {plan.ram}</div>
                <div className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Server className="w-3 h-3" /> {plan.storage}</div>
                <div className="flex items-center gap-1 text-xs text-[#9CA3AF]"><Wifi className="w-3 h-3" /> {plan.bandwidth}</div>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#9CA3AF]"><Check className="w-4 h-4 text-[#22C55E] flex-shrink-0" /> {f}</li>
                ))}
              </ul>
              <Link to="/checkout" className={`block w-full py-3 rounded-xl text-center font-semibold transition-all ${plan.popular ? 'gradient-bg text-white hover:shadow-lg' : 'bg-[#1F2937] hover:bg-[#374151]'}`}>
                Pilih Paket
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
