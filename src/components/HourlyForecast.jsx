import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature } from '../utils/weatherUtils.js';
import { WEATHER_ICONS } from '../utils/constants.js';

export default function HourlyForecast() {
  const { forecast, unit } = useWeather();
  const hours = forecast?.list?.slice(0, 8) ?? [];
  const currentHour = new Date().getHours();

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Hourly Forecast</p>
          <h3 className="text-xl font-semibold text-white">Next 24 hours</h3>
        </div>
        <p className="text-sm text-slate-400">{unit === 'metric' ? '°C' : '°F'}</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {hours.map((item) => {
          const date = new Date(item.dt * 1000);
          const itemHour = date.getHours();
          const isActive = itemHour === currentHour;
          const icon = WEATHER_ICONS[item.weather?.[0]?.main] ?? '☀️';

          return (
            <div
              key={item.dt}
              className={`min-w-[120px] snap-center rounded-3xl border p-4 text-center transition duration-300 ${
                isActive
                  ? 'border-white/20 bg-slate-900/90 shadow-[0_20px_60px_-40px_rgba(255,255,255,0.35)]'
                  : 'border-transparent bg-slate-950/60 hover:bg-slate-900/80'
              }`}>
              <p className="text-sm text-slate-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p className="mt-3 text-3xl">{icon}</p>
              <p className="mt-3 text-lg font-semibold text-white">{formatTemperature(item.main.temp, unit)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
