import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useWeather } from '../context/WeatherContext.jsx';

export default function WeatherChart() {
  const { forecast, unit } = useWeather();
  const data = forecast?.list?.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
    temp: Math.round(item.main.temp)
  })) || [];

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Temperature Trend</p>
          <h3 className="text-xl font-semibold text-white">Hourly chart</h3>
        </div>
        <p className="text-sm text-slate-400">{unit === 'metric' ? '°C' : '°F'}</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: '#0f172a', borderRadius: 16, border: '1px solid rgba(255,255,255,0.12)' }} />
            <Line type="monotone" dataKey="temp" stroke="#8ab4ff" strokeWidth={3} dot={{ r: 4, fill: '#7ceeff' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
