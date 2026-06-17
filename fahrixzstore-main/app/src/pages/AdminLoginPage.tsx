import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, ADMIN_EMAIL } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import { Shield, Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';

// Captcha Puzzle
function CaptchaPuzzle({ onComplete }: { onComplete: () => void }) {
  const [pieces, setPieces] = useState<number[]>([]);
  const [emptyIdx, setEmptyIdx] = useState(8);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setPieces(arr);
    setEmptyIdx(arr.indexOf(8));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((v) => v - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  useEffect(() => {
    if (pieces.length > 0 && pieces.every((v, i) => v === i)) onComplete();
  }, [pieces]);

  const getNeighbors = (idx: number) => {
    const r = Math.floor(idx / 3), c = idx % 3;
    const n: number[] = [];
    if (r > 0) n.push(idx - 3); if (r < 2) n.push(idx + 3);
    if (c > 0) n.push(idx - 1); if (c < 2) n.push(idx + 1);
    return n;
  };

  const handleClick = (idx: number) => {
    if (!getNeighbors(emptyIdx).includes(idx)) return;
    const newPieces = [...pieces];
    newPieces[emptyIdx] = newPieces[idx];
    newPieces[idx] = 8;
    setPieces(newPieces);
    setEmptyIdx(idx);
  };

  const colors = ['#7C3AED', '#06B6D4', '#22C55E', '#F97316', '#EF4444', '#3B82F6', '#FACC15', '#EC4899', '#8B5CF6'];

  return (
    <div className="bg-[#111827] rounded-xl border border-[#374151] p-4 mb-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm font-medium">Captcha Puzzle</span>
        <span className="text-xs text-[#FACC15]">⏱ {timeLeft}s</span>
      </div>
      <p className="text-xs text-[#6B7280] mb-3">Susun angka 1-8 secara berurutan</p>
      <div className="w-[210px] h-[210px] mx-auto grid grid-cols-3 gap-1 bg-[#374151] p-1 rounded-lg">
        {pieces.map((p, i) => (
          <button
            key={i} onClick={() => handleClick(i)} disabled={p === 8}
            className={`rounded-md flex items-center justify-center font-bold transition-all ${p !== 8 ? 'hover:scale-105 active:scale-95' : ''}`}
            style={p !== 8 ? { backgroundColor: colors[p], color: p === 6 ? '#000' : '#fff' } : { background: 'transparent' }}
          >
            {p !== 8 ? p + 1 : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaDone, setCaptchaDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaDone) { showToast('Selesaikan captcha terlebih dahulu', 'warning'); return; }
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      const role = userDoc.data()?.role;
      if (role === 'admin' || role === 'super_admin' || role === 'staff') {
        showToast('Login admin berhasil!', 'success');
        navigate('/admin/dashboard');
      } else {
        showToast('Akses ditolak. Bukan akun admin.', 'error');
        await auth.signOut();
      }
    } catch (err: any) {
      showToast(err.message || 'Login gagal', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0B0F1A]">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] mb-8">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-[#EF4444] flex items-center justify-center mx-auto mb-4">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-xl font-bold">Admin Login</h1>
          <p className="text-[#9CA3AF] text-sm">Akses terbatas</p>
        </div>

        <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6">
          {!captchaDone && <CaptchaPuzzle onComplete={() => setCaptchaDone(true)} />}
          {captchaDone && <p className="text-[#22C55E] text-sm mb-4 flex items-center gap-1"><Check className="w-4 h-4" /> Captcha berhasil!</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin email" className="input-field" required />
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button type="submit" disabled={loading || !captchaDone} className="w-full py-3 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-xl font-semibold disabled:opacity-50 transition-all">
              {loading ? 'Memproses...' : 'Login Admin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
