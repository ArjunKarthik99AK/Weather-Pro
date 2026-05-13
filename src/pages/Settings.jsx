import { useTheme } from '../context/ThemeContext.jsx';
import { useWeather } from '../context/WeatherContext.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import UnitToggle from '../components/UnitToggle.jsx';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { unit, toggleUnit, clearHistory, clearFavorites, animationEnabled, toggleAnimation } = useWeather();

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Settings</p>
            <h2 className="text-2xl font-semibold text-white">System preferences</h2>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Theme</p>
                <p className="mt-2 text-sm text-slate-300">Switch between dark and light UI.</p>
              </div>
              <ThemeToggle />
            </div>
            <button onClick={toggleTheme} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">Toggle theme mode</button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Temperature Unit</p>
                <p className="mt-2 text-sm text-slate-300">Choose your measurement system.</p>
              </div>
              <UnitToggle />
            </div>
            <button onClick={toggleUnit} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">Switch to {unit === 'metric' ? 'Imperial' : 'Metric'}</button>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather Animation</p>
                <p className="mt-2 text-sm text-slate-300">Enable or disable visual weather effects.</p>
              </div>
              <button onClick={toggleAnimation} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">{animationEnabled ? 'Disable' : 'Enable'}</button>
            </div>
            <p className="text-sm text-slate-400">This setting controls CSS weather animations across the dashboard.</p>
          </div>
        </div>
      </section>

      <aside className="space-y-6">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Notifications</p>
          <ul className="mt-4 space-y-4 text-sm text-slate-300">
            <li className="rounded-3xl bg-slate-950/70 p-4">Severe weather alerts placeholder</li>
            <li className="rounded-3xl bg-slate-950/70 p-4">Daily briefing schedule placeholder</li>
            <li className="rounded-3xl bg-slate-950/70 p-4">Precipitation alerts placeholder</li>
          </ul>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">System Controls</p>
          <div className="mt-5 grid gap-3">
            <button onClick={clearHistory} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">Clear search history</button>
            <button onClick={clearFavorites} className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-200 hover:bg-white/10">Clear favorites</button>
          </div>
        </section>
      </aside>
    </div>
  );
}
