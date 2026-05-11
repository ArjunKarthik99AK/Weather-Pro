import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiGrid, FiMap, FiClock, FiSettings } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/' },
  { label: 'Maps', icon: FiMap, to: '/maps' },
  { label: 'History', icon: FiClock, to: '/history' },
  { label: 'Settings', icon: FiSettings, to: '/settings' }
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setOpen(true)} className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10">
        <FiMenu />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-950/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-white">WeatherPro</div>
            <button onClick={() => setOpen(false)} className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 text-slate-200 hover:bg-white/10">
              <FiX />
            </button>
          </div>
          <nav className="mt-10 space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-200 hover:bg-white/10"
                >
                  <Icon className="text-xl" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
