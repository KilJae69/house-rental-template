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

export function DraggableCards() {
  const t = useTranslations("HomePage.memoriesSection")

  return (
    <DraggableCardContainer className=" pt-12  relative flex min-h-[700px] w-full items-center justify-center overflow-clip">
      <div className="flex group flex-col gap-8 mx-4 px-4 max-w-2xl bg-slate-100 py-4 shadow-lg rounded-2xl items-center">
        <Image src={"/images/camera/winter-camera.png"} alt="camera" width={300} height={300}/>
        <p className="text-gradient-accent text-4xl text-center font-semibold max-w-md">
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
