# WeatherPro — Local Intelligence

A premium, multi-page React dashboard for weather intelligence with glassmorphism styling and responsive layout.

## Features

- City search with suggestions
- Geolocation weather lookup
- Current weather hero card
- Hourly forecast
- 5-day forecast
- Weather chart using Recharts
- Dashboard-style map / radar placeholder
- Smart weather suggestions
- Favorites management
- Search history persistence
- Celsius / Fahrenheit toggle
- Dark / light theme support
- Live clock and dynamic greeting
- Responsive sidebar and mobile navigation
- LocalStorage persistence
- Smooth Framer Motion transitions

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- Recharts
- React Icons
- React Router DOM
- Context API
- LocalStorage

## Folder Structure

```
src/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── services/
├── utils/
├── App.jsx
├── main.jsx
└── index.css
```

## Setup

1. Copy `.env.example` to `.env`.
2. Add your OpenWeatherMap API key to `.env`:

```bash
VITE_WEATHER_API_KEY=your_api_key_here
```

3. Install dependencies:

```bash
npm install
```

4. Start the dev server:

```bash
npm run dev
```

5. Open the local Vite URL shown in the terminal.

## Deployment

Build the production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Notes

- This app uses OpenWeatherMap for weather and forecast data.
- Favorites and search history persist in LocalStorage.
- The UI is designed to match the premium glassmorphism dashboard style.
