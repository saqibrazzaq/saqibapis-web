"use client";

import Sidebar from "@/components/Sidebar";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="flex">
        <div className="hidden md:block h-[80vh] w-[300px]">
          <Sidebar />
        </div>
        <div className="mx-2 w-full md:max-w-[1140px]">{children}</div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MyApp;
