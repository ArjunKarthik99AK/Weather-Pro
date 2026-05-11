import StatCard from './StatCard.jsx';
import { useWeather } from '../context/WeatherContext.jsx';

export default function WeatherStats() {
  const { weather } = useWeather();
  const visibility = weather?.visibility ? `${Math.round(weather.visibility / 1609)} mi` : '--';
  const pressure = weather?.main?.pressure ? `${weather.main.pressure} hPa` : '--';
  const dewPoint = weather?.main?.temp ? `${Math.round(weather.main.temp - (weather.main.humidity / 5))}°` : '--';

  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <StatCard title="Visibility" value={visibility} description="Clear horizon" icon="👁️" />
      <StatCard title="Pressure" value={pressure} description="Steady rising" icon="🌡️" />
      <StatCard title="Dew Point" value={dewPoint} description="Comfortable" icon="💧" />
    </section>
  );
}
