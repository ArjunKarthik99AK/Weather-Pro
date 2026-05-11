import { useMemo } from 'react';

export default function WeatherAnimation({ condition }) {
  const effect = useMemo(() => {
    if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') return 'rain';
    if (condition === 'Snow') return 'snow';
    if (condition === 'Mist' || condition === 'Fog' || condition === 'Haze') return 'fog';
    return 'clear';
  }, [condition]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {effect === 'rain' && (
        <>
          {Array.from({ length: 12 }).map((_, idx) => (
            <span key={idx} style={{ left: `${idx * 8}%`, animationDelay: `${idx * 0.1}s` }} className="rain-drop" />
          ))}
        </>
      )}
      {effect === 'snow' && (
        <>
          {Array.from({ length: 10 }).map((_, idx) => (
            <span key={idx} style={{ left: `${idx * 10}%`, animationDelay: `${idx * 0.2}s`, width: '6px', height: '6px' }} className="snowflake" />
          ))}
        </>
      )}
      {effect === 'fog' && <div className="fog-glow" />}
    </div>
  );
}
