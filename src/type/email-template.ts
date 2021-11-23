export type EmailTemplate = {
  content: string;
  detail: string;
  subject: string;
  class: EmailClassType;
  isActive: boolean;
  isDefault: boolean;
  id: number;
};
export enum EmailClassType {
  ACCOUNT_CREATED = 'accountCreated',
  ORDER_CREATED = 'orderCreated',
  OTHER = 'other',
}
export enum SendEmailRoleEnum {
  ADMINISTRATOR = 'administrator',
  MODERATOR = 'moderator',
  STUDENT = 'student',
  TUTOR = 'tutor',
}
