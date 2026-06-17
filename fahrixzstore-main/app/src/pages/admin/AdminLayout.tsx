import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import {
  LayoutDashboard, Users, ShoppingBag, CreditCard, Target, Gift, Ticket, Heart,
  Settings, Shield, LogOut, Menu, X, Search
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

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, logout } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) navigate('/');
  }, [isAdmin, navigate]);

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
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${isActive ? 'bg-[#7C3AED]/20 text-[#7C3AED]' : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]'}`}>
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
            <h1 className="font-bold">{title}</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <span className="text-xs text-[#9CA3AF]">Online</span>
            </div>
          </div>
        </header>
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
