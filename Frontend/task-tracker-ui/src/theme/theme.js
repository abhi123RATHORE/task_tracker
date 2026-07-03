import { createTheme } from '@mui/material/styles';

/**
 * Build an MUI theme that integrates with Tailwind's design tokens.
 * @param {'light'|'dark'} mode
 */
export const buildTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#6366f1',      // indigo-500
        light: '#818cf8',     // indigo-400
        dark: '#4f46e5',      // indigo-600
      },
      secondary: {
        main: '#8b5cf6',      // violet-500
        light: '#a78bfa',
        dark: '#7c3aed',
      },
      error: {
        main: '#ef4444',
      },
      warning: {
        main: '#f59e0b',
      },
      success: {
        main: '#10b981',
      },
      info: {
        main: '#3b82f6',
      },
      background: {
        default: mode === 'dark' ? '#0f172a' : '#f8fafc',
        paper: mode === 'dark' ? '#1e293b' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
        secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
      },
      divider: mode === 'dark' ? '#334155' : '#e2e8f0',
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
      h4: { fontWeight: 700, letterSpacing: '-0.02em' },
      h5: { fontWeight: 600, letterSpacing: '-0.01em' },
      h6: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.01em' },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '8px 20px',
            fontSize: '0.875rem',
            transition: 'all 0.2s ease',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
            },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            ...(mode === 'dark' && {
              backgroundImage: 'none',
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
            }),
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              transition: 'box-shadow 0.2s ease',
              '&.Mui-focused': {
                boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.12)',
              },
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
            transition: 'all 0.15s ease',
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            borderRadius: 12,
            boxShadow: mode === 'dark'
              ? '0 8px 30px rgba(0, 0, 0, 0.4)'
              : '0 8px 30px rgba(0, 0, 0, 0.08)',
            border: mode === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0',
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: '0.75rem',
            fontWeight: 500,
          },
        },
      },
    },
  });
