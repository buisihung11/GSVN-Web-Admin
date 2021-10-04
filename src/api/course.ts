import { TCourse } from '@/type/course';
import { generateAPIWithPaging } from './utils';

const courseApi = {
  ...generateAPIWithPaging<TCourse>('courses'),
};

export default courseApi;
