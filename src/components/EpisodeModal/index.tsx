import { PropsWithChildren } from 'react';

function EpisodeModal({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <div className="absolute bg-white overflow-hidden border-2 border-black top-0 mt-14 w-80 h-56 z-10 text-sm">{children}</div>;
}

export { EpisodeModal };
