import React from "react";
import CountryEditComponent from "./component";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Update Country" };

const CountryEditPage = () => {
  return (
    <div>
      <CountryEditComponent />
    </div>
  );
};

export default CountryEditPage;
