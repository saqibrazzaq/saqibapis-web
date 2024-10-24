import { Metadata } from "next";
import React from "react";
import CountryEditComponent from "../[id]/edit/component";

export const metadata: Metadata = { title: "Create Country" };

const CountryCreatePage = () => {
  return (
    <div>
      <CountryEditComponent />
    </div>
  );
};

export default CountryCreatePage;
