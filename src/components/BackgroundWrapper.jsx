import { getWeatherBackground } from '../utils/weatherUtils.js';
import { useWeather } from '../context/WeatherContext.jsx';
import WeatherAnimation from '../components/WeatherAnimation.jsx';

export default function BackgroundWrapper({ children }) {
  const { weather, animationEnabled } = useWeather();
  const gradient = getWeatherBackground(weather?.weather?.[0]?.main);

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${gradient} px-6 py-6 md:px-4`}>
      {animationEnabled && <WeatherAnimation condition={weather?.weather?.[0]?.main} />}
      {children}
    </div>
  );
}
