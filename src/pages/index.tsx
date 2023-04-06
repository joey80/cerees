import Head from 'next/head';
import { IndexContainer } from '@/containers/Index';

function Home() {
  return (
    <>
      <Head>
        <title>Cerees | Joeyui.com</title>
      </Head>
      <main>
        <IndexContainer />
      </main>
    </>
  );
}

export default Home;
