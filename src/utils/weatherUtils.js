export function formatTemperature(value, unit) {
  if (value === null || value === undefined) return '--';
  if (unit === 'imperial') {
    return `${Math.round(value)}°F`;
  }
  return `${Math.round(value)}°C`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export function getWeatherBackground(main) {
  switch (main) {
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      return 'from-slate-900 via-slate-950 to-slate-900';
    case 'Snow':
      return 'from-slate-600 via-slate-800 to-slate-950';
    case 'Clouds':
      return 'from-slate-900 via-slate-950 to-slate-900';
    default:
      return 'from-sky-900 via-blue-950 to-slate-950';
  }
}

export function getSuggestion(main) {
  if (!main) return 'Check the weather recommendations for your day.';
  if (main === 'Rain' || main === 'Drizzle') return 'Carry an umbrella ☔';
  if (main === 'Snow') return 'Dress warm and stay cozy 🧣';
  if (main === 'Clear') return 'Perfect weather for outdoor plans 🌤️';
  if (main === 'Clouds') return 'Keep your layers handy ☁️';
  if (main === 'Thunderstorm') return 'Stay indoors and stay safe ⚡';
  if (main === 'Mist' || main === 'Fog' || main === 'Haze') return 'Watch the road in low visibility 🌫️';
  return 'Enjoy the day with a weather smart plan.';
}
