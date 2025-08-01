"use client";
import { m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

import { HERO_ASSETS } from "@/constants/assetsData";
import { FormModal } from "../FormModal";

import ParallaxBg from "../ParallaxBg";
import { useEffect, useState } from "react";

const FALLBACK = "summer";

export default function HeroSection() {
  const t = useTranslations("HomePage");
    const [fixedHeight, setFixedHeight] = useState<number | null>(null);

     useEffect(() => {
    // Measure ONCE on mount and never change it
    setFixedHeight(window.innerHeight);
  }, []);

  // Use only the fixed pixel height, never vh
  const sectionStyle = fixedHeight 
    ? { height: `${fixedHeight}px` }
    : { height: '100vh' }; // only until we get the measurement

  const { resolvedTheme } = useTheme();

  // avoid hydration mismatch

  const season = resolvedTheme ? resolvedTheme : FALLBACK;
  const title = t("HeroSection.title");
  const subtitle = t("HeroSection.subtitle");

  const bgImage = HERO_ASSETS[season] ?? HERO_ASSETS[FALLBACK];

  return (
    <section
    style={sectionStyle}
      className="relative w-full z-20 mb-12 flex items-center  justify-center "
      
    >
       
      {/* Background */}
      <ParallaxBg image={bgImage} />
      {/* <Image
        src={bgImage}
        alt={`${season} view of cabin`}
        fill
        className="object-cover mask-image-bottom"
        priority
      /> */}

      {/* <div className="absolute inset-0 overflow-hidden">
        <ClientOnly>
          <Image
            src={bgImage}
            fill
            priority
            className="object-cover mask-image-bottom"
            alt=""
          />
        </ClientOnly>
      </div> */}

      {/* Overlay */}

      {/* Content */}
      <div className="relative z-10 max-w-2xl   h-fit  flex flex-col justify-center  px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {title.split(" ").map((word, index) => (
            <m.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </m.span>
          ))}
        </h1>
        <m.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
            delay: 0.8,
          }}
          className="mt-4 text-lg text-gray-200"
        >
          {subtitle}
        </m.p>
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 1,
          }}
          className="mt-6 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* <PrimaryThemedButton
            variant="outline"
            
          >
            {secondary}
          </PrimaryThemedButton> */}
          <FormModal />
        </m.div>
      </div>
    </section>
  );
}
