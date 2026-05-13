import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature } from '../utils/weatherUtils.js';
import UnitToggle from './UnitToggle.jsx';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function CurrentWeatherCard() {
  const { weather, forecast, unit, addFavorite, favorites, city, animationEnabled } = useWeather();
  const condition = weather?.weather?.[0]?.main || 'Clear';
  const isFavorite = favorites.includes(weather?.name);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl"
    >
      <div className="relative grid gap-6 lg:grid-cols-2">
        <motion.div variants={itemVariants} className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Current Condition</p>
              <motion.h2
                key={weather?.main?.temp}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl"
              >
                {formatTemperature(weather?.main?.temp, unit)}
              </motion.h2>
              <p className="mt-2 text-xl text-slate-200">{weather?.weather?.[0]?.description || 'Sunny'}</p>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addFavorite(weather?.name)}
              className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              {isFavorite ? '★ Favorited' : '☆ Add Favorite'}
            </motion.button>
          </div>

          <motion.div variants={containerVariants} className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Feels Like', value: formatTemperature(weather?.main?.feels_like, unit) },
              { label: 'H / L', value: `${formatTemperature(weather?.main?.temp_max, unit)} / ${formatTemperature(weather?.main?.temp_min, unit)}` },
              { label: 'Humidity', value: `${weather?.main?.humidity ?? '--'}%` }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live weather insights</p>
            <UnitToggle />
          </div>
          <div className="space-y-4">
            {[
              { label: 'Wind', value: `${weather?.wind?.speed ?? '--'} ${unit === 'metric' ? 'km/h' : 'mph'}`, icon: '💨' },
              { label: 'UV Index', value: weather?.clouds?.all ? '4 (Moderate)' : '2 (Low)', icon: '☀️' }
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 5 }}
                className="rounded-3xl bg-slate-950/70 p-5 hover:bg-slate-950 transition"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
