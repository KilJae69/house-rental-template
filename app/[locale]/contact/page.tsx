import AnimatedImages from "@/components/contact/AnimatedImages";
import BookingInquiryFields from "@/components/shared/BookingInquiryFields";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/shared/FadeIn";
import PageIntro from "@/components/shared/PageIntro";
import { BorderBeam } from "@/components/ui/border-beam";
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

  return {
    title: t("titleContact"),
    description: t("descriptionContact"),
    openGraph: {
      title: t("titleContact"),
      description: t("ogDescriptionContact"),
      images: [
        {
          url: "/og-seasons.png",
          width: 1200,
          height: 630,
          alt: t("titleContact"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("titleContact"),
      description: t("ogDescriptionContact"),
      images: ["/og-seasons.png"],
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <section className=" py-20 w-full">
      <PageIntro title={t("pageTitle")} />

      <Container>
        <div className="my-12  text-center ">
          <h2 className="text-3xl lg:text-5xl text-[var(--color-text-dark: #0f172a)] leading-[1.5] font-bold text-center ">
            <span>{t("title")}</span>{" "}
            <span className="px-1 py-0.5 rounded-md text-[var(--color-primary-dark)] bg-gray-100 whitespace-nowrap border border-gray-200">
              Cozy Cabin
            </span>
            ?{" "}
          </h2>
          <p className="text-[var(--color-text-dark: #0f172a)] mt-4 text-xl md:text-2xl">
            {" "}
            {t("paragraph")}
          </p>
        </div>
        <div className="mb-12 ">
          <AnimatedImages />
        </div>
        <FadeIn className="max-w-3xl bg-gradient-to-br relative from-[var(--color-secondary-light)]/10 via-[var(--color-secondary)]/5 to-[var(--color-secondary-dark)]/20 p-4 lg:p-8 rounded-xl shadow-lg mx-auto">
          <BookingInquiryFields />
         <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-[var(--color-primary-dark)] to-transparent"
      />
     
        </FadeIn>
      </Container>
    </section>
  );
}
