import { useMemo } from 'react';
import { GlobalStyles } from '@mui/material';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import clientEmotionCache from '@/emotion-cache';
import { Global, Colors, Typography } from '@/styles/global';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function App(props: ExtendedAppProps) {
  const {
    Component,
    pageProps,
    emotionCache = clientEmotionCache,
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = useMemo(
    () =>
      createTheme({
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
      }),
    []
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta property="og:title" content="Demo" />
        <meta property="og:type" content="website" />
        <title>Demo</title>
      </Head>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={Global(theme) as any} />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
}
