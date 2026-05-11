import { useWeather } from '../context/WeatherContext.jsx';

export default function UnitToggle() {
  const { unit, toggleUnit } = useWeather();

  return (
    <button
      type="button"
      onClick={toggleUnit}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10"
    >
      {unit === 'metric' ? '°C' : '°F'}
    </button>
  );
}
