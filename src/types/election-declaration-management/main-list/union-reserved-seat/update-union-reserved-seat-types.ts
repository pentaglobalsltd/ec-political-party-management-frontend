import { CreateUnionReservedSeat } from './create-union-reserved-seat-types';

export interface UpdateUnionReservedSeat extends CreateUnionReservedSeat {
  id: number;
}

export interface UpdateUnionReservedSeatResponseType {
  data?: UpdateUnionReservedSeat;
  status?: number;
  statusText?: string;
}
