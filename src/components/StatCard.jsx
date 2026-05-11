export default function StatCard({ title, value, description, icon }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
        <span className="rounded-2xl bg-slate-900/60 px-3 py-2 text-sm text-slate-200">{icon}</span>
      </div>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
}
