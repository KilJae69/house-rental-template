import Gallery from "@/components/gallery/Gallery";
import { Container } from "@/components/shared/Container";
import { galleryData } from "@/constants/galleryData";
import { Suspense } from "react";

export default function GalleryPage() {
  return (
     <section className=" py-20 w-full">
        {/* <LayoutGrid cards={cards} /> */}
        <Container>
          <Suspense fallback={<div>Loading gallery...</div>}>
            <Gallery galleryData={galleryData} />
          </Suspense>
        </Container>
      </section>
  );
  
}