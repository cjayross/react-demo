import { createTheme, PaletteOptions, Theme } from '@mui/material/styles';

const Colors: PaletteOptions = {
  mode: 'light',

  background: {
    default: '#fffdf9',
    paper: '#fffdf9',
  },

  primary: {
    main: '#191919',
  },

  secondary: {
    main: '#ed574a',
  },

  success: {
    main: '#4bb543',
  },
};

const Typography = {
  h1: {
    fontWeight: 500,
    fontSize: 35,
    letterSpacing: '-0.24px',
  },

  h2: {
    fontWeight: 500,
    fontSize: 29,
    letterSpacing: '-0.24px',
  },

  h3: {
    fontWeight: 500,
    fontSize: 24,
    letterSpacing: '-0.06px',
  },

  h4: {
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: '-0.06px',
  },

  h5: {
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: '-0.05px',
  },

  h6: {
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: '-0.05px',
  },

  overline: {
    fontWeight: 500,
  },
};

const Global: any = (theme: Theme) => ({
  '*': {
    position: 'relative',
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  html: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    scrollBehavior: 'smooth',
  },

  body: {
    backgroundColor: theme.palette.background.paper,
  },

  a: {
    textDecoration: 'none',
  },
});

const theme = createTheme({
  palette: Colors,
  typography: Typography,

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '24px',
        },
      },

      defaultProps: {
        disableElevation: true,
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#B8B8B4',
        },
      },
    },

    MuiGrid: {
      styleOverrides: {
        root: {
          maxWidth: 'unset',
        },

        item: {
          maxWidth: 'unset',
        },
      },
    },
  },

  mixins: {
    toolbar: {
      minHeight: '56px',
    },
  },
});

export default theme;
export { Global };
