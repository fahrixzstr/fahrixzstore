export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0B0F1A] flex flex-col items-center justify-center z-[9999]">
      <div className="text-5xl font-bold gradient-text mb-4 animate-pulse">FXZ</div>
      <div className="w-48 h-1 bg-[#1F2937] rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] animate-[shimmer_1.5s_infinite] rounded-full" style={{ width: '60%' }} />
      </div>
      <p className="text-[#6B7280] text-sm mt-4">Memuat FahriXz Store...</p>
    </div>
  );
}
