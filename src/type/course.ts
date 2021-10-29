import { TImage } from './image';
import { TeachFormType } from './tutor';

export type TCourse = {
  id: number;
  title: string;
  description?: string;
  coursingLevel?: string;
  teachForm: TeachFormType;
  banner?: Partial<TImage>;
  benefit: string;
  slug?: string;
  duration: number;
  durationUnit: string;
  amount: number;
  discount?: number;
  tableOfContent?: string;
  content?: string;
  detail?: string;
  inCharge?: string;
  bannerId?: number;

  mentor: string;
};
