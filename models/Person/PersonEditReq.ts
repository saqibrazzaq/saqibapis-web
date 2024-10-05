import { z } from "zod";

export default class PersonEditReq {
  id: number = 0;
  firstName: string = "";
  lastName?: string = "";
  phone?: string = "";
  email: string = "";
  dateOfBirth?: Date = new Date(Date.now());
  notes?: string = "";
  imageUrl?: string = "";
  isActive?: boolean = true;
  gender?: string = "";
  city?: string = "";
  stateId?: string = "";
}

export const PersonEditValidation = z.object({
  id: z.number(),
  firstName: z.string().min(2),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email(),
  dateOfBirth: z.coerce.date().optional(),
  notes: z.string().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean().optional(),
  gender: z.string().optional(),
  city: z.string().optional(),
  stateId: z.string().optional(),
});
