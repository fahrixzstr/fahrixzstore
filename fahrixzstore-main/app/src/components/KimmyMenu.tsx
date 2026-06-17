import { Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import {
  Home, ShoppingBag, Server, Bot, Target, History, Heart,
  Search, Settings, Gift, Ticket, ShoppingBasket, MessageCircle,
  HelpCircle, Info, LogOut, X, Radio
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Beranda', path: '/' },
  { icon: ShoppingBag, label: 'Katalog', path: '/catalog' },
  { icon: Server, label: 'Hosting', path: '/hosting' },
  { icon: Bot, label: 'Bot WhatsApp', path: '/bot-whatsapp' },
  { icon: Target, label: 'Misi Cuan', path: '/missions' },
  { icon: History, label: 'Riwayat', path: '/purchases' },
  { icon: Heart, label: 'Donasi', path: '/donation' },
  { icon: Search, label: 'Track ID', path: '/track' },
  { icon: Settings, label: 'Pengaturan', path: '/settings' },
  { icon: Gift, label: 'Acara', path: '/events' },
  { icon: Ticket, label: 'Voucher', path: '/voucher' },
  { icon: ShoppingBasket, label: 'Dibeli', path: '/purchases' },
  { icon: Radio, label: 'Saluran WA', path: 'https://wa.me/fahrixz' },
  { icon: HelpCircle, label: 'Pusat Bantuan', path: '#' },
  { icon: Info, label: 'Tentang', path: '#' },
];

export default function KimmyMenu() {
  const { kimmyMenuOpen, setKimmyMenuOpen, user, isLoggedIn, toggleKimmyMenu, logout } = useStore();

  if (!kimmyMenuOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]" onClick={() => setKimmyMenuOpen(false)} />
      <aside className="fixed top-0 left-0 bottom-0 w-72 bg-[#111827] border-r border-[#374151] z-[80] animate-slideInLeft overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#374151]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FXZ</span>
            </div>
            <span className="font-bold gradient-text">FahriXz Store</span>
          </div>
          <button onClick={() => setKimmyMenuOpen(false)} className="p-1 rounded-lg hover:bg-[#374151]">
            <X className="w-5 h-5 text-[#9CA3AF]" />
          </button>
        </div>

        {/* User Info */}
        {isLoggedIn && user && (
          <div className="p-4 border-b border-[#374151]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {(user.displayName || 'U')[0].toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.displayName || 'User'}</p>
                <p className="text-xs text-[#7C3AED] font-semibold">
                  Rp {(user.balance || 0).toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isExternal = item.path.startsWith('http');
            return isExternal ? (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-all group"
                onClick={() => setKimmyMenuOpen(false)}
              >
                <Icon className="w-5 h-5 group-hover:text-[#7C3AED] transition-colors" />
                <span className="text-sm">{item.label}</span>
              </a>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#1F2937] text-[#9CA3AF] hover:text-[#F9FAFB] transition-all group"
                onClick={() => setKimmyMenuOpen(false)}
              >
                <Icon className="w-5 h-5 group-hover:text-[#7C3AED] transition-colors" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        {isLoggedIn && (
          <div className="p-2 mt-auto border-t border-[#374151]">
            <button
              onClick={() => { logout(); setKimmyMenuOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#EF4444]/20 text-[#EF4444] transition-all w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm">Keluar</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
