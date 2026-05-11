import { useWeather } from '../context/WeatherContext.jsx';

export default function Favorites() {
  const { favorites, fetchWeather, removeFavorite } = useWeather();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Favorites</p>
          <h3 className="text-xl font-semibold text-white">Saved locations</h3>
        </div>
      </div>
      <div className="space-y-4">
        {favorites.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 bg-slate-950/60 p-6 text-center text-slate-400">No favorites added yet.</div>
        ) : (
          favorites.map((location) => (
            <div key={location} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/60 p-4">
              <button type="button" onClick={() => fetchWeather(location)} className="text-left text-sm font-semibold text-white hover:text-sky-300">
                {location}
              </button>
              <button type="button" onClick={() => removeFavorite(location)} className="rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
