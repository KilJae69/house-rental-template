
import React from "react";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";
import Image from "next/image";
import { FormModal } from "./FormModal";

export function DraggableCards() {
  const items = [
    {
      title: "Tyler Durden",
      image: "/images/drag/asset-1.png",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "The Narrator",
      image: "/images/drag/asset-2.png",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "Iceland",
      image: "/images/drag/asset-3.png",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "Japan",
      image: "/images/drag/asset-4.png",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    {
      title: "Norway",
      image: "/images/drag/asset-5.png",
      className: "absolute top-20 right-[35%] rotate-[2deg]",
    },
    {
      title: "New Zealand",
      image: "/images/drag/asset-6.png",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
    {
      title: "Canada",
      image: "/images/drag/asset-7.png",
      className: "absolute top-8 left-[30%] rotate-[4deg]",
    },
  ];
  return (
    <DraggableCardContainer className="relative flex min-h-[800px] w-full items-center justify-center overflow-clip">
      <div className="flex group flex-col gap-8 px-4 max-w-2xl bg-slate-100 py-4 shadow-lg rounded-2xl items-center">
        <Image src={"/images/camera/winter-camera.png"} alt="camera" width={300} height={300}/>
        <p className="text-gradient-accent text-4xl text-center font-semibold">
          Make your own memories at our Cozy Cabin!
        </p>
        <FormModal />
       
      </div>
      {items.map((item) => (
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
