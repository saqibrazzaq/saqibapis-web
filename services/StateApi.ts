import { StateSearchReq } from "@/app/states/search/StateSearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import StateEditReq from "@/models/State/StateEditReq";
import { StateRes } from "@/models/State/StateRes";

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
  get: async function (id?: string): Promise<StateRes> {
    const response = await SaqibAPIsClient.request({
      url: `/api/states/getbyid/${id}`,
      method: "GET",
    });

    return response.data;
  },
  delete: async function (id?: string) {
    const response = await SaqibAPIsClient.request({
      url: `/api/states/delete/${id}`,
      method: "DELETE",
    });

    return response.data;
  },
  create: async function (data: StateEditReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/states/create",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (data: StateEditReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/states/update",
      method: "PUT",
      data: data,
    });

    return response.data;
  },
};
