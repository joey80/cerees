import testPattern from '@/images/testPattern.png';

/**
 * Test pattern image and message that shows when a tv series cannot be found
 */
function NotFound({ query }: { query: string }) {
  return (
    <>
      <h1 className="font-extrabold text-4xl text-white">Whoops! Not Found</h1>
      <p className="text-white text-sm max-w-4xl opacity-75 py-6">
        Sorry but it seems that we don&#39;t have data for the tv series <strong>{query}</strong>. Are you sure that the spelling is correct?
      </p>
      <img alt="tv test pattern" src={testPattern.src} width="50%" />
    </>
  );
}

export { NotFound };
