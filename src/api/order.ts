import { TOrder } from '@/type/order';
import { generateAPIWithPaging } from './utils';

const orderApi = {
  ...generateAPIWithPaging<TOrder>('orders'),
};

export default orderApi;
