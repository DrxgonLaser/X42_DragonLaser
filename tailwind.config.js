/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['"Nasalization"', 'sans-serif'],
        mono:    ['"Nasalization"', 'monospace'],
      },
      colors: {
        bg:      '#070308',
        surface: '#0F0612',
        dp:      '#1D0033',   // deep purple base
        mid:     '#4A0080',   // mid purple
        vivid:   '#9200FF',   // vibrant accent
        electric:'#9200FF',   // electric highlight
        magenta: '#9200FF',   // contrasting pop
        light:   '#EDE6F5',   // near-white
        muted:   '#7A6882',   // muted text
      },
    },
  },
  plugins: [],
}
