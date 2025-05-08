import { DraggableCards } from "@/components/DraggableCards";
import HeroSection from "@/components/sections/HeroSection";

import { Locale, locales } from "@/lib/locales";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";


import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/api/og?title=${encodeURIComponent(
    t("titleHome")
  )}&description=${encodeURIComponent(
    t("ogDescriptionHome")
  )}&locale=${locale}`;
  console.log(ogImageUrl);
  return {
    title: t("titleHome"),
    description: t("descriptionHome"),
    openGraph: {
      title: t("titleHome"),
      description: t("ogDescriptionHome"),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: t("titleHome"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleHome"),
      description: t("ogDescriptionHome"),
      images: [ogImageUrl],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <>
      <div>
        <HeroSection />
        <section className=" bg-[var(--color-background-light)]">
          
        
            {/* Text */}
            {/* <div>
              <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
                About This Retreat
              </h2>
              <p className="text-lg text-[var(--color-text-dark)] mb-6">
                Tucked into the whispering pines of Una National Park, our
                hand-crafted cabin blends modern comfort with rustic charm.
                Every window frames a postcard-perfect vista; every detail was
                chosen to make you feel at home in nature.
              </p>
              <PrimaryThemedButton href="/about">
                Learn More
              </PrimaryThemedButton>
            </div> */}

            {/* Image */}
            {/* <div className="rounded-lg overflow-hidden shadow-lg ring-1 ring-black/5">
              <Image
                src="/images/fall-hero.png"
                alt="Cozy interior view"
                width={800}
                height={600}
                className="object-cover w-full h-full"
                priority
              />
            </div> */}
            <DraggableCards/>
        
        </section>
      </div>
    </>
  );
}
