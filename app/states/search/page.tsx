import { Metadata } from "next";
import React, { Suspense } from "react";
import StateSearchComponent from "./component";

const metadata: Metadata = { title: "States" };

const StateSearchPage = () => {
  return (
    <Suspense>
      <StateSearchComponent />
    </Suspense>
  );
};

export default StateSearchPage;
