"use client";

import { ReactNode } from "react";

 import Header from "./Header";
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
          <main className="w-full flex-auto min-h-[10000px]">{children}</main>
        </div>
      </div>
      {/* <Footer /> */}
      <div id="modal-root"></div>
    </>
  );
}
