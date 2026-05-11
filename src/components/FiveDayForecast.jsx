import ForecastCard from './ForecastCard.jsx';
import { useWeather } from '../context/WeatherContext.jsx';

export default function FiveDayForecast() {
  const { forecast, unit } = useWeather();
  const daily = [];

  forecast?.list?.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString([], { weekday: 'short' });
    const existing = daily.find((entry) => entry.day === day);
    if (!existing) {
      daily.push({
        day,
        icon: item.weather?.[0]?.main || 'Clear',
        range: `${Math.round(item.main.temp_max)}° / ${Math.round(item.main.temp_min)}°`
      });
    }
  });

  const display = daily.slice(0, 5);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">5-Day Forecast</p>
          <h3 className="text-xl font-semibold text-white">Weekly trend</h3>
        </div>
        <p className="text-sm text-slate-400">{unit === 'metric' ? 'Metric' : 'Imperial'}</p>
      </div>
      <div className="space-y-4">
        {display.map((item) => (
          <ForecastCard key={item.day} day={item.day} icon={item.icon} range={item.range} />
        ))}
      </div>
    </section>
  );
}
