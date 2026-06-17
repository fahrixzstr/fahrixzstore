import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '@/stores/useStore';
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { showToast('Password tidak cocok!', 'error'); return; }
    if (password.length < 6) { showToast('Password minimal 6 karakter', 'warning'); return; }
    setLoading(true);
    try {
      await register(email, password, name);
      showToast('Registrasi berhasil!', 'success');
      navigate('/');
    } catch (err: any) {
      showToast(err.message || 'Registrasi gagal', 'error');
    }
    setLoading(false);
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
          <h1 className="text-2xl font-bold">Daftar Akun</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Bergabung dengan FahriXz Store</p>
        </div>

        <div className="bg-[#111827]/80 backdrop-blur-sm rounded-2xl border border-[#374151] p-6">
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className="input-field" required />
            </div>
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="input-field" required />
            </div>
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 karakter" className="input-field pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Konfirmasi Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Ulangi password" className="input-field" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold disabled:opacity-50 transition-all hover:shadow-lg hover:shadow-purple-500/30">
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#9CA3AF] mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-[#7C3AED] hover:underline font-medium">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
