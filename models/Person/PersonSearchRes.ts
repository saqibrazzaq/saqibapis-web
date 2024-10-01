export default interface PersonSearchRes {
  id: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  dateOfBirth: Date;
  notes?: string;
  imageUrl?: string;
  isActive: boolean;
  gender?: string;
  city?: string;
  stateId?: number;
  state?: StateRes;
}
