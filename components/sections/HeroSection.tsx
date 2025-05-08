"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import PrimaryThemedButton from "../shared/PrimaryThemedButton";
import { HERO_ASSETS } from "@/constants/assetsData";
import { FormModal } from "../FormModal";



const FALLBACK = "summer";

export default function HeroSection() {
  const t = useTranslations("HomePage");
  const { theme } = useTheme();
  // avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const season = mounted && theme ? theme : FALLBACK;
  const title = t("HeroSection.title");
  const subtitle = t("HeroSection.subtitle");
  const primary = t("HeroSection.ctaPrimary");


  const bgImage = HERO_ASSETS[season] ?? HERO_ASSETS[FALLBACK];
  console.log(bgImage);
  return (
    <section className="relative w-full h-screen ">
      {/* Background */}
      <Image
        src={bgImage}
        alt={`${season} view of cabin`}
        fill
        className="object-cover mask-image-bottom"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto h-full flex flex-col justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {title}
        </h1>
        <p className="mt-4 text-lg text-gray-200">{subtitle}</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryThemedButton
          variant="outline"
            href={`/gallery`}
            
          >
            {primary}
          </PrimaryThemedButton>
          {/* <PrimaryThemedButton
            variant="outline"
            
          >
            {secondary}
          </PrimaryThemedButton> */}
          <FormModal/>
        </div>
      </div>
    </section>
  );
}
