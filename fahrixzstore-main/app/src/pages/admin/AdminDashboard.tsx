import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  LayoutDashboard, Users, ShoppingBag, CreditCard, Target, Gift, Ticket, Heart,
  Settings, Shield, LogOut, Menu, X, ArrowUpRight
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Produk', path: '/admin/products' },
  { icon: CreditCard, label: 'Order', path: '/admin/orders' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: Target, label: 'Misi', path: '/admin/missions' },
  { icon: Heart, label: 'Donasi', path: '/admin/donations' },
  { icon: Gift, label: 'Acara', path: '/admin/events' },
  { icon: Ticket, label: 'Voucher', path: '/admin/vouchers' },
  { icon: Settings, label: 'Pengaturan', path: '/admin/settings' },
  { icon: Shield, label: 'Security', path: '/admin/security' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, logout } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ users: 0, orders: 0, revenue: 0, products: 0, missions: 0, donations: 0 });

  useEffect(() => {
    if (!isAdmin) { navigate('/'); return; }
    const unsubUsers = onSnapshot(collection(db, 'users'), (s) => setStats((p) => ({ ...p, users: s.size })));
    const unsubOrders = onSnapshot(collection(db, 'orders'), (s) => setStats((p) => ({ ...p, orders: s.size })));
    const unsubProducts = onSnapshot(collection(db, 'products'), (s) => setStats((p) => ({ ...p, products: s.size })));
    const unsubMissions = onSnapshot(collection(db, 'missions'), (s) => setStats((p) => ({ ...p, missions: s.size })));
    const unsubDonations = onSnapshot(collection(db, 'donations'), (s) => {
      setStats((p) => ({ ...p, donations: s.size }));
      let rev = 0; s.forEach((d) => { rev += d.data().amount || 0; });
      setStats((p) => ({ ...p, revenue: rev }));
    });
    return () => { unsubUsers(); unsubOrders(); unsubProducts(); unsubMissions(); unsubDonations(); };
  }, [isAdmin, navigate]);

  const kpiCards = [
    { label: 'Total Users', value: stats.users.toLocaleString('id-ID'), icon: Users, color: 'from-[#3B82F6] to-[#06B6D4]' },
    { label: 'Total Revenue', value: `Rp ${stats.revenue.toLocaleString('id-ID')}`, icon: CreditCard, color: 'from-[#22C55E] to-[#06B6D4]' },
    { label: 'Total Orders', value: stats.orders.toLocaleString('id-ID'), icon: ShoppingBag, color: 'from-[#7C3AED] to-[#3B82F6]' },
    { label: 'Products', value: stats.products.toLocaleString('id-ID'), icon: ShoppingBag, color: 'from-[#F97316] to-[#FACC15]' },
    { label: 'Active Missions', value: stats.missions.toLocaleString('id-ID'), icon: Target, color: 'from-[#EF4444] to-[#F97316]' },
    { label: 'Donations', value: stats.donations.toLocaleString('id-ID'), icon: Heart, color: 'from-[#EC4899] to-[#7C3AED]' },
  ];

  return (
    <div className="min-h-screen flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] border-r border-[#374151] transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-[#374151]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EF4444] flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm">Admin Panel</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X className="w-5 h-5" /></button>
        </div>
        <nav className="p-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-colors text-sm">
                <Icon className="w-4 h-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-[#374151]">
          <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#EF4444]/20 text-[#EF4444] transition-colors text-sm w-full">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 glass-nav border-b border-[#374151] px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-[#1F2937]"><Menu className="w-5 h-5" /></button>
          <div className="flex items-center justify-between flex-1">
            <h1 className="font-bold">Dashboard</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-[#9CA3AF]">Online</span>
            </div>
          </div>
        </header>

        <div className="p-4 grid grid-cols-2 lg:grid-cols-3 gap-4">
          {kpiCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-[#111827] rounded-xl border border-[#374151] p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="flex items-center gap-0.5 text-xs text-[#22C55E]"><ArrowUpRight className="w-3 h-3" /> +12%</span>
                </div>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-xs text-[#6B7280]">{card.label}</p>
              </div>
            );
          })}
        </div>

        <div className="px-4 pb-4">
          <div className="bg-[#111827] rounded-xl border border-[#374151] p-4">
            <h3 className="font-bold mb-3">Aksi Cepat</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/admin/products" className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-lg text-sm transition-colors">+ Tambah Produk</Link>
              <Link to="/admin/missions" className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] rounded-lg text-sm transition-colors">+ Tambah Misi</Link>
              <Link to="/admin/events" className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] rounded-lg text-sm transition-colors">+ Buat Acara</Link>
              <Link to="/admin/vouchers" className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] rounded-lg text-sm transition-colors">+ Buat Voucher</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
