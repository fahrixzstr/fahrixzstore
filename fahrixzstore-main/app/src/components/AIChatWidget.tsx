import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/stores/useStore';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';

const quickReplies = ['Cek Order', 'Cara Tarik', 'Hubungi Admin', 'Lihat Produk'];

const aiResponses: Record<string, string> = {
  halo: 'Halo! 👋 Ada yang bisa FahriXz AI bantu?',
  hi: 'Halo! 👋 Ada yang bisa FahriXz AI bantu?',
  hey: 'Halo! 👋 Ada yang bisa FahriXz AI bantu?',
  order: 'Silakan masukkan ID pesanan Anda untuk melacak status.',
  pesanan: 'Silakan masukkan ID pesanan Anda untuk melacak status.',
  tarik: 'Minimal penarikan adalah Rp 50,000. Anda bisa menarik melalui DANA, GoPay, atau Bank Transfer.',
  withdraw: 'Minimal penarikan adalah Rp 50,000. Anda bisa menarik melalui DANA, GoPay, atau Bank Transfer.',
  misi: 'Misi baru tersedia setiap hari! Cek di halaman Misi Cuan untuk melihat misi yang tersedia.',
  mission: 'Misi baru tersedia setiap hari! Cek di halaman Misi Cuan untuk melihat misi yang tersedia.',
  produk: 'Kami menyediakan berbagai produk digital, hosting, dan bot WhatsApp. Cek katalog kami!',
  product: 'Kami menyediakan berbagai produk digital, hosting, dan bot WhatsApp. Cek katalog kami!',
  harga: 'Harga bervariasi mulai dari Rp 5,000. Cek katalog untuk detail harga terbaru.',
  price: 'Harga bervariasi mulai dari Rp 5,000. Cek katalog untuk detail harga terbaru.',
  deposit: 'Anda bisa deposit melalui DANA, OVO, GoPay, ShopeePay, QRIS, dan Transfer Bank.',
  topup: 'Anda bisa top up saldo melalui DANA, OVO, GoPay, ShopeePay, QRIS, dan Transfer Bank.',
  help: 'Saya siap membantu! Ada pertanyaan tentang produk, order, atau akun?',
  bantu: 'Saya siap membantu! Ada pertanyaan tentang produk, order, atau akun?',
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lower.includes(key)) return response;
  }
  return 'Maaf, saya belum mengerti pertanyaan Anda. Hubungi admin via WhatsApp untuk bantuan lebih lanjut. 📞';
}

export default function AIChatWidget() {
  const { aiChatOpen, toggleAiChat, user } = useStore();
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Halo! 👋 Ada yang bisa FahriXz AI bantu?' },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getAIResponse(text);
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
      setTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      {!aiChatOpen && (
        <button
          onClick={toggleAiChat}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/30 hover:scale-110 transition-transform glow-pulse"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Panel */}
      {aiChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] bg-[#111827] border border-[#374151] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#374151] gradient-bg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm font-semibold text-white">FahriXz AI</p>
                <p className="text-[10px] text-white/70 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> Online
                </p>
              </div>
            </div>
            <button onClick={toggleAiChat} className="p-1 rounded-lg hover:bg-white/20 transition-colors">
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3 py-2 text-sm ${
                  msg.role === 'user'
                    ? 'bg-[#7C3AED] text-white rounded-2xl rounded-br-sm'
                    : 'bg-[#1F2937] text-[#F9FAFB] rounded-2xl rounded-bl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-[#1F2937] rounded-2xl rounded-bl-sm px-3 py-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-[#9CA3AF] animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          <div className="px-4 pb-2 flex gap-1 overflow-x-auto">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="px-3 py-1 rounded-full bg-[#1F2937] text-xs text-[#9CA3AF] hover:bg-[#374151] hover:text-[#F9FAFB] transition-colors whitespace-nowrap"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
            className="flex items-center gap-2 p-3 border-t border-[#374151]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan..."
              className="flex-1 bg-[#1F2937] border border-[#374151] rounded-xl px-3 py-2 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:outline-none focus:border-[#7C3AED]"
            />
            <button
              type="submit"
              className="p-2 rounded-xl gradient-bg hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
