import request from '@/utils/axios';

const sendEmail = (values: any) => request.post('/emails', values);

const emailApi = {
  sendEmail,
};

export default emailApi;
