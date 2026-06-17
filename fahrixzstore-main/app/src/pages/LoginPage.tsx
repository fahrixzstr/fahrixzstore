import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { auth, db, googleProvider, ADMIN_EMAIL } from '@/lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Eye, EyeOff, LogIn, Chrome, ArrowLeft } from 'lucide-react';

// Slide Puzzle Captcha Component
function CaptchaPuzzle({ onComplete, onFail }: { onComplete: () => void; onFail: () => void }) {
  const [pieces, setPieces] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(8);
  const [timeLeft, setTimeLeft] = useState(60);
  const [moves, setMoves] = useState(0);
  const gridSize = 3;

  useEffect(() => {
    // Initialize shuffled puzzle
    const solved = [0, 1, 2, 3, 4, 5, 6, 7];
    let shuffled = [...solved];
    // Shuffle by making random valid moves
    let empty = 8;
    for (let i = 0; i < 50; i++) {
      const neighbors = getNeighbors(empty);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      shuffled[empty] = shuffled[randomNeighbor];
      shuffled[randomNeighbor] = -1;
      empty = randomNeighbor;
    }
    // Fill in the empty slot value
    const fullGrid = [...shuffled];
    fullGrid[empty] = 8; // placeholder
    // Actually let's use a simpler approach
    const shuffleArr = () => {
      const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    let initial = shuffleArr();
    // Ensure solvable and not already solved
    while (!isSolvable(initial) || isSolved(initial)) {
      initial = shuffleArr();
    }
    setPieces(initial);
    setEmptyIndex(initial.indexOf(8));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) { onFail(); return; }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (isSolved(pieces) && pieces.length > 0) {
      onComplete();
    }
  }, [pieces]);

  function getNeighbors(index: number): number[] {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const neighbors: number[] = [];
    if (row > 0) neighbors.push(index - gridSize);
    if (row < gridSize - 1) neighbors.push(index + gridSize);
    if (col > 0) neighbors.push(index - 1);
    if (col < gridSize - 1) neighbors.push(index + 1);
    return neighbors;
  }

  function isSolvable(arr: number[]): boolean {
    let inversions = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 8) continue;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] !== 8 && arr[i] > arr[j]) inversions++;
      }
    }
    return inversions % 2 === 0;
  }

  function isSolved(arr: number[]): boolean {
    if (arr.length === 0) return false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i) return false;
    }
    return true;
  }

  const handlePieceClick = (index: number) => {
    const neighbors = getNeighbors(emptyIndex);
    if (!neighbors.includes(index)) return;
    const newPieces = [...pieces];
    newPieces[emptyIndex] = newPieces[index];
    newPieces[index] = 8;
    setPieces(newPieces);
    setEmptyIndex(index);
    setMoves((m) => m + 1);
  };

  const colors = ['#7C3AED', '#06B6D4', '#22C55E', '#F97316', '#EF4444', '#3B82F6', '#FACC15', '#EC4899', '#8B5CF6'];

  return (
    <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold">Captcha Puzzle</h3>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-[#FACC15]">⏱ {timeLeft}s</span>
          <span className="text-[#9CA3AF]">Gerakan: {moves}</span>
        </div>
      </div>
      <p className="text-xs text-[#6B7280] mb-4">Klik ubin di sebelah slot kosong untuk memindahkannya. Susun angka 1-8 secara berurutan!</p>
      <div className="w-[240px] h-[240px] mx-auto grid grid-cols-3 gap-1 bg-[#374151] p-1 rounded-lg">
        {pieces.map((piece, i) => (
          <button
            key={i}
            onClick={() => handlePieceClick(i)}
            className={`w-full h-full rounded-md flex items-center justify-center text-lg font-bold transition-all ${
              piece === 8 ? 'bg-transparent cursor-default' : 'hover:scale-105 active:scale-95'
            }`}
            style={piece !== 8 ? { backgroundColor: colors[piece], color: piece === 5 || piece === 6 ? '#000' : '#fff' } : {}}
            disabled={piece === 8}
          >
            {piece !== 8 ? piece + 1 : ''}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast, loginAttempts, lockoutUntil } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaCompleted, setCaptchaCompleted] = useState(false);
  const [captchaFailed, setCaptchaFailed] = useState(0);

  // Show captcha after 3 failed attempts
  useEffect(() => {
    if (loginAttempts >= 3) setShowCaptcha(true);
  }, [loginAttempts]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      showToast(`Akun terkunci. Coba lagi dalam ${Math.ceil((lockoutUntil - Date.now()) / 60000)} menit.`, 'error');
      return;
    }
    if (showCaptcha && !captchaCompleted) {
      showToast('Selesaikan captcha terlebih dahulu', 'warning');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast('Login berhasil!', 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err.message || 'Login gagal', 'error');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      showToast('Login berhasil!', 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err.message || 'Login gagal', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[#0B0F1A] via-[#111827] to-[#0B0F1A]">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] mb-8">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">FXZ</span>
          </div>
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Masuk ke FahriXz Store</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-sm rounded-2xl border border-[#374151] p-6">
          {showCaptcha && !captchaCompleted && (
            <div className="mb-6">
              <CaptchaPuzzle
                onComplete={() => { setCaptchaCompleted(true); showToast('Captcha berhasil!', 'success'); }}
                onFail={() => {
                  setCaptchaFailed((c) => c + 1);
                  if (captchaFailed >= 2) {
                    showToast('3x gagal. Akun terkunci 15 menit.', 'error');
                    useStore.getState().setLockout(Date.now() + 15 * 60 * 1000);
                  }
                }}
              />
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password Anda"
                  className="input-field pr-10"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-[#9CA3AF] cursor-pointer">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="accent-[#7C3AED]" />
                Ingat saya
              </label>
              <Link to="#" className="text-sm text-[#7C3AED] hover:underline">Lupa password?</Link>
            </div>
            <button
              type="submit"
              disabled={loading || (showCaptcha && !captchaCompleted)}
              className="w-full py-3 gradient-bg text-white rounded-xl font-semibold disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-purple-500/30"
            >
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#374151]" /></div>
            <div className="relative flex justify-center"><span className="bg-[#111827] px-3 text-xs text-[#6B7280]">atau</span></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-[#1F2937] border border-[#374151] text-[#F9FAFB] rounded-xl font-semibold hover:bg-[#374151] transition-all flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5" /> Masuk dengan Google
          </button>
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-[#7C3AED] hover:underline font-medium">Daftar</Link>
        </p>
      </div>
    </div>
  );
}
