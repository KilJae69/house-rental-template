"use client";

import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import {
  AnimatePresence,
  MotionValue,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/routing";

type LanguageItem = {
  code: string;
  country: string;
  flag: string;
};

export const FloatingDock = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const t = useTranslations("Header");

  const languages = [
    { code: "en", country: t("language-option-en"), flag: "/icons/en.png" },
    { code: "bs", country: t("language-option-bs"), flag: "/icons/bs.png" },
    // { code: "de", country: t("language-option-de"), flag: "/icons/de.png" },
  ];
  console.log(languages);
  return (
    <>
      <FloatingDockDesktop
        items={languages}
        path={pathname}
        className={className}
      />
    </>
  );
};

export const FloatingDockMobile = ({
  items,
  className,
  path,
}: {
  items: LanguageItem[];
  className?: string;
  path: "/" |  "/contact" | "/gallery" | "/terms" | "/privacy";
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    function onClickOutside(ev: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(ev.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  // Use useLocale to get the current locale
  const currentLocale = useLocale();

  // Find the current language based on the locale
  const currentLanguage =
    items.find((item) => item.code === currentLocale) || items[0];

  // Filter out the current locale from the dropdown options
  const filteredItems = items.filter((item) => item.code !== currentLocale);

  const handleLocaleChange = (targetLocale: string) => {
    startTransition(() => {
     
        router.replace(
          { pathname: path},
          { locale: targetLocale }
        );
      }
    );
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative cursor-pointer block", className)}
    >
      <AnimatePresence>
        {open && (
          <m.div
            layoutId="nav"
            className="absolute top-full cursor-pointer mt-2 inset-x-0 flex flex-col gap-2" // Changed to top-full and mt-2
            initial={{ opacity: 0, y: -10 }} // Animation starts from top
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} // Animation exits to top
          >
            {filteredItems.map((item, idx) => (
              <m.div
                key={item.code}
                initial={{ opacity: 0, y: -10 }} // Animation starts from top
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -10,
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <button
                  onClick={() => handleLocaleChange(item.code)}
                  className="h-10 w-10 cursor-pointer rounded-full bg-gray-50 relative flex items-center justify-center"
                >
                  <Image
                    src={item.flag}
                    fill
                    alt={`${item.country} flag`}
                    className="h-10 w-10 rounded-full"
                  />
                </button>
              </m.div>
            ))}
          </m.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full cursor-pointer flex items-center justify-center"
      >
        <Image
          src={currentLanguage.flag} // Show the currently selected flag
          width={34}
          height={34}
          alt={`${currentLanguage.country} flag`}
          className="rounded-full"
        />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  path,
}: {
  items: LanguageItem[];
  className?: string;
  path: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const currentLocale = useLocale(); // Use useLocale to get the current locale
  // const pathname = usePathname()

  const handleLocaleChange = (nextLocale: string) => {
    startTransition(() => {
      // If we're on a blog detail page, redirect to the blog listing.
    
        // Otherwise, change locale while retaining the current pathname.
        //@ts-expect-error -- Fuck tihs
        router.replace({ pathname: path }, { locale: nextLocale });
      
    });
  };

  return (
    <m.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl  px-4 pb-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer
          disabled={isPending}
          mouseX={mouseX}
          key={item.code}
          code={item.code}
          country={item.country}
          flag={item.flag}
          pathname={path}
          isCurrent={item.code === currentLocale} // Pass whether the item is the current locale
          onClick={() => handleLocaleChange(item.code)}
        />
      ))}
    </m.div>
  );
};

function IconContainer({
  mouseX,

  country,
  flag,

  isCurrent, // Add isCurrent prop
  onClick,
}: {
  mouseX: MotionValue;
  code: string;
  country: string;
  flag: string;
  pathname: string;
  disabled: boolean;
  isCurrent: boolean; // Whether this item is the current locale
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "aspect-square rounded-full bg-primary-200 flex items-center justify-center relative cursor-pointer",
        isCurrent &&
          "border-2 border-[var(--color-primary-dark)] bg-[var(--color-primary-light)]" // Highlight the current locale
      )}
    >
      <AnimatePresence>
        {hovered && (
          <m.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md z-10 bg-primary-100 border border-white text-white absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {country}
          </m.div>
        )}
      </AnimatePresence>
      <Image
        src={flag}
        width={40}
        height={40}
        alt={`${country} flag`}
        className="rounded-full"
      />
    </m.div>
  );
}
