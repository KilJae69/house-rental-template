"use client";
import { Link, usePathname } from "@/i18n/routing";
import { useMotionValueEvent, useScroll, m } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import Image from "next/image";

import navLinks from "@/constants/navLinks";
import { FloatingDockMobile } from "./ui/floating-dock";
import AnimatedModalSidebar from "./AnimatedModalSidebar";

import { useTheme } from "next-themes";

import { LOGO_ICONS, SEASON_ICONS } from "@/constants/assetsData";
import HeaderCustomLink from "./shared/HeaderCustomLink";
import ClientOnly from "./ClientOnly";

/*
const FallbackComponent = () => (
  <button className="button-two" aria-expanded="false">
    <svg
      stroke="var(--button-color)"
      className="hamburger"
      viewBox="0 0 100 100"
      width="30"
    >
      <line
        className="line top"
        x1="90"
        x2="10"
        y1="40"
        y2="40"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="0"
      ></line>
      <line
        className="line bottom"
        x1="10"
        x2="90"
        y1="60"
        y2="60"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="0"
      ></line>
    </svg>
  </button>
);
*/
export default function Header() {
  const [headerState, setHeaderState] = useState<"top" | "hidden" | "small">(
    "top"
  );
  const { scrollY } = useScroll();
  const t = useTranslations();
  const { resolvedTheme  } = useTheme();
  // fallback to summer if something’s off
  const iconSrc =
    SEASON_ICONS[resolvedTheme  as keyof typeof SEASON_ICONS] || SEASON_ICONS.summer;

  const logoSrc =
    LOGO_ICONS[resolvedTheme  as keyof typeof LOGO_ICONS] || LOGO_ICONS.summer;

  const pathname = usePathname();
  const languages = [
    {
      code: "en",
      country: t("Header.language-option-en"),
      flag: "/icons/en.png",
    },
    {
      code: "bs",
      country: t("Header.language-option-bs"),
      flag: "/icons/bs.png",
    },
    // {
    //   code: "de",
    //   country: t("Header.language-option-de"),
    //   flag: "/icons/de.png",
    // },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    if (latest === 0) {
      setHeaderState("top");
    } else if (latest > previous && latest > 50) {
      setHeaderState("hidden");
    } else if (latest < previous) {
      setHeaderState("small");
    }
  });

  return (
    <m.header
      initial={{ y: -150 }}
      animate={{
        y: headerState === "hidden" ? -120 : 0,
      }}
      transition={{ type: "tween", duration: 0.2 }}
      className={`fixed top-0 left-0  w-full z-[1000] `}
    >
      <div className="fixed w-full left-1/2 -translate-x-1/2 ">
        <div
          className={`flex relative items-center max-w-7xl mx-auto justify-between p-3 transition-all duration-300 ${
            headerState === "top"
              ? " top-2 px-4 lg:px-8 border-none rounded-none"
              : "py-1 top-2   bg-white/80 shadow-lg rounded-3xl backdrop-filter shadow-[var(--color-primary)]/[0.3] backdrop-blur-xl  px-10"
          }`}
        >
          {/* Logo Animation */}
          <div
            // initial={{ width: 160, height: 100 }}
            // animate={{
            //   width: headerState === "small" ? 120 : 200,
            //   height: headerState === "small" ? 70 : 100,
            // }}
            // transition={{ type: "tween", duration: 0.2 }}
            className="relative w-[120px] h-[40px] lg:w-[180px] lg:h-[80px]"
          >
            <Link href="/" aria-label="Home">
              <ClientOnly>
                <Image
                  src={logoSrc}
                  priority
                  alt="Spark Studio Logo"
                  className="object-contain"
                  fill
                />
              </ClientOnly>
            </Link>
          </div>
          <nav className="hidden lg:block">
            <ul className="flex whitespace-nowrap">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <HeaderCustomLink
                    href={link.href}
                    title={t(link.title)}
                    iconSrc={iconSrc}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Animated Items */}
          <div className="flex items-center justify-center whitespace-nowrap gap-x-8">
            {/* <Button className="hidden sm:block" href="/contact">
                  {t("contact-button")}
                </Button> */}

            <FloatingDockMobile items={languages} path={pathname} />

            <div className="lg:hidden">
              <AnimatedModalSidebar />
            </div>
          </div>
        </div>
      </div>
    </m.header>
  );
}
