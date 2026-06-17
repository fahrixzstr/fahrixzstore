import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, updateDoc, increment } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { Target, Clock, Filter, HelpCircle, Copy, Users, TrendingUp, Gift, ChevronRight, X, CheckCircle, AlertCircle } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  reward: number;
  estimated_time: string;
  status: string;
  taken_count: number;
  quota: number;
  type: string;
}

interface UserMission {
  id: string;
  mission_id: string;
  status: string;
  progress: number;
  started_at: any;
  completed_at: any;
}

const categories = ['Semua', 'Registrasi', 'Download', 'Game', 'Survey', 'Medsos', 'Review', 'Pinjaman', 'Pengguna Baru'];
const categoryIcons: Record<string, string> = { Registrasi: '✏️', Download: '📥', Game: '🎮', Survey: '📋', Medsos: '📱', Review: '⭐', Pinjaman: '💰', 'Pengguna Baru': '👤' };
const categoryColors: Record<string, string> = { Registrasi: 'bg-blue-500', Download: 'bg-green-500', Game: 'bg-purple-500', Survey: 'bg-yellow-500', Medsos: 'bg-pink-500', Review: 'bg-orange-500', Pinjaman: 'bg-red-500', 'Pengguna Baru': 'bg-cyan-500' };

const statusColors: Record<string, string> = {
  not_started: 'bg-[#6B7280]',
  in_progress: 'bg-[#FACC15]',
  completed: 'bg-[#22C55E]',
  claimed: 'bg-[#22C55E]',
  expired: 'bg-[#EF4444]',
  rejected: 'bg-[#EF4444]',
};

const statusLabels: Record<string, string> = {
  not_started: 'Belum Dikerjakan',
  in_progress: 'Proses',
  completed: 'Berhasil',
  claimed: 'Sudah Claim',
  expired: 'Kadaluarsa',
  rejected: 'Ditolak',
};

