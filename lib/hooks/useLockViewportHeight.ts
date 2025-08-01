"use client";
import { useEffect } from "react";

export function useLockViewportHeight() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number;

    const setVh = () => {
      // use requestAnimationFrame to avoid jank during resize
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--vh",
          `${window.innerHeight * 0.01}px`
        );
      });
    };

    setVh();
    window.addEventListener("resize", setVh);
    window.addEventListener("orientationchange", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("orientationchange", setVh);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
