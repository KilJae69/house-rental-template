

import { Container } from "./Container";
import { FadeIn } from "./FadeIn";

export default function PageIntro({ title }: { title: string }) {
  return (
    <section className="relative py-4 lg:mt-10 lg:py-11.5  bg-radial-[at_50%_95%] from-[var(--color-primary-dark)] to-[var(--color-primary-light)]">
     
      <Container className="">
        <FadeIn className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-2xl font-bold tracking-widest text-white lg:text-4xl">
            {title}
          </h1>
        
        </FadeIn>
      </Container>
    </section>
  );
}