export default function MissionsPage() {
  const { user, isLoggedIn, showToast } = useStore();
  const [activeTab, setActiveTab] = useState('tersedia');
  const [missions, setMissions] = useState<Mission[]>([]);
  const [userMissions, setUserMissions] = useState<UserMission[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [showFAQ, setShowFAQ] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState('dana');
  const [withdrawAccount, setWithdrawAccount] = useState('');
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);
  const [tickerData, setTickerData] = useState<any[]>([]);
  const [referralCode, setReferralCode] = useState('');
  const [bannerIndex, setBannerIndex] = useState(0);
  const [userSubTab, setUserSubTab] = useState('Semua');

  // Fetch missions
  useEffect(() => {
    const q = query(collection(db, 'missions'), where('status', '==', 'active'));
    const unsub = onSnapshot(q, (snap) => {
      const items: Mission[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Mission));
      setMissions(items);
    });
    return () => unsub();
  }, []);

  // Fetch user missions
  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'user_missions'), where('user_id', '==', auth.currentUser.uid));
    const unsub = onSnapshot(q, (snap) => {
      const items: UserMission[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as UserMission));
      setUserMissions(items);
    });
    return () => unsub();
  }, []);

  // Real-time reward ticker
  useEffect(() => {
    const q = query(collection(db, 'completed_missions_public'));
    const unsub = onSnapshot(q, (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push(d.data()));
      setTickerData(items);
    });
    return () => unsub();
  }, []);

  // Banner auto-slide
  useEffect(() => {
    const interval = setInterval(() => setBannerIndex((prev) => (prev + 1) % 4), 5000);
    return () => clearInterval(interval);
  }, []);

  const banners = [
    { title: 'Misi Survey 2x Reward!', desc: 'Kerjakan misi survey hari ini dan dapatkan 2x reward!', gradient: 'from-[#7C3AED] to-[#06B6D4]' },
    { title: 'Event Ramadhan', desc: 'Reward besar menunggu Anda selama bulan Ramadhan!', gradient: 'from-[#22C55E] to-[#06B6D4]' },
    { title: 'Cara cepat menyelesaikan misi', desc: 'Tips dan trik dari para top earner', gradient: 'from-[#F97316] to-[#FACC15]' },
    { title: 'Misi baru setiap hari!', desc: 'Jangan lewatkan misi terbaru dengan reward menarik', gradient: 'from-[#3B82F6] to-[#7C3AED]' },
  ];

  const filteredMissions = activeCategory === 'Semua' ? missions : missions.filter((m) => m.category === activeCategory);
  const missionBalance = user?.balance || 0;

  const takeMission = async (missionId: string) => {
    if (!auth.currentUser) { showToast('Silakan login terlebih dahulu', 'warning'); return; }
    try {
      await addDoc(collection(db, 'user_missions'), {
        user_id: auth.currentUser.uid,
        mission_id: missionId,
        status: 'not_started',
        progress: 0,
        started_at: serverTimestamp(),
        created_at: serverTimestamp(),
      });
      showToast('Misi berhasil diambil!', 'success');
      setActiveTab('diambil');
    } catch {
      showToast('Gagal mengambil misi', 'error');
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount < 50000) {
      setShowWithdrawPopup(true);
      return;
    }
    showToast('Penarikan berhasil diajukan! Diproses dalam 3 hari kerja.', 'success');
  };

  const faqItems = [
    { q: 'Bagaimana cara mengerjakan misi?', a: 'Pilih misi yang tersedia, klik AMBIL, ikuti instruksi yang diberikan, dan submit bukti pengerjaan.' },
    { q: 'Berapa lama validasi misi?', a: 'Validasi biasanya memakan waktu 1-3 hari kerja tergantung jenis misi.' },
    { q: 'Kenapa misi saya ditolak?', a: 'Misi bisa ditolak jika bukti tidak valid, curang, atau tidak sesuai ketentuan.' },
    { q: 'Bagaimana cara tarik saldo?', a: 'Pergi ke tab TARIK, pilih nominal dan metode penarikan, lalu klik TARIK SEKARANG.' },
    { q: 'Minimal penarikan berapa?', a: 'Minimal penarikan adalah Rp 50,000.' },
    { q: 'Apa itu kode referral?', a: 'Kode referral adalah kode unik Anda untuk mengajak teman dan mendapatkan reward.' },
    { q: 'Bagaimana cara undang teman?', a: 'Bagikan kode referral Anda di tab BONUS. Teman akan mendapatkan reward saat mendaftar!' },
  ];

  const openFAQ = () => setShowFAQ(true);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Top Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-[#7C3AED]" />
              <h1 className="text-xl font-bold">Misi Cuan</h1>
            </div>
            <p className="text-sm text-[#9CA3AF] mt-1">Saldo: <span className="text-[#7C3AED] font-bold">Rp {missionBalance.toLocaleString('id-ID')}</span></p>
          </div>
          <div className="flex gap-2">
            <button onClick={openFAQ} className="p-2 rounded-lg hover:bg-[#1F2937] transition-colors">
              <HelpCircle className="w-5 h-5 text-[#9CA3AF]" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#1F2937] rounded-xl p-1 mb-6 overflow-x-auto">
          {[
            { key: 'tersedia', label: 'Misi Tersedia' },
            { key: 'diambil', label: 'Sudah Diambil' },
            { key: 'tarik', label: 'Tarik' },
            { key: 'riwayat', label: 'Riwayat' },
            { key: 'bonus', label: 'Bonus' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-1 ${
                activeTab === tab.key ? 'gradient-bg text-white' : 'text-[#9CA3AF] hover:text-[#F9FAFB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Real-time Reward Ticker */}
        {tickerData.length > 0 && (
          <div className="relative overflow-hidden bg-[#1F2937] rounded-xl border border-[#374151] py-2 px-4 mb-6">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1F2937] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1F2937] to-transparent z-10" />
            <div className="marquee-track whitespace-nowrap">
              {[...tickerData, ...tickerData].map((item, i) => (
                <span key={i} className="inline-block mx-4 text-sm text-[#9CA3AF]">
                  🎉 {item.user_name || 'User'} baru saja mendapat Rp {(item.reward_amount || 0).toLocaleString('id-ID')} dari {item.mission_name || 'misi'}!
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'tersedia' && (
          <div className="animate-fadeInUp">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    activeCategory === cat ? 'bg-[#7C3AED] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mission Cards */}
            <div className="space-y-3">
              {filteredMissions.length === 0 ? (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-[#374151] mx-auto mb-3" />
                  <p className="text-[#6B7280]">Tidak ada misi tersedia saat ini</p>
                </div>
              ) : (
                filteredMissions.map((mission) => (
                  <div key={mission.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${categoryColors[mission.category] || 'bg-[#7C3AED]'} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {categoryIcons[mission.category] || '🎯'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{mission.title}</h3>
                      <p className="text-xs text-[#9CA3AF] line-clamp-1">{mission.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] bg-[#1F2937] px-2 py-0.5 rounded-full text-[#9CA3AF]">{mission.category}</span>
                        <span className="text-[10px] text-[#6B7280] flex items-center gap-1"><Clock className="w-3 h-3" />{mission.estimated_time || '5 menit'}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[#7C3AED] font-bold text-sm">Rp {mission.reward.toLocaleString('id-ID')}</p>
                      <button
                        onClick={() => takeMission(mission.id)}
                        className="mt-1 px-4 py-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold rounded-lg transition-all"
                      >
                        AMBIL
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'diambil' && (
          <div className="animate-fadeInUp">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
              {['Semua', 'Belum Dikerjakan', 'Proses', 'Berhasil', 'Kadaluarsa', 'Ditolak'].map((s) => (
                <button key={s} onClick={() => setUserSubTab(s)} className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${userSubTab === s ? 'bg-[#7C3AED] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'}`}>{s}</button>
              ))}
            </div>
            {userMissions.length === 0 ? (
              <div className="text-center py-12">
                <Target className="w-12 h-12 text-[#374151] mx-auto mb-3" />
                <p className="text-[#6B7280]">Belum ada misi yang diambil</p>
              </div>
            ) : (
              userMissions.map((um) => {
                const mission = missions.find((m) => m.id === um.mission_id);
                if (!mission) return null;
                const stLabel = statusLabels[um.status] || um.status;
                return (
                  <div key={um.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${categoryColors[mission.category] || 'bg-[#7C3AED]'} flex items-center justify-center`}>
                        {categoryIcons[mission.category] || '🎯'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{mission.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full text-white ${statusColors[um.status] || 'bg-[#6B7280]'}`}>{stLabel}</span>
                      </div>
                      <p className="text-[#7C3AED] font-bold text-sm">Rp {mission.reward.toLocaleString('id-ID')}</p>
                    </div>
                    {um.status === 'in_progress' && (
                      <div className="mt-3">
                        <div className="w-full h-2 bg-[#1F2937] rounded-full overflow-hidden">
                          <div className="h-full bg-[#7C3AED] rounded-full transition-all" style={{ width: `${um.progress}%` }} />
                        </div>
                        <p className="text-xs text-[#6B7280] mt-1">{um.progress}% selesai</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'tarik' && (
          <div className="animate-fadeInUp">
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-[#1F2937] rounded-xl">
                  <p className="text-xs text-[#6B7280]">Saldo Sekarang</p>
                  <p className="text-lg font-bold text-[#7C3AED]">Rp {missionBalance.toLocaleString('id-ID')}</p>
                </div>
                <div className="text-center p-3 bg-[#1F2937] rounded-xl">
                  <p className="text-xs text-[#6B7280]">Min. Penarikan</p>
                  <p className="text-lg font-bold text-[#22C55E]">Rp 50,000</p>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Nominal Penarikan</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[50000, 100000, 250000, 500000].map((n) => (
                    <button key={n} onClick={() => setWithdrawAmount(n)} className={`py-2 rounded-lg text-sm font-medium transition-all ${withdrawAmount === n ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'}`}>
                      Rp {n.toLocaleString('id-ID')}
                    </button>
                  ))}
                </div>
                <input type="number" placeholder="Nominal custom" value={withdrawAmount || ''} onChange={(e) => setWithdrawAmount(Number(e.target.value))} className="input-field" />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Metode Penarikan</label>
                <div className="grid grid-cols-3 gap-2">
                  {['DANA', 'GoPay', 'Bank Transfer'].map((m) => (
                    <button key={m} onClick={() => setWithdrawMethod(m.toLowerCase())} className={`py-2 rounded-lg text-sm transition-all ${withdrawMethod === m.toLowerCase() ? 'bg-[#7C3AED] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'}`}>{m}</button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-2 block">Nomor Rekening/E-Wallet</label>
                <input type="text" placeholder="Contoh: 08123456789" value={withdrawAccount} onChange={(e) => setWithdrawAccount(e.target.value)} className="input-field" />
              </div>

              <p className="text-xs text-[#6B7280] mb-4">ℹ️ Saldo akan diproses dalam 3 hari kerja</p>

              <button onClick={handleWithdraw} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                TARIK SEKARANG
              </button>
            </div>
          </div>
        )}

        {activeTab === 'riwayat' && (
          <div className="animate-fadeInUp">
            <div className="space-y-3">
              {userMissions.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-12 h-12 text-[#374151] mx-auto mb-3" />
                  <p className="text-[#6B7280]">Belum ada riwayat</p>
                </div>
              ) : (
                userMissions.map((um) => {
                  const mission = missions.find((m) => m.id === um.mission_id);
                  if (!mission) return null;
                  return (
                    <div key={um.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#1F2937] flex items-center justify-center">
                          {categoryIcons[mission.category] || '🎯'}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{mission.title}</p>
                          <p className="text-xs text-[#6B7280]">Rp {mission.reward.toLocaleString('id-ID')}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full text-white ${statusColors[um.status] || 'bg-[#6B7280]'}`}>
                        {statusLabels[um.status] || um.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'bonus' && (
          <div className="animate-fadeInUp">
            <div className="bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 rounded-xl border border-[#7C3AED]/30 p-6 mb-6">
              <h3 className="font-bold text-lg mb-1">Bonus Undang Teman</h3>
              <p className="text-sm text-[#9CA3AF] mb-4">Dapatkan reward tambahan dengan mengajak teman!</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3"><Users className="w-5 h-5 text-[#7C3AED]" /> <span className="text-sm">Undang Teman mendaftar → <strong className="text-[#22C55E]">Rp 2,000</strong></span></div>
                <div className="flex items-center gap-3"><Gift className="w-5 h-5 text-[#7C3AED]" /> <span className="text-sm">Teman Belanja → <strong className="text-[#22C55E]">Rp 2,500</strong></span></div>
                <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 text-[#7C3AED]" /> <span className="text-sm">Teman Belanja + Misi → <strong className="text-[#22C55E]">Rp 5,000</strong></span></div>
                <div className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-[#7C3AED]" /> <span className="text-sm">Pengguna Baru pakai kode → <strong className="text-[#22C55E]">Rp 1,500</strong></span></div>
              </div>
            </div>

            {/* Referral Code */}
            <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 mb-6">
              <label className="text-sm font-medium mb-2 block">Kode Referral Anda</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#1F2937] border border-[#374151] rounded-xl px-4 py-3 text-sm font-mono text-[#9CA3AF]">
                  {user?.referralCode || 'FXZ-XXXXXX'}
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(user?.referralCode || ''); showToast('Kode disalin!', 'success'); }}
                  className="px-4 py-3 bg-[#374151] rounded-xl hover:bg-[#4B5563] transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input Referral */}
            {!user?.referralCode && (
              <div className="bg-[#111827] rounded-xl border border-[#374151] p-6">
                <p className="text-sm text-[#9CA3AF] mb-2">Punya kode referral?</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Masukkan kode" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} className="input-field flex-1" />
                  <button className="px-4 py-2 bg-[#7C3AED] rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors">Gunakan</button>
                </div>
                <p className="text-xs text-[#22C55E] mt-2">Dapatkan Rp 1,500 langsung!</p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-8 relative bg-gradient-to-r rounded-2xl overflow-hidden h-32 md:h-40">
          <div className={`absolute inset-0 bg-gradient-to-r ${banners[bannerIndex].gradient} opacity-90`} />
          <div className="relative z-10 flex flex-col justify-center h-full px-6">
            <h3 className="font-bold text-lg text-white">{banners[bannerIndex].title}</h3>
            <p className="text-sm text-white/80">{banners[bannerIndex].desc}</p>
          </div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {banners.map((_, i) => (
              <button key={i} onClick={() => setBannerIndex(i)} className={`w-2 h-2 rounded-full transition-all ${i === bannerIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Withdraw Popup */}
      {showWithdrawPopup && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-sm w-full mx-4 animate-scaleIn">
            <div className="flex items-center gap-2 text-[#FACC15] mb-3">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-lg">Saldo Belum Cukup!</h3>
            </div>
            <p className="text-sm text-[#9CA3AF] mb-2">Minimal penarikan saldo adalah Rp 50,000.</p>
            <p className="text-sm mb-4">Saldo Anda saat ini: <span className="text-[#7C3AED] font-bold">Rp {missionBalance.toLocaleString('id-ID')}</span></p>
            <div className="flex gap-3">
              <button onClick={() => setShowWithdrawPopup(false)} className="flex-1 py-2.5 border border-[#374151] rounded-xl text-sm hover:bg-[#1F2937]">Ganti Nominal</button>
              <Link to="/missions" onClick={() => { setShowWithdrawPopup(false); setActiveTab('tersedia'); }} className="flex-1 py-2.5 gradient-bg text-white rounded-xl text-sm font-semibold text-center">Ikuti Misi</Link>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">FAQ - Misi Cuan</h3>
              <button onClick={() => setShowFAQ(false)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <details key={i} className="bg-[#1F2937] rounded-lg p-3 group">
                  <summary className="flex items-center justify-between cursor-pointer font-medium text-sm">
                    {item.q}
                    <ChevronRight className="w-4 h-4 text-[#6B7280] group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="text-sm text-[#9CA3AF] mt-2 pl-1">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
