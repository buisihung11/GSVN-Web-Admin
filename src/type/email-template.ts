export type EmailTemplate = {
  content: string;
  detail: string;
  subject: string;
  class: EmailClassType;
  isActive: boolean;
  isDefault: boolean;
};
export enum EmailClassType {
  ACCOUNT_CREATED = 'accountCreated',
  ORDER_CREATED = 'orderCreated',
  OTHER = 'other',
}
