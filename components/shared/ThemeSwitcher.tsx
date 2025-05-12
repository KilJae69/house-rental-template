// components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="px-2 py-1 border rounded text-[var(--color-primary-dark)] bg-[var(--color-primary-light)]"
    >
      {themes?.map((t) => (
        <option key={t} value={t}>
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </option>
      ))}
    </select>
  );
}
