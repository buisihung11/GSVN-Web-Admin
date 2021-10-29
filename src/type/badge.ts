import { TImage } from './image';

export type TBadge = {
  id: number;
  title?: string;
  criteriaDescription?: string;
  imageId?: number;
  image?: TImage;
};
