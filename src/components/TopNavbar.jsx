import { FiSearch, FiBell, FiSun, FiMoon, FiSettings } from 'react-icons/fi';
import SearchBar from './SearchBar.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

export default function TopNavbar() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-10 bg-bg/90 border-b border-white/10 backdrop-blur-xl px-6 py-5 md:px-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-xl text-sky-200 shadow-glow">
            {theme === 'dark' ? <FiMoon /> : <FiSun />}
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Weather Pro</p>
            <p className="text-sm text-slate-300">Local Intelligence</p>
          </div>
        </div>

        <SearchBar />

        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
            <FiBell />
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
            <FiSettings />
          </button>
        </div>
      </div>
    </header>
  );
}
