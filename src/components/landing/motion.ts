import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

// The server can't know the user's motion preference, so render the animated
// markup until hydration finishes to avoid a hydration mismatch.
export function useHydratedReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated && prefersReduced === true;
}
