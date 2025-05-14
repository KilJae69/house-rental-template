"use client";

import { useMediaPredicate } from "react-media-hook";

import dynamic from "next/dynamic";

import { GalleryItem } from "@/constants/galleryData";

import Image from "next/image";

const DesktopGallery = dynamic(() => import("./DesktopGallery"), {
  loading: () => <Fallback />,
});
const MobileGallery  = dynamic(() => import("./MobileGallery"), {
  loading: () => <Fallback />,
});

export default function Gallery({galleryData}:{galleryData:GalleryItem[]}) {
  const isDesktop = useMediaPredicate("(min-width: 768px)");
 
  return (
    <>
       {isDesktop ? <DesktopGallery galleryData={galleryData} /> : <MobileGallery />}
    </>
  );
}

function Fallback(){
  return (
    <div className="flex items-center relative justify-center min-h-screen">
         <Image
           src="/bouncing-circles.svg"
           width={300}
           height={300}
           alt="Loading"
         />
       </div>
  )
}