import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#F9FAFB] mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-[#7C3AED]" />
          <h1 className="text-2xl font-bold">Kebijakan Privasi</h1>
        </div>
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-6 space-y-4 text-sm text-[#9CA3AF] leading-relaxed">
          <p>Selamat datang di FahriXz Store. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">1. Informasi yang Kami Kumpulkan</h3>
          <p>Kami mengumpulkan informasi yang Anda berikan saat mendaftar, bertransaksi, atau menggunakan layanan kami, termasuk nama, email, nomor telepon, dan informasi pembayaran.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">2. Penggunaan Informasi</h3>
          <p>Informasi Anda digunakan untuk memproses pesanan, memberikan dukungan pelanggan, mengirim notifikasi penting, dan meningkatkan layanan kami.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">3. Keamanan Data</h3>
          <p>Kami menggunakan enkripsi dan langkah-langkah keamanan teknis untuk melindungi data Anda dari akses tidak sah.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">4. Berbagi Informasi</h3>
          <p>Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">5. Cookie</h3>
          <p>Kami menggunakan cookie untuk meningkatkan pengalaman pengguna dan menganalisis lalu lintas situs.</p>
          <h3 className="text-[#F9FAFB] font-bold text-base">6. Hak Anda</h3>
          <p>Anda berhak mengakses, memperbarui, atau menghapus informasi pribadi Anda kapan saja.</p>
        </div>
      </div>
    </div>
  );
}
