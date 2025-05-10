"use client"
import { useTheme } from "next-themes";
import { IconCloud } from "./ui/icon-cloud";
import { VIDEO_SECTION_ASSETS_2 } from "@/constants/assetsData";
import Image from "next/image";


const images = [
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  "/images/avatars/3d-avatar.png",
  
];

const FALLBACK = "summer";

export function AvatarCloud() {

    const { theme } = useTheme();
  // avoid hydration mismatch

  const season = theme ? theme : FALLBACK;
  const svgAsset =
      VIDEO_SECTION_ASSETS_2[season] ?? VIDEO_SECTION_ASSETS_2[FALLBACK];
  return (
    <div className="relative flex size-full max-w-2xl items-center justify-center  overflow-hidden ">
        <div className="absolute inset-0 -z-10  opacity-20 ">
                <Image
                  className=" relative size-full "
                  src={svgAsset}
                  fill
                  alt="svg bg shape"
                />
              </div>
      <IconCloud images={images} />
    </div>
  );
}
