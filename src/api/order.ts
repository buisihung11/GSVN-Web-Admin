import { OrderStatus, TOrder } from '@/type/order';
import request from '@/utils/axios';
import { generateAPIWithPaging } from './utils';
import { PaymentStatus } from '@/type/constants';

const updateOrderStatus = (tutorId: number, data: { detail: string; orderStatus: OrderStatus }) =>
  request.put<any>(`/orders/${tutorId}`, data);

const updateOrderPaymentStatus = (
  orderId: number,
  data: { status: PaymentStatus; reason: string },
) => request.put<any>(`/orders/${orderId}/payment`, data);
const orderApi = {
  ...generateAPIWithPaging<TOrder>('orders'),
  updateOrderStatus,
  updateOrderPaymentStatus,
};

export default orderApi;
