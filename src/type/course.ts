import { TeachFormType, TTutor } from './tutor';

export type TCourse = {
  id: number;
  title: string;
  description: string;
  coursingLevel?: string;
  mentor: Partial<TTutor>;
  teachForm: TeachFormType;
  duration: Date[] | string[];
  totalAmount: number;
  finalAmount: number;
  tableOfContents: string[];
  bannerUrl?: string;
  benefits: string[];
  slug: string;
};
