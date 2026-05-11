import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Maps from './pages/Maps.jsx';
import History from './pages/History.jsx';
import Settings from './pages/Settings.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { WeatherProvider } from './context/WeatherContext.jsx';

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="maps" element={<Maps />} />
              <Route path="history" element={<History />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
