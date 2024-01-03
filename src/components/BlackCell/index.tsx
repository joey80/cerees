import { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

/**
 * The dark cells that display the season and episode numbers
 */
function BlackCell({ children }: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className={`flex justify-center items-center border-t-0 border-l-0 h-12 w-12 border border-dashed border-gray-400 cell-bg text-white select-none ${styles.cell}`}>
      {children}
    </div>
  );
}

export { BlackCell };
