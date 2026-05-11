import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentWeather, getForecast, getWeatherByCoords } from '../services/weatherService.js';
import useLocalStorage from '../hooks/useLocalStorage.js';
import { defaultCities } from '../utils/constants.js';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState('San Francisco');
  const [unit, setUnit] = useLocalStorage('weatherpro-unit', 'metric');
  const [favorites, setFavorites] = useLocalStorage('weatherpro-favorites', []);
  const [history, setHistory] = useLocalStorage('weatherpro-history', []);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      setLoading(true);
      setError(null);
      const current = await getCurrentWeather(location, unit === 'imperial' ? 'imperial' : 'metric');
      const forecastData = await getForecast(location, unit === 'imperial' ? 'imperial' : 'metric');
      setWeather(current);
      setForecast(forecastData);
      setCity(`${current.name}, ${current.sys.country}`);
      updateHistory(current.name);
    } catch (err) {
      setError('Unable to retrieve weather data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getWeatherByCoords(lat, lon, unit === 'imperial' ? 'imperial' : 'metric');
      const forecastData = await getForecast(response.name, unit === 'imperial' ? 'imperial' : 'metric');
      setWeather(response);
      setForecast(forecastData);
      setCity(`${response.name}, ${response.sys.country}`);
      updateHistory(response.name);
    } catch (err) {
      setError('Geolocation weather failed.');
    } finally {
      setLoading(false);
    }
  };

  const updateHistory = (name) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== name);
      const next = [name, ...filtered].slice(0, 5);
      return next;
    });
  };

  const addFavorite = (name) => {
    setFavorites((prev) => {
      if (prev.includes(name)) return prev;
      return [name, ...prev].slice(0, 6);
    });
  };

  const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((item) => item !== name));
  };

  const clearHistory = () => setHistory([]);
  const clearFavorites = () => setFavorites([]);

  const toggleUnit = () => setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));

  useEffect(() => {
    if (!weather) return;
    fetchWeather(weather.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const popularOptions = useMemo(() => defaultCities, []);

  return (
    <WeatherContext.Provider
      value={{
        city,
        unit,
        favorites,
        history,
        weather,
        forecast,
        loading,
        error,
        fetchWeather,
        fetchByCoords,
        addFavorite,
        removeFavorite,
        clearHistory,
        clearFavorites,
        toggleUnit,
        popularOptions,
        setCity
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
