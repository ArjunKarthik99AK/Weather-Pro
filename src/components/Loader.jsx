import { motion } from 'framer-motion';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
};

const spinVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export default function Loader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl text-center"
    >
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-6"
      >
        <motion.div
          variants={spinVariants}
          animate="animate"
          className="h-16 w-16 rounded-full border-4 border-white/10 border-t-sky-400 shadow-lg"
        />
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-sm text-slate-100 font-medium"
      >
        Loading weather data...
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-xs text-slate-400 mt-2"
      >
        Connecting to OpenWeatherMap API
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="mt-6 flex justify-center gap-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scaleY: [1, 1.5, 1] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            className="h-1 w-1 rounded-full bg-sky-400"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
