import { useState } from 'react';
import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature, getSuggestion } from '../utils/weatherUtils.js';

function getWeatherAIResponse(question, condition, weather, unit) {
  const prompt = question.trim().toLowerCase();
  if (!prompt) {
    return 'Ask me anything about today’s weather, and I will give you a quick answer.';
  }

  const temp = weather?.main?.temp;
  const windSpeed = weather?.wind?.speed;
  const description = weather?.weather?.[0]?.description;
  const temperatureText = temp != null ? formatTemperature(temp, unit) : 'unknown temperature';

  if (prompt.includes('umbrella') || prompt.includes('rain')) {
    if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
      return `Yes — bring an umbrella today. It looks ${description || 'wet'} and you may see rain soon.`;
    }
    return `No umbrella needed right now. The skies look ${description || 'clear'}, but check back if conditions change.`;
  }

  if (prompt.includes('cold') || prompt.includes('warm') || prompt.includes('temperature') || prompt.includes('hot')) {
    return `It is currently ${temperatureText} with ${description || 'stable weather'}. Dress for the temperature and layer if needed.`;
  }

  if (prompt.includes('wind') || prompt.includes('breeze')) {
    if (windSpeed != null) {
      return `The wind is around ${Math.round(windSpeed)} ${unit === 'imperial' ? 'mph' : 'm/s'}. Keep that in mind for outdoor plans.`;
    }
    return 'I am checking wind conditions — it should be gentle for now.';
  }

  if (prompt.includes('outdoor') || prompt.includes('outside') || prompt.includes('run') || prompt.includes('walk')) {
    if (condition === 'Rain' || condition === 'Thunderstorm') {
      return 'It may be better to stay indoors for now. The weather looks wet and unstable.';
    }
    return `It looks ${description || 'pleasant'} for outdoor activities. ${temperatureText} is a good time to step outside.`;
  }

  if (prompt.includes('today') || prompt.includes('now') || prompt.includes('plan')) {
    return `Current weather is ${description || 'available'} at ${temperatureText}. ${getSuggestion(condition)}`;
  }

  return `Here’s my best answer: ${getSuggestion(condition)} If you want more detail, ask about rain, temperature, wind, or outdoor plans.`;
}

export default function SmartSuggestion() {
  const { weather, unit } = useWeather();
  const condition = weather?.weather?.[0]?.main;
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState(
    'Ask me anything about today’s weather, and I will give you a quick answer.'
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = getWeatherAIResponse(query, condition, weather, unit);
    setReply(response);
    setQuery('');
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather AI assistant</p>
          <h3 className="text-xl font-semibold text-white">Ask the forecast</h3>
        </div>
        <span className="rounded-3xl bg-slate-950/70 px-4 py-2 text-sm text-slate-200">{condition || 'Clear'}</span>
      </div>

      <div className="mt-5 rounded-3xl bg-slate-950/50 p-5 text-slate-100 shadow-inner shadow-slate-950/40">
        <p className="text-base leading-7 text-slate-200">{reply}</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Should I carry an umbrella?"
          className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Ask AI
        </button>
      </form>
    </section>
  );
}
