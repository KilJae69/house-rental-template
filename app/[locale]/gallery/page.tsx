import Gallery from "@/components/gallery/Gallery";
import { Container } from "@/components/shared/Container";
import { galleryData } from "@/constants/galleryData";
import Image from "next/image";
import { Suspense } from "react";

export default function GalleryPage() {
  return (
     <section className=" py-20 w-full">
        {/* <LayoutGrid cards={cards} /> */}
        <Container>
          <Suspense fallback={<Fallback/>}>
            <Gallery galleryData={galleryData} />
          </Suspense>
        </Container>
      </section>
  );
  
}

function Fallback(){
  return (
    <div className="flex items-center relative justify-center min-h-full">
         <Image
           src="/bouncing-circles.svg"
           width={100}
           height={100}
           alt="Loading"
         />
       </div>
  )
}