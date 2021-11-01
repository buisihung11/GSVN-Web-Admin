import { EmailTemplate } from '@/type/email-template';
import { generateAPI } from './utils';

const emailTemplateApi = { ...generateAPI<EmailTemplate>('email-templates') };

export default emailTemplateApi;
