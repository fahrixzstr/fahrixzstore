import { Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import {
  Gift, Ticket, ShoppingBasket, Settings, HelpCircle, Radio, Heart, LogOut,
  ChevronRight, Bot, MessageCircle, User, CreditCard
} from 'lucide-react';

const menuItems = [
  { icon: Gift, label: 'Acara', path: '/events', badge: 0 },
  { icon: Ticket, label: 'Voucher', path: '/voucher', badge: 0 },
  { icon: ShoppingBasket, label: 'Dibeli', path: '/purchases', badge: 0 },
  { icon: Settings, label: 'Pengaturan', path: '/settings', badge: 0 },
  { icon: HelpCircle, label: 'Pusat Bantuan', path: '#', badge: 0 },
  { icon: Radio, label: 'Saluran WhatsApp', path: 'https://wa.me/fahrixz', external: true, badge: 0 },
  { icon: Heart, label: 'Donasi', path: '/donation', badge: 0 },
];

export default function ProfilePage() {
  const { user, isLoggedIn, logout, toggleAiChat } = useStore();

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <User className="w-16 h-16 text-[#374151] mb-4" />
        <h2 className="text-xl font-bold mb-2">Belum Login</h2>
        <p className="text-[#6B7280] mb-6">Login untuk melihat profil Anda</p>
        <Link to="/login" className="btn-primary">Masuk</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Cover + Avatar */}
        <div className="relative mb-6">
          <div className="h-32 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
          <div className="absolute -bottom-10 left-6 flex items-end gap-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#0B0F1A] bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center overflow-hidden">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-white">{(user?.displayName || 'U')[0].toUpperCase()}</span>
              )}
            </div>
            <div className="mb-2">
              <h1 className="text-xl font-bold">{user?.displayName || 'User'}</h1>
              <p className="text-sm text-[#9CA3AF]">@{user?.email?.split('@')[0] || 'username'}</p>
            </div>
          </div>
        </div>

        {/* Balance + Actions */}
        <div className="mt-14 mb-6 bg-[#111827] rounded-xl border border-[#374151] p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-[#6B7280]">Total Saldo</p>
              <p className="text-2xl font-bold text-[#7C3AED]">Rp {(user?.balance || 0).toLocaleString('id-ID')}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/wallet" className="flex items-center justify-center gap-2 py-2.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-sm font-semibold transition-all">
              <CreditCard className="w-4 h-4" /> TOP UP
            </Link>
            <Link to="/missions" className="flex items-center justify-center gap-2 py-2.5 bg-[#1F2937] hover:bg-[#374151] text-[#F9FAFB] rounded-xl text-sm font-semibold transition-all border border-[#374151]">
              <CreditCard className="w-4 h-4" /> TARIK
            </Link>
          </div>
        </div>

        {/* Menu List */}
        <div className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <div className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#1F2937] transition-colors group ${i < menuItems.length - 1 ? 'border-b border-[#374151]' : ''}`}>
                <Icon className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#7C3AED] transition-colors" />
                <span className="flex-1 text-sm">{item.label}</span>
                {item.badge ? (
                  <span className="bg-[#7C3AED] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                ) : null}
                <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:translate-x-1 transition-transform" />
              </div>
            );
            return item.external ? (
              <a key={item.path} href={item.path} target="_blank" rel="noopener noreferrer">{content}</a>
            ) : (
              <Link key={item.path} to={item.path}>{content}</Link>
            );
          })}
        </div>

        {/* AI Customer Service */}
        <div className="mt-6 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20" />
          <div className="relative z-10 p-6 text-center">
            <Bot className="w-12 h-12 text-white mx-auto mb-3 animate-float" />
            <h3 className="font-bold text-white mb-2">Perlu Bantuan?</h3>
            <p className="text-sm text-white/80 mb-4">
              Customer Service AI cerdas kami siap menjawab semua pertanyaan Anda 24/7.
            </p>
            <button
              onClick={toggleAiChat}
              className="px-6 py-2.5 bg-white text-[#7C3AED] rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-white/20 transition-all flex items-center gap-2 mx-auto"
            >
              <MessageCircle className="w-4 h-4" /> Chat dengan AI Sekarang
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-6 flex items-center justify-center gap-2 py-3.5 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-xl transition-colors border border-[#EF4444]/20"
        >
          <LogOut className="w-5 h-5" /> Keluar
        </button>
      </div>
    </div>
  );
}
