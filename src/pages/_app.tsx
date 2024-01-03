import App, { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css';

const queryClient = new QueryClient();

function AppRoot({ Component, pageProps }: AppProps) {
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

AppRoot.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // if the route is empty or doesn't exist default to "/"" the root url
  if (appContext.ctx.res?.statusCode === 404) {
    // get any incoming query params. We need to add a dummy host to help parse the params
    const query = new URL(`https://notfound.com/${appContext.router.asPath}`);

    // redirect to / with the original query params
    appContext.ctx.res.writeHead(302, {
      Location: `/${query.search}`,
    });

    appContext.ctx.res.end();
    return;
  }

  return { ...appProps };
};

export default AppRoot;
