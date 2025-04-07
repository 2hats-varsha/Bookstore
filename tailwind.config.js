/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#4D2C5E',
        secondary: '#FF7426',
        white: '#fff',
        black: '#000',
        gray: '#707070',
        blue: '#0F335E',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      fontSize: {
        h1: '4.3125rem',
        h2: '50px',
        h3: '40px',
        h4: '30px',
        h5: '28px',
        h6: '24px',
        p: '16px',
        xxs: '10px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        md: '18px',
        lg: '20px',
        xl: '22px',
        '2xl': '24px',
        '3xl': '26px',
        '4xl': '28px',
        '5xl': '30px',
        '6xl': '32px',
        '7xl': '34px',
        '8xl': '36px',
        '9xl': '38px',
        '10xl': '40px',
        '11xl': '42px',
        '12xl': '44px',
        '13xl': '46px',
        '14xl': '48px',
        '15xl': '50px',
        '16xl': '52px',
        '17xl': '54px',
        '18xl': '56px',
        '19xl': '58px',
        '20xl': '60px',
      },
      fontWeight: {
        regular: '600',
        medium: '500',
        semibold: '700',
        bold: '800',
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          sm: '100%',
          md: '540px',
          lg: '720px',
          xl: '960px',
          '2xl': '1140px',
          '3xl': '1550px',
        },
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': [
          {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '600',
            fontDisplay: 'swap',
            src: "url('../fonts/Roboto-Regular.woff2') format('woff2')",
          },
          {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '500',
            fontDisplay: 'swap',
            src: "url('../fonts/Roboto-Medium.woff2') format('woff2')",
          },
          {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '700',
            fontDisplay: 'swap',
            src: "url('../fonts/Roboto-SemiBold.woff2') format('woff2')",
          },
          {
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: '800',
            fontDisplay: 'swap',
            src: "url('../fonts/Roboto-Bold.woff2') format('woff2')",
          },
         
          {
            fontFamily: 'icomoon',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontDisplay: 'block',
            src: `
              url('../icons/icomoon.eot?psrmvm');
              url('../icons/icomoon.eot?psrmvm#iefix') format('embedded-opentype'),
              url('../icons/icomoon.ttf?psrmvm') format('truetype'),
              url('../icons/icomoon.woff?psrmvm') format('woff'),
              url('../icons/icomoon.svg?psrmvm#icomoon') format('svg')
            `,
          },
        ],
        body: {
          fontFamily: 'Roboto, sans-serif',
        },
      });
    }),
  ],
};
