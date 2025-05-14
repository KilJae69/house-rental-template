"use client";
import Image from "next/image";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { galleryData } from "@/constants/galleryData";
import unsplashLoader from "@/lib/unsplash-loader";
import { useTranslations } from "next-intl";

export type ImageType = {
  _key: string;
  uniqueId: string;
  asset: {
    _id: string;
    url: string;
    metadata: {
      lqip: string;
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
    };
  };
  alt: string;
};

export default function MobileGallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("GalleryPage");
  return (
    <>
      <h2 className="text-center font-bold text-4xl my-8 ">{t("title")}</h2>
      <div className="columns-1  sm:columns-2 lg:columns-3 gap-4 mt-12 ">
        {galleryData.map((item, index) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid"
            onClick={() => {
              setCurrentIndex(index);
              setOpen(true);
            }}
          >
            <Image
              loader={unsplashLoader}
              src={item.url}
              alt={item.title}
              priority={item.id === galleryData[0].id}
              width={800} // Example default width
              height={600} // Example default height
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,[your-small-base64-blur-hash]"
              className="w-full rounded-lg cursor-pointer"
              //   style={{
              //     height: "auto", // Critical for masonry
              //     aspectRatio: item.asset.metadata.dimensions.aspectRatio,
              //   }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        slides={galleryData.map((item) => ({
          src: item.url,
          alt: item.title,
          //   width: item.asset.metadata.dimensions.width,
          //   height: item.asset.metadata.dimensions.height,
        }))}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
