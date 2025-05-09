
import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";
import { FormModal } from "./FormModal";
import { photosData } from "@/constants/photosData";

export function DraggableCards() {

  return (
    <DraggableCardContainer className="relative flex min-h-[800px] w-full items-center justify-center overflow-clip">
      <div className="flex group flex-col gap-8 px-4 max-w-2xl bg-slate-100 py-4 shadow-lg rounded-2xl items-center">
        <Image src={"/images/camera/winter-camera.png"} alt="camera" width={300} height={300}/>
        <p className="text-gradient-accent text-4xl text-center font-semibold">
          Make your own memories at our Cozy Cabin!
        </p>
        <FormModal />
       
      </div>
      {photosData.map((item) => (
        <DraggableCardBody key={item.title} className={item.className}>
          <Image
            src={item.image}
            alt={item.title}
            width={320}
            height={320}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 ">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}
