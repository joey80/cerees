import { getBlankCellCount, getCellColor, getTheMostEpisodes } from './index';
import cheersData from './mockData/cheers.json';
import simpsonsData from './mockData/simpsons.json';

describe('getBlankCellCount', () => {
  it('returns the correct amount of blank cells needed for that season', () => {
    const assert1 = getBlankCellCount(cheersData.results[0], 26);
    const assert2 = getBlankCellCount(simpsonsData.results[0], 25);

    expect(assert1).toBe(4);
    expect(assert2).toBe(12);
  });
});

describe('getCellColor', () => {
  it('returns the correct color type based on the rating', () => {
    const assert1 = getCellColor(9);
    const assert2 = getCellColor(7.7);
    const assert3 = getCellColor(4.8);
    const assert4 = getCellColor(0);
    const assert5 = getCellColor(NaN);
    const assert6 = getCellColor(6.6);
    const assert7 = getCellColor(6.5);
    const assert8 = getCellColor(8.6);
    const assert9 = getCellColor(100);

    expect(assert1).toBe('#006d2c');
    expect(assert2).toBe('#2ca25f');
    expect(assert3).toBe('#de2d26');
    expect(assert4).toBe('#de2d26');
    expect(assert5).toBe('#fff');
    expect(assert6).toBe('#66c2a4');
    expect(assert7).toBe('#b2e2e2');
    expect(assert8).toBe('#006d2c');
    expect(assert9).toBe('#006d2c');
  });
});

describe('getTheMostEpisodes', () => {
  it('returns the length of the most episodes in a single season', () => {
    const assert1 = getTheMostEpisodes(cheersData.results);
    const assert2 = getTheMostEpisodes(simpsonsData.results);

    expect(assert1).toBe(26);
    expect(assert2).toBe(25);
  });
});
