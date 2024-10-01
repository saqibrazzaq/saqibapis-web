import { PersonSearchReq } from "@/app/persons/search/PersonSearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";

export const PersonApi = {
  search: async function search(searchParams?: PersonSearchReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/persons/search",
      method: "GET",
      params: searchParams,
    });
    // console.log(response.data);

    return response.data;
  },
};
