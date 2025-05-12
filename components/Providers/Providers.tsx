// components/Providers.tsx
"use client";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import MotionProviders from "./MotionProviders";

export default function Providers({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}) {
  console.log();
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="summer"
        themes={["spring", "summer", "autumn", "winter"]}
        disableTransitionOnChange
        enableSystem={false}
      >
        <MotionProviders>{children}</MotionProviders>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
