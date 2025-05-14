import { Pagination } from '@api/miscellaneous/types';
import { GetUnionReservedSeat } from './get-union-reserved-seat-types';

export interface GetUnionReservedSeatListing extends Pagination {
  unionReservedWards: GetUnionReservedSeat[];
}

export interface GetUnionReservedSeatListingResponseType {
  data?: GetUnionReservedSeatListing;
  status?: number;
  statusText?: string;
}
