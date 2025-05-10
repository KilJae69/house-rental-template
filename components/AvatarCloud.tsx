import { IconCloud } from "./ui/icon-cloud";


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

export function AvatarCloud() {
  return (
    <div className="relative flex size-full max-w-2xl items-center justify-center bg-background border rounded-full overflow-hidden ">
      <IconCloud images={images} />
    </div>
  );
}
