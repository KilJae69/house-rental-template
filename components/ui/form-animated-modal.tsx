"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, m } from "framer-motion";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom";
interface ModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}


const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { setOpen } = useModal();
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-black shadow-lg  text-center relative overflow-hidden",
        className
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  );
};

export const ModalBody = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { open } = useModal();

   useEffect(() => {
     if (open) {
       document.body.style.overflow = "hidden";
     } else {
       document.body.style.overflow = "auto";
     }
   }, [open]);

  const [isClient, setIsClient] = useState(false); // Track if the code is running on the client
  
    useEffect(() => {
      setIsClient(true); // Set isClient to true when the component mounts (client-side)
    }, []);

  const modalRef = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const { setOpen } = useModal();
  useOutsideClick(modalRef, () => setOpen(false));


  if (!isClient) return null; // Don't render anything on the server

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return (ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
           transition={{
            duration: 0.4,
           
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full overflow-hidden flex items-center justify-center z-[1000]"
        >
          {/* <Overlay /> */}

          <m.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[80%] border xl:max-w-[800px] bg-white border-[var(--color-primary-dark)]  md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-auto",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    modalRoot
  ))
};

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col flex-1  ", className)}>
      {children}
    </div>
  );
};

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex justify-end p-4 bg-gray-100 ",
        className
      )}
    >
      {children}
    </div>
  );
};

// const Overlay = ({ className }: { className?: string }) => {
//   return (
//     <m.div
//       initial={{
//         opacity: 0,
//       }}
//       animate={{
//         opacity: 1,
//         backdropFilter: "blur(10px)",
//       }}
//       exit={{
//         opacity: 0,
//         backdropFilter: "blur(0px)",
//       }}
//       className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
//     ></m.div>
//   );
// };

const CloseIcon = () => {
  const { setOpen } = useModal();
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 cursor-pointer group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[var(--color-primary-light)]  h-6 w-6 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

// Hook to detect clicks outside of a component.
export function useOutsideClick(
  modalRef: React.RefObject<HTMLElement>,
  callback: () => void
) {
  useEffect(() => {
    // Listen for *any* pointer event
    const handleClick = (event: Event) => {
      const target = event.target as Node;

      // 1) inside the modal?
      if (modalRef.current?.contains(target)) {
        return;
      }

      // 2) inside any popover?
      const pop = document.querySelector("[data-popover]");
      if (pop instanceof HTMLElement && pop.contains(target)) {
        return;
      }

      // 3) truly outside → close

      callback();
    };

    document.addEventListener("mousedown", handleClick);
    // TS sees handleClick as (e: Event) because its param is Event.
    // For touchstart we cast it to the generic EventListener.
    document.addEventListener("touchstart", handleClick as EventListener);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick as EventListener);
    };
  }, [modalRef, callback]);
}
