export default function AilePlaniPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mb-5">
        👨‍👩‍👧
      </div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Aile Buluşma Planı</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
        Aile üyeleri, harita üzerinde buluşma noktaları ve kaçış rotaları özelliği yakında geliyor.
      </p>
      <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold px-4 py-2 rounded-full border border-amber-200">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
        Yakında
      </span>
    </div>
  );
}
