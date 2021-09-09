import { TCreateOrderRequest, TOrder } from '@/type/order';
import { TTutor, TTutorRegister } from '@/type/tutor';
import request from '@/utils/axios';
import { generateAPIWithPaging } from './utils';

const getTutorProfile = () => request.get<TTutor>('/tutors/self');

const registerTutor = (values: TTutorRegister) => request.post('/tutors/register', values);

const bookTutor = (tutorId: number, values: TCreateOrderRequest) =>
  request.post<TOrder>(`/tutors/${tutorId}/orders`, values);

const tutorApi = {
  ...generateAPIWithPaging<TTutor>('tutors'),
  registerTutor,
  bookTutor,
  getTutorProfile
};

export default tutorApi;
