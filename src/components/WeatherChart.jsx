import { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useWeather } from '../context/WeatherContext.jsx';

export default function WeatherChart() {
  const { forecast, unit } = useWeather();

  const chartData = useMemo(() => {
    if (!forecast?.list?.length) return [];

    return forecast.list.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit'
      }),
      temperature: Math.round(item.main.temp)
    }));
  }, [forecast]);

  const unitSymbol = unit === 'imperial' ? '°F' : '°C';

  if (!chartData.length) {
    return (
      <section className="rounded-3xl border border-slate-200/60 bg-slate-950/10 p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-slate-200">Weather chart</h2>
        <div className="rounded-3xl border border-dashed border-slate-500/30 bg-slate-900/40 p-8 text-center text-slate-400">
          Loading chart data...
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200/60 bg-slate-950/10 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-200">Temperature forecast</h2>
          <p className="text-sm text-slate-400">Next 8 observations</p>
        </div>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200">
          {unitSymbol}
        </span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 12, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                color: '#f8fafc'
              }}
              labelStyle={{ color: '#cbd5e1' }}
              formatter={(value) => [`${value}${unitSymbol}`, 'Temperature']}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#38bdf8' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
