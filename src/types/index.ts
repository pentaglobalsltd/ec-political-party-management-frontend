export interface Response<T> {
  data: T;
  status?: number;
}

export enum ROLE {
  ADMIN = 'admin',
  SUPPORT = 'support',
}

export enum STATUS {
  PAID = 'paid',
  UNPAID = 'unpaid',
}
