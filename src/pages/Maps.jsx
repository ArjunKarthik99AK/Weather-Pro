import { FiMapPin, FiWind, FiSun } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeather } from '../context/WeatherContext.jsx';

const defaultCenter = [37.7749, -122.4194];
const defaultZoom = 10;
const overlayMap = {
  temperature: 'temp_new',
  wind: 'wind_new',
  radar: 'precipitation_new'
};

const layerStyles = {
  temperature: {
    pill: 'border-red-400/20 bg-red-500/10 text-red-200',
    iconBg: 'bg-red-500/15 text-red-300',
    gradient: 'from-red-700 via-red-600 to-amber-500',
    highlight: 'bg-red-500 text-slate-950 hover:bg-red-400'
  },
  wind: {
    pill: 'border-sky-400/20 bg-sky-500/10 text-sky-200',
    iconBg: 'bg-sky-500/15 text-sky-300',
    gradient: 'from-sky-700 via-cyan-600 to-blue-500',
    highlight: 'bg-sky-500 text-slate-950 hover:bg-sky-400'
  },
  radar: {
    pill: 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200',
    iconBg: 'bg-emerald-500/15 text-emerald-300',
    gradient: 'from-emerald-700 via-lime-500 to-emerald-400',
    highlight: 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
  }
};

function getOverlayUrl(layerKey, apiKey) {
  return `https://tile.openweathermap.org/map/${overlayMap[layerKey]}/{z}/{x}/{y}.png?appid=${apiKey}`;
}

function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, defaultZoom);
    }
  }, [center, map]);

  return null;
}

export default function Maps() {
  const { weather } = useWeather();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const center = weather?.coord ? [weather.coord.lat, weather.coord.lon] : defaultCenter;
  const [activeLayers, setActiveLayers] = useState({
    temperature: false,
    wind: false,
    radar: false
  });

  const overlayLayers = Object.entries(activeLayers)
    .filter(([, enabled]) => enabled)
    .map(([key]) => key);

  const mapItems = [
    { key: 'temperature', title: 'Temperature', icon: FiSun, label: 'Cloud heat map' },
    { key: 'wind', title: 'Wind', icon: FiWind, label: 'Velocity overlay' },
    { key: 'radar', title: 'Radar', icon: FiMapPin, label: 'Precipitation zones' }
  ];

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Maps</p>
            <h2 className="text-2xl font-semibold text-white">Satellite and radar view</h2>
          </div>
          <div className="inline-flex items-center gap-3 rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-200">
            <FiMapPin /> Live layer
          </div>
        </div>
        <div className="relative h-[540px] overflow-hidden rounded-[34px] bg-gradient-to-br from-sky-900 via-slate-950 to-slate-900 shadow-inner">
          {apiKey ? (
            <MapContainer
              center={center}
              zoom={defaultZoom}
              scrollWheelZoom
              zoomControl={false}
              className="h-full w-full rounded-[34px] bg-slate-950"
              style={{ backgroundColor: '#02111f' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                opacity={0.3}
              />
              {overlayLayers.map((layerKey) => (
                <TileLayer
                  key={layerKey}
                  url={getOverlayUrl(layerKey, apiKey)}
                  opacity={0.85}
                />
              ))}
              <MapUpdater center={center} />
              <ZoomControl position="topright" />
            </MapContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 text-center px-6 text-sm text-slate-300">
              OpenWeather API key is missing. Add <span className="font-semibold text-white">VITE_WEATHER_API_KEY</span> to your .env file.
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90" />
          <div className="relative flex h-full flex-col justify-end p-6">
            <div className="rounded-3xl bg-white/5 p-5 backdrop-blur-xl border border-white/10">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Interactive map</p>
              <p className="mt-2 text-lg font-semibold text-white">Forecast layers and weather station overlay</p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather Layers</p>
          <div className="mt-5 grid gap-4">
            {mapItems.map((item) => (
              <div key={item.key} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl p-3 ${layerStyles[item.key].iconBg}`}>
                    <item.icon />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleLayer(item.key)}
                  className={`rounded-3xl px-4 py-2 text-sm transition ${
                    activeLayers[item.key]
                      ? layerStyles[item.key].highlight
                      : 'bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {activeLayers[item.key] ? 'On' : 'Off'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
