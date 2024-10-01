import { Metadata } from "next";
import React from "react";
import StateSearchComponent from "./component";

const metadata: Metadata = { title: "States" };

const StateSearchPage = () => {
  return (
    <div>
      <StateSearchComponent />
    </div>
  );
};

export default StateSearchPage;
