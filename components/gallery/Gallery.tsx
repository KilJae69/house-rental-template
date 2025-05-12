"use client";

import { useState } from "react";
import GalleryList from "./GalleryList";
import GalleryModal from "./GalleryModal";
import { GalleryItem } from "@/constants/galleryData";

export default function Gallery({galleryData}:{galleryData:GalleryItem[]}) {
    const [selected, setSelected] = useState<GalleryItem | null>(null);
  return (
    <>
      <GalleryList galleryData = {galleryData} setSelected={setSelected} />
      <GalleryModal setSelected={setSelected} selected={selected} />
    </>
  );
}
