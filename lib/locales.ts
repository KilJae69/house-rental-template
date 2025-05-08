export const locales = ["en",  "bs"] as const;
export type Locale = (typeof locales)[number];