

import { AnimatedBeamMultipleOutputs } from "../AnimatedBeamMultipleOutputs";
import { FadeIn, FadeInStagger } from "../shared/FadeIn";
import FeaturesSection from "./FeaturesSection";
import { Container } from "../shared/Container";
import { useTranslations } from "next-intl";

import PrimaryThemedButton from "../shared/PrimaryThemedButton";
import SwiperComponent from "../SwiperComponent";




export default function AboutSection() {
  const t = useTranslations("HomePage");

  return (
    <Container
      as="section"
      className="pb-12 lg:pb-24 bg-[var(--color-background-light)]"
    >
      <div className="space-y-10">
        <div className=" mx-auto grid md:grid-cols-2 gap-8 items-center ">
          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
              {t("aboutSection.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              {t("aboutSection.body")}
            </p>
            {/* <PrimaryThemedButton>{t("aboutSection.learnMore")}</PrimaryThemedButton> */}
          </div>

          {/* Image */}
          <div className="rounded-lg overflow-hidden  ">
            <AnimatedBeamMultipleOutputs />
          </div>
        </div>

        <div
         
          className="mx-auto grid md:grid-cols-2 gap-8 items-center"
        >
          <SwiperComponent/>

          <div>
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
              {t("photosSection.title")}
            </h2>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              {t("photosSection.description")}
            </p>
            <PrimaryThemedButton>{t("photosSection.cta")}</PrimaryThemedButton>
          </div>
        </div>

        <div className=" mx-auto ">
          <h3 className="text-2xl font-semibold text-[var(--color-primary-dark)] mb-6">
            {t("propertyDetails.title")}
          </h3>
          <FadeInStagger className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
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
          </FadeInStagger>
        </div>
        <FeaturesSection />
      </div>
    </Container>
  );
}
