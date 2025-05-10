import { AvatarCloud } from "../AvatarCloud";
import { MarqueeTestimonials } from "../MarqueeTestimonials";
import { Container } from "../shared/Container";

export default function TestimonialSection() {
  return (
    <section className="py-12 lg:py-24">
      <Container>
        <div className=" mx-auto grid md:grid-cols-2 gap-8 items-center ">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">
              Testimonials Section
            </h2>
            <p className="text-lg text-[var(--color-text-dark)] mb-6">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
              nostrum perferendis deleniti similique sequi aut odit temporibus
              nemo dolorem eos totam et autem ea suscipit iusto quod ipsam
              corrupti cumque?
            </p>
            {/* <PrimaryThemedButton>{t("aboutSection.learnMore")}</PrimaryThemedButton> */}
          </div>

          <AvatarCloud />
        </div>
        <div className="mt-12">
          <MarqueeTestimonials />
        </div>
      </Container>
    </section>
  );
}
