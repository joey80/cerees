import { useCallback, useEffect, useState } from 'react';
import { FastAverageColor, FastAverageColorResult } from 'fast-average-color';

const defaultValues: FastAverageColorResult = {
  rgb: '',
  rgba: '',
  hex: '',
  hexa: '',
  value: [0, 0, 0, 0],
  isDark: false,
  isLight: false,
};

/**
 * Custom hook that returns the average color from an image
 * @param link - http link to image src
 */
function useAverageColor(link: string) {
  const [colorData, setColorData] = useState(defaultValues);

  const determineColor = useCallback(async () => {
    try {
      const fac = new FastAverageColor();
      const colorData = await fac.getColorAsync(link);
      setColorData(colorData);
    } catch (error) {
      console.log(error);
    }
  }, [link]);

  useEffect(() => {
    if (link) {
      determineColor();
    }
  }, [determineColor, link]);

  return colorData;
}

export { useAverageColor };
