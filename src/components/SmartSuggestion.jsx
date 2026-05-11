import { useWeather } from '../context/WeatherContext.jsx';
import { getSuggestion } from '../utils/weatherUtils.js';

export default function SmartSuggestion() {
  const { weather } = useWeather();
  const condition = weather?.weather?.[0]?.main;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Smart Suggestion</p>
          <h3 className="text-xl font-semibold text-white">Weather advice</h3>
        </div>
        <span className="rounded-3xl bg-slate-950/70 px-4 py-2 text-sm text-slate-200">{condition || 'Clear'}</span>
      </div>
      <p className="mt-5 text-lg leading-8 text-slate-200">{getSuggestion(condition)}</p>
    </section>
  );
}
