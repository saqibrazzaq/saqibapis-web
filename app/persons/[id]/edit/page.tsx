import { Metadata } from "next";
import React from "react";
import PersonEditComponent from "./component";

export const metadata: Metadata = { title: "Update Person" };

const PersonEditPage = () => {
  return (
    <div>
      <PersonEditComponent />
    </div>
  );
};

export default PersonEditPage;
