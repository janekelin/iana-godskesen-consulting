import Typography from 'typography';

const typography = new Typography({
  scaleRatio: 3,
  headerFontFamily: ['Raleway', 'Verdana', 'Helvetica', 'sans-serif'],
  bodyFontFamily: ['Raleway', 'Verdana', 'Helvetica', 'sans-serif'],
  googleFonts: [
    {
      name: 'Raleway',
      styles: ['200', '300', '400'],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      ...adjustFontSizeTo('32px'),
      lineHeight: 1,
      marginTop: rhythm(1),
    },
    strong: {
      fontWeight: 'normal',
    },
    i: {
      fontStyle: 'normal',
    },
    'footer p': {
      marginBottom: rhythm(0.5),
      marginTop: rhythm(0.5),
    },
    ul: {
      marginBottom: 0,
      marginLeft: 0,
    },
    li: {
      marginBottom: 0,
    },
  }),
});

export const { scale, rhythm, options } = typography;
export default typography;
