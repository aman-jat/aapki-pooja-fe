'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#f07eca',
      300: '#f061b9',
      400: '#F06292',
      main: '#E91E63',
      600: '#D81B60',
      800: '#C2185B',
      900: '#AD1457',
      dark: '#C2185B',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1a1a2e',
      light: '#4a4a6a',
      dark: '#0d0d1a',
    },
    background: {
      default: '#FFFBFD',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#4a4a6a',
    },
    success: { main: '#4CAF50' },
    warning: { main: '#FF9800' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h1: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h2: { fontFamily: "'Playfair Display', serif", fontWeight: 700 },
    h3: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
    h4: { fontFamily: "'Playfair Display', serif", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
        },
        contained: {
          boxShadow: '0 4px 16px rgba(233,30,99,0.3)',
          '&:hover': { boxShadow: '0 6px 24px rgba(233,30,99,0.4)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontFamily: "'Poppins', sans-serif", fontWeight: 600 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          '&:hover': { boxShadow: '0 8px 30px rgba(233,30,99,0.2)' },
        },
      },
    },
  },
});

export default theme;
