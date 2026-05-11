import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature } from '../utils/weatherUtils.js';

export default function HourlyForecast() {
  const { forecast, unit } = useWeather();
  const hours = forecast?.list?.slice(0, 8) ?? [];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Hourly Forecast</p>
          <h3 className="text-xl font-semibold text-white">Next 24 hours</h3>
        </div>
        <p className="text-sm text-slate-400">{unit === 'metric' ? '°C' : '°F'}</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {hours.map((item) => (
          <div key={item.dt} className="min-w-[110px] rounded-3xl bg-slate-950/60 p-4 text-center">
            <p className="text-sm text-slate-400">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="mt-3 text-2xl">{item.weather?.[0]?.icon ? item.weather[0].icon : '☀️'}</p>
            <p className="mt-3 text-lg font-semibold text-white">{formatTemperature(item.main.temp, unit)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
