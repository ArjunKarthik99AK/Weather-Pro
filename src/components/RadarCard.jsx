export default function RadarCard() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live Radar</p>
          <h3 className="text-xl font-semibold text-white">Regional weather map</h3>
        </div>
        <span className="rounded-2xl bg-slate-950/70 px-4 py-2 text-sm text-slate-200">Intensity</span>
      </div>
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/70 p-4">
        <div className="h-72 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(124,238,255,0.2),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.85),rgba(5,11,24,0.95))]" />
        <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-3xl bg-white/5 p-4">
          <div>
            <p className="text-sm text-slate-400">Live Radar</p>
            <p className="text-lg font-semibold text-white">Precipitation overlay</p>
          </div>
          <button className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10">View</button>
        </div>
      </div>
    </section>
  );
}
