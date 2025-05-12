import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { GalleryItem } from "@/constants/galleryData";
import Image from "next/image";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";
export default function GalleryModal({
  setSelected,
  selected,
}: {
    setSelected: (item: GalleryItem | null) => void;
  selected: GalleryItem | null;
}) {
  if (!selected) {
    return null;
  }
 
  return createPortal(
   <div
     onClick={() => setSelected(null)}
     className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm cursor-pointer overflow-y-scroll"
   >
    <button  onClick={() => setSelected(null)} className="absolute z-[3000] text-[var(--color-primary-light)] lg:right-10 lg:top-10  right-2 top-2">
      <FaXmark className="size-7" />
    </button>

      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[700px]  mx-auto my-8 px-8 cursor-default"
      >
        <motion.div className="relative rounded-t-lg overflow-hidden" layoutId={`image-card-${selected.id}`}>
          <Image width={800}   // Example default width
          height={600}  // Example default height
          className="w-full h-auto object-contain " src={selected.url} alt={selected.title}/>
        </motion.div>
        <motion.div
        
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="bg-white p-4 rounded-b-lg"
        >
          <h3 className="text-2xl text-[var(--color-primary-dark)] font-bold mb-2">{selected.title}</h3>
          <div className="flex flex-wrap mt-2 gap-2">
            {selected.tags.map((tag) => (
              <Badge variant={"outline"} className="text-[var(--color-primary-dark)]" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <p className="my-4">{selected.description}</p>
        </motion.div>
      </div>
    </div>,
     document.body
  );
}
