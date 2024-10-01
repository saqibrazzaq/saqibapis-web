"use client";

import Sidebar from "@/components/Sidebar";

import React from "react";

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
        <div className="ms-2 w-full md:max-w-[1140px]">{children}</div>
      </div>
    </div>
  );
}

export default MyApp;
