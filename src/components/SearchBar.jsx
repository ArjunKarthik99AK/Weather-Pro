import { useEffect, useMemo, useState } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext.jsx';

export default function SearchBar() {
  const { fetchWeather, fetchByCoords, popularOptions, setCity } = useWeather();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);

  const suggestions = useMemo(() => {
    if (!query) return popularOptions;
    return popularOptions.filter((item) => item.toLowerCase().includes(query.toLowerCase()));
  }, [query, popularOptions]);

  useEffect(() => {
    const handleOutside = () => setActive(false);
    window.addEventListener('click', handleOutside);
    return () => window.removeEventListener('click', handleOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchWeather(query.trim());
    setCity(query.trim());
    setQuery('');
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      fetchByCoords(position.coords.latitude, position.coords.longitude);
    });
  };

  return (
    <div className="relative w-full max-w-xl">
      <form onSubmit={handleSearch} className="flex items-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-4 py-3 shadow-glow">
        <FiSearch className="text-slate-300" />
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(true);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setActive(true);
          }}
          placeholder="Search city..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
        <button type="button" onClick={handleGeolocate} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-200 hover:bg-white/10">
          <FiMapPin />
        </button>
      </form>
      {active && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-3 rounded-3xl border border-white/10 bg-[#071120]/95 p-3 shadow-2xl backdrop-blur-xl">
          {suggestions.slice(0, 5).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                fetchWeather(item);
                setCity(item);
                setQuery('');
                setActive(false);
              }}
              className="w-full rounded-2xl px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
