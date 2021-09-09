import { TOrder } from '@/type/order';
import { BaseReponse, TRequestPaging } from '@/type/response';
import { TStudent } from '@/type/student';
import request from '@/utils/axios';

const getStudentProfile = () => request.get<TStudent>('/students/self');

const registerStudent = (values: TStudent) => request.post('/students/register', values);

const getStudentOrders = (studentId: number) =>
  request.get<BaseReponse<TOrder>>(`/students/${studentId}/orders`);

const studentApi = {
  registerStudent,
  getStudentOrders,
  getStudentProfile
};

export default studentApi;
