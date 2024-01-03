import { PropsWithChildren } from 'react';
import { ISidebar } from './types';
import styles from './styles.module.scss';

/**
 * The left sidebar
 */
function Sidebar({ children, search }: PropsWithChildren<ISidebar>) {
  return (
    <aside className={`sidebar bg-primary w-full md:w-64 py-4 px-2 shadow  ${styles.sidebar}`}>
      <div className="font-extrabold text-3xl text-center color-logo">cerees.</div>
      <div className="sidebar-header flex items-center py-4">{search}</div>
      <div className="sidebar-content">{children}</div>
    </aside>
  );
}

export { Sidebar };
