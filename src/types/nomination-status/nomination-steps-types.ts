export interface NominationStepsType {
  id?: number;
  nameBn?: string;
  nameEn?: string;
  getStatuses?: StepType[];
  postStatuses?: StepType[];
}
export interface StepType {
  id: number;
  code: number;
  nameBn?: string;
  nameEn?: string;
}
export interface NominationStepsType {
  nominationsteps?: NominationStepsType[];
}

export interface NominationStepsResponseTypes {
  data?: NominationStepsType;
  status?: number;
  statusText?: string;
}
