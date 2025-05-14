export interface GetUnionReservedSeat {
  readonly id?: number;
  code?: number;
  unionWards?: UnionWards[];
  nameBn?: string;
  nameEn?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUnionReservedSeatResponseType {
  data?: GetUnionReservedSeat;
  status?: number;
  statusText?: string;
}

interface UnionWards {
  readonly id: number;
  unionWardCode?: number;
  nameBn?: string;
  nameEn?: string;
}
