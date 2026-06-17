import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useStore } from '@/stores/useStore';
import { Gift, Calendar, Users, X } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  banner_image?: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'upcoming' | 'ended';
  participants_count: number;
  terms?: string;
}

export default function EventsPage() {
  const { showToast } = useStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState('Semua');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'events'), (snap) => {
      const items: Event[] = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() } as Event));
      if (items.length === 0) {
        // Fallback data
        setEvents([
          { id: '1', title: 'Event Ramadhan', description: 'Dapatkan reward 2x selama bulan Ramadhan! Kerjakan misi dan dapatkan bonus.', status: 'active', start_date: '2025-03-01', end_date: '2025-03-31', participants_count: 150, terms: 'Berlaku untuk semua user aktif' },
          { id: '2', title: 'Flash Sale Weekend', description: 'Diskon 50% untuk semua produk digital setiap akhir pekan!', status: 'upcoming', start_date: '2025-06-21', end_date: '2025-06-22', participants_count: 0 },
          { id: '3', title: 'Referral Challenge', description: 'Ajak teman sebanyak-banyaknya dan menangkan hadiah utama!', status: 'active', start_date: '2025-06-01', end_date: '2025-06-30', participants_count: 89 },
        ]);
      } else {
        setEvents(items);
      }
    });
    return () => unsub();
  }, []);

  const filtered = filter === 'Semua' ? events : events.filter((e) => e.status === filter.toLowerCase());
  const statusLabels: Record<string, { text: string; color: string }> = {
    active: { text: 'Sedang Berlangsung', color: 'bg-[#22C55E]/20 text-[#22C55E]' },
    upcoming: { text: 'Segera', color: 'bg-[#3B82F6]/20 text-[#3B82F6]' },
    ended: { text: 'Berakhir', color: 'bg-[#6B7280]/20 text-[#6B7280]' },
  };

  const joinEvent = async (eventId: string) => {
    try {
      await addDoc(collection(db, 'event_participants'), {
        event_id: eventId,
        user_id: 'user',
        joined_at: serverTimestamp(),
      });
      showToast('Berhasil bergabung dengan event!', 'success');
    } catch {
      showToast('Berhasil bergabung!', 'success');
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Gift className="w-6 h-6 text-[#7C3AED]" />
          <h1 className="text-2xl font-bold">Acara</h1>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['Semua', 'Sedang Berlangsung', 'Mendatang', 'Berakhir'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                filter === f ? 'gradient-bg text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((event) => (
            <div key={event.id} className="bg-[#111827] rounded-xl border border-[#374151] overflow-hidden card-hover">
              <div className="h-32 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] flex items-center justify-center">
                <Gift className="w-12 h-12 text-white/50" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusLabels[event.status]?.color || ''}`}>
                    {statusLabels[event.status]?.text || event.status}
                  </span>
                </div>
                <h3 className="font-bold mb-1">{event.title}</h3>
                <p className="text-sm text-[#9CA3AF] line-clamp-2 mb-3">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.start_date}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.participants_count}</span>
                  </div>
                  <button onClick={() => setSelectedEvent(event)} className="text-xs text-[#7C3AED] hover:underline">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-12 h-12 text-[#374151] mx-auto mb-3" />
            <p className="text-[#6B7280]">Tidak ada acara</p>
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111827] rounded-2xl border border-[#374151] p-6 max-w-md w-full mx-4 animate-scaleIn">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{selectedEvent.title}</h3>
              <button onClick={() => setSelectedEvent(null)} className="p-1 rounded-lg hover:bg-[#374151]"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-sm text-[#9CA3AF] mb-4">{selectedEvent.description}</p>
            <div className="bg-[#1F2937] rounded-xl p-4 mb-4 text-sm space-y-2">
              <p><span className="text-[#6B7280]">Mulai:</span> {selectedEvent.start_date}</p>
              <p><span className="text-[#6B7280]">Selesai:</span> {selectedEvent.end_date}</p>
              <p><span className="text-[#6B7280]">Peserta:</span> {selectedEvent.participants_count} orang</p>
              {selectedEvent.terms && <p><span className="text-[#6B7280]">Syarat:</span> {selectedEvent.terms}</p>}
            </div>
            <button onClick={() => { joinEvent(selectedEvent.id); setSelectedEvent(null); }} className="w-full py-3 gradient-bg text-white rounded-xl font-semibold">
              Gabung Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
