import { useWeather } from '../context/WeatherContext.jsx';

export default function SearchHistory() {
  const { history, fetchWeather, clearHistory } = useWeather();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Search History</p>
          <h3 className="text-xl font-semibold text-white">Recently viewed</h3>
        </div>
        <button onClick={clearHistory} className="rounded-3xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">
          Clear
        </button>
      </div>
      <div className="space-y-3">
        {history.length === 0 ? (
          <p className="text-sm text-slate-400">No recent searches yet.</p>
        ) : (
          history.map((item) => (
            <button
              key={item}
              onClick={() => fetchWeather(item)}
              className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-left text-sm text-slate-200 hover:bg-white/5"
            >
              {item}
            </button>
          ))
        )}
      </div>
    </section>
  );
}
