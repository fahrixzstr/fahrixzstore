import { useState } from 'react';
import { useStore } from '@/stores/useStore';
import AdminLayout from './AdminLayout';
import { Settings, ToggleLeft, ToggleRight, Save } from 'lucide-react';

export default function AdminSettings() {
  const { showToast } = useStore();
  const [flags, setFlags] = useState({
    payment: true, wallet: true, referral: true, mission: true,
    biometric: false, donation: true, whatsappChannel: true, aiChatbot: true, events: true, vouchers: true,
  });
  const [maintenance, setMaintenance] = useState(false);
  const [maintenanceMsg, setMaintenanceMsg] = useState('Sistem sedang dalam pemeliharaan. Silakan kembali lagi nanti.');
  const [siteName, setSiteName] = useState('FahriXz Store');

  const toggleFlag = (key: keyof typeof flags) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    showToast('Pengaturan disimpan!', 'success');
  };

  const flagItems = [
    { key: 'payment' as const, label: 'Payment System' },
    { key: 'wallet' as const, label: 'Wallet System' },
    { key: 'referral' as const, label: 'Referral System' },
    { key: 'mission' as const, label: 'Mission System' },
    { key: 'donation' as const, label: 'Donation System' },
    { key: 'events' as const, label: 'Events System' },
    { key: 'vouchers' as const, label: 'Voucher System' },
    { key: 'aiChatbot' as const, label: 'AI Chatbot' },
    { key: 'whatsappChannel' as const, label: 'WhatsApp Channel' },
    { key: 'biometric' as const, label: 'Biometric Login' },
  ];

  return (
    <AdminLayout title="Pengaturan">
      <div className="max-w-2xl space-y-6">
        {/* Site Info */}
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-[#7C3AED]" /> Info Website</h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-[#9CA3AF] mb-1 block">Nama Website</label>
              <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="input-field" />
            </div>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-6">
          <h3 className="font-bold mb-4">Feature Flags</h3>
          <div className="space-y-3">
            {flagItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <span className="text-sm">{item.label}</span>
                <button onClick={() => toggleFlag(item.key)} className="transition-colors">
                  {flags[item.key] ? <ToggleRight className="w-8 h-8 text-[#22C55E]" /> : <ToggleLeft className="w-8 h-8 text-[#6B7280]" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="bg-[#111827] rounded-xl border border-[#374151] p-6">
          <h3 className="font-bold mb-4">Maintenance Mode</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Aktifkan Maintenance</span>
              <button onClick={() => setMaintenance(!maintenance)} className="transition-colors">
                {maintenance ? <ToggleRight className="w-8 h-8 text-[#FACC15]" /> : <ToggleLeft className="w-8 h-8 text-[#6B7280]" />}
              </button>
            </div>
            {maintenance && (
              <textarea value={maintenanceMsg} onChange={(e) => setMaintenanceMsg(e.target.value)} className="input-field min-h-[80px] resize-none" placeholder="Pesan maintenance..." />
            )}
          </div>
        </div>

        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-xl font-semibold">
          <Save className="w-4 h-4" /> Simpan Pengaturan
        </button>
      </div>
    </AdminLayout>
  );
}
