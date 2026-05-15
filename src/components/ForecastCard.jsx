const weatherIcons = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Smoke: '🌫️',
  Haze: '🌫️',
  Dust: '🌪️',
  Fog: '🌫️',
  Sand: '🌪️',
  Ash: '🌋',
  Squall: '🌬️',
  Tornado: '🌪️'
};

export default function ForecastCard({ day, icon, label, range }) {
  return (
    <div className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/20 to-indigo-500/10 text-2xl shadow-[0_0_20px_rgba(56,189,248,0.18)] ring-1 ring-white/10">
          {weatherIcons[icon] || '☀️'}
        </div>
        <div>
          <p className="text-base font-semibold text-white">{day}</p>
          <p className="mt-1 text-sm text-slate-300">{label || icon}</p>
        </div>
      </div>
      <div className="rounded-full bg-slate-950/80 px-4 py-2 text-sm font-semibold text-slate-100 ring-1 ring-white/10">
        {range}
      </div>
    </div>
  );
}
