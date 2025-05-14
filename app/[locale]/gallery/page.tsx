import Gallery from "@/components/gallery/Gallery";
import { Container } from "@/components/shared/Container";
import PageIntro from "@/components/shared/PageIntro";
import { galleryData } from "@/constants/galleryData";
import { Locale, locales } from "@/lib/locales";
import { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

function Fallback(){
  return (
    <div className="flex items-center relative justify-center min-h-screen">
         <Image
           src="/bouncing-circles.svg"
           width={300}
           height={300}
           alt="Loading"
         />
       </div>
  )
}

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
  
  return {
    title: t("titleGallery"),
    description: t("descriptionGallery"),
    openGraph: {
      title: t("titleGallery"),
      description: t("ogDescriptionGallery"),
      images: [
        {
          url: "/og-seasons.png",
          width: 1200,
          height: 630,
          alt: t("titleGallery"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleGallery"),
      description: t("ogDescriptionGallery"),
      images: ["/og-seasons.png"],
    },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("GalleryPage")
  return (
     <section className=" py-20 w-full">
        <PageIntro title={t("pageTitle")}/>
        <Container>
          <Suspense fallback={<Fallback/>}>
            <Gallery galleryData={galleryData} />
          </Suspense>
        </Container>
      </section>
  );
  
}

