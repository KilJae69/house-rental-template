"use client";

import React from "react";

import { photosData } from "@/constants/photosData";
import Image from "next/image";
import PrimaryThemedButton from "./shared/PrimaryThemedButton";
import { useLazySwiper } from "@/lib/hooks/useLazySwiper";

export default function SwiperComponent() {
  const { ref, SwiperComponent, SwiperSlideComponent, modules } =
    useLazySwiper();
    
  return (
    <div ref={ref}>
      {SwiperComponent && (
        <SwiperComponent
          effect={"cards"}
          grabCursor={true}
          modules={modules}
          className="mySwiper"
        >
          {photosData.map((item) => (
            <SwiperSlideComponent
              key={item.title}
              className="relative border-4 overflow-clip border-[var(--color-primary)] "
            >
              <div className="absolute inset-0 bg-[var(--color-primary)]/10 z-20" />
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="pointer-events-none relative z-10  object-cover"
              />
             
            </SwiperSlideComponent>
          ))}
          <SwiperSlideComponent className="relative border-4 border-[var(--color-primary-dark)] bg-[var(--color-primary-light)]">
            <div className="size-full flex flex-col text-center items-center justify-center gap-6">
              <h3>Pogledajte cijelu galeriju</h3>
              <PrimaryThemedButton href="/gallery">
                Galerija
              </PrimaryThemedButton>
            </div>
          </SwiperSlideComponent>
        </SwiperComponent>
      )}
    </div>
  );
}
