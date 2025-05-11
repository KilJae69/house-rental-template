import { useTranslations } from "next-intl";
import { AvatarCloud } from "../AvatarCloud";
import { MarqueeTestimonials } from "../MarqueeTestimonials";
import { Container } from "../shared/Container";

export default function TestimonialSection() {
  const t = useTranslations("HomePage.testimonialSection");
  return (
    <section className="py-12 lg:py-24">
      <Container>
        <div className=" mx-auto grid md:grid-cols-2 md:gap-8 items-center ">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              {t.rich("description", {
                strong: (chunk) => (
                  <strong className="font-bold">{chunk}</strong>
                ),
              })}
            </p>
            {/* <PrimaryThemedButton>{t("aboutSection.learnMore")}</PrimaryThemedButton> */}
          </div>

          <AvatarCloud />
        </div>
      </Container>
      <div className="lg:mt-12">
        <MarqueeTestimonials />
      </div>
    </section>
  );
}
