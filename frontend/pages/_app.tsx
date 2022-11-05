import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {CssBaseline, ThemeProvider} from '@mui/material'
import {theme} from "../utils/theme";
import createEmotionCache from "../utils/theme.utils";
import {CacheProvider, EmotionCache} from "@emotion/react";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import {getApolloClient} from "../utils/apollo.utils";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps{
    emotionCache?:EmotionCache
}

const client = getApolloClient();

export default function App({ Component, emotionCache=clientSideEmotionCache,pageProps }: MyAppProps) {
  return (
      <ApolloProvider client={client}>
          <CacheProvider value={emotionCache}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
          </CacheProvider>
      </ApolloProvider>
  )
}


