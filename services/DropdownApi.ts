import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import { DropdownReq } from "@/models/Dropdowns/DropdownDtos";

export const DropdownApi = {
  getStates: async function getStates(searchParams?: DropdownReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/dropdowns/state",
      method: "GET",
      params: searchParams,
    });

    return response.data;
  },
  getCountries: async function getCountries(searchParams?: DropdownReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/dropdowns/country",
      method: "GET",
      params: searchParams,
    });

    return response.data;
  },
};
