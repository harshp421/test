// utils/localStorage.ts

export const getInitialState = <T, >(key: string, fallbackValue: T): T => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : fallbackValue;
    }
    return fallbackValue;
  };
  