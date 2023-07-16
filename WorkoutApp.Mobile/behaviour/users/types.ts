import { BaseModel } from '../types';

export type User = BaseModel & {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  dateOfBirth: string | null;
}
