import { TutorStatus } from '@/type/constants';
import { TCreateOrderRequest, TOrder } from '@/type/order';
import { TTutor, TTutorRegister } from '@/type/tutor';
import request from '@/utils/axios';
import { generateAPIWithPaging } from './utils';

const getTutorProfile = () => request.get<TTutor>('/tutors/self');

const registerTutor = (values: TTutorRegister) => request.post('/tutors/register', values);

const bookTutor = (tutorId: number, values: TCreateOrderRequest) =>
  request.post<TOrder>(`/tutors/${tutorId}/orders`, values);

const updateTutorStatus = (tutorId: number, data: { detail: string; status: TutorStatus }) =>
  request.put<any>(`/tutors/${tutorId}`, data);

const tutorApi = {
  ...generateAPIWithPaging<TTutor>('users'),
  registerTutor,
  bookTutor,
  getTutorProfile,
  updateTutorStatus,
};

export default tutorApi;
