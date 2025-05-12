"use client";
import { useTheme } from "next-themes";

import { VIDEO_SECTION_ASSETS_2 } from "@/constants/assetsData";
import Image from "next/image";
import dynamic from "next/dynamic";
import useLazyLoad from "@/lib/hooks/useLazyLoad";

const images = [
  "/images/avatars/3d-avatar-1.png",
  "/images/avatars/3d-avatar-8.png",
  "/images/avatars/3d-avatar-2.png",
  "/images/avatars/3d-avatar-3.png",
  "/images/avatars/3d-avatar-4.png",
  "/images/avatars/3d-avatar-5.png",
  "/images/avatars/3d-avatar-6.png",
  "/images/avatars/3d-avatar-1.png",
  "/images/avatars/3d-avatar-8.png",

  

];


const DynamicIconCloud = dynamic(
  () => import("@/components/ui/icon-cloud").then((mod) => mod.IconCloud),
  {
    ssr: false,
    loading: () => <Skeleton/>,
  }
);

const FALLBACK = "summer";

export function AvatarCloud() {
  const { ref, isLoaded } = useLazyLoad();
  const { theme } = useTheme();
  // avoid hydration mismatch

  const season = theme ? theme : FALLBACK;
  const svgAsset =
    VIDEO_SECTION_ASSETS_2[season] ?? VIDEO_SECTION_ASSETS_2[FALLBACK];
  return (
    <div
      ref={ref}
      className="relative flex size-full max-w-2xl items-center justify-center  overflow-hidden "
    >
      <div className="absolute inset-0 -z-10  opacity-20 ">
        <Image
          className=" relative size-full "
          src={svgAsset}
          fill
          alt="svg bg shape"
        />
      </div>
      {isLoaded ? (
        <DynamicIconCloud images={images} />
      ) : (
        <Skeleton />
      )}
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex items-center relative justify-center size-[500px] ">
      <Image
        src="/bouncing-circles.svg"
        width={100}
        height={100}
        alt="Loading"
      />
     
    </div>
  );
}
