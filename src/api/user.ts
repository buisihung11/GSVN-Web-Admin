import { TutorStatus } from '@/type/constants';
import { TCreateOrderRequest, TOrder } from '@/type/order';
import { TTutor, TTutorRegister } from '@/type/tutor';
import request from '@/utils/axios';
import { generateAPIWithPaging } from './utils';

const userApi = {
  ...generateAPIWithPaging<TTutor>('users'),
};

export default userApi;
