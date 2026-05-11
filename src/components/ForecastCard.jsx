export default function ForecastCard({ day, icon, range }) {
  return (
    <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow">
      <div>
        <p className="text-sm font-semibold text-white">{day}</p>
        <p className="mt-1 text-sm text-slate-400">{icon}</p>
      </div>
      <p className="text-sm text-slate-300">{range}</p>
    </div>
  );
}
