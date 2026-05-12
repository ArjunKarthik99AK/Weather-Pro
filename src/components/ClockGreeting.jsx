import { useEffect, useState } from 'react';
import { getGreeting } from '../utils/weatherUtils.js';
import { useWeather } from '../context/WeatherContext.jsx';

export default function ClockGreeting() {
  const { city } = useWeather();
  const [time, setTime] = useState(new Date());
  const greeting = getGreeting();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex flex-col gap-4 rounded-3xl bg-white/5 p-6 shadow-glow backdrop-blur-xl border border-white/10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-slate-400">{greeting}</p>
          <h1 className="text-5xl font-black tracking-tight text-white md:text-6xl">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
          <p className="mt-2 text-sm text-slate-300">{greeting}, here is your weather intelligence for {city}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-right text-sm text-slate-300">
          <p className="text-slate-400">Current city</p>
          <p className="mt-2 text-lg font-semibold text-white">{city}</p>
        </div>
      </div>
    </section>
  );
}
