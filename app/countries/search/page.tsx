import React from "react";
import CountriesSearchComponent from "./component";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Countries" };

const CountriesSearchPage = () => {
  return (
    <div>
      <CountriesSearchComponent />
    </div>
  );
};

export default CountriesSearchPage;
