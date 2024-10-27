import React, { Suspense } from "react";
import CountriesSearchComponent from "./component";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Countries" };

const CountriesSearchPage = () => {
  return (
    <Suspense>
      <CountriesSearchComponent />
    </Suspense>
  );
};

export default CountriesSearchPage;
