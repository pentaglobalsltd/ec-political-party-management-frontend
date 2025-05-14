export interface CreateUnionReservedSeat {
  nameEn: string;
  nameBn: string;
  code: string | number;
  unionOrWardIds: number[];
}

export interface CreateUnionReservedSeatResponse {
  data?: any;
  status?: number;
  statusText?: string;
}
