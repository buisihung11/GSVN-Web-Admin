import { TutorStatus } from './constants';
import { TCourse } from './course';
import { TImage } from './image';

export enum BadgeType {
  DIAMOND = 'Kim cương',
  GOLD = 'Vàng',
}

export type TBadgeType = {
  id: number;
  title: string;
  criteriaDescription?: any;
  imageId?: any;
  image?: TImage;
};

export type TTutor = {
  id: number;
  badge?: TBadgeType;
  phone?: string;
  email?: string;
  gender?: 'female' | 'male' | 'preferNo' | '';
  fullName: string;
  rate: number;
  groupRate: number;
  about: string;
  hoursPerWeek: number;
  teachForm?: TeachFormType;
  address?: string;
  district?: string;
  city?: string;
  teachAddress: string;
  teachDistrict: string;
  teachCity: string;
  slug: string;
  avatar?: Partial<TImage>;
  coursings: Partial<TCourse>[];
  status: TutorStatus;

  totalHourRemain: number;
  totalReview: number;
};

export type TeachFormType = 'both' | 'online' | 'offline' | undefined | string;

export type TTutorQuery = Partial<TTutor> & {
  slot?: string;
  coursingIds?: string[];
  availableDates?: number[];
  teachForm?: TeachFormType;
  badgeIds?: number[];
  hoursPerWeek?: number;
  rate?: {
    from: number;
    to?: number;
  };
};

export type TTutorRegister = Omit<TTutor, 'id' | 'badge'> & {
  avatarUrl: string;
  demoVideoUrl: string;
  introVideoUrl: string;
  referalFrom: string;
};
