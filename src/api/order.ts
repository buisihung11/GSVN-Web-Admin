import { OrderStatus, TOrder } from '@/type/order';
import request from '@/utils/axios';
import { generateAPIWithPaging } from './utils';

const updateOrderStatus = (tutorId: number, data: { detail: string; status: OrderStatus }) =>
  request.put<any>(`/orders/${tutorId}`, data);

const orderApi = {
  ...generateAPIWithPaging<TOrder>('orders'),
  updateOrderStatus,
};

export default orderApi;
