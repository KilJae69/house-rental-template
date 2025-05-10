import AboutSection from "@/components/sections/AboutSection";
// import DragCardsSection from "@/components/sections/DragCardsSection";
import HeroSection from "@/components/sections/HeroSection";
import PlayVideoSection from "@/components/sections/PlayVideoSection";
import TestimonialSection from "@/components/sections/TestimonialSection";


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
      <HeroSection />
      <AboutSection/>
     <PlayVideoSection/>
     <TestimonialSection/>
      {/* <DragCardsSection/> */}
    </>
  );
}
