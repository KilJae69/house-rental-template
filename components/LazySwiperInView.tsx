// components/LazySwiperInView.tsx
'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

// 1) Make the dynamic import use React Suspense,
//    so it won't prefetch or render until you mount it
const SwiperComponent = dynamic(
  () => import('@/components/SwiperComponent'),
  { ssr: false}
);

// 2) One single skeleton placeholder
function Skeleton() {
  return (
    <div className="flex items-center justify-center w-[280px] h-[400px]
                    sm:w-[400px] md:w-[300px] lg:w-[500px] ">
      <Image
        src="/bouncing-circles.svg"
        width={100}
        height={100}
        alt="Loading"
      />
    </div>
  );
}

export default function LazySwiperInView() {
  // 3) IntersectionObserver to tell us when to mount
  const { ref, inView } = useInView({
    rootMargin: '200px',
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {inView ? (
        // 4) Suspense shows our one Skeleton until Swiper is ready
        
        <Suspense fallback={<Skeleton />}>
        <SwiperComponent />
      </Suspense>
       
      ) : (
        // 5) Before inView, show the exact same Skeleton
        <Skeleton />
      )}
     
    </div>
  );
}
