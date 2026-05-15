import ForecastCard from './ForecastCard.jsx';
import { useWeather } from '../context/WeatherContext.jsx';

const iconLabelMap = {
  Clear: 'Sunny',
  Clouds: 'Cloudy',
  Rain: 'Rainy',
  Drizzle: 'Drizzle',
  Thunderstorm: 'Stormy',
  Snow: 'Snowy',
  Mist: 'Misty',
  Smoke: 'Smoky',
  Haze: 'Hazy',
  Dust: 'Dusty',
  Fog: 'Foggy',
  Sand: 'Windy',
  Ash: 'Ashy',
  Squall: 'Windy',
  Tornado: 'Tornado'
};

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
        label: iconLabelMap[item.weather?.[0]?.main] || 'Clear',
        range: `${Math.round(item.main.temp_max)}° / ${Math.round(item.main.temp_min)}°`
      });
    }
  });

  const display = daily.slice(0, 5);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-y-3 gap-x-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">5-Day Forecast</p>
          <h3 className="text-2xl font-semibold text-white">Weekly trend</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-white/10 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
            {unit === 'metric' ? 'Metric' : 'Imperial'}
          </span>
          <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs text-slate-300">
            Next 5 days
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {display.map((item) => (
          <ForecastCard
            key={item.day}
            day={item.day}
            icon={item.icon}
            label={item.label}
            range={item.range}
          />
        ))}
      </div>
    </section>
  );
}
