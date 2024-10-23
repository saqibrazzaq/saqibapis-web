import { Metadata } from "next";
import React from "react";
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
