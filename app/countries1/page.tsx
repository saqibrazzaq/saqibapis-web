import { CountryApi } from "@/services/CountryApi";
import React from "react";

async function Countries1Page() {
  const countries = await CountryApi.search();
  console.log(countries);
  return <div>Countries1Page</div>;
}

export default Countries1Page;
