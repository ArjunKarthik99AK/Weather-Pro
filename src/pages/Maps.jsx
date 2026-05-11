import { FiMapPin, FiWind, FiSun } from 'react-icons/fi';

export default function Maps() {
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
        <div className="relative h-[540px] overflow-hidden rounded-[34px] bg-slate-950/70">
          {/* OPENWEATHERMAP RADAR API INTEGRATION */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529253355930-301cf346cec9?auto=format&fit=crop&w=1280&q=80')] bg-cover bg-center opacity-30" />
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
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Satellite Preview</p>
              <p className="text-lg font-semibold text-white">Cloud cover overview</p>
            </div>
            <span className="rounded-3xl bg-slate-950/70 px-4 py-2 text-sm text-slate-200">Realtime</span>
          </div>
          <div className="h-72 rounded-3xl bg-[radial-gradient(circle_at_top,rgba(124,238,255,0.16),transparent_30%),linear-gradient(180deg,rgba(15,23,42,0.9),rgba(5,11,24,0.95))]" />
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Weather Layers</p>
          <div className="mt-5 grid gap-4">
            {[
              { title: 'Temperature', icon: FiSun, label: 'Cloud heat map' },
              { title: 'Wind', icon: FiWind, label: 'Velocity overlay' },
              { title: 'Radar', icon: FiMapPin, label: 'Precipitation zones' }
            ].map((item) => (
              <div key={item.title} className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-slate-900/70 p-3 text-sky-200">
                    <item.icon />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
                <button className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Toggle</button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Open weather</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Map ecosystem</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">The maps page provides a premium weather operations view that can integrate OpenWeatherMap radar API layers and satellite imagery over time.</p>
        </section>
      </div>
    </div>
  );
}
