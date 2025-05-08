// hooks/useClientTheme.ts
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function useClientTheme() {
  const { theme, resolvedTheme, setTheme, themes } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // until we're mounted, force a stable fallback ("summer" or whatever you want)
  const current =
    !mounted
      ? 'summer'
      : theme === 'system'
      ? resolvedTheme
      : theme;

  return { theme: current!, setTheme, themes };
}
