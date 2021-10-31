import { TBadge } from './badge';
import { TutorStatus } from './constants';
import { TImage } from './image';

export enum BadgeType {
  DIAMOND = 'Kim cương',
  GOLD = 'Vàng',
}

export type TTutor = {
  id: number;
  badgeId: number;
  badge?: TBadge;
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
  userCoursings: Partial<TutorCoursing>[];
  userStatus: TutorStatus;

  totalHourRemain: number;
  totalReview: number;
  demoVideo?: DemoVideo;
  introVideo?: IntroVideo;
  certificates?: Certificate[];
};

export type TutorCoursing = {
  id: number;
  rate: number;
  groupRate: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  coursingId: number;
  coursingLevelId: number;
  coursing: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    createdByUserId: number;
    updatedByUserId: number;
    userCoursings: any[];
    coursingLevels: {
      id: number;
      coursingId: number;
      name: string;
      createdByUserId: number;
      updatedByUserId: number;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
  coursingLevel: {
    id: number;
    coursingId: number;
    name: string;
    createdByUserId: number;
    updatedByUserId: number;
    createdAt: Date;
    updatedAt: Date;
  };
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

export interface DemoVideo {
  id: number;
  class: string;
  title: string;
  url: string;
  detail: string;
  currentStatus: string;
}

export interface IntroVideo {
  id: number;
  class: string;
  title: string;
  url: string;
  detail: string;
  currentStatus: string;
}

export interface File {
  id: number;
  class: string;
  title: string;
  url: string;
  detail: string;
  currentStatus: string;
}

export interface Certificate {
  id: number;
  fileId: number;
  file: File;
  detail: string;
  class: string;
  currentStatus: string;
}
