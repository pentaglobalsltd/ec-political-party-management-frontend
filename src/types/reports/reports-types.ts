type ReportType = 'nomination' | 'affidavit';

export interface NominationAffidavitPdf {
  electionSettingsId: number | string;
  candidateElectionDetailsId: number | string;
  reportType: ReportType;
}

export interface NSCReportsRequestPdfData {
  electionScheduleId: number | undefined;
}

export interface IReportsRequestPdfData {
  electionTypeId: number | undefined;
  electionScheduleId: number | undefined;
  candidateTypeId: number | undefined;
  zillaId: number | undefined;
  constituencyId: number | undefined;
  bengaliAlphabetOrder: boolean;
  candidateSerialOrder: boolean;
  nominationStatusCodes: string;
  voterCount?: number;
}

export interface IReportElectedCandidateRequestPdfData {
  electionTypeId: number | undefined;
  electionSettingsId: number | undefined;
  electionScheduleId: number | undefined;
  candidateTypeId: number | undefined;
  candidateSerialOrder: boolean;
  nominationStatusCodes: string;
}

export interface AcknowledgementPdfType {
  electionSettingsId: number | string;
  electionDetailsId: number | string;
  serialNo: number | string;
  proposedBy: string;
  proposedDate: string;
  proposedTime: string;
  roSelectedDate: string;
  roSelectedTime: string;
  roSelectedPlace: string;
  token?: string | undefined;
}

export interface IBartaSheetParams {
  electionScheduleId: number | string;
  candidateTypeId: number | string;
}

export interface IBartaSheetParamsForUnion {
  electionScheduleId: number | string;
  electionSettingsId: number | string;
}
export interface IBartaSheetError {
  isError: boolean;
  message: string | null;
}

export interface IBartaSheetData {
  userId?: number | string;
  electionSettingsId?: number | string;
}

export interface PollingCenterDetailsParams {
  electionScheduleId?: number | string;
  electionSettingsId?: number | string;
}

export interface PollingCenterDetailsError {
  isError: boolean;
  message: string | null;
}
