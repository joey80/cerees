import { useState } from 'react';

/**
 * Custom hook for setting/getting session storage state
 * @param key The name of the state in session storage
 * @param initialValue An optional default state to save initially in sessionl storage
 */
function useSessionStorage<T>(key: string, initialValue?: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from session storage by key
      const item = sessionStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error({ error, message: `error getting ${key} state from session storage` });
      return initialValue;
    }
  });

  /**
   * Return a wrapped version of useState's setter function that
   * persists the new value to session Storage.
   */
  function setValue(value: T | ((val: T) => T)) {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to session storage
      sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error({ error, message: `error saving ${key} state to session storage` });
    }
  }

  return [storedValue, setValue] as const;
}

export { useSessionStorage };
