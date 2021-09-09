import type { TBadgeType } from '@/type/tutor';
import { generateAPI } from './utils';

export default {
  ...generateAPI<TBadgeType>('badges')
};
