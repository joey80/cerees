import { getCellColor } from '@/util';
import styles from './styles.module.scss';

/**
 * The legend that explains what each of the different colored cells represent
 */
function Legend() {
  const ratings: [number, string][] = [
    [8.6, 'great'],
    [7.6, 'good'],
    [6.6, 'ok'],
    [5.0, 'yawn'],
    [4.9, 'bad'],
    [parseInt('N/A', 10), 'no data'],
  ];

  return (
    <div className={`${styles.container} mb-4 text-black text-xs capitalize text-left`}>
      <div className="inline-flex">
        {ratings.map((elm, index) => (
          <div className={`inline-flex justify-center items-center h-12 w-12 ${getCellColor(elm[0])}`} key={index}>
            {elm[1]}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Legend };
