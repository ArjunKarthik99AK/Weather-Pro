import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiWind } from 'react-icons/fi';
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDust,
  WiWindy
} from 'react-icons/wi';
import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemperature } from '../utils/weatherUtils.js';

const iconMap = {
  Clear: WiDaySunny,
  Clouds: WiCloudy,
  Cloudy: WiCloudy,
  Rain: WiRain,
  Drizzle: WiRain,
  Thunderstorm: WiThunderstorm,
  Storm: WiThunderstorm,
  Snow: WiSnow,
  Mist: WiFog,
  Fog: WiFog,
  Haze: WiFog,
  Smoke: WiDust,
  Dust: WiDust,
  Ash: WiDust,
  Squall: WiWindy,
  Tornado: WiWindy
};

function WeatherIcon({ condition }) {
  const Icon = iconMap[condition] || WiDaySunny;
  return <Icon className="h-7 w-7 text-sky-300" />;
}

function buildCurvePath(points) {
  if (points.length < 2) return '';
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const midX = (prev.x + curr.x) / 2;
    path += ` C ${midX} ${prev.y} ${midX} ${curr.y} ${curr.x} ${curr.y}`;
  }

  return path;
}

export default function HourlyForecast() {
  const { forecast, unit } = useWeather();
  const hours = forecast?.list?.slice(0, 8) ?? [];

  const hourlyData = useMemo(() => {
    return hours.map((item, index) => {
      const date = new Date(item.dt * 1000);
      return {
        time: index === 0 ? 'Now' : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: formatTemperature(item.main.temp, unit),
        value: Math.round(item.main.temp),
        wind: `${Math.round(item.wind.speed * (unit === 'metric' ? 3.6 : 1))} ${unit === 'metric' ? 'km/h' : 'mph'}`,
        condition: item.weather?.[0]?.main || 'Clear',
        active: index === 0
      };
    });
  }, [hours, unit]);

  const chartHeight = 170;
  const itemWidth = 108;
  const chartWidth = Math.max(hourlyData.length * itemWidth + 48, 680);

  const points = useMemo(() => {
    const values = hourlyData.map((item) => item.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = Math.max(max - min, 1);

    return values.map((value, index) => {
      const x = 28 + index * itemWidth;
      const normalized = 1 - (value - min) / range;
      const y = 20 + normalized * (chartHeight - 46);
      return { x, y };
    });
  }, [hourlyData]);

  const curvePath = useMemo(() => buildCurvePath(points), [points]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-3xl bg-white/5 px-4 py-3 shadow-[0_12px_35px_rgba(0,0,0,0.18)] backdrop-blur-xl border border-white/10">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-sky-500/15 text-sky-200 shadow-[0_0_18px_rgba(56,189,248,0.25)]">
              <FiClock className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Hourly Forecast</p>
              <div className="inline-flex items-center gap-2">
                <WiDaySunny className="h-4 w-4 text-amber-300" />
                <h3 className="text-xl font-semibold text-white">Next 24 hours</h3>
              </div>
              <p className="mt-1 text-sm text-slate-400">Smooth hourly tempo with premium weather vibes</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-400">{unit === 'metric' ? '°C' : '°F'}</p>
      </div>

      <div className="relative overflow-hidden rounded-[26px] bg-white/5 px-3 py-4 shadow-[inset_0_0_40px_rgba(255,255,255,0.08)] border border-white/10 backdrop-blur-xl">
        <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-slate-900/10" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="relative h-[180px] w-full"
        >
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="hourlyCurve" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FACC15" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.75" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g stroke="rgba(255,255,255,0.14)" strokeWidth="1">
              {points.map((point, index) => (
                <line
                  key={`grid-${index}`}
                  x1={point.x}
                  y1={24}
                  x2={point.x}
                  y2={chartHeight - 20}
                  strokeDasharray="3 7"
                  className="opacity-0 sm:opacity-20"
                />
              ))}
            </g>

            <motion.path
              d={curvePath}
              fill="none"
              stroke="url(#hourlyCurve)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
            <path
              d={curvePath}
              fill="none"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point, index) => (
              <g key={`point-${index}`}>
                {hourlyData[index].active && (
                  <line
                    x1={point.x}
                    y1={24}
                    x2={point.x}
                    y2={chartHeight - 18}
                    stroke="rgba(56,189,248,0.28)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                  />
                )}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hourlyData[index].active ? 7 : 4}
                  fill={hourlyData[index].active ? '#ffffff' : '#FBBF24'}
                  stroke={hourlyData[index].active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)'}
                  strokeWidth={hourlyData[index].active ? 2 : 1}
                  className={hourlyData[index].active ? 'drop-shadow-[0_0_18px_rgba(255,255,255,0.22)]' : ''}
                />
              </g>
            ))}
          </svg>
        </motion.div>

        <div className="relative mt-5 overflow-x-auto pb-2">
          <div className="flex min-w-[680px] gap-3 px-1 sm:min-w-full sm:px-2 snap-x snap-mandatory">
            {hourlyData.map((item) => (
              <motion.div
                key={item.time}
                whileHover={{ y: -6 }}
                className={`relative z-10 min-w-[110px] flex-shrink-0 snap-center rounded-[24px] border border-white/10 bg-white/5 px-4 py-4 text-center transition duration-300 ${
                  item.active
                    ? 'bg-slate-900/95 text-white shadow-[0_20px_60px_-30px_rgba(56,189,248,0.5)]'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl font-semibold tracking-tight text-white">{item.temp}</p>
                  {item.active && (
                    <span className="rounded-full bg-sky-500/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-sky-100 shadow-[0_8px_24px_rgba(56,189,248,0.18)]">
                      Now
                    </span>
                  )}
                </div>
                <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500/15 to-slate-950/20 text-white shadow-[0_0_20px_rgba(56,189,248,0.18)] ring-1 ring-white/10">
                  <WeatherIcon condition={item.condition} />
                </div>
                <p className="mt-4 flex items-center justify-center gap-1 text-[0.68rem] uppercase tracking-[0.3em] text-slate-400">
                  <FiWind className="h-4 w-4 text-slate-400" />
                  {item.wind}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-300">{item.time}</p>
                {item.active && <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 rounded-full bg-sky-400/20" />}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
