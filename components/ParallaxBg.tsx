"use client";

//import { m, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import ClientOnly from "./ClientOnly";

export default function ParallaxBg({ image }: { image: string }) {
//  const { scrollY } = useScroll();

  // slide up by 100px over the first 300px of scroll
 // const y = useTransform(scrollY, [0, 200], [0, -100]);
  // zoom *in* a bit at top (1.1) then zoom back to normal (1) as you scroll
 // const scale = useTransform(scrollY, [0, 200], [1.1, 1]);

  // Optional: smooth it out with springs
 // const ySpring = useSpring(y, { stiffness: 50, damping: 20 });
 // const scaleSpring = useSpring(scale, { stiffness: 50, damping: 20 });

  return (
    <div
     // style={{ y: ySpring, scale: scaleSpring }}
      className="absolute inset-0 -z-10"
    >
      <ClientOnly>
        <Image
          src={image}
          fill
          priority
          className="object-cover mask-image-bottom"
          alt=""
        />
      </ClientOnly>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/60 to-transparent" />
    </div>
  );
}
