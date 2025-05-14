export interface NominationStatusType {
  id: number;
  nameBn?: string;
  nameEn?: string;
}

export interface NominationStatusesType {
  nominationstatuses?: NominationStatusType[];
}

export interface NominationStatusesTypeRes {
  data?: NominationStatusesType;
  status?: number;
  statusText?: string;
}
