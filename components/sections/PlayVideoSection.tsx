"use client";
import Image from "next/image";
import YouTubeEmbed from "../LiteYouTubeEmbed";
import { Container } from "../shared/Container";
import { GridBackground } from "../ui/grid-background";
import { useTheme } from "next-themes";
import {
  VIDEO_SECTION_ASSETS_1,
  VIDEO_SECTION_ASSETS_2,
} from "@/constants/assetsData";
import { useTranslations } from "next-intl";

const FALLBACK = "summer";

export default function PlayVideoSection() {
  const { theme } = useTheme();
  const t = useTranslations('HomePage');
  // avoid hydration mismatch

  const season = theme ? theme : FALLBACK;
  const assetImageLeft =
    VIDEO_SECTION_ASSETS_1[season] ?? VIDEO_SECTION_ASSETS_1[FALLBACK];
  const assetImageRight =
    VIDEO_SECTION_ASSETS_2[season] ?? VIDEO_SECTION_ASSETS_2[FALLBACK];
  return (
    <section className="relative py-12 lg:py-24 overflow-hidden bg-[var(--color-secondary-light)]/10">
      <GridBackground strokeColor="var(--color-primary)" />
      <Container>
        <div className="w-full max-w-3xl text-center mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
          {t('videoSection.title')}
          </h2>
          <p className="text-lg text-[var(--color-text-dark)] mb-6">
          {t('videoSection.description')}
          </p>
        </div>
        <YouTubeEmbed />
      </Container>
      <div className="absolute size-[50px] sm:size-[200px] lg:size-[400px] -z-10 top-1/2 left-10 opacity-10 ">
        <Image
          className=" relative size-full "
          src={assetImageLeft}
         fill
          alt="svg bg shape"
        />
      </div>
      <div className="absolute size-[100px] sm:size-[200px] lg:size-[400px] opacity-10 -z-10 right-10 top-2 md:top-1/4">
        <Image
          className=" relative size-full "
          src={assetImageRight}
          fill
          alt="svg bg shape"
        />
      </div>
    </section>
  );
}
