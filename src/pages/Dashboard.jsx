import BackgroundWrapper from '../components/BackgroundWrapper.jsx';
import ClockGreeting from '../components/ClockGreeting.jsx';
import CurrentWeatherCard from '../components/CurrentWeatherCard.jsx';
import WeatherStats from '../components/WeatherStats.jsx';
import HourlyForecast from '../components/HourlyForecast.jsx';
import WeatherChart from '../components/WeatherChart.jsx';
import FiveDayForecast from '../components/FiveDayForecast.jsx';
import RadarCard from '../components/RadarCard.jsx';
import SmartSuggestion from '../components/SmartSuggestion.jsx';
import SearchHistory from '../components/SearchHistory.jsx';
import { useWeather } from '../context/WeatherContext.jsx';
import Loader from '../components/Loader.jsx';

export default function Dashboard() {
  const { loading, error } = useWeather();

  return (
    <BackgroundWrapper>
      <div className="mx-auto grid max-w-7xl gap-6">
        <ClockGreeting />
        {loading && <Loader />}
        {error && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-100">{error}</div>
        )}
        <CurrentWeatherCard />
        <WeatherStats />
        <HourlyForecast />
        <div className="grid gap-6 xl:grid-cols-2">
          <WeatherChart />
          <FiveDayForecast />
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <RadarCard />
          <SmartSuggestion />
        </div>
        <SearchHistory />
      </div>
    </BackgroundWrapper>
  );
}
