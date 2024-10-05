import CountryRes from "../Country/CountryRes";

export interface StateRes {
  id: number;
  name?: string;
  countryId?: number;
  country?: CountryRes;
}
