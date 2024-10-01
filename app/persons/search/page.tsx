import { Metadata } from "next";
import React from "react";
import PersonsSearchComponent from "./component";

export const metadata: Metadata = { title: "Persons" };

const PersonsSearchPage = () => {
  return (
    <div>
      <PersonsSearchComponent />
    </div>
  );
};

export default PersonsSearchPage;
