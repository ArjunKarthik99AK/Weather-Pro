export default function Loader() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl text-center text-slate-300">
      <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-sky-400" />
      <p className="text-sm text-slate-100">Loading weather data...</p>
    </div>
  );
}
