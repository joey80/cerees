import { IInput } from './types';

function Input(props: IInput) {
  return <input className="border" placeholder="tv show name" type="text" {...props} />;
}

export { Input };
