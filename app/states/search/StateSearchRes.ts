import CountryRes from "@/models/Country/CountryRes";

export default interface StateSearchRes {
  id: number;
  name?: string;
  countryId?: number;
  country: CountryRes;
}
