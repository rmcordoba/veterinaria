import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        warmth: {
          50: '#f8f9fa',
          100: '#f0f4f8',
          200: '#d4e1f0',
          300: '#a8c5e0',
          400: '#7ca8d4',
          500: '#5a8fc7',
          600: '#4578b8',
          700: '#3a5f8f',
          800: '#2f4b6f',
          900: '#1f2d42',
        },
        nature: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        care: {
          50: '#fef3f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
  plugins: [],
}
export default config
