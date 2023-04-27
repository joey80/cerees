import { PropsWithChildren } from 'react';

function BlackCell({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <div className="flex justify-center items-center border-t-0 border-l-0 h-12 w-12 border border-dashed border-gray-400 container-bg text-white">{children}</div>;
}

export { BlackCell };
