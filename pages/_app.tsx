import { GlobalStyles } from '@mui/material';
import { ApolloProvider, ApolloClient } from '@apollo/client';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import theme, { Global } from '@/styles/theme';
import createEmotionCache from '@/emotion-cache';
import clientApolloClient from '@/apollo-client';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
  apolloClient?: ApolloClient<unknown>;
  Component: NextPageWithLayout;
}

const clientEmotionCache = createEmotionCache();

export default function App(props: ExtendedAppProps) {
  const {
    Component,
    pageProps,
    emotionCache = clientEmotionCache,
    apolloClient = clientApolloClient,
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
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
              <GlobalStyles styles={Global(theme)} />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </LocalizationProvider>
        </SnackbarProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
