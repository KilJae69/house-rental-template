import { cn } from "@/lib/utils";
import { Marquee } from "./ui/marquee";
import Image from "next/image";
import { testimonialData } from "@/constants/testimonialData";
import { useTranslations } from "next-intl";

const firstRow = testimonialData.slice(0, testimonialData.length / 2);
const secondRow = testimonialData.slice(testimonialData.length / 2);

const ReviewCard = ({
  img,
  name,
  flagIcon,
  country,
  body,
}: {
  img: string;
  name: string;
  flagIcon: string;
  username: string;
  country: string;
  body: string;
}) => {
   const t = useTranslations("HomePage.testimonialSection")
  return (
    <figure
      className={cn(
        "relative h-full w-64 lg:w-94 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <div className="flex items-center gap-2">
            <Image
              className="rounded-full"
              width={20}
              height={20}
              alt={t(`${country}`)}
              src={flagIcon}
            />
            <p className="text-xs font-medium dark:text-white/40">{t(`${country}`)}</p>
          </div>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{t(`${body}`)}</blockquote>
    </figure>
  );
};

export function MarqueeTestimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
    </div>
  );
}
