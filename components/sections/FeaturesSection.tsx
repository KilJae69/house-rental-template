"use client"

import {m} from "framer-motion"
import { useTranslations } from "next-intl";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function FeaturesSection() {
  const t = useTranslations("HomePage");
  return (
    
      <div className=" mx-auto ">
        <h3 className="text-2xl font-semibold text-[var(--color-primary-dark)] mb-6">
        {t("featuresSection.title")}
        </h3>
        <ul className="flex flex-wrap gap-3">
          {[
            t("featuresSection.amenities.heatedFloors"),
            t("featuresSection.amenities.fireplace"),
            t("featuresSection.amenities.framelessGlassShower"),
            t("featuresSection.amenities.hardwoodFloors"),
            t("featuresSection.amenities.highSpeedWifi"),
            t("featuresSection.amenities.mountainViews"),
            t("featuresSection.amenities.outdoorGrill"),
            t("featuresSection.amenities.hotTub"),
            t("featuresSection.amenities.smartTv"),
            t("featuresSection.amenities.petFriendly"),
            t("featuresSection.amenities.parking"),
            t("featuresSection.amenities.pool"),
            t("featuresSection.amenities.airConditioning"),
            t("featuresSection.amenities.kitchen"),
            t("featuresSection.amenities.washerDryer"),
            t("featuresSection.amenities.workspace"),
            t("featuresSection.amenities.breakfast"),
            t("featuresSection.amenities.selfCheckin"),
            t("featuresSection.amenities.hotWater"),
            t("featuresSection.amenities.fireExtinguisher"),
            t("featuresSection.amenities.firstAidKit"),
          
          ].map((feat,index) => (
            <m.li
              key={feat}
              className="px-3 py-1 rounded border border-[var(--color-primary-dark)] text-[var(--color-primary-dark)] text-sm"
              variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
            >
              {feat}
            </m.li>
          ))}
        </ul>
      </div>
   
  );
}
