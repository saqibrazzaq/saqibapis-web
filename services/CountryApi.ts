import { CountrySearchReq } from "@/app/countries/search/CountrySearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";

export const CountryApi = {
  search: async function search(searchParams?: CountrySearchReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/countries/search",
      method: "GET",
      params: searchParams,
    });
    // console.log(response.data);

    return response.data;
  },
};
