import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

type SortType = 'alphabet' | 'length' | null;

// ОДНА функція з switch-case
function getUserSort(sortType: SortType, isReversed: boolean): string[] {
  const result = [...goodsFromServer];

  switch (sortType) {
    case 'alphabet':
      // стандартно: A → Z
      result.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      // найкоротші → найдовші
      result.sort((a, b) => a.length - b.length);
      break;

    case null:
    default:
      // початковий порядок
      break;
  }

  // Reverse можна поєднати з будь-яким сортуванням або без нього
  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getUserSort(sortType, isReversed);
  const isFiltered = sortType !== null || isReversed;

  const handleAlphabet = () => {
    setSortType('alphabet');
  };

  const handleLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === 'alphabet' ? '' : 'is-light'
          }`}
          onClick={handleAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === 'length' ? '' : 'is-light'
          }`}
          onClick={handleLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isFiltered && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} className="Good" data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
