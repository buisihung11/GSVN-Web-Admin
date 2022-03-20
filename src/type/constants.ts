export type TAccountRole = 'Administrator' | 'moderator';

export enum TutorStatus {
  NEW = 'new',
  APPROVED = 'approved',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
}
