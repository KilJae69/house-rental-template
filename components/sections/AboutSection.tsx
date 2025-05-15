"use client";
// import { AnimatedBeamMultipleOutputs } from "../AnimatedBeamMultipleOutputs";
import { FadeIn, FadeInStagger } from "../shared/FadeIn";
import FeaturesSection from "./FeaturesSection";
import { Container } from "../shared/Container";
import { useTranslations } from "next-intl";

import PrimaryThemedButton from "../shared/PrimaryThemedButton";
import SwiperComponent from "../SwiperComponent";
import { useTheme } from "next-themes";
import { ABOUT_ASSETS } from "@/constants/assetsData";
import Image from "next/image";
import ClientOnly from "../ClientOnly";

const FALLBACK = "summer";

export default function AboutSection() {
  const t = useTranslations("HomePage");
  const { resolvedTheme } = useTheme();

  // avoid hydration mismatch

  const season = resolvedTheme ? resolvedTheme : FALLBACK;

  const bgImage = ABOUT_ASSETS[season] ?? ABOUT_ASSETS[FALLBACK];

  return (
    <Container
      as="section"
      className="pb-12 lg:pb-24 bg-[var(--color-background-light)]"
    >
      <div className="space-y-12 lg:space-y-24">
        <div className=" mx-auto grid md:grid-cols-2 gap-8 items-center ">
          {/* Text */}
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">
              {t("aboutSection.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              {t("aboutSection.body")}
            </p>
            {/* <PrimaryThemedButton>{t("aboutSection.learnMore")}</PrimaryThemedButton> */}
          </div>

          {/* Image */}
          <ClientOnly>
            <div className="rounded-lg relative overflow-hidden mask-fade min-h-[400px]">
              {/* <AnimatedBeamMultipleOutputs /> */}
              <Image src={bgImage} alt="cabin" className="object-cover" fill />
            </div>
          </ClientOnly>
        </div>

        <div className="mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <SwiperComponent />
          </div>

          <div className="order-1 md:order-2 text-center md:text-start">
            <h3 className="text-2xl lg:text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
              {t("photosSection.title")}
            </h3>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              {t("photosSection.description")}
            </p>
            <ClientOnly>
              <PrimaryThemedButton href="/gallery">
                {t("photosSection.cta")}
              </PrimaryThemedButton>
            </ClientOnly>
          </div>
        </div>

        <div className=" mx-auto ">
          <h3 className="text-2xl lg:text-3xl font-semibold text-[var(--color-primary-dark)] mb-6">
            {t("propertyDetails.title")}
          </h3>
          <FadeInStagger className="">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                [t("propertyDetails.bedrooms"), "3"],
                [t("propertyDetails.bathrooms"), "2"],
                [t("propertyDetails.livingArea"), "500 m2"],
                [t("propertyDetails.lotSize"), "2,000 m2"],
                [t("propertyDetails.yearBuilt"), "2016"],
                [t("propertyDetails.stories"), "2"],
              ].map(([label, value]) => (
                <FadeIn
                  key={label}
                  className="flex justify-between border-b border-[var(--color-primary-light)] py-2"
                >
                  <dt className="font-medium text-[var(--color-text-dark)]">
                    {label}
                  </dt>
                  <dd className="text-[var(--color-text-dark)]">{value}</dd>
                </FadeIn>
              ))}
            </dl>
          </FadeInStagger>
        </div>
        <FeaturesSection />
      </div>
    </Container>
  );
}
