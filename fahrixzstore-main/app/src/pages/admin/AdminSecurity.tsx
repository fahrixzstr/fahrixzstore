import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AdminLayout from './AdminLayout';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

export default function AdminSecurity() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'security_logs'), (snap) => {
      const items: any[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      // Fallback sample data
      if (items.length === 0) {
        setLogs([
          { id: '1', type: 'login_fail', ip: '192.168.1.1', userId: 'user1', details: '3x login gagal', severity: 'medium', timestamp: new Date().toISOString() },
          { id: '2', type: 'brute_force', ip: '10.0.0.1', userId: '-', details: 'Percobaan brute force terdeteksi', severity: 'high', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: '3', type: 'suspicious_ip', ip: '172.16.0.1', userId: '-', details: 'IP mencurigakan dari lokasi tidak dikenal', severity: 'low', timestamp: new Date(Date.now() - 7200000).toISOString() },
        ]);
      } else {
        setLogs(items);
      }
    });
    return () => unsub();
  }, []);

  const severityColors: Record<string, string> = {
    low: 'bg-[#3B82F6]/20 text-[#3B82F6]',
    medium: 'bg-[#FACC15]/20 text-[#FACC15]',
    high: 'bg-[#F97316]/20 text-[#F97316]',
    critical: 'bg-[#EF4444]/20 text-[#EF4444]',
  };

  const typeIcons: Record<string, any> = {
    login_fail: ShieldAlert,
    brute_force: Lock,
    suspicious_ip: AlertTriangle,
    role_escalation: Shield,
    unauthorized_access: ShieldAlert,
  };

  return (
    <AdminLayout title="Security Logs">
      <div className="space-y-4">
        {logs.map((log) => {
          const Icon = typeIcons[log.type] || Shield;
          return (
            <div key={log.id} className="bg-[#111827] rounded-xl border border-[#374151] p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${severityColors[log.severity] || ''} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{log.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${severityColors[log.severity]}`}>{log.severity}</span>
                </div>
                <p className="text-sm text-[#9CA3AF]">{log.details}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#6B7280]">
                  <span>IP: {log.ip}</span>
                  <span>{new Date(log.timestamp).toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}
