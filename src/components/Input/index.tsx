import { SearchIcon } from '../Svgs/Search';
import { IInput } from './types';

/**
 * Search input to query the tv series
 */
function Input(props: IInput) {
  return (
    <div className="relative">
      <input className="custom-shadow w-full py-2 pl-9 pr-2" placeholder="tv show name" type="text" {...props} />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
    </div>
  );
}

export { Input };
