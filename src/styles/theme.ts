export const theme = {
  colors: {
    brand: '#EA5F09',
    tertiary: '#CBB6FF',
    neutral: '#F5E7D4',
    black: '#000000',
    secondary: '#A95C28',
    success: '#60B100',
    darkColor: '#594137',
    stroke: '#E1BFB2',
    background: '#FFFFFF',

    primary: '#EA5F09',
    primaryHover: '#C95008',
    accent: '#CBB6FF',
    surface: '#F5E7D4',
    surfacePlain: '#FFFFFF',
    text: '#594137',
    textMuted: 'rgb(89 65 55 / 82%)',
    border: '#E1BFB2',
    error: '#BA1A1A',
    errorSoft: '#E76F51',
    focus: 'rgb(234 95 9 / 28%)',
  },
  fonts: {
    montserrat: '"Montserrat", Arial, sans-serif',
    body: '"Montserrat", Arial, sans-serif',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  typography: {
    header1: {
      fontFamily: '"Montserrat", Arial, sans-serif',
      fontSize: '24px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '32px',
    },
    header2: {
      fontFamily: '"Montserrat", Arial, sans-serif',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '28px',
    },
    header3: {
      fontFamily: '"Montserrat", Arial, sans-serif',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 600,
      lineHeight: '24px',
    },
    body: {
      fontFamily: '"Montserrat", Arial, sans-serif',
      fontSize: '14px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
    },
    descriptive: {
      fontFamily: '"Montserrat", Arial, sans-serif',
      fontSize: '12px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '16px',
    },
  },
  layout: {
    contentMaxWidth: '1126px',
    mobileNavHeight: '78px',
  },
}

export type AppTheme = typeof theme
