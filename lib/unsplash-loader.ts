// lib/unsplash-loader.ts
import type { ImageLoaderProps } from "next/image";

export default function unsplashLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const base = src.split("?")[0];
  return `${base}?w=${width}&q=${quality || 75}&auto=format&fit=crop`;
}
