import { TContact } from '@/type/contact';
import { generateAPIWithPaging } from './utils';

const contactApi = {
  ...generateAPIWithPaging<TContact>('contact-requests'),
};

export default contactApi;
