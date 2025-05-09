import { DraggableCards } from "../DraggableCards";
import { MarqueeTestimonials } from "../MarqueeTestimonials";

export default function DragCardsSection() {
  return (
    <section className=" bg-[var(--color-background-light)] px-4">
          
        
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
        <MarqueeTestimonials/>
        </section>
  );
  
}