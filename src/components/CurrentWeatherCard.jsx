import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature } from '../utils/weatherUtils.js';
import UnitToggle from './UnitToggle.jsx';
import WeatherAnimation from './WeatherAnimation.jsx';

export default function CurrentWeatherCard() {
  const { weather, forecast, unit, addFavorite, favorites, city } = useWeather();
  const condition = weather?.weather?.[0]?.main || 'Clear';
  const isFavorite = favorites.includes(weather?.name);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl"
    >
      <WeatherAnimation condition={condition} />
      <div className="relative grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Current Condition</p>
              <h2 className="mt-2 text-5xl font-black tracking-tight text-white">{formatTemperature(weather?.main?.temp, unit)}</h2>
              <p className="mt-2 text-xl text-slate-200">{weather?.weather?.[0]?.description || 'Sunny'}</p>
            </div>
            <button
              type="button"
              onClick={() => addFavorite(weather?.name)}
              className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              {isFavorite ? 'Favorited' : 'Add Favorite'}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Feels Like</p>
              <p className="mt-3 text-lg font-semibold text-white">{formatTemperature(weather?.main?.feels_like, unit)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">H / L</p>
              <p className="mt-3 text-lg font-semibold text-white">{formatTemperature(weather?.main?.temp_max, unit)} / {formatTemperature(weather?.main?.temp_min, unit)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Humidity</p>
              <p className="mt-3 text-lg font-semibold text-white">{weather?.main?.humidity ?? '--'}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live weather insights</p>
            <UnitToggle />
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Wind</p>
              <p className="mt-3 text-2xl font-semibold text-white">{weather?.wind?.speed ?? '--'} {unit === 'metric' ? 'km/h' : 'mph'}</p>
            </div>
            <div className="rounded-3xl bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">UV Index</p>
              <p className="mt-3 text-2xl font-semibold text-white">{weather?.clouds?.all ? '4 (Moderate)' : '2 (Low)'}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
