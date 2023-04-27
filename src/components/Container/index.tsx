import { PropsWithChildren } from 'react';

function Container({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <div className="inline-block p-3 rounded container-bg">{children}</div>;
}

export { Container };
