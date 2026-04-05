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
        dp:      '#38173A',   // deep purple base
        mid:     '#6A1F78',   // mid purple
        vivid:   '#A030C0',   // vibrant accent
        electric:'#CC44FF',   // electric highlight
        magenta: '#FF33CC',   // contrasting pop
        light:   '#EDE6F5',   // near-white
        muted:   '#7A6882',   // muted text
      },
    },
  },
  plugins: [],
}
