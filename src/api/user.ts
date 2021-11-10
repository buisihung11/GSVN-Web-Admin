import { TTutor } from '@/type/tutor';
import { generateAPIWithPaging } from './utils';

const userApi = {
  ...generateAPIWithPaging<TTutor>('users'),
};

export default userApi;
