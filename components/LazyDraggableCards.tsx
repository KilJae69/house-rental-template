// components/LazyDraggableCards.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// this import() + ssr: false happens entirely on the client
const DraggableCards = dynamic(
  () => import('@/components/DraggableCards').then((mod) => mod.DraggableCards),
  {
    ssr: false,
    // optional: show a spinner while it loads
    loading: () => (
      <div className="flex h-96 items-center justify-center">
        <span className="animate-pulse">Loading interactive cards…</span>
      </div>
    ),
  }
);

export default function LazyDraggableCardsWrapper() {
  return <DraggableCards />;
}
