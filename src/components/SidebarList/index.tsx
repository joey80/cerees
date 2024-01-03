import { PropsWithChildren } from 'react';
import { Close } from '../Svgs/Close';
import { Film } from '../Svgs/Film';
import { ISidebarList } from './types';

/**
 * The list of recent items that show inside of the sidebar
 */
function SidebarList({ children, items, onClick, onDelete }: PropsWithChildren<ISidebarList>) {
  return (
    <>
      <span className="flex font-medium text-sm text-gray-300 px-4 my-4 uppercase">{children}</span>
      <ul className="flex flex-col w-full">
        {items.map(elm => (
          <li className="my-px" key={elm}>
            <div className="flex flex-row justify-between items-center pr-2">
              <button className="flex items-center h-10 px-2 rounded-lg text-left text-gray-300 hover:bg-gray-100 hover:text-gray-700" onClick={() => onClick(elm)}>
                <Film color="currentColor" />
                <span className="ml-3">{elm}</span>
              </button>
              <button onClick={() => onDelete(elm)}>
                <Close />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export { SidebarList };
