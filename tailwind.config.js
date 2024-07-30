/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#fdba74',   // orange-300
          default: '#f97316', // orange-500
          mid: '#ea580c',     // orange-600
          dark: '#ea580c',   // orange-700
        },
        slate: {
          lighter: '#cbd5e1',   // slate-300
          light: '#94a3b8',     // slate-400
          medium: '#475569',    // slate-600
          dark: '#334155',      // slate-700
          default: '#1e293b',   // slate-900
        },
        gray: {
          lighter: '#6b7280',   // gray-500
          light: '#4b5563',     // gray-600
          default: '#111827',   // gray-900
        }
      }
    },
  },
  plugins: [],
}

