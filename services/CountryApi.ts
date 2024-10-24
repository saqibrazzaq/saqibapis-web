import { CountrySearchReq } from "@/app/countries/search/CountrySearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import CountryEditReq from "@/models/Country/CountryEditReq";
import CountryRes from "@/models/Country/CountryRes";

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
  get: async function (id?: string): Promise<CountryRes> {
    const response = await SaqibAPIsClient.request({
      url: `/api/countries/getbyid/${id}`,
      method: "GET",
    });

    return response.data;
  },
  delete: async function (id?: string) {
    const response = await SaqibAPIsClient.request({
      url: `/api/countries/delete/${id}`,
      method: "DELETE",
    });

    return response.data;
  },
  create: async function (data: CountryEditReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/countries/create",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (data: CountryEditReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/countries/update",
      method: "PUT",
      data: data,
    });

    return response.data;
  },
};
