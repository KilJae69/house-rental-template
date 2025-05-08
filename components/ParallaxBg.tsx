'use client';

import { m, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function ParallaxBg({ image }: { image: string }) {
  const { scrollY } = useScroll();

  // slide up by 100px over the first 300px of scroll
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  // zoom *in* a bit at top (1.1) then zoom back to normal (1) as you scroll
  const scale = useTransform(scrollY, [0, 300], [1.1, 1]);

  // Optional: smooth it out with springs
  const ySpring = useSpring(y, { stiffness: 50, damping: 20 });
  const scaleSpring = useSpring(scale, { stiffness: 50, damping: 20 });

  return (
    <m.div
      style={{ y: ySpring, scale: scaleSpring }}
      className="absolute inset-0 -z-10"
    >
      <Image
        src={image}
        fill
        className="object-cover mask-image-bottom"
        alt=""
      />
    </m.div>
  );
}
