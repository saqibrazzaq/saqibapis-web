import { Metadata } from "next";
import React, { Suspense } from "react";
import PersonsSearchComponent from "./component";

export const metadata: Metadata = { title: "Persons" };

const PersonsSearchPage = () => {
  return (
    <Suspense>
      <PersonsSearchComponent />
    </Suspense>
  );
};

export default PersonsSearchPage;
