export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#071120',
        sidebar: '#050d18',
        accent: '#8ab4ff',
        weather: '#7ceeff'
      },
      boxShadow: {
        glow: '0 25px 80px rgba(0, 0, 0, 0.18)'
      },
      backgroundImage: {
        'gradient-rain': 'linear-gradient(135deg, rgba(9,18,38,0.95), rgba(16,30,63,0.96))'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' }
        }
      }
    }
  },
  plugins: []
};
