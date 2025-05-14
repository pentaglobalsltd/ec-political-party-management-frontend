export interface VoterTypesType {
  nameBn: string;
  nameEn: string;
}

export interface VoterTypesTypeRes {
  data?: {
    voterTypes: VoterTypesType[];
  };
  status?: number;
}
