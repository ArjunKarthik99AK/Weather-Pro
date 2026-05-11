import { useWeather } from '../context/WeatherContext.jsx';

export default function History() {
  const { history, favorites, clearHistory, clearFavorites, fetchWeather } = useWeather();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">History</p>
            <h2 className="text-2xl font-semibold text-white">Recent weather views</h2>
          </div>
          <button onClick={clearHistory} className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Clear history</button>
        </div>
        <div className="grid gap-4">
          {history.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-slate-400">No records yet.</div>
          ) : (
            history.map((item) => (
              <button
                key={item}
                onClick={() => fetchWeather(item)}
                className="w-full rounded-3xl border border-white/10 bg-slate-950/60 p-5 text-left text-white hover:bg-white/5"
              >
                <p className="text-lg font-semibold">{item}</p>
                <p className="mt-2 text-sm text-slate-400">Viewed {new Date().toLocaleDateString()}</p>
              </button>
            ))
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Favorites</p>
              <h3 className="text-xl font-semibold text-white">Saved cities</h3>
            </div>
            <button onClick={clearFavorites} className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Clear all</button>
          </div>
          <div className="space-y-3">
            {favorites.length === 0 ? (
              <p className="text-sm text-slate-400">No favorite locations yet.</p>
            ) : (
              favorites.map((location) => (
                <button
                  key={location}
                  onClick={() => fetchWeather(location)}
                  className="w-full rounded-3xl border border-white/10 bg-slate-950/60 px-4 py-4 text-left text-white hover:bg-white/5"
                >
                  {location}
                </button>
              ))
            )}
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Search timestamps</p>
          <div className="mt-5 grid gap-3">
            {history.slice(0, 4).map((item, index) => (
              <div key={`${item}-${index}`} className="rounded-3xl bg-slate-950/60 p-4 text-sm text-slate-300">
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-1">{new Date().toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
