import { useEffect, useState, DependencyList } from "react";

export const useDebouncedEffect = (
  effect: () => void,
  deps: DependencyList,
  delay: number
) => {
  const [debouncedValue, setDebouncedValue] = useState(deps);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(deps), delay);

    return () => clearTimeout(handler);
  }, [deps, delay]);

  useEffect(effect, [debouncedValue]);
};
