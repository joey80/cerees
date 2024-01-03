import { addBlankDataToSeries, getBlankCellCount, getCellColor, getTheMostEpisodes } from './index';
import cheersData from './mockData/cheers.json';
import simpsonsData from './mockData/simpsons.json';

describe('addBlankDataToSeries', () => {
  it('returns the same length array for every season', () => {
    const cheersFirstSet = cheersData.results[0]; // 22 episodes
    const cheersSecondSet = cheersData.results[2]; // 25 episodes
    const assert = addBlankDataToSeries([cheersFirstSet, cheersSecondSet], 25);

    // two total series of episodes
    expect(assert.length).toBe(2);
    // first set has 25 total entries, matching '25' that was passed in
    expect(assert[0].length).toBe(25);
    // seconds set has 25 total entries, matching '25' that was passed in
    expect(assert[1].length).toBe(25);
    // confirming that only 22 episodes were present
    expect(cheersFirstSet.length).toBe(22);
    // confirming that only 25 episodes were present
    expect(cheersSecondSet.length).toBe(25);
    // first set has 3 nulls added to the end since there's only 22 episodes
    expect(assert[0].filter(elm => elm === null).length).toBe(3);
    // seconds set has 0 nulls added to the end since there's 25 episodes
    expect(assert[1].filter(elm => elm === null).length).toBe(0);
  });
});

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

    expect(assert1).toBe('color-great');
    expect(assert2).toBe('color-good');
    expect(assert3).toBe('color-bad');
    expect(assert4).toBe('color-bad');
    expect(assert5).toBe('color-not-found');
    expect(assert6).toBe('color-ok');
    expect(assert7).toBe('color-yawn');
    expect(assert8).toBe('color-great');
    expect(assert9).toBe('color-great');
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
