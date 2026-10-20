import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 * Delays updating a value until after a specified delay period has elapsed.
 * Optimizes search input queries to prevent hammering the backend on every keystroke.
 * 
 * @param {any} value - Input value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300ms)
 * @returns {any} Debounced value
 */
export const useDebounce = (value, delay = 350) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer to update state
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Lifecycle cleanup function: clears timeout if value or delay changes before timer completes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
