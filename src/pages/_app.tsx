import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}

export default App;
