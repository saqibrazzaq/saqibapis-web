import { Metadata } from "next";
import React from "react";
import StateEditComponent from "./component";

export const metadata: Metadata = { title: "Edit State" };

const StateEditPage = () => {
  return (
    <div>
      <StateEditComponent />
    </div>
  );
};

export default StateEditPage;
