import { Link } from "@/i18n/routing";
import Image from "next/image";
import { ComponentProps } from "react";
import ClientOnly from "../ClientOnly";

type LinkHref = ComponentProps<typeof Link>["href"];

export default function HeaderCustomLink({
  href,
  title,
  iconSrc,
}: {
  href: LinkHref;
  title: string;
  iconSrc: string;
}) {
  return (
    <Link
      href={href}
      // group + relative positioning for the animation
      className="group relative inline-block px-5 py-3 text-lg font-semibold capitalize text-[var(--color-primary-dark)]"
    >
      {/* the link text */}
      <span className="relative z-10 ">{title}</span>

      {/* the underline grows L→R on hover */}
      <div className="absolute  bottom-0 left-0 h-[2px] w-full bg-[var(--color-primary-dark)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100">
        <span className="w-full h-[2px] bg-[var(--color-primary-dark)]" />
        <ClientOnly>
          <Image
            src={iconSrc}
            alt=""
            width={20}
            height={20}
            className="absolute -right-5 top-1/2 -translate-y-1/2"
          />
        </ClientOnly>
      </div>
    </Link>
  );
}
