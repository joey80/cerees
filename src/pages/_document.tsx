import { Html, Head, Main, NextScript } from 'next/document';

function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Displays ratings for tv shows for every episode for every season" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400;600;800&display=swap" rel="stylesheet" />
      </Head>
      <body className="svg-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
