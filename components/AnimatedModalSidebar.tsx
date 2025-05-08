"use client";
import React from "react";

import { Link } from "@/i18n/routing";



import { useTranslations } from "next-intl";
import Image from "next/image";

// import { FloatingDock } from "../ui/floating-dock";


import {  FaXmark } from "react-icons/fa6";
import navLinks from "@/constants/navLinks";
import { Modal, ModalBody, ModalContent, ModalTrigger, useModal } from "./ui/animated-modal";
import { useTheme } from "next-themes";
import { LOGO_ICONS, SEASON_ICONS } from "@/constants/assetsData";
import HeaderCustomLink from "./shared/HeaderCustomLink";
import { FloatingDock } from "./ui/floating-dock";
import ThemeFloatingDock from "./ThemeFloatingDock";
// import { Button } from "../ui/button";

function NavigationLinks() {
  const { setOpen } = useModal();
  const t = useTranslations();
  const { theme } = useTheme();
  // fallback to summer if something’s off
  const iconSrc =
    SEASON_ICONS[theme as keyof typeof SEASON_ICONS] || SEASON_ICONS.summer;

 

  return (
    <nav>
      <ul className="flex flex-col items-center">
        {navLinks.map(({ href, title }) => (
          <li key={href} onClick={() => setOpen(false)}>
            <HeaderCustomLink href={href} title={t(title)} iconSrc={iconSrc}/>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ModalHeader() {
  const { setOpen } = useModal();
  const { theme } = useTheme();
  const logoSrc = LOGO_ICONS[theme as keyof typeof LOGO_ICONS] || LOGO_ICONS.summer;
  return (
    <div className=" flex py-2 px-2 justify-between items-center bg-white ">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        aria-label="Home"
        className="relative w-[120px] h-[40px]"
      >
        <Image
          src={logoSrc}
          alt="Spark Studio Logo"
          className="object-contain"
          fill
        />
      </Link>

      <FaXmark
        onClick={() => setOpen(false)}
        className="size-6 cursor-pointer text-[var(--color-primary-dark)]"
      />
    </div>
  );
}

// function ModalFooter() {
 

//   return (
//     <div className="mt-auto">
//       <Button>Post Job</Button>
//     </div>
//   );
// }

export default function AnimatedModalSidebar() {
  
  return (
    <Modal >
      <ModalTrigger />

      <ModalBody className="size-full bg-gradient-to-b from-white via-[var(--color-primary)] to-[var(--color-primary-dark)] ">
        <ModalHeader />
        <ModalContent className="flex p-5">
          <NavigationLinks />
         <div className="flex flex-col gap-10 items-center justify-center py-10 mt-auto w-full">
           
            <FloatingDock />
            <ThemeFloatingDock desktop/>
          </div> 
          {/* <ModalFooter /> */}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
