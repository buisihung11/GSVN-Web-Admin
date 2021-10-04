import type { TBadge } from '@/type/badge';
import { generateAPI } from './utils';

const badgeApi = {
  ...generateAPI<TBadge>('badges'),
};

export default badgeApi;
