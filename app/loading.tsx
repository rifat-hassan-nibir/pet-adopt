export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-emerald-500/20 rounded-full animate-pulse" />
        </div>
        <p className="text-sm font-medium text-gray-400 animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
