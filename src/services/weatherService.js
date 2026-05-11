import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const client = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

export async function getCurrentWeather(city, unit = 'metric') {
  const response = await client.get('/weather', {
    params: {
      q: city,
      units: unit
    }
  });
  return response.data;
}

export async function getForecast(city, unit = 'metric') {
  const response = await client.get('/forecast', {
    params: {
      q: city,
      units: unit
    }
  });
  return response.data;
}

export async function getWeatherByCoords(lat, lon, unit = 'metric') {
  const response = await client.get('/weather', {
    params: {
      lat,
      lon,
      units: unit
    }
  });
  return response.data;
}
