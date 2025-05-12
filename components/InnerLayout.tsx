"use client";

import { ReactNode } from "react";

import Header from "./Header";
import ThemeFloatingDock from "./ThemeFloatingDock";

// import Footer from "./Footer";

type InnerLayoutProps = {
  children: ReactNode;
};

// Define animation variants for the items

export default function InnerLayout({ children }: InnerLayoutProps) {
  return (
    <>
      <Header />

      <div className="relative flex flex-auto overflow-hidden bg-white ">
        <div className="relative isolate flex w-full flex-col ">
          <main className="w-full relative flex-auto min-h-[10000px]">
            {children}
            <div className="hidden xl:block  fixed right-4 top-1/2 -translate-y-1/2 z-50 ">
              <ThemeFloatingDock vertical desktop/>
            </div>
            <div className=" xl:hidden  fixed right-4 bottom-4 z-50 ">
              <ThemeFloatingDock />
            </div>
          </main>
        </div>
      </div>
      {/* <Footer /> */}
      <div id="modal-root"></div>
    </>
  );
}
