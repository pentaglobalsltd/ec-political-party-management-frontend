export interface ParticipantCountRes {
  value: number;
  textValue: string;
}

export interface ParticipantCountResType {
  data: ParticipantCountRes;
  status?: number;
  statusText?: string;
}
