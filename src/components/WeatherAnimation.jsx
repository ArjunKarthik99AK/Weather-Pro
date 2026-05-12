import { motion } from 'framer-motion';
import { useMemo } from 'react';

const rainVariants = {
  animate: (i) => ({
    y: [0, 80],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      delay: i * 0.15,
      ease: 'easeIn'
    }
  })
};

const snowVariants = {
  animate: (i) => ({
    y: [0, 100],
    x: [0, Math.sin(i) * 20, 0],
    rotate: [0, 360],
    opacity: [0, 0.8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      delay: i * 0.2,
      ease: 'easeInOut'
    }
  })
};

const cloudVariants = {
  animate: (i) => ({
    x: [0, 30, 0],
    transition: {
      duration: 6 + i * 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  })
};

const glowVariants = {
  animate: {
    opacity: [0.4, 0.8, 0.4],
    scale: [1, 1.1, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export default function WeatherAnimation({ condition }) {
  const animationType = useMemo(() => {
    if (!condition) return 'clear';
    const lower = condition.toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle')) return 'rain';
    if (lower.includes('snow')) return 'snow';
    if (lower.includes('thunder')) return 'thunderstorm';
    if (lower.includes('cloud')) return 'clouds';
    if (lower.includes('mist') || lower.includes('fog')) return 'fog';
    return 'clear';
  }, [condition]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      {/* Rain Animation */}
      {animationType === 'rain' && (
        <div className="absolute inset-0">
          {Array.from({ length: 24 }).map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              custom={i}
              animate="animate"
              variants={rainVariants}
              className="absolute left-[8%] top-0 w-1 h-6 bg-gradient-to-b from-sky-300/80 to-sky-300/0 rounded-full"
              style={{ left: `${(i % 8) * 12.5}%` }}
            />
          ))}
        </div>
      )}

      {/* Snow Animation */}
      {animationType === 'snow' && (
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`snow-${i}`}
              custom={i}
              animate="animate"
              variants={snowVariants}
              className="absolute w-2 h-2 bg-white rounded-full blur-sm"
              style={{ left: `${Math.random() * 100}%`, top: `-20px` }}
            />
          ))}
        </div>
      )}

      {/* Thunderstorm Animation */}
      {animationType === 'thunderstorm' && (
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundColor: ['rgba(0,0,0,0)', 'rgba(100,150,255,0.15)', 'rgba(0,0,0,0)'],
              transition: { duration: 6, repeat: Infinity, times: [0, 0.5, 1] }
            }}
            className="absolute inset-0"
          />
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`thunder-${i}`}
              custom={i}
              animate="animate"
              variants={rainVariants}
              className="absolute left-[8%] top-0 w-0.5 h-8 bg-gradient-to-b from-cyan-200/90 to-cyan-200/0"
              style={{ left: `${(i % 8) * 12.5}%` }}
            />
          ))}
        </div>
      )}

      {/* Cloud Animation */}
      {animationType === 'clouds' && (
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`cloud-${i}`}
              custom={i}
              animate="animate"
              variants={cloudVariants}
              className="absolute top-[20%] w-32 h-16 bg-gradient-to-r from-slate-400/30 to-slate-500/20 rounded-full blur-2xl"
              style={{ left: `${i * 35}%` }}
            />
          ))}
        </div>
      )}

      {/* Fog/Mist Animation */}
      {animationType === 'fog' && (
        <div className="absolute inset-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`fog-${i}`}
              animate={{
                opacity: [0.2, 0.5, 0.2],
                y: [0, -10, 0],
                transition: {
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              className="absolute inset-0 bg-gradient-to-b from-slate-400/20 via-slate-500/10 to-transparent"
            />
          ))}
        </div>
      )}

      {/* Sunny Glow Animation */}
      {animationType === 'clear' && (
        <motion.div
          animate="animate"
          variants={glowVariants}
          className="absolute top-10 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-3xl"
        />
      )}
    </div>
  );
}
