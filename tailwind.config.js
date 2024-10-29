/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        on_desktop: { "min": '1400px' },
        on_mobile: { "max": '1399px' },
      },
      backgroundColor: {
        DEFAULT: '#1a1a1a',
        menuBG: '#404040',
        announcementYellow: '#ffcc00',
      },
      colors: {
        transparent: 'transparent',
      },
      textColor: {
        DEFAULT: '#c6c6c6',
        def: '#c6c6c6',
        spending: '#ed0000',
        income: '#00dc00',
      },
      fontSize: {
        DEFAULT: '1.5rem',
        mobile: '1.25rem',
        title: '5rem',
        xxlheader: '4.25rem',
        xlheader: '3.75rem',
        lheader: '3.25rem',
        header: '2.75rem',
        subheader: '2.5rem',
        xxl: '2rem',
        xl: '1.75rem',
        l: '1.5rem',
        m: '1.25rem',
        s: '1rem',
        pageTitle: '3.25rem',
        subTitle: '3rem',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        menu: '1rem',
      },
      margin: {
        DEFAULT: '1rem',
        main: '5rem',
      },
      padding: {
        DEFAULT: '1rem',
        main: '5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
