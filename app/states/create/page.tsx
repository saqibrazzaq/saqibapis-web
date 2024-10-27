import { Metadata } from "next";
import React, { Suspense } from "react";
import StateEditComponent from "../[id]/edit/component";

export const metadata: Metadata = { title: "Create State" };

const StateCreatePage = () => {
  return (
    <Suspense>
      <StateEditComponent />
    </Suspense>
  );
};

export default StateCreatePage;
