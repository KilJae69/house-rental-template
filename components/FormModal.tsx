"use client";
import React from "react";

import { m } from "framer-motion";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "./ui/form-animated-modal";
import Image from "next/image";
import BookingInquiryForm from "./BookingInquiryForm";
import { useTranslations } from "next-intl";
import { MdAttachEmail } from "react-icons/md";

export function FormModal() {
  const t = useTranslations("BookingInquiryForm");
  const images = [
    "/images/fall-hero.png",
    "/images/summer-hero.png",
    "/images/winter-hero.png",
    "/images/spring-hero.png",
  ];
  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="px-6 py-3 bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary-light)] inline-flex items-center group relative justify-center font-medium rounded-md cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-offset-2 group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            {t("formModal.triggerButton")}
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <MdAttachEmail className="size-5" />
          </div>
        </ModalTrigger>
        <ModalBody className="scroll-y-auto">
          <ModalContent>
            <div className="bg-gradient-to-b text-center from-[var(--color-primary-dark)] via-[var(--color-primary)] px-4 lg:px-8 pt-4 lg:pt-8 to-white">

           
            <h3 className="text-lg md:text-2xl text-white font-bold text-center ">
              <span>{t("formModal.modalTitle")}</span>{" "}
              <span className="px-1 py-0.5 rounded-md text-[var(--color-primary-dark)] bg-gray-100  border border-gray-200">
                Cozy Cabin
              </span>
              ?{" "}
            </h3>
            <p className="text-white mt-4 mb-8 text-lg md:text-2xl"> {t("formModal.paragraph")}</p>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <m.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white border border-neutral-100 shrink-0 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt="bali images"
                    width="500"
                    height="500"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover shrink-0"
                  />
                </m.div>
              ))}
            </div>
            </div>
            <div className="mt-8 px-4 lg:px-8 pb-4 lg:pb-8">
              <BookingInquiryForm />
            </div>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
