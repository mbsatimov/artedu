import { useEffect, useState } from 'react';

export const useDebouncedValue = <T extends number | string | null | undefined>(
  value: T | null,
  delay = 300
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
