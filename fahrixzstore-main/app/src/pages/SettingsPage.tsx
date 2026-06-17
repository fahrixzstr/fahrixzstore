import { useState } from 'react';
import { useStore } from '@/stores/useStore';
import { User, CreditCard, Globe, Moon, Sun, Mail, Shield, Bell, Lock, Info, ChevronRight, Save } from 'lucide-react';

const languages = ['Indonesia', 'English', 'Melayu', '中文', '日本語', '한국어'];

export default function SettingsPage() {
  const { user, theme, setTheme } = useStore();
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState({ name: user?.displayName || '', username: '', email: user?.email || '', phone: user?.phoneNumber || '', bio: '' });
  const [selectedLang, setSelectedLang] = useState('Indonesia');
  const [twoFA, setTwoFA] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(true);
  const [profilePrivate, setProfilePrivate] = useState(false);

  const sections = [
    { key: 'profile', icon: User, label: 'Edit Profil' },
    { key: 'withdrawal', icon: CreditCard, label: 'Nomor Penarikan' },
    { key: 'language', icon: Globe, label: 'Bahasa' },
    { key: 'theme', icon: theme === 'dark' ? Moon : Sun, label: 'Tema' },
    { key: 'email', icon: Mail, label: 'Verifikasi Email' },
    { key: 'security', icon: Shield, label: 'Keamanan' },
    { key: 'notifications', icon: Bell, label: 'Notifikasi' },
    { key: 'privacy', icon: Lock, label: 'Privasi' },
    { key: 'about', icon: Info, label: 'Tentang' },
  ];

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Pengaturan</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="space-y-1">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                    activeSection === s.key ? 'bg-[#7C3AED] text-white' : 'text-[#9CA3AF] hover:bg-[#1F2937]'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {s.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            {activeSection === 'profile' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Edit Profil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#9CA3AF] mb-1 block">Nama</label>
                    <input className="input-field" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-[#9CA3AF] mb-1 block">Username</label>
                    <input className="input-field" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} placeholder="@username" />
                  </div>
                  <div>
                    <label className="text-sm text-[#9CA3AF] mb-1 block">Email</label>
                    <input className="input-field" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-[#9CA3AF] mb-1 block">No. Telepon</label>
                    <input className="input-field" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-sm text-[#9CA3AF] mb-1 block">Bio</label>
                    <textarea className="input-field min-h-[80px] resize-none" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="Ceritakan tentang diri Anda..." />
                  </div>
                  <button
                    onClick={() => useStore.getState().showToast('Profil disimpan!', 'success')}
                    className="flex items-center gap-2 px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold"
                  >
                    <Save className="w-4 h-4" /> Simpan Perubahan
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Bahasa</h3>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <label key={lang} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1F2937] cursor-pointer transition-colors">
                      <input type="radio" name="lang" checked={selectedLang === lang} onChange={() => setSelectedLang(lang)} className="accent-[#7C3AED]" />
                      <span className="text-sm">{lang}</span>
                    </label>
                  ))}
                </div>
                <button onClick={() => useStore.getState().showToast('Bahasa diperbarui!', 'success')} className="mt-4 px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold">Terapkan</button>
              </div>
            )}

            {activeSection === 'theme' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Tema</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setTheme('dark')} className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'dark' ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151]'}`}>
                    <Moon className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Dark Mode</p>
                  </button>
                  <button onClick={() => setTheme('light')} className={`p-4 rounded-xl border-2 text-center transition-all ${theme === 'light' ? 'border-[#7C3AED] bg-[#7C3AED]/10' : 'border-[#374151]'}`}>
                    <Sun className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Light Mode</p>
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'email' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Verifikasi Email</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#22C55E]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user?.email || 'email@example.com'}</p>
                    <p className="text-xs text-[#22C55E]">✓ Terverifikasi</p>
                  </div>
                </div>
                <button onClick={() => useStore.getState().showToast('Email verifikasi dikirim ulang!', 'success')} className="text-sm text-[#7C3AED] hover:underline">Kirim Ulang Email</button>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Keamanan</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-3 bg-[#1F2937] rounded-xl hover:bg-[#374151] transition-colors">
                    <span className="text-sm">Ubah Password</span>
                    <ChevronRight className="w-4 h-4 text-[#6B7280]" />
                  </button>
                  <label className="flex items-center justify-between p-3 bg-[#1F2937] rounded-xl cursor-pointer">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${twoFA ? 'bg-[#22C55E]' : 'bg-[#374151]'}`} onClick={() => setTwoFA(!twoFA)}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${twoFA ? 'left-5' : 'left-1'}`} />
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Notifikasi</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Email</span>
                    <input type="checkbox" checked={notifEmail} onChange={(e) => setNotifEmail(e.target.checked)} className="accent-[#7C3AED] w-5 h-5" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-sm">Push</span>
                    <input type="checkbox" checked={notifPush} onChange={(e) => setNotifPush(e.target.checked)} className="accent-[#7C3AED] w-5 h-5" />
                  </label>
                </div>
                <button onClick={() => useStore.getState().showToast('Notifikasi disimpan!', 'success')} className="mt-4 px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold">Simpan</button>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Privasi</h3>
                <label className="flex items-center justify-between">
                  <span className="text-sm">Profile Private</span>
                  <input type="checkbox" checked={profilePrivate} onChange={(e) => setProfilePrivate(e.target.checked)} className="accent-[#7C3AED] w-5 h-5" />
                </label>
              </div>
            )}

            {activeSection === 'about' && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Tentang</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[#9CA3AF]">Versi</span><span>v4.0.0</span></div>
                  <div className="flex justify-between"><span className="text-[#9CA3AF]">Developer</span><span>FahriXz Store</span></div>
                  <div className="flex justify-between"><span className="text-[#9CA3AF]">Platform</span><span>Web / PWA</span></div>
                </div>
              </div>
            )}

            {(activeSection === 'withdrawal') && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 animate-fadeInUp">
                <h3 className="font-bold mb-4">Nomor Penarikan</h3>
                <p className="text-sm text-[#9CA3AF] mb-4">Tambahkan rekening untuk penarikan saldo</p>
                <button onClick={() => useStore.getState().showToast('Fitur segera hadir', 'info')} className="px-6 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold">Tambah Rekening</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
