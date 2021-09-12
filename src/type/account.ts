import { TAccountRole } from './constants';

export type TAccount = {
  id: number;
  username: string;
  password?: string;
  fullName: string;
  role: TAccountRole;
  phone?: string;
  gender?: 'female' | 'male' | 'preferNo' | '';
};
