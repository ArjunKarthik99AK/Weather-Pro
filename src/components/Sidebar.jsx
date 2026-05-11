import { NavLink } from 'react-router-dom';
import { FiGrid, FiMap, FiClock, FiSettings } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/' },
  { label: 'Maps', icon: FiMap, to: '/maps' },
  { label: 'History', icon: FiClock, to: '/history' },
  { label: 'Settings', icon: FiSettings, to: '/settings' }
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 z-20 h-screen w-[260px] bg-[#050d18]/90 backdrop-blur-xl border-r border-white/10 p-6 text-white">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl text-sky-200 shadow-glow">
          WP
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">WeatherPro</p>
          <p className="text-sm text-slate-300">Local Intelligence</p>
        </div>
      </div>

      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-4 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-white/10 border-l-4 border-blue-400 text-white'
                    : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <Icon className="text-xl" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
