import { TCourse } from '@/type/course';
import { generateAPI } from './utils';

export default {
  ...generateAPI<TCourse>('coursings')
};
