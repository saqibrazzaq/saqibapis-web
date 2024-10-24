import { z } from "zod";

export default class CountryEditReq {
  id: number = 0;
  name: string = "";
  code?: string = "";
}

export const CountryEditValidation = z.object({
  id: z.number(),
  name: z.string().min(2),
  code: z.string().optional(),
});
