import { Metadata } from "next";
import React from "react";
import PersonCreateComponent from "./component";
import PersonEditComponent from "../[id]/edit/component";

export const metadata: Metadata = { title: "Create Person" };

const PersonCreatePage = () => {
  return (
    <div>
      <PersonEditComponent />
    </div>
  );
};

export default PersonCreatePage;
