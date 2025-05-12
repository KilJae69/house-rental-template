

import { useTranslations } from "next-intl";
import { Container } from "./shared/Container";
import { FadeIn } from "./shared/FadeIn";
import PrimaryThemedButton from "./shared/PrimaryThemedButton";


export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  return (
    <>
      <Container className="flex size-full items-center justify-center pt-24 sm:pt-32 lg:pt-40">
        <FadeIn className="flex max-w-xl flex-col items-center text-center">
          <p className="font-display text-4xl lg:text-7xl font-semibold text-[var(--color-primary-dark)] sm:text-5xl">
            {t("title")}
          </p>
          <h1 className="mt-4 font-display text-2xl lg:text-5xl font-semibold text-[var(--color-primary-dark)]">
            {t("header")}
          </h1>
          <p className="mt-y lg:my-4 text-sm lg:text-2xl text-neutral-600">{t("description")}</p>
          
          <PrimaryThemedButton href="/">
            {t("homeLink")}
          </PrimaryThemedButton>
        </FadeIn>
      </Container>
      
    </>
  );
}
