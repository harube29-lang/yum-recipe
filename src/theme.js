import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5A3C',
      light: '#C4956A',
      dark: '#5C3220',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7A9E7E',
      light: '#A8C5AB',
      dark: '#4E7254',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFF8F0',
      paper: '#ffffff',
    },
    accent: {
      orange: '#FF6B35',
    },
    text: {
      primary: '#3D2314',
      secondary: '#7A5C4A',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem', fontWeight: 600 },
    h3: { fontSize: '1.25rem', fontWeight: 600 },
    body1: { fontSize: '1rem', fontWeight: 400 },
    body2: { fontSize: '0.875rem', fontWeight: 400 },
    caption: { fontSize: '0.75rem', fontWeight: 400 },
  },
  spacing: 8,
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(61, 35, 20, 0.08)',
        },
      },
    },
  },
})

export default theme
