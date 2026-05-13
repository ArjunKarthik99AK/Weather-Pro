import { useWeather } from '../context/WeatherContext.jsx';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WeatherChart() {
  const { forecast, unit } = useWeather();

  if (!forecast || !forecast.list) return null;

  // Process forecast data for chart - take next 24 hours (8 data points, 3h intervals)
  const chartData = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    temperature: Math.round(item.main.temp),
    humidity: item.main.humidity,
    precipitation: item.rain ? item.rain['3h'] || 0 : 0
  }));

  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather Trends</p>
        <h3 className="text-xl font-semibold text-white">24-Hour Forecast</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              stroke="#9CA3AF"
              fontSize={12}
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis
              yAxisId="temp"
              orientation="left"
              stroke="#EF4444"
              fontSize={12}
              tick={{ fill: '#EF4444' }}
              label={{ value: `Temp (${tempUnit})`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#EF4444' } }}
            />
            <YAxis
              yAxisId="humidity"
              orientation="right"
              stroke="#3B82F6"
              fontSize={12}
              tick={{ fill: '#3B82F6' }}
              label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#3B82F6' } }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }}
            />
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temperature"
              stroke="#EF4444"
              strokeWidth={2}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              name={`Temperature (${tempUnit})`}
            />
            <Line
              yAxisId="humidity"
              type="monotone"
              dataKey="humidity"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}