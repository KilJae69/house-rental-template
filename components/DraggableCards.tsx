"use client"
import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";
import { FormModal } from "./FormModal";
import { photosData } from "@/constants/photosData";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { CAMERA_ASSETS } from "@/constants/assetsData";

const FALLBACK = "summer";

export function DraggableCards() {
  const t = useTranslations("HomePage.memoriesSection")
  const { theme } = useTheme();
  // avoid hydration mismatch

  const season = theme ? theme : FALLBACK;
   const cameraImage = CAMERA_ASSETS[season] ?? CAMERA_ASSETS[FALLBACK];
  return (
    <DraggableCardContainer className=" pt-12  relative flex min-h-[700px] w-full items-center justify-center overflow-clip">
      <div className="flex group flex-col gap-2 mx-4 p-4 lg:p-8 max-w-2xl bg-slate-100  shadow-lg rounded-2xl items-center">
        <Image src={cameraImage} alt="camera" width={300} height={300}/>
        <p className="text-gradient-accent text-4xl mb-4 text-center font-semibold max-w-md">
         {t("title")}
        </p>
        <FormModal />
       
      </div>
      {photosData.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <Image
            src={item.image}
            alt={t(item.title)}
            width={320}
            height={320}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 ">
            {t(item.title)}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
