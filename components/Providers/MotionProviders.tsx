// components/MotionProviders.tsx
'use client';
import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

export default function MotionProviders({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
