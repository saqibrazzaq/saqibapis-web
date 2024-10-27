import { z } from "zod";

export default class StateEditReq {
  id: number = 0;
  name: string = "";
  countryId?: string = "";
  /**
   *
   */
  constructor(countryId?: string) {
    this.countryId = countryId;
  }
}

export const StateEditValidation = z.object({
  id: z.number(),
  name: z.string().min(2),
  countryId: z.string().optional(),
});
