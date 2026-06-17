import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useStore } from '@/stores/useStore';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function Navbar() {
  const { user, isLoggedIn, isAdmin, cart, toggleKimmyMenu, incrementLogoClick, logoClickCount, lastLogoClickTime } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifCount, setNotifCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !auth.currentUser) return;
    const q = query(collection(db, 'notifications'), where('userId', '==', auth.currentUser.uid), where('read', '==', false));
    const unsub = onSnapshot(q, (snap) => setNotifCount(snap.size));
    return () => unsub();
  }, [isLoggedIn]);

  // Hidden admin entry: logo 10x click
  useEffect(() => {
    if (logoClickCount >= 10) {
      const now = Date.now();
      if (now - lastLogoClickTime <= 5000) {
        navigate('/vx-admin-login');
        useStore.getState().resetLogoClicks();
      }
    }
  }, [logoClickCount, lastLogoClickTime, navigate]);

  // Keyboard combo: Ctrl+Shift+A 3x
  useEffect(() => {
    let comboCount = 0;
    let lastComboTime = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        const now = Date.now();
        if (now - lastComboTime > 2000) comboCount = 0;
        comboCount++;
        lastComboTime = now;
        if (comboCount >= 3) {
          navigate('/vx-admin-login');
          comboCount = 0;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Left: Kimmy Menu + Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleKimmyMenu}
              className="p-2 rounded-lg hover:bg-[#1F2937] transition-colors lg:hidden"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5 text-[#9CA3AF]" />
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 select-none"
              onClick={incrementLogoClick}
              onContextMenu={(e) => { e.preventDefault(); navigate('/vx-admin-login'); }}
            >
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FXZ</span>
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:block">FahriXz Store</span>
            </Link>
          </div>

          {/* Center: Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Cari produk, hosting, bot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#1F2937] border border-[#374151] text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-all"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-[#6B7280] hover:text-[#F9FAFB]" />
                </button>
              )}
            </div>
          </form>

          {/* Right: Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg hover:bg-[#1F2937] transition-colors md:hidden"
            >
              <Search className="w-5 h-5 text-[#9CA3AF]" />
            </button>

            <Link to="/cart" className="p-2 rounded-lg hover:bg-[#1F2937] transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-[#9CA3AF]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#EF4444] rounded-full text-[10px] flex items-center justify-center font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-[#1F2937] transition-colors"
                >
                  {user?.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full border-2 border-[#7C3AED]" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
                {profileDropdown && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileDropdown(false)} />
                    <div className="absolute right-0 top-12 w-56 bg-[#1F2937] border border-[#374151] rounded-xl shadow-2xl z-50 animate-scaleIn overflow-hidden">
                      <div className="p-4 border-b border-[#374151]">
                        <p className="font-semibold text-sm truncate">{user?.displayName || 'User'}</p>
                        <p className="text-xs text-[#6B7280] truncate">{user?.email}</p>
                        {user?.balance !== undefined && (
                          <p className="text-xs text-[#7C3AED] font-semibold mt-1">
                            Saldo: Rp {user.balance.toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>
                      <div className="p-2">
                        <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-[#374151] text-sm transition-colors" onClick={() => setProfileDropdown(false)}>Profil</Link>
                        <Link to="/wallet" className="block px-3 py-2 rounded-lg hover:bg-[#374151] text-sm transition-colors" onClick={() => setProfileDropdown(false)}>Wallet</Link>
                        <Link to="/order-history" className="block px-3 py-2 rounded-lg hover:bg-[#374151] text-sm transition-colors" onClick={() => setProfileDropdown(false)}>Riwayat</Link>
                        <Link to="/settings" className="block px-3 py-2 rounded-lg hover:bg-[#374151] text-sm transition-colors" onClick={() => setProfileDropdown(false)}>Pengaturan</Link>
                        {isAdmin && (
                          <Link to="/admin/dashboard" className="block px-3 py-2 rounded-lg hover:bg-[#374151] text-sm text-[#7C3AED] transition-colors" onClick={() => setProfileDropdown(false)}>Admin Panel</Link>
                        )}
                        <hr className="my-1 border-[#374151]" />
                        <button
                          onClick={() => { useStore.getState().logout(); setProfileDropdown(false); }}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#EF4444]/20 text-sm text-[#EF4444] transition-colors"
                        >
                          Keluar
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-semibold transition-all hover:shadow-lg hover:shadow-purple-500/30">
                Masuk
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B0F1A]/95 animate-fadeInUp">
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex items-center gap-3">
              <Search className="w-5 h-5 text-[#6B7280]" />
              <input
                autoFocus
                type="text"
                placeholder="Cari produk, hosting, bot..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)}>
                <X className="w-6 h-6 text-[#9CA3AF]" />
              </button>
            </form>
            <div className="mt-6">
              <p className="text-xs text-[#6B7280] uppercase font-semibold mb-3">Trending</p>
              <div className="flex flex-wrap gap-2">
                {['#ScriptBot', '#VPSMurah', '#FlashSale', '#HostingPremium', '#MisiCuan'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSearchQuery(tag.replace('#', '')); }}
                    className="px-3 py-1.5 rounded-full bg-[#1F2937] text-sm text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
