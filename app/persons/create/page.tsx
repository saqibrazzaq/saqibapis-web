import { Metadata } from "next";
import React from "react";
import PersonCreateComponent from "./component";

export const metadata: Metadata = { title: "Create Person" };

const PersonCreatePage = () => {
  return (
    <div>
      <PersonCreateComponent />
    </div>
  );
};

export default PersonCreatePage;
