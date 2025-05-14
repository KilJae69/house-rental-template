"use client";
import useLazyLoad from "@/lib/hooks/useLazyLoad";
import dynamic from "next/dynamic";

import Image from "next/image";

const DynamicDragableCards = dynamic(
  () => import("../DraggableCards").then((mod) => mod.DraggableCards),
  {
    ssr: false,
    loading: () => <Skeleton />,
  }
);

export default function DragCardsSection() {
  const { ref, isInView } = useLazyLoad();
  return (
    <section
      ref={ref}
      className="relative
        bg-gradient-to-br
        from-[var(--color-secondary)]
        via-[var(--color-primary)]
        to-[var(--color-primary-dark)]
        overflow-hidden
        rounded-2xl
        before:absolute
        before:inset-0
        before:rounded-2xl
        before:shadow-[inset_0_0_50px_rgba(0,0,0,0.45)]
        before:pointer-events-none "
    >
      {isInView && <DynamicDragableCards />}
    </section>
  );
}

function Skeleton() {
  return (
    <div className="flex items-center relative justify-center min-h-[700px]">
      <Image
        src="/bouncing-circles.svg"
        width={100}
        height={100}
        alt="Loading"
      />
    </div>
  );
}
