// components/ThemeFloatingDock.tsx
"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useState, useTransition, useRef, useEffect } from "react";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ThemeItem = {
  code: string;
  label: string;
  icon: string;
};

export default function ThemeFloatingDock({
  className,
  desktop,
}: {
  className?: string;
  desktop?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { themes = [] } = useTheme();
  const t = useTranslations("Header"); // make sure your messages include season labels

  // Build an array of items for each season
  const items: ThemeItem[] = themes.map((code) => ({
    code,
    label: t(`season-${code}`), // e.g. "Spring", "Summer", etc.
    icon: `/icons/${code}.svg`, // your four SVGs in public/icons/
  }));
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div className={cn("flex items-center", className)}>
      {desktop ? (
        <ThemeFloatingDockDesktop items={items} />
      ) : (
        <ThemeFloatingDockMobile items={items} />
      )}
    </div>
  );
}

function ThemeFloatingDockMobile({ items }: { items: ThemeItem[] }) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isPending, startTransition] = useTransition();

  // current + others
  const current = items.find((i) => i.code === theme) ?? items[0];
  const others = items.filter((i) => i.code !== theme);

  const handleSelect = (code: string) => {
    startTransition(() => setTheme(code));
    setOpen(false);
    console.log(code, "from select");
  };

  return (
    <div className="relative ">
      <AnimatePresence>
        {open && (
          <m.div
            layoutId="theme-dock"
            className="absolute top-full mt-2 flex flex-col gap-2  "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {others.map((item, idx) => (
              <m.button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { delay: idx * 0.05 } }}
                transition={{ delay: (others.length - 1 - idx) * 0.05 }}
                className="h-10 w-10 rounded-full cursor-pointer bg-gray-50 flex items-center justify-center"
              >
                <Image
                  src={item.icon}
                  width={32}
                  height={32}
                  alt={item.label}
                />
              </m.button>
            ))}
          </m.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="h-10 w-10 rounded-full bg-white flex items-center cursor-pointer justify-center border border-[var(--color-primary)]"
        disabled={isPending}
      >
        <Image src={current.icon} width={32} height={32} alt={current.label} />
      </button>
    </div>
  );
}

function ThemeFloatingDockDesktop({ items }: { items: ThemeItem[] }) {
  const mouseX = useMotionValue(Infinity);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const { theme, setTheme } = useTheme();

  const handleSelect = (code: string) => {
    startTransition(() => setTheme(code));
  };

  return (
    <m.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex gap-4"
    >
      {items.map((item) => (
        <IconContainer
          key={item.code}
          item={item}
          selected={item.code === theme}
          onSelect={() => handleSelect(item.code)}
          mouseX={mouseX}
        />
      ))}
    </m.div>
  );
}

function IconContainer({
  item,
  selected,
  onSelect,
  mouseX,
}: {
  item: ThemeItem;
  selected: boolean;
  onSelect: () => void;
  mouseX: MotionValue;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // distance from cursor → grows center icon
  const distance = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return x - ((r?.x || 0) + (r?.width || 0) / 2);
  });
  const width = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const height = useSpring(
    useTransform(distance, [-150, 0, 150], [40, 80, 40]),
    {
      mass: 0.1,
      stiffness: 150,
      damping: 12,
    }
  );
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      className={cn(
        "flex items-center justify-center rounded-full cursor-pointer bg-gray-100",
        selected &&
          "ring-2 ring-offset-2 ring-[var(--color-primary-dark)] bg-[var(--color-primary-light)]"
      )}
    >
      <AnimatePresence>
        {hovered && (
          <m.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[var(--color-secondary)] text-white text-xs px-2 py-0.5 rounded"
          >
            {item.label}
          </m.div>
        )}
      </AnimatePresence>

      <Image
        src={item.icon}
        width={32}
        height={32}
        alt={item.label}
        className="rounded-full"
      />
    </m.div>
  );
}
