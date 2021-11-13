export type TContact = {
  phone: string;
  name: string;
  email: string;
  message: string;
  filters: string;
  toUserId: number;
  class: ContactType;
};

export enum ContactType {
  SUPPORT = 'support',
  PARTNER = 'partner',
  INFORNEWTUTOR = 'informNewTutor',
  CONTACT_TUTOR = 'contactTutor',
}
export enum ContactRequestStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  FAIL_TO_CONTACT = 'failToContact',
}
