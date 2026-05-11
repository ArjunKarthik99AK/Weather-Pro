import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext.jsx';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
    >
      {theme === 'dark' ? <FiMoon /> : <FiSun />}
    </button>
  );
}
