import { getWeatherBackground } from '../utils/weatherUtils.js';
import { useWeather } from '../context/WeatherContext.jsx';

export default function BackgroundWrapper({ children }) {
  const { weather } = useWeather();
  const gradient = getWeatherBackground(weather?.weather?.[0]?.main);

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${gradient} px-6 py-6 md:px-4`}>
      {children}
    </div>
  );
}
