import { useStore } from '@/stores/useStore';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const styles = {
  success: 'bg-[#22C55E]/20 border-[#22C55E]/40 text-[#22C55E]',
  error: 'bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444]',
  warning: 'bg-[#FACC15]/20 border-[#FACC15]/40 text-[#FACC15]',
  info: 'bg-[#3B82F6]/20 border-[#3B82F6]/40 text-[#3B82F6]',
};

export default function Toast() {
  const { toast, clearToast } = useStore();

  if (!toast) return null;

  const Icon = icons[toast.type];

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slideInRight">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm ${styles[toast.type]} shadow-lg min-w-[300px]`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm font-medium text-[#F9FAFB] flex-1">{toast.message}</p>
        <button onClick={clearToast} className="flex-shrink-0 hover:opacity-70 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 bg-[#F9FAFB]/20 rounded-b-xl overflow-hidden">
        <div className="h-full bg-current opacity-50 animate-[shrink_3s_linear_forwards]" />
      </div>
    </div>
  );
}
