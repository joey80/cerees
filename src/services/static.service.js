import { data } from './static/static';

export const getStaticData = (term) => {
  for (const [key, value] of Object.entries(data)) {
    if (key === term.toLowerCase()) {
      return value;
    }
  }
  return null;
};
