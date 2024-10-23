import { PersonSearchReq } from "@/app/persons/search/PersonSearchReq";
import { SaqibAPIsClient } from "@/axios/SaqibAPIsClient";
import PersonCreateReq from "@/models/Person/PersonCreateReq";
import PersonEditReq from "@/models/Person/PersonEditReq";
import PersonRes from "@/models/Person/PersonRes";

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
  create: async function (data: PersonCreateReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/persons/create",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (data: PersonEditReq) {
    const response = await SaqibAPIsClient.request({
      url: "/api/persons/update",
      method: "PUT",
      data: data,
    });

    return response.data;
  },
  get: async function (id?: string): Promise<PersonRes> {
    const response = await SaqibAPIsClient.request({
      url: `/api/persons/getbyid/${id}`,
      method: "GET",
    });

    return response.data;
  },
  delete: async function (id?: string) {
    const response = await SaqibAPIsClient.request({
      url: `/api/persons/delete/${id}`,
      method: "DELETE",
    });

    return response.data;
  },
};
