import { StateSearchReq } from "@/app/states/search/StateSearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";

export const StateApi = {
  search: async function search(searchParams?: StateSearchReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/states/search",
      method: "GET",
      params: searchParams,
    });
    // console.log(response.data);

    return response.data;
  },
};
