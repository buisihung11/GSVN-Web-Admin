import { TeachForm } from './enums';
import { TStudent } from './student';
import { TTutor } from './tutor';

export enum OrderStatus {
  NEW = 'new',
  ADMIN_CONFIRMED = 'adminConfirmed',
  TUTOR_CONFIRMED = 'tutorConfirmed',
  PAYMENT_CONFIRMED = 'paymentConfirmed',
  CLOSED = 'closed',
  REJECTED = 'rejected',
}

export type TCreateOrderRequest = {
  totalStudent: number;
  startDate: Date;
  hoursPerWeek: number;
  teachForm: string;
  teachAddress: string;
  teachDistrict: string;
  teachCity: string;
};

export type TOrder = {
  id: number;
  tutor: Partial<TTutor>;
  owner: Partial<TStudent>;
  currentStatus: OrderStatus;
  createdByUserId?: number;
  updatedByUserId?: number;
  createdAt: Date;
  updatedAt?: Date;
  class: 'tutorOrder' | 'courseOrder';
  coursingTitle: string;
  coursingLevel: string;
  orderRate: number;
  totalStudent: number;
  startDate: Date;
  hoursPerWeek: number;
  teachForm: TeachForm;
  teachAddress: string;
  teachDistrict: string;
  teachCity: string;
  paymentStatus?: string;
};
