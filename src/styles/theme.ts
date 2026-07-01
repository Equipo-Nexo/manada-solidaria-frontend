export const theme = {
  colors: {
    primary: '#A95C28',
    primaryHover: '#934e22',
    brand: '#EA5F09',
    secondary: '#DDF3E7',
    accent: '#F4A261',
    neutral: '#263238',
    background: '#FAF9F6',
    surface: '#F5E7D4',
    surfacePlain: '#FFFFFF',
    text: '#594137',
    textMuted: 'rgb(89 65 55 / 82%)',
    border: 'rgb(89 65 55 / 18%)',
    error: '#BA1A1A',
    errorSoft: '#E76F51',
    focus: 'rgb(169 92 40 / 35%)',
  },
  fonts: {
    body: '"Montserrat", Arial, sans-serif',
  },
  layout: {
    contentMaxWidth: '1126px',
    mobileNavHeight: '78px',
  },
}

export type AppTheme = typeof theme
