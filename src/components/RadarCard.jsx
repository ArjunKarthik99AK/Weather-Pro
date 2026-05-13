import { useWeather } from '../context/WeatherContext.jsx';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

const defaultCenter = [37.7749, -122.4194];
const defaultZoom = 8;

function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, defaultZoom);
    }
  }, [center, map]);

  return null;
}

export default function RadarCard() {
  const { weather } = useWeather();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const center = weather?.coord ? [weather.coord.lat, weather.coord.lon] : defaultCenter;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather Radar</p>
        <h3 className="text-xl font-semibold text-white">Precipitation Map</h3>
      </div>
      <div className="relative h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-900 via-slate-950 to-slate-900 shadow-inner">
        {apiKey ? (
          <MapContainer
            center={center}
            zoom={defaultZoom}
            scrollWheelZoom={false}
            zoomControl={false}
            className="h-full w-full rounded-2xl bg-slate-950"
            style={{ backgroundColor: '#02111f' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              opacity={0.2}
            />
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}
              opacity={0.8}
            />
            <MapUpdater center={center} />
          </MapContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-center px-4 text-xs text-slate-300">
            API key missing. Add <span className="font-semibold text-white">VITE_WEATHER_API_KEY</span> to .env.
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90" />
      </div>
    </div>
  );
}