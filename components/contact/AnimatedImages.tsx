"use client"
import { animatedImages } from "@/constants/assetsData";
import { m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AnimatedImages() {
 

       // 1) Start with all zeros so SSR == initial client render
  const [angles, setAngles] = useState<number[]>(animatedImages.map(() => 0));

  // 2) After mount, pick random angles once
  useEffect(() => {
    setAngles(animatedImages.map(() => Math.random() * 20 - 10));
  }, []);
  return (
   <div className="flex justify-center items-center">
              {animatedImages.map((image, idx) => (
                <m.div
                  key={"images" + idx}
                  style={{ rotate: angles[idx] }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl relative  -mr-4 mt-4 p-2 w-[25%] aspect-square  bg-white border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="house images"
                   fill
                    className="rounded-lg  object-cover shrink-0"
                  />
                </m.div>
              ))}
            </div>
  );
  
}